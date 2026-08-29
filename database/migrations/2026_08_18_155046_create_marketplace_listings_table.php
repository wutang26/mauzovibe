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
        Schema::create('marketplace_listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // seller
            $table->foreignId('marketplace_category_id')->constrained()->cascadeOnDelete();
            
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            
            $table->unsignedBigInteger('price'); // in TZS
            $table->enum('condition', ['new', 'used', 'excellent', 'good', 'fair'])->default('used');
            
            $table->string('location')->nullable();      // e.g. Tabora
            $table->string('city')->nullable();
            $table->string('region')->nullable();
            
            $table->json('images')->nullable();
            $table->enum('status', [
            'active',
            'inactive',
            'sold',
            'pending',
            'rejected',
            'draft'
        ])->default('pending');
            //$table->enum('status', ['active', 'sold', 'pending', 'rejected', 'draft'])->default('pending');
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('views')->default(0);
            
            $table->timestamps();
            $table->softDeletes();

            // Indexes for performance
            $table->index(['status', 'is_featured']);
            $table->index(['marketplace_category_id', 'status']);
            $table->index(['city', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marketplace_listings');
    }
};
