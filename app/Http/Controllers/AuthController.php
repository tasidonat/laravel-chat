<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->save();

        return response()->json([
            'user' => $user
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];

        if(!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 403);
        }

        $fingerprint = $request->userAgent() . Hash::make($request->ip());
        $user = User::where('email', $request->input('email'))->first();
        $user->token()->where('name', $fingerprint)->delete();
        $token = $user->createToken($fingerprint, ['*'], Carbon::now()->addWeek(1));

        return response()->json([
            'token' => $token->plainTextToken,
            'user' => $user
        ]);
    }
}
