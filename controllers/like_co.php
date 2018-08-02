<?php
	require_once("../models/post_mod.php");
	if (isset($_POST['id_post'], $_POST['login']) && !empty($_POST['id_post']) && !empty($_POST['login']))
	{
		$post = New Post();
		$id_post = htmlspecialchars($_POST['id_post']);
		$login = htmlspecialchars($_POST['login']);
		$id_login = $post->getId('login', $login, 't_user');
		$post->db_likes($id_post, $id_login);
		$ret = $post->is_liked($id_post, $id_login);
		echo $ret;
	}
?>