FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY AuthService/AuthService/AuthService.csproj AuthService/AuthService/

COPY SharedObjects/SharedObjects/SharedObjects.csproj SharedObjects/SharedObjects/

RUN dotnet restore AuthService/AuthService/AuthService.csproj

COPY . .

WORKDIR /src/AuthService/AuthService
RUN dotnet build AuthService.csproj -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish AuthService.csproj -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AuthService.dll"]
