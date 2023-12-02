
# Event

Fusio has an internal event system which can be used to extend Fusio. This chapter explains how to use those events and
shows which events are available.

## Implementation

To register a new event listener you need to register your event listener at the `resources/container.php` file:

```php
$services->set(MyListener::class);
```

Your listener then needs to implement the `Symfony\Component\EventDispatcher\EventSubscriberInterface` and the
`getSubscribedEvents` method to define all events for this listener.

```php

namespace App\EventListener;

use Fusio\Impl\Event;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class MyListener implements EventSubscriberInterface
{
    public function onActionCreate(Event\Action\CreatedEvent $event): void
    {
        // @TODO execute your custom logic
    }

    public static function getSubscribedEvents(): array
    {
        return [
            Event\Action\CreatedEvent::class => 'onActionCreate',
        ];
    }
}

```
