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
        Schema::table('products', function (Blueprint $table) {
            $table->boolean('is_variant_table_visible')->default(true)->after('is_published');
            $table->text('description')->nullable()->after('is_variant_table_visible');
            $table->boolean('is_description_visible')->default(true)->after('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'is_variant_table_visible',
                'description',
                'is_description_visible',
            ]);
        });
    }
};
