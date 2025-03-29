cd fast_api
sqlacodegen --outfile models.py postgresql://postgres:P%%40ssword123%%21@localhost:5432/project

cd ..

cd js_express
.\node_modules\.bin\sequelize-auto -o "./models" -d project -h localhost -u postgres -p 5432 -x P@ssword123! -e postgres -l ts

cd ..

cd laravel
php artisan code:models