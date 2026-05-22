<?php

namespace App\Http\Controllers;

use App\Models\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ChangeEmailController extends Controller
{
    /**
     * STEP 1: Kirim verifikasi ganti email
     * POST /api/change-email/send
     */
    public function sendVerification(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'new_email' => 'required|email|unique:pengguna,email|different:email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Password yang Anda masukkan salah'
            ], 401);
        }

        if ($request->new_email === $user->email) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email baru tidak boleh sama dengan email saat ini'
            ], 422);
        }

        $token = Str::random(60);
        
        $user->new_email = $request->new_email;
        $user->new_email_verification_token = $token;
        $user->new_email_expires_at = Carbon::now()->addMinutes(30);
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Token verifikasi telah dibuat',
            'data' => [
                'verification_token' => $token,
                'new_email' => $request->new_email,
                'expires_at' => Carbon::now()->addMinutes(30)->toDateTimeString()
            ]
        ], 200);
    }

    /**
     * STEP 2: Verifikasi token dan ganti email
     * POST /api/change-email/verify
     */
    public function verify(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token wajib diisi'
            ], 422);
        }

        $user = Auth::user();

        if (!$user->new_email || !$user->new_email_verification_token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tidak ada permintaan perubahan email'
            ], 400);
        }

        if ($user->new_email_verification_token !== $request->token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token verifikasi tidak valid'
            ], 400);
        }

        if (Carbon::now()->greaterThan($user->new_email_expires_at)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token verifikasi sudah kadaluarsa'
            ], 400);
        }

        $oldEmail = $user->email;
        $newEmail = $user->new_email;

        $user->email = $newEmail;
        $user->new_email = null;
        $user->new_email_verification_token = null;
        $user->new_email_expires_at = null;
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Email berhasil diubah',
            'data' => [
                'old_email' => $oldEmail,
                'new_email' => $newEmail
            ]
        ], 200);
    }
}