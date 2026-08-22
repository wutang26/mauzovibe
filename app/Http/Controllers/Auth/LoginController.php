<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{

    public function store(Request $request)
    {

        $credentials = $request->validate([

            'email'    => 'required|email',

            'password' => 'required',

        ]);

        if (! Auth::attempt(

            $credentials,

            $request->remember

        )) {

            return back()->withErrors([

                'email' => 'Invalid email or password',

            ]);

        }

        $request->session()->regenerate();

        $user = auth()->user();

        $branches = $user
            ->branches()
            ->count();

/*
|--------------------------------------------------------------------------
| Multiple branches
|--------------------------------------------------------------------------
*/

        if ($branches > 1) {

            return redirect()
                ->route('choose.branch');

        }

/*
|--------------------------------------------------------------------------
| One branch
|--------------------------------------------------------------------------
*/

        if ($branches == 1) {

            session([

                'branch_id' =>

                $user->branches()
                    ->first()
                    ->id,

            ]);

        }

        return redirect()
            ->route('dashboard');

    }

    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('welcome');
    }

}
