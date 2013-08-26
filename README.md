# event-em


A mediator library to assist in creating loosely-coupled apps. Influenced by work from [Romauld Quantain](http://www.soundstep.com), [Nicholas Zakas](http://www.nczonline.net), [Joe Zim](http://www.joezimjs.com) and [Addy Osmani](http://www.addyosmani.com).

## Benefits

* Creates a central listening point for app states.
* Avoids callback spaghetti and helps you create loosely-coupled apps by listening for events, rather than deeply nesting callbacks.
* Increases app modularity.

## Example usage - AJAX


``` javascript

MyApp.getPageContent = function( url ){
	ajax({
		url: url,
		method: 'get',
		success: function ( data ) {
			APP.eventEm.trigger( 'ajax-loaded', data, url );
		},
		error: function( error ){
			APP.eventEm.trigger( 'ajax-error', error);
		}
	});
};

```

In this simple example, the getPageContent function makes an AJAX request and upon return, triggers either an `ajax-loaded` or `ajax-error` event. EventEm then passes this data to any event listeners:-

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
eventEm.on('my-event', fn [, context] );

eventEm.on('app-ready', showPage , this );
```

### Subscribe once to an event 

``` 
eventEm.once('my-event', fn [, context] );
```
Event subscription is removed after triggering once.

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
	.on('my-event', fn [, context] )
	.trigger('my-event' [, data ])
	.off('my-event', fn)
```
This could be simplified using the `once` method:
``` 
eventEm
	.once('my-event', fn [, context] )
	.trigger('my-event' [, data ])
```

Pseudo channels could be created as follows:
``` 
eventEm.on('mychannel:start', fn [, context] )

eventEm.trigger('mychannel:start' [, data ])
```

## Browser support

* Tested on 
* Windows: IE7-10, Chrome 27 and Firefox 17.
* Mac: Safari 6.0.3, Chrome 27, Chrome Canary and Firefox 17.
* iOS: Mobile Safari and Chrome 27.
* Android: Android Browser 4 and Chrome Android 27.

## Future Developments

* DONE Add getLastEvent method to show the last event triggered.
* Add channels to allow easier event organisation
* To include a unique event ID to allow easy un/subscribe when using anonymous functions.
* Add timestamp for each event.


