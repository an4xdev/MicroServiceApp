FROM composer:2 AS build

WORKDIR /app

# Kopiujemy tylko pliki composer dla lepszego cachowania
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --prefer-dist --no-interaction --optimize-autoloader

# Kopiujemy cały kod aplikacji
COPY . .

# Nie generujemy zoptymalizowanych plików tutaj, 
# ponieważ używamy wolumenów w docker-compose

FROM php:8.2-fpm-alpine AS final

WORKDIR /var/www

# Instalujemy wymagane rozszerzenia PHP, w tym pdo_pgsql dla PostgreSQL
RUN apk add --no-cache \
    libpng \
    libpq \
    libzip \
    postgresql-dev \
    && apk add --no-cache --virtual .build-deps \
    libpng-dev \
    libjpeg-turbo-dev \
    libzip-dev \
    && docker-php-ext-configure zip \
    && docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql \
    zip \
    gd \
    && apk del .build-deps

# Zwiększamy limity pamięci PHP dla większych aplikacji
RUN echo "memory_limit=256M" > /usr/local/etc/php/conf.d/memory-limit.ini \
    && echo "upload_max_filesize=64M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size=64M" >> /usr/local/etc/php/conf.d/uploads.ini

# Kopiujemy pliki aplikacji
COPY --from=build /app /var/www

# Tworzymy i używamy niepriwilegowanego użytkownika (www-data już istnieje)
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

USER www-data

EXPOSE 9000

CMD ["php-fpm"]