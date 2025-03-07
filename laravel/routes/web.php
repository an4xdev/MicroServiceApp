<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return json_encode([
        'message' => 'Main Page',
        'status' => 200,
    ]);
});

Route::resource('api/test', 'App\Http\Controllers\API\TestController');