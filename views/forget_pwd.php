<?php require_once("header.php") ?>

<?php if (!isset($_GET['mail']) || (isset($_GET['mail']) && $_GET['mail'] == 'invalid')): ?>

	<form action="../controllers/forget_pwd_co.php" method="post" autocomplete="on">
		<div class="form-group col-md-3">
			<label>Renseignez votre adresse E-mail</label>
			<input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" class="form-control" name="mail" aria-describedby="emailHelp" placeholder="E-mail">
		</div>

		<?php if (isset($_GET['mail']) && $_GET['mail'] == 'invalid'):?>

			<div class="row alert alert-danger">
				<p>Adresse email invalide !</p>
			</div>

		<?php endif; ?>

		<button type="submit" class="btn btn-primary">Envoyer</button>
	</form>

<?php endif; ?>

<?php
	if (isset($_GET['mail']) && $_GET['mail'] == 'valid')
		echo "<div class='alert alert-info'>Un email vient de vous être envoyé !</div>";
?>
		
<?php require_once("../views/footer.php") ?>