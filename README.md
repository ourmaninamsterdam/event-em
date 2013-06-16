# event-em

A simple mediator library to assist in creating loosely-coupled apps. Influenced by work from [Nicholas Zakas](http://www.nczonline.net), [Joe Zim](http://www.joezimjs.com) and [Addy Osmani](http://www.addyosmani.com).

## Features

* Creates a central listening point for app states.
* Avoid callback spaghetti and create loosely-coupled apps by listening for events, rather than passing callbacks.
* Assists in creating ignorant, modular functions.

## Example usage - AJAX


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

In this simple example, the getPageContent function makes an AJAX request and returns either an `ajax-loaded` or `ajax-error` event. When EventEm receives the event, it looks for listeners, executes the callback, passing across any data:-

``` javascript

function displayContent( html ){
	document.querySelector('#content-main').innerHTML = html;
}
eventEm.on('ajax-loaded' , displayContent );

function displayError( error ){
	alert( error );
}
eventEm.on('ajax-error', displayError );
```


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

## Browser support

* Tested on 
	* Windows: IE7-10, Chrome 27 and Firefox 17.
	* Mac: Safari 6.0.3, Chrome 27, Chrome Canary and Firefox 17.
	* iOS: Mobile Safari and Chrome (Latest).
	* Android: Android Browser 4 and Chrome Android (Latest).

## Future Developments

* To include a unique ID for events to allow easy un/subscribe when using anonymous functions.
* Add getLastEvent method to show the last event triggered.
* Add getCallStack method to show all events listeners.
* Add timestamp for each event.


