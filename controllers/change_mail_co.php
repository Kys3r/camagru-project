<?php
	require_once('../models/user_mod.php');
	session_start();
	if (isset($_POST['email']) && !empty($_POST['email']))
	{
		$ret = new User();
		$email = strtolower($_POST['email']);
		$ret = $ret->changeMail(trim(htmlspecialchars($email)));
		if ($ret == 1)
			exit(header('Location: /views/change_mail.php?value=mail_change'));
		else if($ret == 2)
			exit(header('Location: /views/change_mail.php?value=mail_exist'));
		else if ($ret == 3)
			exit(header('Location: /views/change_mail.php?value=mail_same'));
	}
	else 
		exit(exit(header('Location: /views/change_mail.php?value=mail_empty')));
?>
