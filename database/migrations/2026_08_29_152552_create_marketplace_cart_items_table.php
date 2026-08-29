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
        Schema::create('marketplace_cart_items', function (Blueprint $table) {

            $table->id();

            $table->foreignId('cart_id')
                ->constrained('marketplace_carts')
                ->cascadeOnDelete();

            $table->foreignId('listing_id')
                ->constrained('marketplace_listings')
                ->cascadeOnDelete();

            $table->unsignedInteger('quantity')
                ->default(1);

            $table->timestamps();

            $table->unique([
                'cart_id',
                'listing_id',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marketplace_cart_items');
    }
};
