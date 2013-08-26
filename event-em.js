;(function( root, undefined ){
	"use strict";

	function EventEm(){
		this.events = {};
		this.lastEvent = null;
	}

	// Public API
	EventEm.prototype.on = function( event, fn, context, once ){
		if( typeof this.events[event] === 'undefined' ){
			this.events[event] = [];
			this._addSubscription( event, fn, context, once );
		}
		else{
			this._processSubscriptions( 'add', event, fn, context, once );
		}
		return this;
	};
	EventEm.prototype.once = function( event, fn, context, once ){
		this.on( event, fn, context, true );

		return this;
	};
	EventEm.prototype.off = function( event, fn ){
		this._processSubscriptions( 'remove', event, fn );

		return this;
	};
	EventEm.prototype.trigger = function( event, data ){
		data = Array.prototype.slice.call( arguments , 1 );
		if( this._isActualEvent( event ) ){
			this._processSubscriptions( 'trigger', event, null, null, null, data );
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
	EventEm.prototype._processSubscriptions = function( action, event, fn, context, once, data ){
		var i,
			len,
			subscription,
			subscriptions = this.events[event];

		len = subscriptions.length;

		for( i = 0; i < len; i++ ){
			subscription = subscriptions[i];

			switch( action ){
				case 'add':
					if( subscription.callback !== fn ){
						this._addSubscription( event, fn, context, once );
					}
					break;

				case 'remove':
					this._removeSubscription( event, subscriptions, i );
					break;

				case 'trigger':
					this._triggerSubscription( subscription, data );

					if( subscription.once ){
						this._removeSubscription( event, subscriptions, i );
					}
					break;

			}
		}
		this.lastEvent = event;
		
		return this;
	};

	EventEm.prototype._addSubscription = function( event, fn, context, once ){
		fn = typeof fn === 'function' ? fn : context[fn];

		this.events[event].push({
			callback : fn,
			context : context || this,
			once : once || false
		});
	};
	EventEm.prototype._removeSubscription = function( event, subscriptions, subscriptionIndex ){
		subscriptions.splice( subscriptionIndex, 1 );

		if( !subscriptions.length ){
			delete this.events[ event ];
		}
	};
	EventEm.prototype._triggerSubscription = function( subscription, data ){
		subscription.callback.apply( subscription.context, data );
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

	root.EventEm = EventEm;

})( this, undefined );
