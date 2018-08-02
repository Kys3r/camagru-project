<?php
	/**
	 * 
	 */
	require_once('models.php');
	class User extends Models
	{
		
// Stock token in t_active_user

		public function stockToken($table, $login, $token)
		{
			$login_id = $this->getID('login', $login, 't_user');
			if ($this->selectOnce($table, 'user_id', 'token', $token) == false)
			{
				$exec = $this->connect->prepare("INSERT INTO $table (user_id, token) VALUES (?, ?)");
				$exec->execute([$login_id, $token]);
				return (true);
			}
			else
				return (false);
		}


// Active user account

		public function activeUser($token)
		{
			if($id_user = $this->selectOnce('t_user_active', 'user_id', 'token', $token))
			{
				$user = $this->connect->prepare("UPDATE `t_user` SET is_active=1 WHERE id=?");
				$user->execute([$id_user]);
				return (true);
			}
			else
				return (false);
		}


// Insert a new User

		public function insertUser($login, $pwd, $mail)
		{
			$login = strtolower(trim($login));
			try
			{
				$verif_log = $this->selectOnce('t_user', 'login', 'login', $login);
				$verif_mail = $this->selectOnce('t_user', 'email', 'email', $mail);
				if ($verif_log != false)
					return (0);
				elseif ($verif_mail != false)
					return (2);
				$insert = $this->connect->prepare("INSERT INTO t_user (login, password, email) VALUES (?, ?, ?)");
				$insert->execute([$login, $pwd, $mail]);
				return (1);
			}
			catch (PDOException $e)
			{
				echo "Erreur lors de l'insertion de l'utilisateur : " . $e->getMessage();
			}
		}


// Modify an user in db
		
		public function modify_user($table, $arg1, $arg2, $target, $session, $type)
		{
			if ($this->selectOnce($table, $arg1, $arg2, $target) != $target)
			{
				$update = $this->connect->prepare("UPDATE $table SET $arg1 = ? WHERE $arg2 = ?");
				$update->execute([$target, $session]);
				if ($update->rowCount() > 0)
				{
					if ($type === 'log')
						$_SESSION['current_loggued'] = $target;
					else if ($type === 'mail')
						$_SESSION['current_email'] = $target;
					return (1);
				}
				else
					return (2);
			}
			else
				return (2);
		}


// Check if account mail is validate

		public function valide_account($login)
		{
			return ($this->selectOnce('t_user', 'is_active', 'login', $login));
		}


// Connect User

		public function connectUser($login, $pwd)
		{
			$log = $this->selectOnce('t_user', 'login', 'login', $login);
			if ($log != false)
			{
				$pw = $this->selectOnce('t_user', 'password', 'login', $login);
				if ($pw == $pwd)
				{
					if ($this->valide_account($login) == 0)
						return (4); //if email is not validate	
					$mail = $this->selectOnce('t_user', 'email', 'login', $login);
					$_SESSION['current_loggued'] = $login;
					$_SESSION['current_email'] = $mail;
					return (1); //if session connect
				}
				else
					return (2); //if password is different
			}
			else
				return (0); //if login is different
		}


// Change login User

		public function changeLogin($login)
		{
			if ($login == $_SESSION['current_loggued'])
				return (3);
			return ($this->modify_user('t_user', 'login', 'login', $login, $_SESSION['current_loggued'], 'log'));
		}


// Change mail User

		public function changeMail($email)
		{
			$mail_db = $this->selectOnce('t_user', 'email', 'login', $_SESSION['current_loggued']);
			if ($mail_db == $email)
				return (3);
			return ($this->modify_user('t_user', 'email', 'email', $email, $_SESSION['current_email'], 'mail'));
		}


// Change password User

		public function changePassword($old, $new1, $new2)
		{
			if ($new1 !== $new2)
				return (4);
			else if ($old === $new1)
				return (3);
			$new_pw = hash('whirlpool', trim($new1));
			if(hash('whirlpool', $old) == $this->selectOnce('t_user', 'password', 'login', $_SESSION['current_loggued']))
			{
				if ($old != $new_pw)
					return ($this->modify_user('t_user', 'password', 'login', $new_pw, $_SESSION['current_loggued'], ''));
				else
					return (3);
			}
			else
				return (2);
		}


// Reset User Password

		public function resetPassword($new1, $new2, $token)
		{
			if ($new1 !== $new2)
				return (0);
			$new_pw = hash('whirlpool', trim($new1));			
			$user_id = $this->selectOnce('t_token_pwd', 'user_id', 'token', $token);
			$ret = $this->updateOnce('t_user', 'password', $new_pw, 'id', $user_id);
			if ($ret)
				return (1);
			else
				return (2);
		}


// return if is admin or no

		public function isAdmin($login)
		{
			return($this->selectOnce('t_user', 'is_admin', 'login', $login));
		}
	}
?>















