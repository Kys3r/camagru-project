<?php
	require_once('../models/user_mod.php');
	if ($_POST['mail'] && !empty($_POST['mail']))
	{
		$email = htmlspecialchars($_POST['mail']);
		$user = new User();
		$retId = $user->selectOnce('t_user', 'id', 'email', $email);
		if ($retId == false)
			header('Location: ../views/forget_pwd.php?mail=invalid');
		else 
		{
			$login = $user->selectOnce('t_user', 'login', 'id', $retId);
			$tokunik = false;
			$user->deleteOnce('t_token_pwd', 'user_id', $retId);
			while ($tokunik == false)
			{
				$token = $user->newToken();
				$tokunik = $user->stockToken('t_token_pwd', $login, $token);
			}
			$subject = "Validez votre adresse mail";
			 $message = "
			 <html>
			  <head>
			   <title>Reset password</title>
			  </head>
			  <body>
			   <a href='http://localhost:8008/views/reset_pwd.php?token=" . $token . "'>Cliquez ici pour changer pour mot de passe</a>
			   </table>
			  </body>
			 </html>
			 ";
			$user->sendMail($email, $subject, $message);
			header('Location: /views/forget_pwd.php?mail=valid');
		}
	}
	else
		header('Location: ../views/forget_pwd.php?mail=invalid');
?>