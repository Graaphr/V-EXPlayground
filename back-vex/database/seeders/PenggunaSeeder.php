<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Pengguna;
class PenggunaSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        Pengguna::create([
            'nama'          => 'Admin Utama',
            'email'         => 'admin@pbl.com',
            'password'      => Hash::make('password123'),
            'role'          => Pengguna::ROLE_ADMIN,
            'kelas'         => null,
            'program_studi' => null,
        ]);

        // KPS
        Pengguna::create([
            'nama'          => 'KPS Teknik Informatika',
            'email'         => 'kps@pbl.com',
            'password'      => Hash::make('password123'),
            'role'          => Pengguna::ROLE_KPS,
            'kelas'         => null,
            'program_studi' => null, // ganti dengan kode_prodi yang ada
        ]);

        // Ketua PBL
        Pengguna::create([
            'nama'          => 'Ketua PBL',
            'email'         => 'ketuapbl@pbl.com',
            'password'      => Hash::make('password123'),
            'role'          => Pengguna::ROLE_KETUA_PBL,
            'kelas'         => null, // ganti dengan id_kelas yang ada
            'program_studi' => null, // ganti dengan kode_prodi yang ada
        ]);
    }
}