<?php

namespace App\Http\Controllers;

use App\Http\Requests\PreferencesPayload;
use App\Http\Services\UserPreferenceService as ServicesUserPreferenceService;
use Illuminate\Http\Request;
use App\Services\UserPreferenceService;
use Illuminate\Support\Facades\Auth;

class UserPreferenceController extends Controller
{
    protected $preferenceService;

    public function __construct(ServicesUserPreferenceService $preferenceService)
    {
        $this->preferenceService = $preferenceService;
    }

    /**
     * Get the current user's preferences.
     */
    public function getPreferences()
    {
        $userId = Auth::id();
        return $this->preferenceService->getPreferences($userId);
    }

    /**
     * Update preferences for the current user.
     */
    public function updatePreferences(PreferencesPayload $request)
    {
        $userId = Auth::id();
        return $this->preferenceService->updatePreferences($userId, $request->all());
    }
}
