// --------------------------------- [SCRIPT D'AFFICHAGE] --------------------------------- \\
// gerre l'indicateur de page sur le coté

let oldPin = 'pin-1';

if (document.location.pathname != '/mobile')
	document.getElementById(oldPin).setAttribute("style", "font-size: 1.2em; color:#FFFFFF; filter: drop-shadow(0 0 3px #FFCE54);");
let scrollOk = true;
let oldScrollPosition = undefined;
let rollRepeat = 0;

function activePin(pin) {
	transition = document.getElementById("transition-page");
	document.getElementById(oldPin).setAttribute("style", "font-size: 0.8em; color:#FFFFFF91; filter: drop-shadow(0 0 0 #FFCE54); margin-left: 3px;");
	document.getElementById(pin).setAttribute("style", "font-size: 1.2em; color:#FFFFFF; filter: drop-shadow(0 0 3px #FFCE54);");
	$("#" + pin).toggleClass("fas far");
	$("#" + oldPin).toggleClass("fas far");

	if (oldPin > pin && app.showButtons) {
		transition.classList.remove("downScroll");
		transition.classList.remove("upScroll");
		transition.offsetWidth = transition.offsetWidth;
		transition.classList.add("downScroll");
	}
	else if (oldPin < pin && app.showButtons) {
		transition.classList.remove("upScroll");
		transition.classList.remove("downScroll");
		transition.offsetWidth = transition.offsetWidth
		transition.classList.add("upScroll");
	}
	if (oldPin != pin) {
		window.location = "#page-" + pin[4];
		jello = document.getElementById("page-" + pin[4]);
		jello.classList.remove("jello");
		jello.offsetWidth = jello.offsetWidth
		jello.classList.add("jello");
	}
	oldPin = pin;
}

let time = (new Date).getTime()
let actualPage = 1
let numberOfPage = 4;

// gerre la position de la page apres un refresh

function setPin() {
	var url = window.location.href;
	actualPage = url.substring(url.indexOf("#") + 6);
	if (isNaN(actualPage))
		actualPage = 1;
	if (document.location.pathname != '/mobile')
		activePin("pin-" + actualPage);
}

function showNotif(string) {
	notification = string;
	$("#success-alert").finish();
	$("#success-alert").fadeTo(2000, 50).animate({ left: "350px" }, function () {
		$("#success-alert").animate({ left: "0px" });
		$("#success-alert").hide();
	});
	app.notification = notification;
}

// scroll autorisé
$('.natural-scroll')
	.mouseover(function () {
		scrollOk = false;
	})
	.mouseout(function () {
		scrollOk = true;
	});

// module qui permet de pouvoir scrollé au travers un iframe (video)
$('.video-container')
	.click(function () {
		$(this).find('iframe').addClass('clicked');

	})
	.mouseleave(function () {
		$(this).find('iframe').removeClass('clicked');
	});

//let mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.

// active le scroll custom
$(".enableScroll").ready(function () {

	document.onkeydown = checkKey;
	function checkKey(e) {

		let pageBlock = false

		if (app.showLogPage == true || app.showSignPage || app.showParamPage || app.showReportPage)
			pageBlock = true;
		e = e || window.event;

		let newTime = (new Date).getTime();
		if (newTime - time > 250 && pageBlock == false) {
			if (e.keyCode == '38') {
				if (actualPage > 1) {
					actualPage--;
				}
			}
			else if (e.keyCode == '40') {
				if (actualPage < numberOfPage) {
					actualPage++;
				}
			}
			activePin("pin-" + actualPage);
			time = newTime;
		}
	}

	$(".enableScroll").bind('mousewheel DOMMouseScroll', function (e) {
		if ($('.news').scrollTop() == oldScrollPosition) {
			rollRepeat++;
			oldScrollPosition = undefined;
		}
		else
			oldScrollPosition = $('.news').scrollTop();
		if (rollRepeat > 5) {
			scrollOk = true;
			rollRepeat = 0;
		}
		let newTime = (new Date).getTime();
		if (newTime - time > 600 && scrollOk) {
			if (e.originalEvent.wheelDelta > 0 || e.detail < 0) {
				if (actualPage > 1) {
					actualPage--;
				}
			}
			else {
				if (actualPage < numberOfPage && scrollOk) {
					actualPage++;
				}
			}
			if (document.location.pathname != '/mobile')
				activePin("pin-" + actualPage);
			time = newTime;
		}
	});
});

