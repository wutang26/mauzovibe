<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminSettings
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()) {
            abort(403);
        }

        if (!$request->user()->hasAnyRole(['admin', 'super-admin'])) {
            abort(403, 'You are not authorized to access Settings.');
        }

        return $next($request);
    }
}