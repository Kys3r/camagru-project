<?php require_once("header.php") ?>

<form action="../controllers/register_co.php" method="post" autocomplete="on">
	<div class="form-group col-md-3">
      <label>Login</label>
      <input type="text" pattern="[a-zA-Z0-9$+,:;=?@#|'<>.^*()%!-]{5,}" required title="Minimum 6 caractères sans espaces" class="form-control" name="login" aria-describedby="emailHelp" placeholder="Entrez votre nouveau login">
	  <small class="form-text text-muted">Minimum 6 caractères</small>
    </div>
	<div class="form-group col-md-3">
		<label>Adresse E-mail</label>
		<input type="email" class="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}" name="mail" aria-describedby="emailHelp" placeholder="Entrez une adresse mail">
	</div>
	<div class="form-group col-md-3">
		<label for="exampleInputPassword1">Mot de passe</label>
		<input type="password" pattern="[a-zA-Z0-9$+,:;=?@#|'<>.^*()%!-]{8,}[0-9]{2,}" required title="Minimum 8 caractères sans espaces + 2 chiffres" class="form-control" name="pwd" placeholder="Entrez un mot de passe">
		<small class="form-text text-muted">Minimum 8 caractères + 2 chiffres</small>
	</div>
	<div class="form-group col-md-3">
		<label for="exampleInputPassword1">Confirmation mot de passe</label>
		<input type="password" pattern="[a-zA-Z0-9$+,:;=?@#|'<>.^*()%!-]{8,}[0-9]{2,}" required title="Minimum 8 caractères sans espaces + 2 chiffres" class="form-control" name="pwd2" placeholder="Entrez un mot de passe">
	</div>
	<?php
		if (isset($_GET['value']) && $_GET['value'] == 'notsame')
			echo "<div class='alert alert-danger'>Mot de passe différent</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'wrong')
			echo "<div class='alert alert-danger'>Mauvaises données saisies</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'log_exist')
			echo "<div class='alert alert-danger'>Le login existe déjà</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'mail_exist')
			echo "<div class='alert alert-danger'>Cette adresse e-mail existe déjà</div>";
	?>
	<button type="submit" class="btn btn-primary">S'inscrire</button>
</form>

<?php require_once("../views/footer.php") ?>
