# Etap bazowy
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80 443

# Etap build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Kopiowanie plików projektu AuthService
COPY ApiGateway/ApiGateway/ApiGateway.csproj ApiGateway/ApiGateway/

# Kopiowanie plików projektu SharedObjects
COPY SharedObjects/SharedObjects/SharedObjects.csproj SharedObjects/SharedObjects/

# Przywrócenie zależności
RUN dotnet restore ApiGateway/ApiGateway/ApiGateway.csproj

# Skopiowanie reszty plików
COPY . .

# Budowa aplikacji
WORKDIR /src/ApiGateway/ApiGateway
RUN dotnet build ApiGateway.csproj -c $BUILD_CONFIGURATION -o /app/build

# Etap publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish ApiGateway.csproj -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Finalny obraz
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ApiGateway.dll"]
