<?php

namespace App\Events;

use App\Http\Resources\ParentResource;
use App\ParentNode;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ParentUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $parent;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(ParentNode $parent)
    {
        $this->parent = $parent;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('tree');
    }

    public function broadcastWith()
    {
        return ['parent' => new ParentResource($this->parent)];
    }
}
