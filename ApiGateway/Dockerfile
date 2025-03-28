FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ApiGateway/ApiGateway/ApiGateway.csproj ApiGateway/ApiGateway/

COPY SharedObjects/SharedObjects/SharedObjects.csproj SharedObjects/SharedObjects/

RUN dotnet restore ApiGateway/ApiGateway/ApiGateway.csproj

COPY . .

WORKDIR /src/ApiGateway/ApiGateway
RUN dotnet build ApiGateway.csproj -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
RUN dotnet publish ApiGateway.csproj -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ApiGateway.dll"]
