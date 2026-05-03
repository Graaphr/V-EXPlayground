<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
class Pengguna extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pengguna')->insert([
            'nama'=>'tesr',
            'email'=>'test@gmail.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);
    }
}
