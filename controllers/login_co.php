<?php
	require_once('../models/user_mod.php');
	session_start();
	if (isset($_POST['login'], $_POST['pwd']) && !empty($_POST['login']) && !empty($_POST['pwd']))
	{
		$login = htmlspecialchars($_POST['login']);
		$pwd = htmlspecialchars($_POST['pwd']);
		$pwd = hash('whirlpool', $pwd);
		$ret_connect = new User();
		$ret_connect = $ret_connect->connectUser($login, $pwd);
		if ($ret_connect == 1)
			header('Location: /index.php');
		elseif ($ret_connect == 0)
			exit(header('Location: /views/login.php?value=log_error'));
		elseif ($ret_connect == 2)
			exit(header('Location: /views/login.php?value=pw_error'));
		elseif ($ret_connect == 4)
			exit(header('Location: /views/login.php?value=mail_validate'));
	}
	else
		exit(header('Location: /views/login.php?value=empty'));
?>