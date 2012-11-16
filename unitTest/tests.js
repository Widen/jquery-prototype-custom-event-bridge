var receivedEvent = function() {
    ok(true, "received event")
};

test("jQuery triggered event with a Prototype observer (element)", 1, function() {
    $('fixtureChild').observe('widen:event', function() {
  			receivedEvent();
  		});
    $j('#fixtureChild').trigger('widen:event');
});

test("jQuery triggered event with a Prototype observer on parent (element)", 1, function() {
    $('fixtureChild').observe('widen:event', function() {
        receivedEvent();
   	});
   	$j('#fixtureChildChild').trigger('widen:event');
});

test("jQuery triggered event with a jQuery observer (element)", 1, function() {
    $j('#fixtureChild').bind('widen:event', function() {
   		receivedEvent();
   	});
   	$j('#fixtureChild').trigger('widen:event');
});
test("jQuery triggered event, including data, with a Prototype observer (element)", 1, function() {
	$('fixtureChild').observe('widen:event', function(event) {
		if (event.memo && event.memo.foo === 'bar') {
			receivedEvent();
		}
	});
	$j('#fixtureChild').trigger('widen:event', [{foo : 'bar'}] );
});
test("jQuery triggered event, including data, with a jQuery observer (element)", 1, function() {
	$j('#fixtureChild').bind('widen:event', function(event, data) {
		if (data && data.foo === 'bar') {
			receivedEvent();
		}
	});
	$j('#fixtureChild').trigger('widen:event', [{foo : 'bar'}] );
});
test("Prototype fired event with a jQuery listener (element)", 1, function() {
	$j('#fixtureChild').bind('widen:event', function() {
		receivedEvent();
	});
	$('fixtureChild').fire('widen:event');
});
test("Prototype fired event with a jQuery listener on parent (element)", 1, function() {
	$j('#fixtureChild').bind('widen:event', function() {
		receivedEvent();
	});
	$('fixtureChildChild').fire('widen:event');
});
test("Prototype fired event with a Prototype listener (element)", 1, function() {
	$('fixtureChild').observe('widen:event', function() {
		receivedEvent();
	});
	$('fixtureChild').fire('widen:event');
});
test("Prototype fired event, including data, with a jQuery listener (element)", 1, function() {
	$j('#fixtureChild').bind('widen:event', function(event, data) {
		if (data && data.foo === 'bar') {
			receivedEvent();
		}
	});
	$('fixtureChild').fire('widen:event', {foo : 'bar'});
});
test("Prototype fired event, including data, with a Prototype listener (element)", 1, function() {
	$('fixtureChild').observe('widen:event', function(event) {
		if (event.memo && event.memo.foo === 'bar') {
			receivedEvent();
		}
	});
	$('fixtureChild').fire('widen:event', {foo : 'bar'});
});
test("jQuery triggered event with a Prototype observer (document)", 1, function() {
	$(document).observe('widen:event', function() {
		receivedEvent();
	});
	$j(document).trigger('widen:event');
    $(document).stopObserving('widen:event');
});
test("jQuery triggered event with a jQuery observer (document)", 1, function() {
	$j(document).bind('widen:event', function() {
		receivedEvent();
	});
	$j(document).trigger('widen:event');
    $j(document).unbind('widen:event');
});
test("jQuery triggered event, including data, with a Prototype observer (document)", 1, function() {
	$(document).observe('widen:event', function(event) {
		if (event.memo && event.memo.foo === 'bar') {
			receivedEvent();
		}
	});
	$j(document).trigger('widen:event', [{foo : 'bar'}] );
    $(document).stopObserving('widen:event');
});
test("jQuery triggered event, including data, with a jQuery observer (document)", 1, function() {
	$j(document).bind('widen:event', function(event, data) {
		if (data && data.foo === 'bar') {
			receivedEvent();
		}
	});
	$j(document).trigger('widen:event', [{foo : 'bar'}] );
    $j(document).unbind('widen:event');
});
test("Prototype fired event with a Prototype listener (document):", 1, function() {
	$(document).observe('widen:event', function() {
		receivedEvent();
	});
	$(document).fire('widen:event');
    $(document).stopObserving('widen:event');
});
test("Prototype fired event, including data, with a Prototype listener (document)", 1, function() {
	$(document).observe('widen:event', function(event) {
		if (event.memo && event.memo.foo === 'bar') {
			receivedEvent();
		}
	});
	$(document).fire('widen:event', {foo : 'bar'});
    $(document).stopObserving('widen:event');
});
test("jQuery triggerHandler - ensure return value is not lost", 1, function() {
    $j('#fixtureChild').on('widenevent', function() {
       return "fooBar";
    });

    var retVal = $j('#fixtureChild').triggerHandler('widenevent');
    equal(retVal, 'fooBar', "received correct return value");
});
