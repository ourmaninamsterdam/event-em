var EventEm;

;(function(window, undefined){
     "use strict";

     EventEm = EventEm || function(){
          
          this.lastEvent = null;
          this.eventCallStack = [];

          return {
               lastEvent : this.lastEvent,
               eventCallStack : this.eventCallStack,
               events : {},
               on : this.on,
               off : this.off,
               trigger : this.trigger,
               getEventsList : this.getEventsList,
               isActualEvent : this.isActualEvent,
               processEvents : this.processEvents
          };
     };
     EventEm.prototype.on = function(event, fn, context){
          fn = typeof fn === 'function' ? fn : context[fn];

          if(typeof this.events[event] === 'undefined'){
               this.events[event] = [];
          }
          this.events[event].push({
               context : context || this,
               callback : fn
          });
          return this;
     };
     EventEm.prototype.off = function(event, fn, context){
          this.processEvents('remove', event, fn);

          return this;
     };
     EventEm.prototype.trigger = function(event){
          var data = Array.prototype.slice.call(arguments, 1);
          if( this.isActualEvent( event ) ){
               this.processEvents('trigger', event, null, data);
          }
          else{
               console.log('Event "'+ event +'" was triggered but doesn\'t have any listeners');
          }
          return this;
     };
     EventEm.prototype.processEvents = function(action, event, fn, data){
          var subscription,
               i = 0,
               events = this.events[event],
               l = events.length;

          for(; i < l; i++ ){
               subscription = events[i];

               if(action === 'remove'){
                         if( subscription.callback === fn ){
                              events.splice(i, 1);
                              if(!events.length){
                                   delete this.events[event];
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
     EventEm.prototype.isActualEvent = function( event ){
          return typeof this.events[event] !== 'undefined';
     };
     EventEm.prototype.getlastEvent = function(){
          return this.lastEvent;
     };
     EventEm.prototype.getEventCallStack = function( event ){
          return this.eventCallStack;
     };
     EventEm.prototype.getEventsList = function(){
          var event, output = [];

          for(event in this.events){
               output.push(event);
          }
          return output;
     };

})(window, undefined);
