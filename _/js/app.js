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
				$('body, html').stop().animate({scrollTop: localOffset.top - $('#top').outerHeight() + 1}, 1000, function(){
					app.Dev.log('we should be there...');
				});
				e.preventDefault();
			});

			$('h1').click(function () {
				$('body, html').stop().animate({scrollTop: 0}, 1000, function(){
					app.Dev.log('we should be there...');
				});
			});


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

/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT / GPLv2 License.*/(function(a){function m(){d.setAttribute("content",g),h=!0}function n(){d.setAttribute("content",f),h=!1}function o(b){l=b.accelerationIncludingGravity,i=Math.abs(l.x),j=Math.abs(l.y),k=Math.abs(l.z),(!a.orientation||a.orientation===180)&&(i>7||(k>6&&j<8||k<8&&j>6)&&i>5)?h&&n():h||m()}var b=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(b)&&b.indexOf("AppleWebKit")>-1))return;var c=a.document;if(!c.querySelector)return;var d=c.querySelector("meta[name=viewport]"),e=d&&d.getAttribute("content"),f=e+",maximum-scale=1",g=e+",maximum-scale=10",h=!0,i,j,k,l;if(!d)return;a.addEventListener("orientationchange",m,!1),a.addEventListener("devicemotion",o,!1)})(this);
