php
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            // Branch owner
            $table->foreignId('branch_id')
                ->constrained()
                ->cascadeOnDelete();

            // Category
            $table->foreignId('category_id')
                ->constrained()
                ->cascadeOnDelete();

            // Product name
            $table->string('name');

            // Barcode / SKU
            $table->string('sku')->nullable();
            $table->string('barcode')->nullable();

            // Pricing
            $table->decimal('cost_price', 10, 2)
                ->default(0);

            $table->decimal('selling_price', 10, 2)
                ->default(0);

            // Current stock
            $table->integer('quantity')
                ->default(0);

            // Low stock alert limit
            $table->integer('low_stock_limit')
                ->default(5);

            // Unit
            $table->string('unit')
                ->default('pcs');

            // Product image
            $table->string('image')
                ->nullable();

            // Product status
            $table->enum('status', [
                'active',
                'inactive'
            ])->default('active');

            $table->timestamps();

            // Soft delete
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

