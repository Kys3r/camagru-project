<?php
	require_once('/var/www/html/models/post_mod.php');
	$post = New Post();
	$article = $post->getRow('t_post');
	$comment = $post->getRow('t_comment');
	rsort($article);

	if (isset($_SESSION['current_loggued']))
		$id_login = $post->getId('login', $_SESSION['current_loggued'], 't_user');
	foreach ($article as $key => $value) :?>

		<div class="container-fluid feed-container">
			<div class="container border border-primary border-bottom-0 border-top-0 frame-feed">
				<h3 class="h3-login" class="mt-0 login-comment-post"><?php  echo ucfirst($post->selectOnce('t_user', 'login', 'id', $article[$key]->user_id));?></h3>
				<?php echo "<img class='img-feed' src='{$article[$key]->path_img}'>"?>
				<div class="media media-content">
					<?php if (isset($_SESSION['current_loggued'])): ?>

						<button type="button" class="btn btn-primary button-like" id="like_<?php echo $article[$key]->id ?>" onclick="likeEffect(<?php echo $article[$key]->id ?>, '<?php echo $_SESSION['current_loggued'] ?>')"><p id="like-text_<?php echo $article[$key]->id ?>" class="like-text"><?php $ret = $post->is_liked($article[$key]->id, $id_login) ? "Dislike" : "Like"; echo $ret; ?></p></button>

					<?php endif; ?>
					<h5 id="nb_likes_<?php echo $article[$key]->id?>" class="nb_likes"><?php echo $post->nb_likes($article[$key]->id); ?></h4>
					<div id="body-comment_<?php echo $article[$key]->id ?>" class="media-body body-comment">
						<div class="message-post"><?php echo "<p>{$article[$key]->message}</p>"?></div>

						<?php foreach ($comment as $case => $val) :?>
								<?php if ($comment[$case]->id_post == $article[$key]->id): ?>

										<div class="media mt-3 content-commentaire">
										  	<div class="media-body">
											    <h5 class="mt-0 h5-login"><?php  echo $post->selectOnce('t_user', 'login', 'id', $comment[$case]->id_login);?></h5>
											    <div id="comment-post_<?php echo $comment[$key]->id ?>" class="comment_post"><?php  echo $comment[$case]->comment ?></div>
											</div>
										</div>

								<?php endif; ?>
							<?php endforeach; ?>

					</div>
				</div>

				<?php if (isset($_SESSION['current_loggued']) && !empty($_SESSION['current_loggued'])): ?>

					<form class="comment-user form-comment" autocomplete="off">
						<div class="input-group input-group-sm">
						  <input type="text" id="commentaire_<?php echo $article[$key]->id ?>" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
						  <button type="button" id="button-comment_<?php echo $article[$key]->id ?>" class="btn btn-outline-primary" onclick="addComment(document.getElementById('commentaire_<?php echo $article[$key]->id ?>').value, <?php echo $article[$key]->id?>, '<?php echo $_SESSION['current_loggued']?>'); removeInput(<?=$article[$key]->id?>);">Commenter</button>
						</div>
					</form>

				<?php endif; ?>

			</div>
		</div>

	<?php endforeach; ?>