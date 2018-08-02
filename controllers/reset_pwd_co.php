<?php
	require_once('../models/user_mod.php');
	session_start();
	if (isset($_POST['new_pwd'], $_POST['new_pwd2']) && !empty($_POST['new_pwd']) && !empty($_POST['new_pwd2']))
	{
		$user = new User();
		$ret = $user->resetPassword(htmlspecialchars($_POST['new_pwd']), htmlspecialchars($_POST['new_pwd2']), htmlspecialchars($_POST['token']));
		if ($ret == 1)
			exit(header('Location: /views/reset_pwd.php?value=pwd_change'));
		else if ($ret == 0)
			exit(header('Location: /views/reset_pwd.php?value=new_new2_same'));
		else if ($ret == 2)
			exit(header('Location: /views/reset_pwd.php?value=oups'));
	}
?>