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
        Schema::create('returns', function (Blueprint $table) {

            $table->id();

            // Branch where the return was processed
            $table->foreignId('branch_id')
                ->constrained()
                ->cascadeOnDelete();

            // Original sale
            $table->foreignId('sale_id')
                ->constrained('sales')
                ->restrictOnDelete();

            // User/cashier who processed the return
            $table->foreignId('user_id')
                ->constrained()
                ->restrictOnDelete();

            // Unique return reference
            $table->string('return_number')
                ->unique();

            // Total amount being refunded
            $table->decimal('refund_amount', 12, 2)
                ->default(0);

            // How customer receives refund
            $table->enum('refund_method', [
                'cash',
                'mobile_money',
                'bank',
                'credit'
            ])->default('cash');

            // General reason for the return
            $table->text('reason')
                ->nullable();

            // Return status
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
        Schema::dropIfExists('returns');
    }
};
