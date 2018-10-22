// Ajax function update data user

$(document).ready(() => {
	$("#username_setting").on("submit", function (e) {
		e.preventDefault();
		$.post("/settings_route/change_login", $(this).serialize(), function (data) {
			app.selectedError = data;
			setTimeout(function () { app.selectedError = undefined;; }, 4000);
		});
	}),
		$("#email_setting").on("submit", function (e) {
			e.preventDefault();
			$.post("/settings_route/change_email", $(this).serialize(), function (data) {
				app.selectedError = data;
				setTimeout(function () { app.selectedError = undefined;; }, 4000);
			});
		})
	$("#password_setting").on("submit", function (e) {
		e.preventDefault();
		$.post("/settings_route/change_password", $(this).serialize(), function (data) {
			app.selectedError = data;
			setTimeout(function () { app.selectedError = undefined;; }, 4000);
		});
	})
	$("#region_setting").on("submit", function (e) {
		e.preventDefault();
		$.post("/settings_route/change_region", $(this).serialize(), function (data) {
			app.selectedError = data;
			setTimeout(function () { app.selectedError = undefined;; }, 4000);
		});
	})
	$("#language_setting").on("submit", function (e) {
		e.preventDefault();
		$.post("/settings_route/change_language", $(this).serialize(), function (data) {
			app.selectedError = data;
			setTimeout(function () { app.selectedError = undefined;; }, 4000);
		});
	})
	$("#country_setting").on("submit", function (e) {
		e.preventDefault();
		$.post("/settings_route/change_country", $(this).serialize(), function (data) {
			app.selectedError = data;
			if (data == 1)
				socket.emit('update');
			setTimeout(function () { app.selectedError = undefined;; }, 4000);

		});
	})
	$("#city_setting").on("submit", function (e) {
		e.preventDefault();
		$.post("/settings_route/change_city", $(this).serialize(), function (data) {
			app.selectedError = data;
			setTimeout(function () { app.selectedError = undefined;; }, 4000);
		});
	})
	$("#platform_epic_setting").on("submit", function (e) {
		e.preventDefault();
		$.post("/settings_route/change_platform_epic", $(this).serialize(), function (data) {

			app.selectedError = data;
			socket.emit('update');
			setTimeout(function () { app.selectedError = undefined; }, 4000);
		});
	})
	$("#forget_password").on("submit", function (e) {
		e.preventDefault();
		$.post("/tokens_route/forget_password", $(this).serialize(), function (data) {
			app.selectedError = data;
			setTimeout(function () { app.selectedError = undefined; }, 4000);
		});
	})
	$("#sendback-email").on("submit", function (e) {
		e.preventDefault();
		alert(e);
		$.post("/form_route/sendback-email", $(this).serialize(), function (data) {
		});
	})
});