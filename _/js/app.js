var app = window.app || {};

app = (function () {
	var method = {boot: function () {app.Harness.boot();}};
	var api    = {boot: function () {method.boot();}};
	return api;
}());

app.Harness = (function () {
	var method = {
		boot: function () {//boot all the things!
			app.Analytics.boot();
			app.Module.boot();
		}
	};
	var api = {boot: method.boot};
	return api;
}());

app.Module = (function () {
	var property = {
		links: []
	};
	var method = {
		boot: function () {

			$('#nav').find('a').click(function(e){
				var destination = $(this).attr('href').substring(1);
				var localOffset = $('#' + destination).offset();
				$('body').stop().animate({scrollTop: localOffset.top - $('#top').outerHeight() + 1}, 1000, function(){
					app.Dev.log('we should be there...');
				});
				e.preventDefault();
			});

			$('h1').click(function () {
				$('body').stop().animate({scrollTop: 0}, 1000, function(){
					app.Dev.log('we should be there...');
				});
			});

/*
			$('#rsvp-button').click(function () {

				$.post('http://formmail.dreamhost.com/cgi-bin/formmail.cgi', function(data) {
					app.Dev.log('response data: ' + data);
				});
				return false;


			});
*/

/*
			$('#nav').find('a').each(function (i) {
				property.links.push($(this).prop('href'));
			});

			app.Dev.log(property.links);

			var length = property.links.length;
			var newNav = '<select id="newNav"><option selected>explore...</option>';
			var i;

			for (i = 0; i < length; i++) {
				newNav += '<option value="' + property.links[i] + '">';
				newNav += property.links[i].slice(property.links[i].indexOf('#') + 1,property.links[i].length);
				newNav += '</option>';
			}

			newNav += '</select>';

			app.Dev.log(newNav);

			$('#top').find('.column').append(newNav);



			$('#newNav').change(function (j,k) {

				$(this).find(':selected').each(function () {

					var destination = $(this).text();
					var localOffset = $('#' + destination).offset();
					$('body').stop().animate({scrollTop: localOffset.top - $('#top').outerHeight() + 1}, 1000, function(){
						app.Dev.log('we should be there...');
					});

				});

			});
			*/



			//if mobile
			//$('#ceremony-map').remove();

			//method.helloWorld();
			//method.getLocation();
		},
		helloWorld: function () {
			app.Dev.log('hello world!');
		},
		getLocation: function () {
			navigator.geolocation.getCurrentPosition(function (position) {method.setLocation(position);});
		},
		setLocation: function (position) {
			property.locale.lat = position.coords.latitude;
			property.locale.lon = position.coords.longitude;
			app.Dev.log('you seem to be here: ', property.locale);
		}
	};
	var api = {
		boot: method.boot
	};
	return api;
}());

app.Analytics = (function () {
	var property = {
		account: 'XXXXXXXX-X'
	};
	var method = {
		boot: function () {
			app.Dev.log('GA code here');
			//set glocal array for GA with account number
			//load ga via yepnope
		}
	};
	var api = {boot: function () {method.boot();}};
	return api;
}());

app.Dev = (function () {
	var property = {
		debugMode: true,
		label: null
	};
	var method = {
		consoleLog: function (message, thing) {
			if (property.debugMode && typeof (console) !== 'undefined') {
				if (thing) {
					console.log(message, thing);
				} else {
					console.log(message);
				}
			}
		},
		consoleGroup: function (label) {
			if (property.debugMode && typeof (console) !== 'undefined' && console.groupCollapsed) {
				console.groupCollapsed(label);
			}
		},
		consoleGroupEnd: function () {
			if (property.debugMode && typeof (console) !== 'undefined' && console.groupEnd) {
				console.groupEnd();
			}
		},
		time: function (label) {
			if (property.debugMode && typeof (console) !== 'undefined' && console.time) {
				property.label = label;
				console.time(label);
			}
		},
		timeEnd: function () {
			if (property.debugMode && typeof (console) !== 'undefined' && console.timeEnd) {
				console.timeEnd(property.label);
				property.label = null;
			}
		}
	};
	var api = {
		log: method.consoleLog,
		logGroupStart: method.consoleGroup,
		logGroupEnd: method.consoleGroupEnd
	};
	return api;
}());