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
        Schema::create('payments', function (Blueprint $table) {

            $table->id();

            // Branch
            $table->foreignId('branch_id')
                ->constrained('branches')
                ->cascadeOnDelete();

            // Related sale / invoice
            $table->foreignId('sale_id')
                ->constrained('sales')
                ->cascadeOnDelete();

            // Customer
            $table->foreignId('customer_id')
                ->nullable()
                ->constrained('customers')
                ->nullOnDelete();

            // User who received the payment
            $table->foreignId('user_id')
                ->constrained('users')
                ->restrictOnDelete();

            // Payment amount
            $table->decimal('amount', 12, 2);

            // Payment method
            $table->enum('payment_method', [
                'cash',
                'mobile_money',
                'bank',
            ]);

            // Optional transaction/reference number
            $table->string('reference')->nullable();

            // Additional notes
            $table->text('notes')->nullable();

            $table->timestamps();

            $table->index([
                'branch_id',
                'customer_id',
            ]);

            $table->index('sale_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
