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
        Schema::create('marketplace_offers', function (Blueprint $table) {

            $table->id();

            /*
            |--------------------------------------------------------------------------
            | Listing
            |--------------------------------------------------------------------------
            */
            $table->foreignId('listing_id')
                ->constrained('marketplace_listings')
                ->cascadeOnDelete();

            /*
            |--------------------------------------------------------------------------
            | Buyer / Seller
            |--------------------------------------------------------------------------
            */
            $table->foreignId('buyer_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('seller_id')
                ->constrained('users')
                ->cascadeOnDelete();

            /*
            |--------------------------------------------------------------------------
            | Offer Details
            |--------------------------------------------------------------------------
            */
            $table->decimal('amount', 15, 2);

            $table->text('message')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Status
            |--------------------------------------------------------------------------
            */
            $table->enum('status', [
                'pending',
                'accepted',
                'rejected',
                'cancelled',
            ])->default('pending');

            $table->timestamps();

            /*
            |--------------------------------------------------------------------------
            | Indexes
            |--------------------------------------------------------------------------
            */
            $table->index('listing_id');
            $table->index('buyer_id');
            $table->index('seller_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marketplace_offers');
    }
};