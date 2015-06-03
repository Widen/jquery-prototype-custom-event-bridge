/*
 * Copyright (c) 2015 Widen Enterprises
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
        // extract the base event name, accounting for jQuery namespaced event names, such as "hide.bs.collapse", where
        // the underlying event type is actually "hide".
    var getPrototypeMethodName = function(eventName) {
            if (eventName.indexOf('.') > 0) {
                eventName = eventName.split('.')[0];
            }
            return Element.Methods[eventName] ? eventName : null;
        },
        oldPrototypeDocumentFire = document.fire,
        oldjQueryTrigger = $.event.trigger,
        oldPrototypeFire = Element.fire;

    //trigger Prototype event handlers if jQuery fires an allowable Prototype custom event
    $.event.trigger = function(event, data, elem, onlyHandlers) {
        var oldPrototypeElementMethod, jqueryTriggerRetVal, eventName, prototypeMethodName;

        if (event && typeof(event) === 'object' && event.type) {
            eventName = event.type;
        }
        else if (typeof(event) === 'string') {
            eventName = event;
        }

        if (elem && eventName && eventName.indexOf(':') > 0) {
            if ($(elem).is(document)) {
                document.fire(eventName, data ? data[0] : null, false, true);
            }
            else {
                oldPrototypeFire(elem, eventName, data ? data[0] : null, !onlyHandlers);
            }
        }
        //if Prototype has added a function to the DOM element that matches the jQuery event type, temporarily remove it so jQuery's trigger function doesn't execute it
        else if (elem && eventName) {
            // If this is a jQuery namespaced event name, we may need to extract the underlying base event type from
            // this event name to determine if Prototype has an associated method attached to the element.  jQuery
            // will otherwise do the same and invoke the method on the element, so we must prevent this from happening
            prototypeMethodName = getPrototypeMethodName(eventName);
            if (prototypeMethodName) {
                oldPrototypeElementMethod = elem[prototypeMethodName];
                elem[prototypeMethodName] = null;
            }
        }

        jqueryTriggerRetVal = oldjQueryTrigger(event, data, elem, onlyHandlers);

        //if we removed a Prototype function from this DOM element, add it back after jQuery's trigger function has executed
        if (oldPrototypeElementMethod) {
            elem[prototypeMethodName] = oldPrototypeElementMethod;
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

    Object.extend(document, {
        fire: function(eventName, memo, bubble, bridged) {
            if (eventName.indexOf(':') > 0 && !bridged) {
                oldjQueryTrigger(eventName, memo ? [memo] : null, document);
            }
            oldPrototypeFire(document, eventName, memo);
        }
    });
}(jQuery));
