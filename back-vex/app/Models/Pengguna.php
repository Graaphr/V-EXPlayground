<?php

namespace App\Models;

// Tambahkan HasApiTokens agar bisa digunakan oleh Sanctum
use Laravel\Sanctum\HasApiTokens; 
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pengguna extends Authenticatable
{
    // HasApiTokens 
    use HasApiTokens, HasFactory, Notifiable;

    public $timestamps = false;

    protected $table = 'pengguna';

   
    protected $fillable = [
        'nama',
        'email',
        'password',
        
    ];

    protected $hidden = [

        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [

            'password' => 'hashed',
        ];
    }

    // Helper Methods
    public function isAdmin()
    {
        return $this->role === 'Admin';
    }

    public function isKps()
    {
        return $this->role === 'KPS';
    }

    public function isKetuaPbl()
    {
        return $this->role === 'Ketua PBL';
    }
}