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
       Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('branch_id')
                ->constrained('branches')
                ->cascadeOnDelete();

            $table->string('plan')->default('monthly');

            $table->decimal('amount', 12, 2)->default(10000);

            $table->enum('status', [
                'trial',
                'active',
                'expired',
                'pending',
                'cancelled',
            ])->default('trial');

            $table->timestamp('trial_started_at')->nullable();
            $table->timestamp('trial_ends_at')->nullable();

            $table->timestamp('started_at')->nullable();
            $table->timestamp('ends_at')->nullable();

            $table->timestamps();

            $table->index(['branch_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
