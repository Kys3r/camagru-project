<?php require_once('header.php')?>

<?php if ($_GET['status'] == 'success'): ?>

	<div class="alert alert-success">
		<p>Votre e-mail a bien été validé !</p>
		<a class="return-button" href="login.php"><button type="button" class="btn btn-primary" name="button">Se connecter ?</button></a>
	</div>

<?php endif; ?>
<?php if ($_GET['status'] == 'error'): ?>

	<div class="alert alert-danger">
		<p>Ce lien n'est pas valide !</p>
		<a class="return-button" href="/"><button type="button" class="btn btn-primary" name="button">Retourner a l'accueil</button></a>
	</div>

<?php endif; ?>

<?php require_once("../views/footer.php") ?>