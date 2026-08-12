<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Audit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuditController extends Controller
{
    public function index(Request $request)
    {
        $query = Audit::with([
            'user',
            'branch',
        ])->latest();

        // Search
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                    ->orWhere('module', 'like', "%{$search}%")
                    ->orWhere('action', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Module filter
        if ($request->filled('module')) {
            $query->where('module', $request->module);
        }

        // Action filter
        if ($request->filled('action')) {
            $query->where('action', $request->action);
        }

        $audits = $query
            ->paginate(20)
            ->withQueryString();

        $modules = Audit::select('module')
            ->distinct()
            ->orderBy('module')
            ->pluck('module');

        $actions = Audit::select('action')
            ->distinct()
            ->orderBy('action')
            ->pluck('action');

        return Inertia::render('Admin/Audit/Index', [
            'audits' => $audits,
            'modules' => $modules,
            'actions' => $actions,
            'filters' => $request->only([
                'search',
                'module',
                'action',
            ]),
        ]);
    }
}