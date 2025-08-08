<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class OauthController extends Controller
{
    /**
     * @param mixed $provider
     */
    public function redirect($provider): RedirectResponse
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider): RedirectResponse
    {
        $oauth = Socialite::driver($provider)->user();

        $user = User::query()->firstOrCreate([
            'email' => $oauth->getEmail(),
        ], [
            'name' => $oauth->getName(),
            'avatar' => $oauth->getAvatar
        ]);

        Auth::login($user);

        return redirect()->route('product.index');
    }
}
