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
use Illuminate\Support\Str;

class PenggunaController extends Controller
{

    public function register(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

         // Validasi 
        if (Pengguna::where('email', $request->email)->exists()) {
            return response()->json([
                'message' => 'Email sudah terdaftar',
            ], 409);
        }

        try {

            // token
            $token = Str::uuid();
            // otp
            $otpCode = rand(100000, 999999);
            // otp habis
            $otp_expires_at = Carbon::now()->addMinutes(10);
            // array user data
            $userData = [
                'nama' => $request->nama,
                'email' => $request->email,
                'role' => 'Pengunjung', 
                'password' => Hash::make($request->password),
                'otp_code' => $otpCode,
                'otp_expires_at' => $otp_expires_at->timestamp * 1000,
            ];

            // set cache
            Cache::put('temp_user_' . $token, $userData, now()->addMinutes(10));

            // email to user
            Mail::to($request->email)->send(new OtpMail($otpCode));

            // return to local storage
            return response()->json([
                'status' => 'success',
                'message' => 'Silakan cek email OTP Anda.',
                'token' => $token,
                'otp_expires_at' => $otp_expires_at->timestamp * 1000,
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
            'token' => 'required',
            'otp' => 'required|digits:6',
        ]);

        // Ambil dari cache
        $tempUser = Cache::get('temp_user_' . $request->token);

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
        // insert into table Pengguna
        Pengguna::create([
            'nama' => $tempUser['nama'],
            'email' => $tempUser['email'],
            'password' => $tempUser['password'],
            'role' => $tempUser['role'],
        ]);

        // remove cache
        Cache::forget('temp_user_' . $request->token);

        return response()->json([
            'status' => 'success',
            'message' => 'Akun berhasil diverifikasi!',
        ]);
    }

    public function resendOtp(Request $request)
    {
        
        $token = $request->token;

        // Ambil token berdasarkan req->token 
        $tempUser = Cache::get('temp_user_' . $token);

        $otpCode = rand(100000, 999999);
        $otp_expires_at = Carbon::now()->addMinutes(10);
        // Set token baru
        $tempUser['otp_code'] = $otpCode;

        Mail::to($tempUser['email'])->send(new OtpMail($otpCode));

        // Set ulang cache
        Cache::put(
            'temp_user_' . $token,
            $tempUser,
            $otp_expires_at
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Silakan cek email OTP Anda.',
            'otp_expires_at' => $otp_expires_at->timestamp * 1000,
        ]);

    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Ambil data Pengguan dari DB
        $user = Pengguna::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email atau password salah.'
            ], 401);
        }

        // hapus toke lama
        $user->tokens()->delete();

        // abilities berdasarkan role
        $abilities = match($user->role) {
            Pengguna::ROLE_ADMIN =>['admin'],
            Pengguna::ROLE_KPS =>['kps'],
            Pengguna::ROLE_KETUA_PBL =>['ketua-pbl'],
            default =>['pengunjung'],
        };

        // Token untuk identitas
        $token = $user->createToken('token', $abilities)->plainTextToken;

        // redirect berdasarkan role
        $redirectTo = match($user->role) {
            Pengguna::ROLE_ADMIN =>'/admin/dashboard',
            Pengguna::ROLE_KPS =>'/kps/dashboard',
            Pengguna::ROLE_KETUA_PBL =>'/ketua-pbl/dashboard',
            default =>'/dashboard',

        };

        return response()->json([
            'status' => 'success',
            'role' => $user->role,
            'redirect_to' => $redirectTo,
            'token' => $token,
            'user' => [
                'id'            => $user->id,
                'nama'          => $user->nama,
                'email'         => $user->email,
                'role'          => $user->role,
                'kelas'         => $user->kelas,
                'program_studi' => $user->program_studi,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();


        return response()->json([
            'status' => 'success',
            'message' => 'Logout berhasil'
        ]);
    }
}