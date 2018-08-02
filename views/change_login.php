<?php require_once("../views/header.php") ?>

<form action="../controllers/change_login_co.php" method="post" autocomplete="on">
	<div class="form-group col-md-3">
		<label>Entrez votre nouveau login</label>
		<input type="text" pattern="[a-zA-Z0-9]{5,}" required title="Minimum 5 caractères sans espaces ni caractéres spéciaux" class="form-control" name="login" placeholder="Login">
	</div>
	<button type="submit" class="btn btn-primary">Changer mon login</button>

	<?php
		if (isset($_GET['value']) && $_GET['value'] == 'log_same')
			echo "<div class='alert alert-danger'>Le nouveau login doit être différent de l'ancien !</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'log_change')
			echo "<div class='alert alert-success'>Le login a bien été modifié !</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'log_exist')
			echo "<div class='alert alert-danger'>Ce login existe déjà !</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'log_empty')
			echo "<div class='alert alert-danger'>Entrez un login, au moins 5 caractères !</div>";
	?>
</form>

<?php require_once("../views/footer.php") ?>