var receivedEvent = function() {
    ok(true, "received event")
};

test("jQuery triggered event with a Prototype observer (element)", 2, function() {
    $('fixtureChild').observe('widen:event', function() {
  			receivedEvent();
  		});
    $j('#fixtureChild').trigger('widen:event');
    $j('#fixtureChild').trigger($j.Event('widen:event'));
});

test("jQuery triggered event with a Prototype observer on parent (element)", 2, function() {
    $('fixtureChild').observe('widen:event', function() {
        receivedEvent();
   	});
   	$j('#fixtureChildChild').trigger('widen:event');
    $j('#fixtureChild').trigger($j.Event('widen:event'));
});

test("jQuery triggered event with a jQuery observer (element)", 2, function() {
    $j('#fixtureChild').bind('widen:event', function() {
   		receivedEvent();
   	});
   	$j('#fixtureChild').trigger('widen:event');
    $j('#fixtureChild').trigger($j.Event('widen:event'));
});
test("jQuery triggered event, including data, with a Prototype observer (element)", 2, function() {
	$('fixtureChild').observe('widen:event', function(event) {
		if (event.memo && event.memo.foo === 'bar') {
			receivedEvent();
		}
	});
	$j('#fixtureChild').trigger($j.Event('widen:event'), [{foo : 'bar'}] );
    $j('#fixtureChild').trigger($j.Event('widen:event'), [{foo : 'bar'}] );
});
test("jQuery triggered event, including data, with a jQuery observer (element)", 2, function() {
	$j('#fixtureChild').bind('widen:event', function(event, data) {
		if (data && data.foo === 'bar') {
			receivedEvent();
		}
	});
	$j('#fixtureChild').trigger('widen:event', [{foo : 'bar'}] );
    $j('#fixtureChild').trigger($j.Event('widen:event'), [{foo : 'bar'}] );
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
test("jQuery triggered event with a Prototype observer (document)", 2, function() {
	$(document).observe('widen:event', function() {
		receivedEvent();
	});
	$j(document).trigger('widen:event');
    $j(document).trigger($j.Event('widen:event'));
    $(document).stopObserving('widen:event');
});
test("jQuery triggered event with a jQuery observer (document)", 2, function() {
	$j(document).bind('widen:event', function() {
		receivedEvent();
	});
	$j(document).trigger('widen:event');
    $j(document).trigger($j.Event('widen:event'));
    $j(document).unbind('widen:event');
});
test("jQuery triggered event, including data, with a Prototype observer (document)", 2, function() {
	$(document).observe('widen:event', function(event) {
		if (event.memo && event.memo.foo === 'bar') {
			receivedEvent();
		}
	});
	$j(document).trigger('widen:event', [{foo : 'bar'}] );
    $j(document).trigger($j.Event('widen:event'), [{foo : 'bar'}] );
    $(document).stopObserving('widen:event');
});
test("jQuery triggered event, including data, with a jQuery observer (document)", 2, function() {
	$j(document).bind('widen:event', function(event, data) {
		if (data && data.foo === 'bar') {
			receivedEvent();
		}
	});
    $j(document).trigger('widen:event', [{foo : 'bar'}] );
    $j(document).trigger($j.Event('widen:event'), [{foo : 'bar'}] );
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
test("Prototype triggered event with a jQuery observer (document)", 1, function() {
	$j(document).bind('widen:event', function() {
		receivedEvent();
	});
	$(document).fire('widen:event');
	$j(document).unbind('widen:event');
});
test("Prototype triggered event, including data, with a jQuery observer (document)", 1, function() {
	$j(document).bind('widen:event', function(event, data) {
		if (data && data.foo === 'bar') {
			receivedEvent();
		}
	});
	$(document).fire('widen:event', {foo : 'bar'} );
	$j(document).unbind('widen:event');
});
test("jQuery triggerHandler - ensure return value is not lost", function() {
    $j('#fixtureChild').on('widenevent', function() {
       return "fooBar";
    });

    $j('#fixtureChild').on('widenevent2', function() {
       return "fooBar";
    });

    var retVal = $j('#fixtureChild').triggerHandler('widenevent');
    equal(retVal, 'fooBar', "received correct return value");

    var retVal2 = $j('#fixtureChild').triggerHandler($j.Event('widenevent2'));
    equal(retVal2, 'fooBar', "received correct return value");
});
test("Prevent jQuery trigger from executing matching functions on event target contributed by Prototype - String event", 1, function() {
    var mockedHideFunction = function() {
        ok(true, "mocked hide function executed");
    };
    $('fixtureChild').hide = mockedHideFunction;

    $j('#fixtureChild').trigger('hide');
    $('fixtureChild').hide();
});
test("Prevent jQuery trigger from executing matching functions on event target contributed by Prototype - jQuery event", 1, function() {
    var mockedHideFunction = function() {
        ok(true, "mocked hide function executed");
    };
    $('fixtureChild').hide = mockedHideFunction;

    $j('#fixtureChild').trigger($j.Event('hide'));
    $('fixtureChild').hide();
});
test("Prevent jQuery trigger from executing matching functions on event target contributed by Prototype - jQuery w/ a jQuery namespaced event", 1, function() {
    var mockedHideFunction = function() {
        ok(true, "mocked hide function executed");
    };
    $('fixtureChild').hide = mockedHideFunction;

    $j('#fixtureChild').trigger($j.Event('hide.foo.bar'));
    $('fixtureChild').hide();
});
