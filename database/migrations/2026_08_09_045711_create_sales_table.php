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
        Schema::create('sales', function (Blueprint $table) {

            $table->id();

            // Branch where the sale was made
            $table->foreignId('branch_id')
                ->constrained()
                ->cascadeOnDelete();

            // Cashier / user who made the sale
            $table->foreignId('user_id')
                ->constrained()
                ->restrictOnDelete();

            // Customer will be added later
            // when the Customers module is built.
            $table->unsignedBigInteger('customer_id')
                ->nullable();

            // Unique invoice/receipt number
            $table->string('invoice_number')
                ->unique();

            // Financial calculations
            $table->decimal('subtotal', 12, 2)
                ->default(0);

            $table->decimal('discount', 12, 2)
                ->default(0);

            $table->decimal('total', 12, 2)
                ->default(0);

            // Payment information
            $table->enum('payment_method', [
                'cash',
                'mobile_money',
                'bank',
                'credit'
            ]);

            $table->enum('payment_status', [
                'paid',
                'partial',
                'unpaid'
            ])->default('paid');

            $table->decimal('paid_amount', 12, 2)
                ->default(0);

            $table->decimal('change_amount', 12, 2)
                ->default(0);

            // Sale status
            $table->enum('status', [
                'completed',
                'cancelled'
            ])->default('completed');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
