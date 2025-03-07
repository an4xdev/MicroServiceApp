# Stage 1: Budowanie zależności przy użyciu Composera
FROM composer:2 as build
WORKDIR /app

# Kopiujemy pliki konfiguracyjne Composera
COPY composer.json composer.lock ./

# Instalujemy zależności (bez środowisk deweloperskich)
RUN composer install --no-dev --no-scripts --prefer-dist

# Kopiujemy całą aplikację (kod źródłowy) do obrazu
COPY . .

# (Opcjonalnie) Możesz wykonać dodatkowe komendy, np. cache'owanie konfiguracji
# RUN php artisan config:cache

# Stage 2: Finalny obraz
FROM php:8.2-fpm-alpine
WORKDIR /var/www

# Instalacja wymaganych rozszerzeń PHP dla Laravel
RUN apk add --no-cache libpng libpng-dev libjpeg-turbo-dev libzip-dev \
    && docker-php-ext-configure zip \
    && docker-php-ext-install pdo pdo_mysql zip

# Kopiujemy całą aplikację z etapu build
COPY --from=build /app /var/www

# Ustawiamy odpowiednie prawa dostępu do katalogów, które Laravel wykorzystuje do zapisu
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Otwieramy port, na którym będzie działał serwer (np. 9000)
EXPOSE 9000

# Zamiast php-fpm, uruchamiamy wbudowany serwer Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=9000"]
