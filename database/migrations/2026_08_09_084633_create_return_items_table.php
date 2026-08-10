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
        Schema::create('return_items', function (Blueprint $table) {

            $table->id();

            // Return transaction
            $table->foreignId('return_id')
                ->constrained('returns')
                ->cascadeOnDelete();

            // Original sale item
            $table->foreignId('sale_item_id')
                ->constrained('sale_items')
                ->restrictOnDelete();

            // Product being returned
            $table->foreignId('product_id')
                ->constrained('products')
                ->restrictOnDelete();

            // Quantity returned
            $table->decimal('quantity', 12, 2)
                ->default(1);

            // Original selling price
            $table->decimal('unit_price', 12, 2);

            // Total refund for this item
            $table->decimal('total', 12, 2)
                ->default(0);

            // Optional item-specific reason
            $table->text('reason')
                ->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('return_items');
    }
};
