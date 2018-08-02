<?php require('header.php') ?>
<?php
	if (isset($_GET['value']) && $_GET['value'] == 'empty')
		echo "<div class='alert alert-danger' role='alert'>Vous devez choisir une image, capturer votre webcam et choisir une image a supperposer !</div>";
?>
<?php if (isset($_SESSION['current_loggued'])): ?>

	<div class="container-fluid">
		<div class="row">
			<div class="col col-lg-10">
				<form class="container-fluid creator" id="creator" name="creatorForm" action="../controllers/store_post_co.php" method="post" enctype="multipart/form-data">
					<div class="row">
						<div class="container center-creator col-6">
							<div class="container cont-center-creator" >
								<video class="cam-render" id="video" width="100%" height="100%" autoplay></video>
							</div>
							<div class="container button-creator align-self-center">
								<button type="button" style="height:90%;" class="btn btn-primary" id="snap" name="button" onclick="deleteCanv();">Capture !!!</button>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="container center-creator col-6">
							<div class="container cont-center-creator">
									<div class="row justify-content-center" id="user-img-principal">
										<input name="canvas" id='hidden_data' type="hidden"/>
										<input name="radio" id='hidden_radio' type="hidden"/>
									</div>
							</div>
							<div class="col align-self-right">
								<a href="#" onclick="document.getElementById('imgUser').click(); return false;"/><button type="button" class="btn btn-primary">Choisir une image !</button></a>
								<input id="imgUser"  class="input-file" type="file" name="img_file" value="Choisissez une image" accept=".png, .jpg, .jpeg">
							</div>
						</div>
					</div>
					<?php require('radio.php');?>
				</form>
			</div>
			<div class="col col-lg-2" id="old-post">
				<?php
					require_once('/var/www/html/models/post_mod.php');
					$post = New Post();
					$article = $post->getRow('t_post');
					if (isset($_SESSION['current_loggued']))
						$id_login = $post->getId('login', $_SESSION['current_loggued'], 't_user');
					foreach ($article as $key => $value) :?>
						<?php if ($article[$key]->user_id == $id_login): ?>

							<div id="post_<?php echo $key; ?>" class="container-fluid feed-creator" onclick="deletePost(<?php echo $article[$key]->id ?>, <?php echo $key; ?>);">
								<div class="container border border-primary border-bottom-0 border-top-0 frame-feed">
									<?php echo "<img class='img-feed' src='{$article[$key]->path_img}'>"?>
								</div>
							</div>

						<?php endif; ?>
					<?php endforeach; ?>
			</div>
		</div>
		
	</div>
	
	<script type="text/javascript" src="../asset/js/capture.js"></script>

<?php endif;
	if (!isset($_SESSION['current_loggued'])):?>
		<div class="container-fluid">
			<div class="row">
				<p>Vous devez être connecté pour accéder au creator !</p>
			</div>
			<div class="img-creator"></div>
			<div class="row">
				<p><a href="/views/login.php">Se connecter</a></p>
			</div>
		</div>
<?php endif; ?>

<?php require_once("../views/footer.php") ?>