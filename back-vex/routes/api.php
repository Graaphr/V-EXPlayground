<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PenggunaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Prefix Default: /api
*/

Route::post('/test', function () {
    return response()->json(['message' => 'OK']);
});


// === grup publik ===
Route::prefix('auth')->group(function () {
    Route::post('/register', [PenggunaController::class, 'register']);
    Route::post('/verify-otp', [PenggunaController::class, 'verifyOtp']);
    Route::post('/resend-otp', [PenggunaController::class, 'resendOtp']);
    Route::post('/login', [PenggunaController::class, 'login']);
});



// === grup login ===
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return response()->json([
            'status' => 'success',
            'user' => $request->user()
        ]);
    })->name('auth.user');

    Route::post('/logout', [PenggunaController::class, 'logout'])->name('auth.logout');

     Route::get('/dashboard', function () {
        return response()->json(['status' => 'success', 'page' => 'Dashboard Umum']);
    });

    // admin
    Route::middleware('role:Admin')->prefix('admin')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json(['status' => 'success', 'page' => 'Admin Dashboard']);
        });
    }); 
    
    // kps
    Route::middleware('role:KPS')->prefix('kps')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json(['status' => 'success', 'page' => 'KPS Dashboard']);
        });
    });

    // ketua pbl
    Route::middleware('role:Ketua PBL')->prefix('ketua-pbl')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json(['status' => 'success', 'page' => 'Ketua PBL Dashboard']);
        });
    });



});