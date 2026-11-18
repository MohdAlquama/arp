<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Models\ContactEnquiry;
use App\Services\TurnstileVerifier;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Website/Contact/Index', [
            'turnstileSiteKey' => config('services.turnstile.site_key'),
        ]);
    }

    public function store(StoreContactRequest $request, TurnstileVerifier $turnstile)
    {
        // Honeypot: bots fill the hidden field. Pretend it worked, save nothing.
        if ($request->filled('website')) {
            return back()->with('success', 'Thank you! Your enquiry has been received.');
        }

        if (! $turnstile->passes($request->input('turnstile_token'), $request->ip())) {
            throw ValidationException::withMessages([
                'turnstile_token' => 'Human verification failed. Please try again.',
            ]);
        }

        ContactEnquiry::create([
            ...$request->safe()->only(['name', 'phone', 'email', 'type', 'subject', 'message']),
            'ip_address' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 500),
        ]);

        return back()->with('success', 'Thank you! Your enquiry has been received. Our team will contact you soon.');
    }
}