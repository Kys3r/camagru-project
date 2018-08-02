<?php require_once("../views/header.php") ?>

<form action="../controllers/change_pw_co.php" method="post">
	<div class="form-group col-md-3">
		<label for="exampleInputPassword1">Entrez votre mot de passe actuel</label>
		<input type="password" id="exampleInputPassword1" pattern="[a-zA-Z0-9$+,:;=?@#|'<>.^*()%!-]{8,}[0-9]{2,}" required title="Minimum 8 caractères sans espaces + 2 chiffres" class="form-control" name="old_pwd" placeholder="Entrez un mot de passe">
	</div>
	<div class="form-group col-md-3">
		<label for="exampleInputPassword2">Entrez votre nouveau mot de passe</label>
		<input type="password" id="exampleInputPassword2" pattern="[a-zA-Z0-9$+,:;=?@#|'<>.^*()%!-]{8,}[0-9]{2,}" required title="Minimum 8 caractères sans espaces + 2 chiffres" class="form-control"name="new_pwd" placeholder="Entrez un mot de passe">
	</div>
	<div class="form-group col-md-3">
		<label for="exampleInputPassword3">Confirmez votre nouveau mot de passe</label>
		<input type="password" id="exampleInputPassword3" pattern="[a-zA-Z0-9$+,:;=?@#|'<>.^*()%!-]{8,}[0-9]{2,}" required title="Minimum 8 caractères sans espaces + 2 chiffres" class="form-control" name="new_pwd2" placeholder="Entrez un mot de passe">
	</div>

	<?php
		if (isset($_GET['value']) && $_GET['value'] == 'pwd_change')
			echo "<div class='alert alert-success'>Le mot de passe a bien été modifié !</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'old_new_same')
			echo "<div class='alert alert-danger'>Nouveau mot de passe identique à l'ancien !</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'new_new2_diff')
			echo "<div class='alert alert-danger'>Nouveau mot de passe différent de celui confirmé !</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'wrong_old')
			echo "<div class='alert alert-danger'>Mot de passe erroné !</div>";
	?>

	<button type="submit" class="btn btn-primary">Changer le mot de passe</button>
</form>

<?php require_once("../views/footer.php") ?>