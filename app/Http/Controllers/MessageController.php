<?php

namespace App\Http\Controllers;

use App\Events\MessagePosted;
use App\Http\Controllers\Controller;
use App\Http\Requests\Message\StoreRequest;
use App\Http\Resources\Message\IndexResource;
use App\Models\Message;

class MessageController extends Controller
{
    public function index()
    {
        return IndexResource::collection(Message::all());
    }

    public function store(StoreRequest $request)
    {
        $message = new Message();
        $message->message = $request->input('message');
        $message->user_id = $request->input('user');
        $message->save();

        event(new MessagePosted($message, $message->user));
    }
}
