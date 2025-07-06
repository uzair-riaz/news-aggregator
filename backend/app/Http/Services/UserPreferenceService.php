<?php

namespace App\Http\Services;

use App\Helpers\JsonResponse;
use App\Models\User;
use App\Models\UserPreference;

class UserPreferenceService
{
    /**
     * Get user preferences.
     *
     * @param int $userId
     * @return array|null
     */
    public function getPreferences(int $userId)
    {
        try {
            $preferences = UserPreference::where('user_id', $userId)->first();
            if (!$preferences) {
                return JsonResponse::response('User preferences not found', [], STATUS_CODE_NOTFOUND);
            }
            return JsonResponse::response('Fetched user preferences', ['preferences' => $preferences->preferences]);
        } catch (\Throwable $th) {
            return JsonResponse::response('There was an error fetching preferences', [], STATUS_CODE_BADREQUEST, 'error');
        }
    }

    /**
     * Save user preferences.
     *
     * @param int $userId
     * @param array $preferences
     * @return mixed
     */
    public function savePreferences(int $userId, array $preferences)
    {
        try {
            $userPreference = UserPreference::updateOrCreate(
                ['user_id' => $userId],
                ['preferences' => $preferences]
            );
            return JsonResponse::response('Preferences saved successfully', ['preferences' => $userPreference->preferences]);
        } catch (\Throwable $th) {
            return JsonResponse::response('There was an error saving preferences', [], STATUS_CODE_BADREQUEST, 'error');
        }
    }

    /**
     * Update specific preferences for a user.
     *
     * @param int $userId
     * @param array $data
     * @return mixed
     */
    public function updatePreferences(int $userId, array $data)
    {
        try {
            $preferences = $data['preferences'] ?? [];
            $email = $data['email'] ?? null;
            $name = $data['name'] ?? null;

            $userPreference = UserPreference::where('user_id', $userId)->first();

            if ($userPreference) {
                $currentPreferences = $userPreference->preferences ?? [];
                $updatedPreferences = array_merge($currentPreferences, $preferences);
                $userPreference->preferences = $updatedPreferences;
                $userPreference->save();
            } else {
                $userPreference = $this->savePreferences($userId, $preferences);
            }

            $user = User::find($userId);
            if ($user) {
                if ($email) {
                    $user->email = $email;
                }
                if ($name) {
                    $user->name = $name;
                }
                $user->save();
            }

            return JsonResponse::response(
                'Preferences and user details updated successfully',
                [
                    'user' => $user->load('preferences'),
                ]
            );
        } catch (\Throwable $th) {
            return JsonResponse::response(
                'There was an error updating preferences',
                [],
                STATUS_CODE_BADREQUEST,
                'error'
            );
        }
    }
}
