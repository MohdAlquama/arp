<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class TurnstileVerifier
{
    public function passes(?string $token, ?string $ip = null): bool
    {
        $secret = config('services.turnstile.secret_key');

        // Fail closed: no secret or no token means the check fails
        if (! $secret || ! $token) {
            return false;
        }

        try {
            $response = Http::asForm()
                ->timeout(5)
                ->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
                    'secret'   => $secret,
                    'response' => $token,
                    'remoteip' => $ip,
                ]);

            return $response->ok() && $response->json('success') === true;
        } catch (Throwable $e) {
            Log::warning('Turnstile verification failed: ' . $e->getMessage());
            return false;
        }
    }
}