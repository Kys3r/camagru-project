<?php
	session_start();
	unset($_SESSION['current_loggued']);
	exit(header('Location: /views/disconnect.php'));
?>