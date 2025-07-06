<?php

namespace App\Http\Services;

use App\Helpers\JsonResponse;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class AuthService
{
    public function login($request)
    {
        try {
            $credentials = $request->only('email', 'password');

            if (!Auth::attempt($credentials)) {
                return JsonResponse::response(__('Invalid Credentials'), [], STATUS_CODE_BADREQUEST, 'error');
            }

            $user = auth()->user();
            $user->load('preferences:user_id,preferences');
            $token = $user->createToken(Str::random(16))->plainTextToken;

            session(['api_token' => $token]);

            return JsonResponse::response(__('authmessages.success'), [
                "user" => $user,
                "api_token" => $token
            ]);
        } catch (\Throwable $th) {
            return JsonResponse::response('There was an error logging in user', [], STATUS_CODE_BADREQUEST, 'error');
        }
    }

    public function register($request)
    {
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return JsonResponse::response(__('User registered successfully'), [
                'user' => $user,
            ], STATUS_CODE_OK, 'success');
        } catch (\Throwable $th) {
            return JsonResponse::response('There was an error registering user', [], STATUS_CODE_BADREQUEST, 'error');
        }
    }
}
