<?php
	if (isset($_POST['id_post']) && !empty($_POST['id_post']))
	{
		require_once('../models/models.php');
		$post = New Models();
		$id_post = htmlspecialchars($_POST['id_post']);
		$article = $post->deleteOnce('t_post', 'id', $id_post);
		$like = $post->deleteOnce('t_like', 'id_post', $id_post);
		$comment = $post->deleteOnce('t_comment', 'id_post', $id_post);
		if ($article && $like && $comment)
			echo 1;
		else
			echo 0;
	}
?>