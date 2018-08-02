let notifState = (login) =>
{
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/controllers/notification.php", true);
	xhttp.open("POST", "/controllers/notification.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send('login=' + login);
}