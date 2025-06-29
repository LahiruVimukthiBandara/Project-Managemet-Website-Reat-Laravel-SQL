<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
         return (new MailMessage)
            ->subject('Welcome to Task Metrix! Confirm Your Email')
            ->greeting('Hello ' . ($notifiable->name ?? 'User') . ',')
            ->line('Welcome to Task Metrix — your new hub for managing projects with ease!')
            ->line('Please click the button below to verify your email address and get started.')
            ->action('Verify Email Address', $url)
            ->line('If you did not create an account, no further action is required.');
    });
    }
}
