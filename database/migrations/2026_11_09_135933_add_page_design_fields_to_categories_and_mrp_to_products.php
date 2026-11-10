<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('page_title')->nullable();
            $table->text('page_description')->nullable();
            $table->string('banner_image')->nullable();
        });

        Schema::table('products', function (Blueprint $table) {
            $table->decimal('mrp', 10, 2)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('mrp');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn(['page_title', 'page_description', 'banner_image']);
        });
    }
};
