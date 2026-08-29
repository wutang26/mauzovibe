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
        Schema::create('marketplace_reports', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('listing_id')
                ->constrained('marketplace_listings')
                ->cascadeOnDelete();

            $table->string('reason');

            $table->text('description')->nullable();

            $table->string('status')
                ->default('pending');

            $table->timestamps();

            $table->unique([
                'user_id',
                'listing_id',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marketplace_reports');
    }
};
