/*
 * Copyright (c) 2012 Widen Enterprises
 *
 * Allow custom events in the format 'namespace:eventname' to pass between Prototype and jQuery.
 * Such custom events triggered by jQuery will hit Prototype observers (as well as jQuery listeners).
 * Such custom events triggered by Prototype will hit jQuery listeners (as well as Prototype observers).
 * The first element of the data array passed along by the jQuery trigger will be sent to the Prototype observer.
 * The memo data object passed along by the Prototype trigger will be encoded in the first element of the event
 * data array received by the jQuery listener.
 */
/*global jQuery, Element*/
(function ($) {
    var oldjQueryTrigger, oldPrototypeFire;

	oldjQueryTrigger = $.event.trigger;
	oldPrototypeFire = Element.fire;

	//trigger Prototype event handlers if jQuery fires an allowable Prototype custom event
	$.event.trigger = function(event, data, elem, onlyHandlers) {
		var oldPrototypeElementMethod, jqueryTriggerRetVal;

		if (elem && event && typeof(event) === 'string' && event.indexOf(':') > 0) {
			if ($(elem).is(document)) {
				document.fire(event, data ? data[0] : null);
			}
			else {
				oldPrototypeFire(elem, event, data ? data[0] : null, !onlyHandlers);
			}
		}
		//if Prototype has added a function to the DOM element that matches the jQuery event type, temporarily remove it so jQuery's trigger function doesn't execute it
		else if (elem && event) {
            if (typeof(event) === 'object' && event.type) {
                if (Element.Methods[event.type]) {
                    oldPrototypeElementMethod = elem[event.type];
                    elem[event.type] = null;
                }
            }
            else if (typeof(event) === 'string') {
                if (Element.Methods[event]) {
                    oldPrototypeElementMethod = elem[event];
                    elem[event] = null;
                }
            }
		}

		jqueryTriggerRetVal = oldjQueryTrigger(event, data, elem, onlyHandlers);

		//if we removed a Prototype function from this DOM element, add it back after jQuery's trigger function has executed
		if (oldPrototypeElementMethod) {
			if (typeof(event) === 'string') {
                elem[event] = oldPrototypeElementMethod;
            }
            else {
                elem[event.type] = oldPrototypeElementMethod;
            }
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
