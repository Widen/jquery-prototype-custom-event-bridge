/*
 * Copyright (c) 2012 Widen Enterprises
 *
 * Allow custom events in the format 'namespace:eventname' to pass between Prototype and jQuery.
 * Such custom events triggered by jQuery will hit Prototype observers (as well as jQuery listeners).
 * Such custom events triggered by Prototype will hit jQuery listeners (as well as Prototype observers).
 * The first element of the data array passed along by the jQuery trigger will be sent to the Prototype observer.
 * The memo data object passed along by the Prototype trigger will be encoded in the first element of the event
 * data array received by the jQuery listener.
 * This drop-in also prevents jQuery's trigger implementation from executing any Prototype-contributed functions on an event target element that match the jQuery event type.
 */
/*global jQuery, Element*/
(function ($) {
    var oldjQueryTrigger, oldPrototypeFire;

    oldjQueryTrigger = $.event.trigger;
    oldPrototypeFire = Element.fire;

    //trigger Prototype event handlers if jQuery fires an allowable Prototype custom event
    $.event.trigger = function(event, data, elem, onlyHandlers) {
        var oldPrototypeElementMethod, jqueryTriggerRetVal, eventName;

        if (event && typeof(event) === 'object' && event.type) {
            eventName = event.type;
        }
        else if (typeof(event) === 'string') {
            eventName = event;
        }

        if (elem && eventName && eventName.indexOf(':') > 0) {
            if ($(elem).is(document)) {
                document.fire(eventName, data ? data[0] : null);
            }
            else {
                oldPrototypeFire(elem, eventName, data ? data[0] : null, !onlyHandlers);
            }
        }
        //if Prototype has added a function to the DOM element that matches the jQuery event type, temporarily remove it so jQuery's trigger function doesn't execute it
        else if (elem && eventName) {
            if (Element.Methods[eventName]) {
                oldPrototypeElementMethod = elem[eventName];
                elem[eventName] = null;
            }
        }

        jqueryTriggerRetVal = oldjQueryTrigger(event, data, elem, onlyHandlers);

        //if we removed a Prototype function from this DOM element, add it back after jQuery's trigger function has executed
        if (oldPrototypeElementMethod) {
            elem[eventName] = oldPrototypeElementMethod;
        }

        return jqueryTriggerRetVal;
    };

    //trigger jQuery event handlers if Prototype fires a custom event
    Element.addMethods( {
        fire: function(element, eventName, memo, bubble) {
            if (eventName.indexOf(':') > 0) {
                oldjQueryTrigger(eventName, memo ? [memo] : null, element, Object.isUndefined(bubble) ? false : !bubble);
            }
            oldPrototypeFire(element, eventName, memo, bubble);
        }
    });
}(jQuery));
