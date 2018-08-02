<?php
	if (isset($_POST['login']) && !empty($_POST['login']))
	{
		$login = htmlspecialchars($_POST['login']);
		require_once('../models/user_mod.php');
		$user = New User();
		$ret = $user->selectOnce('t_user', 'notif', 'login', $login);
		if ($ret == 1)
		{
			$user->updateOnce('t_user', 'notif', 0, 'login', $login);
			echo "0";
		}
		else
		{
			$user->updateOnce('t_user', 'notif', 1, 'login', $login);
			echo "1";
		}
	}
?>