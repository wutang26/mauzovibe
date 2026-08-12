<?php

namespace App\Helpers;

use App\Models\Audit;
use Illuminate\Support\Facades\Auth;

class AuditHelper
{
    public static function log(
        string $action,
        string $module,
        ?int $recordId = null,
        ?string $description = null,
        ?array $oldValues = null,
        ?array $newValues = null
    ): Audit {
        $user = Auth::user();

        return Audit::create([
            'user_id' => $user?->id,

            'branch_id' => session('branch_id'),

            'action' => $action,

            'module' => $module,

            'record_id' => $recordId,

            'description' => $description,

            'old_values' => $oldValues,

            'new_values' => $newValues,

            'ip_address' => request()->ip(),

            'user_agent' => request()->userAgent(),
        ]);
    }
}