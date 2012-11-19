jQuery-prototype-custom-event-bridge
====================================

Test it [here](http://widen.github.com/jquery-prototype-custom-event-bridge/unitTest).

Allow custom events in the format `namespace:eventname` to pass between Prototype and jQuery.

Such custom events triggered by jQuery will hit Prototype observers (as well as jQuery listeners).

Such custom events triggered by Prototype will hit jQuery listeners (as well as Prototype observers).

The first element of the data array passed along by the jQuery trigger will be sent to the Prototype observer.

The memo data object passed along by the Prototype trigger will be encoded in the first element of the event data array received by the jQuery listener.

This drop-in also prevents jQuery's trigger implementation from executing any Prototype-contributed functions on an event target element that match the jQuery event type.