<?php
	if (isset($_POST['id_post'], $_POST['login_comment'], $_POST['message']) && !empty($_POST['id_post']) && !empty($_POST['login_comment']) && !empty($_POST['message']))
	{
		$id_post = htmlspecialchars($_POST['id_post']);
		$login_comment = htmlspecialchars($_POST['login_comment']);
		$message = htmlspecialchars($_POST['message']);
		require_once("../models/models.php");
		$post = New Models();
		$id_user_post = $post->selectOnce('t_post', 'user_id', 'id', $id_post);
		if ($post->selectOnce('t_user', 'notif', 'id', $id_user_post) == "1")
		{
			trim($message);
			$login_id = $post->selectOnce('t_post', 'user_id', 'id', $id_post);
			$email = $post->selectOnce('t_user', 'email', 'id', $login_id);
			$subject = "Nouveau commentaire sur un de vos post de " . $login_comment;
			$message = "Votre post numéro " . $id_post . " a été commenté par " . $login_comment . "." . " Le commentaire est: \"" . $message . "\"";
			$post->sendMail($email, $subject, $message);
		}
	}
	else
		echo "Error Sendmail";
?>