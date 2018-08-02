<?php
	require_once('../models/user_mod.php');
	if (isset($_POST['login'], $_POST['mail'], $_POST['pwd'], $_POST['pwd2']) && !empty($_POST['login']) && !empty($_POST['mail']) && !empty($_POST['pwd']) && !empty($_POST['pwd2']))
	{
		if ($_POST['pwd'] === $_POST['pwd2'])
		{
			$login = strtolower(htmlspecialchars($_POST['login']));
			$pwd = hash("whirlpool", trim($_POST["pwd"]));
			$email = trim(htmlspecialchars($_POST['mail']));
			$user = new User();
			$ret = $user->insertUser($login, $pwd, $email);
			if ($ret == 1)
			{
				$tokunik = false;
				while ($tokunik == false)
				{
					$token = $user->newToken();
					$tokunik = $user->stockToken('t_user_active', $login, $token);
				}
				$subject = "Validez votre adresse mail";
			     $message = "
			     <html>
			      <head>
			       <title>WELCOME TO INSTALIKE</title>
			      </head>
			      <body>
			       <a href='http://localhost:8008/controllers/activate_account_co.php?token=" . $token . "'>Cliquez ici pour valider votre adresse mail</a>
			       </table>
			      </body>
			     </html>
			     ";
				$user->sendMail($email, $subject, $message);
				header('Location: /views/success_register.php');
			}
			else if ($ret == 0)
				exit(header('Location: /views/register.php?value=log_exist'));
			elseif ($ret == 2)
				exit(header('Location: /views/register.php?value=mail_exist'));
		}
		else
			header('Location: /views/register.php?value=notsame');
	}
	else {
		header('Location: /views/register.php?value=wrong');
	}
?>


