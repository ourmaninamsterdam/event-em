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

