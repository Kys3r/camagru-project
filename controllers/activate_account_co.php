<?php
	require_once('../models/user_mod.php');
	if (isset($_GET['token']) && !empty($_GET['token']))
	{
		$token = htmlspecialchars($_GET['token']);
		$user = new User();

		if($user->activeUser($token) == true)
		{
			echo "TA MERE EST BIEN DANS LE IF\n";
			header('Location: ../views/activate_account.php?status=success');
		}
		else
			header('Location: ../views/activate_account.php?status=error');
	}
?>