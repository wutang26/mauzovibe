<?php

namespace App\Http\Controllers;

use App\Models\DailyPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DailyPostController extends Controller
{
    /**
     * Display all daily posts.
     */
    public function index()
    {
        $posts = DailyPost::latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/DailyPosts/Index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show create form.
     */
    public function create()
    {
        return Inertia::render('Admin/DailyPosts/Create');
    }

    /**
     * Store a new daily post.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp,gif',
                'max:5120',
            ],

            'button_text' => [
                'nullable',
                'string',
                'max:100',
            ],

            'button_url' => [
                'nullable',
                'string',
                'max:500',
            ],

            'type' => [
                'required',
                'string',
                'max:50',
                'in:welcome,promotion,announcement,update',
            ],

            'starts_at' => [
                'nullable',
                'date',
            ],

            'ends_at' => [
                'nullable',
                'date',
                'after_or_equal:starts_at',
            ],

            'is_active' => [
                'nullable',
                'boolean',
            ],

            'sort_order' => [
                'nullable',
                'integer',
                'min:0',
            ],
        ]);

        DB::transaction(function () use ($request, &$validated) {

            /*
            |--------------------------------------------------------------------------
            | Image Upload
            |--------------------------------------------------------------------------
            */

            if ($request->hasFile('image')) {
                $path = $request->file('image')
                    ->store('daily-posts', 'public');

                $validated['image'] = Storage::disk('public')->url($path);
            }

            /*
            |--------------------------------------------------------------------------
            | Additional Fields
            |--------------------------------------------------------------------------
            */

            $validated['created_by'] = auth()->id();

            $validated['is_active'] = $request->boolean('is_active');

            $validated['sort_order'] = (int) (
                $validated['sort_order'] ?? 0
            );

            /*
            |--------------------------------------------------------------------------
            | Create Post
            |--------------------------------------------------------------------------
            */

            DailyPost::create($validated);
        });

        return redirect()
            ->route('admin.daily-posts.index')
            ->with(
                'success',
                'Daily post imeongezwa kikamilifu.'
            );
    }

    /**
     * Show edit form.
     */
    public function edit(DailyPost $dailyPost)
    {
        return Inertia::render('Admin/DailyPosts/Edit', [
            'post' => $dailyPost,
        ]);
    }

    /**
     * Update daily post.
     */
    public function update(
        Request $request,
        DailyPost $dailyPost
    ) {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp,gif',
                'max:5120',
            ],

            'button_text' => [
                'nullable',
                'string',
                'max:100',
            ],

            'button_url' => [
                'nullable',
                'string',
                'max:500',
            ],

            'type' => [
                'required',
                'string',
                'max:50',
                'in:welcome,promotion,announcement,update',
            ],

            'starts_at' => [
                'nullable',
                'date',
            ],

            'ends_at' => [
                'nullable',
                'date',
                'after_or_equal:starts_at',
            ],

            'is_active' => [
                'nullable',
                'boolean',
            ],

            'sort_order' => [
                'nullable',
                'integer',
                'min:0',
            ],
        ]);

        DB::transaction(function () use (
            $request,
            $dailyPost,
            &$validated
        ) {

            /*
            |--------------------------------------------------------------------------
            | Replace Image
            |--------------------------------------------------------------------------
            */

            if ($request->hasFile('image')) {

                // Delete old image
                if ($dailyPost->image) {

                    $oldPath = parse_url(
                        $dailyPost->image,
                        PHP_URL_PATH
                    );

                    if ($oldPath) {

                        $oldPath = ltrim(
                            str_replace(
                                '/storage/',
                                '',
                                $oldPath
                            ),
                            '/'
                        );

                        Storage::disk('public')
                            ->delete($oldPath);
                    }
                }

                // Store new image
                $path = $request->file('image')
                    ->store('daily-posts', 'public');

                $validated['image'] =
                    Storage::disk('public')->url($path);
            }

            /*
            |--------------------------------------------------------------------------
            | Additional Fields
            |--------------------------------------------------------------------------
            */

            $validated['is_active'] =
                $request->boolean('is_active');

            $validated['sort_order'] = (int) (
                $validated['sort_order'] ?? 0
            );

            /*
            |--------------------------------------------------------------------------
            | Update
            |--------------------------------------------------------------------------
            */

            $dailyPost->update($validated);
        });

        return redirect()
            ->route('admin.daily-posts.index')
            ->with(
                'success',
                'Daily post imeboreshwa kikamilifu.'
            );
    }

    /**
     * Delete daily post.
     */
    public function destroy(DailyPost $dailyPost)
    {
        DB::transaction(function () use ($dailyPost) {

            /*
            |--------------------------------------------------------------------------
            | Delete Image
            |--------------------------------------------------------------------------
            */

            if ($dailyPost->image) {

                $oldPath = parse_url(
                    $dailyPost->image,
                    PHP_URL_PATH
                );

                if ($oldPath) {

                    $oldPath = ltrim(
                        str_replace(
                            '/storage/',
                            '',
                            $oldPath
                        ),
                        '/'
                    );

                    Storage::disk('public')
                        ->delete($oldPath);
                }
            }

            /*
            |--------------------------------------------------------------------------
            | Delete Post
            |--------------------------------------------------------------------------
            */

            $dailyPost->delete();
        });

        return redirect()
            ->route('admin.daily-posts.index')
            ->with(
                'success',
                'Daily post imefutwa.'
            );
    }

    /**
     * Toggle active status.
     */
    public function toggle(DailyPost $dailyPost)
    {
        $dailyPost->update([
            'is_active' => ! $dailyPost->is_active,
        ]);

        return back()->with(
            'success',
            $dailyPost->is_active
                ? 'Daily post imewashwa.'
                : 'Daily post imezimwa.'
        );
    }
}

