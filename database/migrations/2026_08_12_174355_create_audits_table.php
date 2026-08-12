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
         Schema::create('audits', function (Blueprint $table) {
            $table->id();

            // User who performed the action
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            // Branch where the action happened
            $table->foreignId('branch_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            // Example: created, updated, deleted, login, logout
            $table->string('action');

            // Example: Product, Sale, Customer, User
            $table->string('module');

            // ID of affected record
            $table->unsignedBigInteger('record_id')->nullable();

            // Human-readable description
            $table->text('description')->nullable();

            // Data before the change
            $table->json('old_values')->nullable();

            // Data after the change
            $table->json('new_values')->nullable();

            // User's IP address
            $table->string('ip_address', 45)->nullable();

            // Browser/device information
            $table->text('user_agent')->nullable();

            $table->timestamps();

            // Useful indexes
            $table->index(['module', 'record_id']);
            $table->index(['action']);
            $table->index(['created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audits');
    }
};
