$j(document).ready(function() {
	var failureClass = '.failure';
	var successClass = '.success';

	var testJpe = function() {
		$('jpe').observe('widen:jpetest', function() {
			markSuccess('jpe');
		});
		$j('#jpe').trigger('widen:jpetest');
	}

	var testJpeb = function() {
		$('jpebParent').observe('widen:jpebtest', function() {
			markSuccess('jpebParent');
		});
		$j('#jpeb').trigger('widen:jpebtest');
	}

	var testJje = function() {
		$j('#jje').bind('widen:jjetest', function() {
			markSuccess('jje');
		});
		$j('#jje').trigger('widen:jjetest');
	}

	var testJped = function() {
		$('jped').observe('widen:jpedtest', function(event) {
			if (event.memo && event.memo.foo === 'bar') {
				markSuccess('jped');
			}
		});
		$j('#jped').trigger('widen:jpedtest', [{foo : 'bar'}] );
	}

	var testJjed = function() {
		$j('#jjed').bind('widen:jjedtest', function(event, data) {
			if (data && data.foo === 'bar') {
				markSuccess('jjed');
			}
		});
		$j('#jjed').trigger('widen:jjedtest', [{foo : 'bar'}] );
	}

	var testPje = function() {
		$j('#pje').bind('widen:pjetest', function() {
			markSuccess('pje');
		});
		$('pje').fire('widen:pjetest');
	}

	var testPjeb = function() {
		$j('#pjebParent').bind('widen:pjebtest', function() {
			markSuccess('pjebParent');
		});
		$('pjeb').fire('widen:pjebtest');
	}

	var testPpe = function() {
		$('ppe').observe('widen:ppetest', function() {
			markSuccess('ppe');
		});
		$('ppe').fire('widen:ppetest');
	}

	var testPjed = function() {
		$j('#pjed').bind('widen:pjedtest', function(event, data) {
			if (data && data.foo === 'bar') {
				markSuccess('pjed');
			}
		});
		$('pjed').fire('widen:pjedtest', {foo : 'bar'});
	}

	var testPped = function() {
		$('pped').observe('widen:ppedtest', function(event) {
			if (event.memo && event.memo.foo === 'bar') {
				markSuccess('pped');
			}
		});
		$('pped').fire('widen:ppedtest', {foo : 'bar'});
	}

	var testJpd = function() {
		document.observe('widen:jpdtest', function() {
			markSuccess('jpd');
		});
		$j(document).trigger('widen:jpdtest');
	}

	var testJjd = function() {
		$j(document).bind('widen:jjdtest', function() {
			markSuccess('jjd');
		});
		$j(document).trigger('widen:jjdtest');
	}

	var testJpdd = function() {
		document.observe('widen:jpddtest', function(event) {
			if (event.memo && event.memo.foo === 'bar') {
				markSuccess('jpdd');
			}
		});
		$j(document).trigger('widen:jpddtest', [{foo : 'bar'}] );
	}

	var testJjdd = function() {
		$j(document).bind('widen:jjddtest', function(event, data) {
			if (data && data.foo === 'bar') {
				markSuccess('jjdd');
			}
		});
		$j(document).trigger('widen:jjddtest', [{foo : 'bar'}] );
	}

	var testPpd = function() {
		document.observe('widen:ppdtest', function() {
			markSuccess('ppd');
		});
		$(document).fire('widen:ppdtest');
	}

	var testPpdd = function() {
		document.observe('widen:ppddtest', function(event) {
			if (event.memo && event.memo.foo === 'bar') {
				markSuccess('ppdd');
			}
		});
		$(document).fire('widen:ppddtest', {foo : 'bar'});
	}

    var testJth = function() {
        $j(document).on('jthtest', function() {
            return "fooBar";
        });

   		var retVal = $j(document).triggerHandler('jthtest');
        if (retVal === "fooBar") {
            markSuccess('jth');
        }
   	}

	var markSuccess = function(id) {
		$j('#'+id).find(successClass).removeClass('disNone')
			.end().find(failureClass).addClass('disNone');
	}

	testJpe();
	testJpeb();
	testJje();
	testJped();
	testJjed();
	testPje();
	testPjeb();
	testPpe();
	testPjed();
	testPped();
	testJpd();
	testJjd();
	testJpdd();
	testJjdd();
	testPpd();
	testPpdd();
    testJth();

	//no support for these yet
//	testPjdd();
//	testPjd();
});
