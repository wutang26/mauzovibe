<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('branches', 'business_id')) {
            Schema::table('branches', function (Blueprint $table) {
                $table->foreignId('business_id')
                    ->nullable()
                    ->after('id')
                    ->constrained('businesses')
                    ->cascadeOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('branches', 'business_id')) {
            Schema::table('branches', function (Blueprint $table) {
                $table->dropForeign(['business_id']);
                $table->dropColumn('business_id');
            });
        }
    }
};