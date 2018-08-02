<?php

	if (isset($_POST['login_id']) && !empty($_POST['login_id']))
	{
		require_once('../models/admin_mod.php');
		$admin = new Admin();
		$id_login = htmlspecialchars($_POST['login_id']);
		$login = $admin->selectOnce('t_user', 'login', 'id', $id_login);
		if (isset($_POST['new_login']) && !empty($_POST['new_login']))
		{
			$new_login = strtolower(htmlspecialchars($_POST['new_login']));
			trim($new_login);
			$ret = $admin->if_exist('t_user', 'login', $new_login);
			if($ret == 0)
			{
				$admin->updateUser('t_user', 'login', $new_login, 'login', $login);
				header('Location: ../views/modify_users.php?value=login');
			}
			else
				header('Location: ../views/modify_users.php?value=loginExist');
		}
		else if (isset($_POST['new_pwd']) && !empty($_POST['new_pwd']))
		{
			$new_pwd = htmlspecialchars($_POST['new_pwd']);
			trim($new_pwd);
			$new_pwd = hash('whirlpool', $new_pwd);
			$ret = $admin->updateUser('t_user', 'password', $new_pwd, 'login', $login);
			header('Location: ../views/modify_users.php?value=pwd');
		}
		else if (isset($_POST['new_mail']) && !empty($_POST['new_mail']))
		{
			$new_mail = strtolower(htmlspecialchars($_POST['new_mail']));
			$ret = $admin->if_exist('t_user', 'email', $new_mail);
			if ($ret == 0)
			{
				$admin->updateUser('t_user', 'email', $new_email, 'login', $login);
				header('Location: ../views/modify_users.php?value=mail');
			}
			else
				header('Location: ../views/modify_users.php?value=mailExist');
		}
		else if (isset($_POST['is_admin']) && !empty($_POST['is_admin']))
		{
			$is_admin = htmlspecialchars($_POST['is_admin']);
			$ret = $admin->updateUser('t_user', 'is_admin', $is_admin, 'login', $login);
			header('Location: ../views/modify_users.php?value=isadmin');
		}
		else if (isset($_POST['notified']) && ($_POST['notified'] == 0 || $_POST['notified'] == 1))
		{
			$notified = htmlspecialchars($_POST['notified']);
			$ret = $admin->updateUser('t_user', 'notif', $notified, 'login', $login);
			header('Location: ../views/modify_users.php?value=notified');
		}
		else
			header('Location: ../views/modify_users.php?value=empty');
	}

?>