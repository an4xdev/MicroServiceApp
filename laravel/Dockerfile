FROM composer:2 AS build
WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install --no-dev --no-scripts --prefer-dist --no-interaction --optimize-autoloader

COPY . .

FROM php:8.2-fpm-alpine
WORKDIR /var/www

RUN apk add --no-cache libpng libpng-dev libjpeg-turbo-dev libzip-dev \
    && docker-php-ext-configure zip \
    && docker-php-ext-install pdo pdo_mysql zip

COPY --from=build /app /var/www

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

RUN php artisan cache:clear \
    && php artisan config:clear \
    && php artisan view:clear \
    && php artisan route:clear

EXPOSE 9000

CMD ["php-fpm"]
