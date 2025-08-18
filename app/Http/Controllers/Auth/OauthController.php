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
    /**
     * @param string $provider
     */
    public function callback(string $provider): RedirectResponse
    {
        $oauth = Socialite::driver($provider)->user();

        if($exists = User::query()->where(['email' => $oauth->getEmail()])->first()){
            Auth::login($exists);
            return redirect()->route('product.index');
        }

        // SET EMAIL IN SESSION
        session(['email' => $oauth->getEmail()]);
        return redirect()->route('auth.onboarding');
    }
}
