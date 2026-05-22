<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pengguna', function (Blueprint $table) {
            $table->string('new_email')->nullable();
            $table->string('new_email_verification_token')->nullable();
            $table->timestamp('new_email_expires_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('pengguna', function (Blueprint $table) {
            $table->dropColumn(['new_email', 'new_email_verification_token', 'new_email_expires_at']);
        });
    }
};