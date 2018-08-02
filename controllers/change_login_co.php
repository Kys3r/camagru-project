<?php
	require_once('../models/user_mod.php');
	session_start();
	if (isset($_POST['login']) && !empty($_POST['login']))
	{
		$ret = new User();
		$ret = $ret->changeLogin(htmlspecialchars($_POST['login']));
		if ($ret == 1)
			exit(header('Location: /views/change_login.php?value=log_change'));
		else if($ret == 2)
			exit(header('Location: /views/change_login.php?value=log_exist'));
		else if ($ret == 3)
			exit(header('Location: /views/change_login.php?value=log_same'));
	}
?>