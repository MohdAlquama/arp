<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            // One product per variant (article)
            $table->foreignId('variant_id')
                ->unique()
                ->constrained('variants')
                ->cascadeOnDelete();

            // Main product image (path on the "public" disk)
            $table->string('image')->nullable();

            // Website display (Step 7)
            $table->string('display_name');
            $table->string('color_display', 10)->default('both'); // swatch | name | both

            // Toggles
            $table->boolean('is_promotional')->default(false)->index();
            $table->boolean('is_published')->default(false)->index();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
