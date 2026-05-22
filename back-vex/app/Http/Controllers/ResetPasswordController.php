<?php

namespace App\Http\Controllers;

use App\Models\Pengguna;
use App\Mail\ResetPasswordMail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = Pengguna::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Email tidak ditemukan.',
            ], 404);
        }

        // Generate token & expired
        $resetToken = Str::uuid();
        $expiredAt  = Carbon::now()->addMinutes(15);

        // Simpan di Cache
        Cache::put('reset_token_' . $resetToken, $user->email, $expiredAt);

        // Link ke frontend
        $resetLink = config('app.frontend_url') . '/reset-password?token=' . $resetToken;

        // Kirim email
        Mail::to($user->email)->send(new ResetPasswordMail($resetLink));

        return response()->json([
            'status'  => 'success',
            'message' => 'Link reset kata sandi telah dikirim ke email Anda.',
        ]);
    }


    public function verifyResetToken(Request $request)
    {
        $request->validate([
            'token' => 'required',
        ]);

        $email = Cache::get('reset_token_' . $request->token);

        if (!$email) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Token tidak valid atau sudah kadaluarsa.',
            ], 410);
        }

        return response()->json([
            'status'  => 'success',
            'message' => 'Token valid.',
            'token'   => $request->token,
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token'    => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        // Ambil email dari Cache
        $email = Cache::get('reset_token_' . $request->token);

        if (!$email) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Token tidak valid atau sudah kadaluarsa.',
            ], 410);
        }

        $user = Pengguna::where('email', $email)->first();

        if (!$user) {
            return response()->json([
                'status'  => 'error',
                'message' => 'User tidak ditemukan.',
            ], 404);
        }

        // Update password
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        // Hapus token dari Cache
        Cache::forget('reset_token_' . $request->token);

        return response()->json([
            'status'  => 'success',
            'message' => 'Kata sandi berhasil diubah. Silakan login.',
        ]);
    }
}