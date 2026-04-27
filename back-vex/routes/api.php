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

// --- GRUP PUBLIK (Bisa diakses tanpa login) ---
// Route::prefix('auth')->group(function () {
//     Route::post('/register', [PenggunaController::class, 'register']);
// Route::post('/verify-otp', [PenggunaController::class, 'verifyOtp']);
// Route::post('/resend-otp', [PenggunaController::class, 'resendOtp']);
    // 1. Jalur Registrasi
    // Route::post('/register', [PenggunaController::class, 'register']);
    
    // // 2. Jalur Login (Tambahkan ini agar Next.js bisa masuk)
    // Route::post('/login', [PenggunaController::class, 'login'])->name('auth.login');
    
    // // 3. Jalur Verifikasi OTP
    // Route::post('/verify-otp', [PenggunaController::class, 'verifyOtp']);
    
    // // Jalur Resend OTP dengan Throttle (Keamanan agar tidak spam email)
    // Route::middleware('throttle:5,1')->group(function () {
    //     Route::post('/resend-otp', [PenggunaController::class, 'resendOtp'])->name('auth.resend_otp');
    // });
// });


// --- GRUP TERPROTEKSI (Wajib Login/Sanctum) ---
// Gunakan grup ini untuk semua fitur V-EX yang butuh akses khusus
Route::middleware('auth:sanctum')->group(function () {

    // 1. Ambil data user yang sedang login (Penting untuk Next.js)
    Route::get('/user', function (Request $request) {
        return $request->user();
        
    })->name('auth.user');
    

    // 2. Jalur Logout
    Route::post('/logout', [PenggunaController::class, 'logout'])->name('auth.logout');

    // 3. Contoh akses profil atau fitur internal lainnya
    // Route::get('/user-profile', [PenggunaController::class, 'profile']);
});