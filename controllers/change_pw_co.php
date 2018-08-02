<?php
	require_once('../models/user_mod.php');
	session_start();
	if (isset($_POST['old_pwd'], $_POST['new_pwd'], $_POST['new_pwd2']) && !empty($_POST['old_pwd']) && !empty($_POST['new_pwd']) && !empty($_POST['new_pwd2']))
	{
		$ret = new User();
		$ret = $ret->changePassword(htmlspecialchars($_POST['old_pwd']), htmlspecialchars($_POST['new_pwd']), htmlspecialchars($_POST['new_pwd2']), true);
		if ($ret == 1)
			exit(header('Location: /views/change_pwd.php?value=pwd_change'));
		else if($ret == 2)
			exit(header('Location: /views/change_pwd.php?value=wrong_old'));
		else if ($ret == 3)
			exit(header('Location: /views/change_pwd.php?value=old_new_same'));
		else if ($ret == 4)
			exit(header('Location: /views/change_pwd.php?value=new_new2_diff'));
	}
?>
