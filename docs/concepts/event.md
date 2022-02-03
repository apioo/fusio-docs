
# Event

Fusio has an internal event system which can be used to extend Fusio. This chapter explains how to use those events and
shows which events are available.

## Implementation

To register a new event listener you can use the following code at the `container.php` file:

```
use Fusio\Impl\Event\Action;
use Fusio\Impl\Event\ActionEvents;

/** @var \Symfony\Component\EventDispatcher\EventDispatcher $eventDispatcher */
$eventDispatcher = $container->get('event_dispatcher');

$eventDispatcher->addListener(ActionEvents::CREATE, function(Action\CreatedEvent $event){

    // @TODO action was created

});
```
