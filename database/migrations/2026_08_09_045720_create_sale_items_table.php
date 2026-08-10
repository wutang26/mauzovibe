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
         Schema::create('sale_items', function (Blueprint $table) {

            $table->id();

            // Sale
            $table->foreignId('sale_id')
                ->constrained()
                ->cascadeOnDelete();

            // Product sold
            $table->foreignId('product_id')
                ->constrained()
                ->restrictOnDelete();

            // Quantity sold
            $table->decimal('quantity', 12, 2)
                ->default(1);

            // Selling price at the time of sale
            $table->decimal('unit_price', 12, 2);

            // Cost price at the time of sale
            // Important for historical profit calculation
            $table->decimal('cost_price', 12, 2);

            // Item discount
            $table->decimal('discount', 12, 2)
                ->default(0);

            // Final item total
            $table->decimal('total', 12, 2)
                ->default(0);

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_items');
    }
};
