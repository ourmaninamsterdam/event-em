# event-em

Simple pub/sub library.

## Usage

### Create new instance 

```
var eventEm = new EventEm();
```

### Subscribe to an event 

``` 
eventEm.on('my-event', fn);
```

### Unsubscribe from an event

``` 
eventEm.off('my-event', fn);
```

### Publish an event

``` 
eventEm.trigger('my-event' [, data ]);
```

### Methods are chainable

``` 
eventEm
	.on('my-event', doSomething)	
	.trigger('my-event' [, callback ])
	.off('my-event', doSomething)
```

