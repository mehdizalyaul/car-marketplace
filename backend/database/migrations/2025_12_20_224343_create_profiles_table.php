<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();

            // Relations
            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->string('full_name')->nullable();
            $table->string('avatar')->nullable();
            $table->string('phone')->nullable();
            $table->string('city')->nullable();

            // Marketplace role 
            $table->enum('type', ['buyer', 'seller'])
                  ->default('buyer');

            // Trust & reputation
            $table->boolean('is_verified')->default(false);
            $table->unsignedTinyInteger('rating')->nullable();

            // Optional bio
            $table->text('bio')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
