<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserPreferenceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');


Route::prefix('/articles')->middleware('auth:sanctum')->as('articles.')->group(function () {
    Route::get('/', [NewsController::class, 'fetchArticlesFromDb']);
});

Route::prefix('/preferences')->middleware('auth:sanctum')->as('preferences.')->group(function () {
    Route::get('/', [UserPreferenceController::class, 'getPreferences']);
    Route::put('/', [UserPreferenceController::class, 'updatePreferences']);
});
