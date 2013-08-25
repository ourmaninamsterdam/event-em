;(function(global, undefined){
	"use strict";

	function EventEm(){
		this.lastEvent = null;
		this.eventCallStack = [];
		this.events = {};
	}

	// Public API
	EventEm.prototype.on = function( event, fn, context, once ){
		fn = typeof fn === 'function' ? fn : context[fn];

		if( typeof this.events[event] === 'undefined' ){
			this.events[event] = [];
		}
		this.events[event].push({
			context : context,
			callback : fn,
			once : once || false
		});
		console.log( this.events );
		return this;
	};
	EventEm.prototype.once = function( event, fn, context, once ){
		this.on( event, fn, context, true );

		return this;
	};
	EventEm.prototype.off = function( event, fn, context ){
		this._processSubscriptions( 'remove', event, fn );

		return this;
	};
	EventEm.prototype.trigger = function(event){
		var data = Array.prototype.slice.call( arguments , 1 );
		if( this._isActualEvent( event ) ){
			this._processSubscriptions( 'trigger', event, null, data );
		}
		else{
			this._log('Event "'+ event +'" was triggered but doesn\'t have any listeners');
		}
		return this;
	};
	EventEm.prototype.getLastEvent = function(){
		return this.lastEvent;
	};
	EventEm.prototype.getEventsList = function(){
		var event, output = [];

		for( event in this.events ){
			output.push(event);
		}
		return output;
	};

	// Private API
	EventEm.prototype._processSubscriptions = function( action, event, fn, data ){
		var subscription,
			i = 0,
			events = this.events[event],
			l = events.length;
		for(; i < l; i++ ){
			subscription = events[i];

			if( action === 'remove' ){

				if( subscription.callback === fn ){
					events.splice(i, 1);
					if( !events.length ){
						delete this.events[ event ];
					}
					break;
				}
			}
			else{
				subscription.callback.apply( subscription.context, data );
			}
		}
		this.lastEvent = event;

		return this;
	};
	EventEm.prototype._isActualEvent = function( event ){
		return typeof this.events[event] !== 'undefined';
	};
	EventEm.prototype._log = function( msg ){
		try{
			console.log( msg );
		}
		catch( error ){}
	};

	global.EventEm = EventEm;

})(this, undefined);
