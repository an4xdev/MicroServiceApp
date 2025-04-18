FROM mcr.microsoft.com/dotnet/sdk:9.0 AS shared-build
WORKDIR /src
COPY SharedObjects/SharedObjects/SharedObjects.csproj SharedObjects/SharedObjects/
RUN dotnet restore SharedObjects/SharedObjects/SharedObjects.csproj
RUN dotnet build SharedObjects/SharedObjects/SharedObjects.csproj -c Release -o /app/shared

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY DatabaseManager/DatabaseManager/DatabaseManager.csproj DatabaseManager/DatabaseManager/
COPY . .
COPY --from=shared-build /app/shared/SharedObjects.dll .

RUN dotnet restore DatabaseManager/DatabaseManager/DatabaseManager.csproj

WORKDIR /src/DatabaseManager/DatabaseManager
RUN dotnet build DatabaseManager.csproj -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
RUN dotnet publish DatabaseManager.csproj -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DatabaseManager.dll"]
