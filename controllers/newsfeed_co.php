<?php
	if (isset($_POST['id_post'], $_POST['login'], $_POST['message']) && !empty($_POST['id_post']) && !empty($_POST['login']) && !empty($_POST['message']))
	{
		require_once("../models/post_mod.php");
		$id_post = htmlspecialchars($_POST['id_post']);
		$login = htmlspecialchars($_POST['login']);
		$message = htmlspecialchars($_POST['message']);
		$post = New Post();
		$ret = $post->insertComment($id_post, $login, $message);
		$comment = $post->getRow('t_comment');
	}
?>
