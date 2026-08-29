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
        Schema::create('marketplace_messages', function (Blueprint $table) {

            $table->id();

            $table->foreignId('sender_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('receiver_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('listing_id')
                ->nullable()
                ->constrained('marketplace_listings')
                ->nullOnDelete();

            $table->foreignId('offer_id')
                ->nullable()
                ->constrained('marketplace_offers')
                ->nullOnDelete();

            $table->text('message');

            $table->boolean('is_read')
                ->default(false);

            $table->timestamps();

            $table->index([
                'receiver_id',
                'is_read',
            ]);

            $table->index([
                'sender_id',
                'receiver_id',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marketplace_messages');
    }
};
