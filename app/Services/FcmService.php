<?php

namespace App\Services;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;

class FcmService
{
    protected $messaging;

    public function __construct()
    {
        // Ruta al archivo JSON que te he pasado
        $factory = (new Factory)->withServiceAccount(storage_path('app/firebase_credentials.json'));
        $this->messaging = $factory->createMessaging();
    }

    public function sendToToken($token, $title, $body, $data = [])
    {
        if (!$token) return false;

        $notification = Notification::create($title, $body);

        $message = CloudMessage::withTarget('token', $token)
            ->withNotification($notification)
            ->withData($data);

        try {
            $this->messaging->send($message);
            return true;
        } catch (\Exception $e) {
            \Log::error('FCM Send Error: ' . $e->getMessage());
            return false;
        }
    }
}
