﻿FROM mcr.microsoft.com/dotnet/sdk:9.0 AS shared-build
WORKDIR /src
COPY SharedObjects/SharedObjects/SharedObjects.csproj SharedObjects/SharedObjects/
RUN dotnet restore SharedObjects/SharedObjects/SharedObjects.csproj
RUN dotnet build SharedObjects/SharedObjects/SharedObjects.csproj -c Release -o /app/shared

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
RUN apt-get update && apt-get install -y curl
WORKDIR /app
EXPOSE 80 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ApiGateway/ApiGateway/ApiGateway.csproj ApiGateway/ApiGateway/
COPY . .
COPY --from=shared-build /app/shared/SharedObjects.dll .

RUN dotnet restore ApiGateway/ApiGateway/ApiGateway.csproj

WORKDIR /src/ApiGateway/ApiGateway
RUN dotnet build ApiGateway.csproj -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
RUN dotnet publish ApiGateway.csproj -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:80/health || exit 1

ENTRYPOINT ["dotnet", "ApiGateway.dll"]