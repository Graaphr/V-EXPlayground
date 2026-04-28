<?php

namespace App\Http\Controllers;

use App\Models\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Mail\OtpMail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class PenggunaController extends Controller
{

    public function register(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:pengguna,email',
            'password' => 'required|min:8|confirmed',
        ]);

        try {
            $otpCode = rand(100000, 999999);

            $userData = [
                'nama' => $request->nama,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role ?? 'Pengunjung',
                'otp_code' => $otpCode,
                'otp_expires_at' => Carbon::now()->addMinutes(10),
            ];

            // ✅ CACHE (bukan session)
            Cache::put('temp_user_' . $request->email, $userData, now()->addMinutes(10));

            Mail::to($request->email)->send(new OtpMail($otpCode));

            return response()->json([
                'status' => 'success',
                'message' => 'Silakan cek email OTP Anda.'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            // 'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);

        $tempUser = Cache::get('temp_user_' . $request->email);

        if (!$tempUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'OTP expired atau tidak ditemukan'
            ], 408);
        }

        if ($tempUser['otp_code'] != $request->otp) {
            return response()->json([
                'status' => 'error',
                'message' => 'OTP salah'
            ], 422);
        }

        $user = Pengguna::create([
            'nama' => $tempUser['nama'],
            'email' => $tempUser['email'],
            'password' => $tempUser['password'],
            'role' => $tempUser['role'],
            'email_verified_at' => Carbon::now(),
        ]);

        // ❌ hapus cache
        Cache::forget('temp_user_' . $request->email);

        return response()->json([
            'status' => 'success',
            'message' => 'Akun berhasil diverifikasi!',
            'user' => $user
        ]);
    }

    public function resendOtp(Request $request)
    {
        $tempUser = session('temp_user');

        if (!$tempUser) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Sesi habis, silakan daftar ulang.'
            ], 408);
        }

        $otpCode = rand(100000, 999999);
        
        $tempUser['otp_code'] = $otpCode;
        $tempUser['otp_expires_at'] = Carbon::now()->addMinutes(10);
        session(['temp_user' => $tempUser]);

        Mail::to($tempUser['email'])->send(new OtpMail($otpCode));

        return response()->json([
            'status'  => 'success',
            'message' => 'Kode OTP baru telah dikirim ke email Anda.'
        ], 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json([
                'status'  => 'success',
                'message' => 'Selamat datang di Virtual Exhibition!',
                'user'    => Auth::user(),
            ], 200);
        }

        return response()->json([
            'status'  => 'error',
            'message' => 'Email atau password salah.'
        ], 401);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'status'  => 'success',
            'message' => 'Berhasil keluar (Logout).'
        ], 200);
    }
}