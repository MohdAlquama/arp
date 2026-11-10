<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('home_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');                       // e.g. MEN
            $table->string('subtitle')->nullable();       // e.g. CONFIDENCE IN EVERY STEP
            $table->string('image_path')->nullable();
            $table->string('href');                       // e.g. /men
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('home_categories');
    }
};
