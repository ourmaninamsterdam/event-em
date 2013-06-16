# event-em

A simple mediator library to assist in creating loosely-couple apps. Influenced by work by [Nicholas Zakas](http://www.nczonline.net), [Joe Zim](http://www.joezimjs.com) and [Addy Osmani](http://www.addyosmani.com).

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
Supports multiple parameters.

### Methods are chainable

``` 
eventEm
	.on('my-event', fn)	
	.trigger('my-event' [, data ])
	.off('my-event', fn)
```

## Example usage - AJAX

Below the getPageContent function is executed, making an AJAX request. Rather than including a callback to a specific function, thus coupling two functions together, an event is triggered informing any listeners for that event that it has some information. In this example, it is triggering the `ajax-loaded` and `ajax-error` events. 

``` javascript

MyApp.getPageContent = function( url ){
	ajax({
		url: url,
		method: 'get',
		success: function ( data ) {
			APP.eventEm.trigger( 'ajax-loaded', url, data );
		},
		error: function( error ){
			APP.eventEm.trigger( 'ajax-error', error);
		}
	});
};

```



