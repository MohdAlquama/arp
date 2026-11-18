<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'            => ['required', 'string', 'max:100'],
            'phone'           => ['required', 'regex:/^[+0-9\s\-]{10,16}$/'],
            'email'           => ['nullable', 'email', 'max:150'],
            'type'            => ['required', 'in:Business Enquiry,Product / Bulk Enquiry,Become Distributor,Support & Help'],
            'subject'         => ['required', 'string', 'max:150'],
            'message'         => ['required', 'string', 'max:500'],
            'website'         => ['nullable', 'string'], // honeypot, checked in the controller
            'turnstile_token' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'phone.regex'              => 'Please enter a valid phone number.',
            'turnstile_token.required' => 'Please complete the human verification.',
        ];
    }
}