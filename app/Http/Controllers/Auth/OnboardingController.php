<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class OnboardingController extends Controller
{
    // SHOW ONBOARDING PAGE
    public function index(Request $request): Response
    {
        $email = session('email');
        return Inertia::render('auth/onboarding', compact('email'));
    }
    /**
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse {

        $request->validate([
            'display_name' => 'required|string|max:16',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        ]);

        $user = User::query()->create([
            'name' => $request->name,
            'email' => $request->email,
            'display_name' => $request->display_name,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
        ]);

        Auth::login($user);

        return redirect()->route('product.index');

    }
}
