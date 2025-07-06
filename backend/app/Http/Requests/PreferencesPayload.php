<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PreferencesPayload extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'categories' => 'array',
            'sources' => 'array',
            'authors' => 'array',
            'email' => 'nullable|email|max:255',
            'name' => 'nullable|string|max:255',
        ];
    }
}
