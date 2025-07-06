<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginPayload;
use App\Http\Requests\RegisterPayload;
use App\Http\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Handle user login
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginPayload $request)
    {
        return $this->authService->login($request);
    }

    /**
     * Handle user registration
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterPayload $request)
    {
        return $this->authService->register($request);
    }
}
