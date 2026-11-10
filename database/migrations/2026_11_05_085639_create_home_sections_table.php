<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('home_sections', function (Blueprint $table) {
            $table->id();
            $table->string('subtitle')->nullable();      // e.g. THE NEW COLLECTION
            $table->string('title');                     // e.g. STEP INTO YOUR
            $table->string('highlight')->nullable();     // e.g. STYLE.  (gold line)
            $table->text('description')->nullable();
            $table->string('image_path')->nullable();
            $table->boolean('has_button')->default(false);
            $table->string('button_text')->nullable();
            $table->string('button_link')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('home_sections');
    }
};