<?php

use Illuminate\Support\Facades\Route;

Route::resource('api/task-status', 'App\Http\Controllers\API\TaskStatusController');

Route::resource('api/task', 'App\Http\Controllers\API\TaskController');
Route::post('api/task/{task}/assign', 'App\Http\Controllers\API\TaskController@assignTaskToProject');

Route::resource('api/test', 'App\Http\Controllers\API\TestController');

Route::get('/documentation', function () {
    return view('scribe.index');
});
