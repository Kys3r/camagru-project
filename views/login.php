<?php require_once("header.php") ?>
<form action="../controllers/login_co.php" method="post" autocomplete="on">
	<div class="form-group col-md-3">
      <label>Login</label>
      <input type="text" pattern="[a-zA-Z0-9$+,:;=?@#|'<>.^*()%!-]{5,}" required title="Minimum 6 caractères sans espaces" class="form-control" id="register-login" name="login" aria-describedby="login-connect" placeholder="Entrez votre nouveau login">
    </div>
	<div class="form-group col-md-3">
		<label for="exampleInputPassword1">Mot de passe</label>
		<input type="password" pattern="{8,}" class="form-control" id="register-pwd" name="pwd" placeholder="Entrez un mot de passe">
	</div>
	<div class="row">
		<a href="/views/forget_pwd.php"><p id="forget">Mot de passe oublié ?</p></a>
	</div>
	<?php
		if (isset($_GET['value']) && $_GET['value'] == 'log_error')
			echo "<div class='alert alert-danger'>Ce login n'existe pas !</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'pw_error')
			echo "<div class='alert alert-danger'>Mot de passe erroné</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'mail_validate')
			echo "<div class='alert alert-info'>Votre adresse mail n'a pas été validé ! Veuillez consulter vos mails</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'empty')
			echo "<div class='alert alert-danger'>Vous n'avez pas saisie de données !</div>";
	?>
	<button type="submit" class="btn btn-primary">Se connecter</button>
</form>

<?php require_once("../views/footer.php") ?>