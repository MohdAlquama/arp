<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('new_arrivals', function (Blueprint $table) {
            $table->id();
            $table->string('name');                               // e.g. Air Runner Pro
            $table->string('category_label')->nullable();         // e.g. SPORTS SHOES
            $table->string('image_path')->nullable();             // main image
            $table->string('hover_image_path')->nullable();       // shown on hover (optional)
            $table->decimal('price', 10, 2);                      // selling price
            $table->decimal('old_price', 10, 2)->nullable();      // strike-through price (optional)
            $table->string('badge', 30)->nullable();              // e.g. NEW, HOT, LIMITED
            $table->string('href');                               // e.g. /product/air-runner-pro
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('status')->default(true);
            $table->timestamps();

            $table->index(['status', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('new_arrivals');
    }
};
