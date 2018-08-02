<?php require_once("../views/header.php") ?>

<form action="../controllers/reset_pwd_co.php" method="post">
	<div class="form-group col-md-3">
		<label for="exampleInputPassword2">Entrez votre nouveau mot de passe</label>
		<input type="password" id="exampleInputPassword2" pattern="[a-zA-Z0-9$+,:;=?@#|'<>.^*()%!-]{8,}[0-9]{2,}" required title="Minimum 8 caractères sans espaces + 2 chiffres" class="form-control"name="new_pwd" placeholder="Entrez un mot de passe">
	</div>
	<div class="form-group col-md-3">
		<label for="exampleInputPassword3">Confirmez votre nouveau mot de passe</label>
		<input type="password" id="exampleInputPassword3" pattern="[a-zA-Z0-9$+,:;=?@#|'<>.^*()%!-]{8,}[0-9]{2,}" required title="Minimum 8 caractères sans espaces + 2 chiffres" class="form-control" name="new_pwd2" placeholder="Entrez un mot de passe">
	</div>
	
	<?php 
		if (isset($_GET['token']))
			echo "<input type='hidden' name='token' value='" . $_GET['token'] . "'>";
		if (isset($_GET['value']) && $_GET['value'] == 'pwd_change')
		{
			echo "<div class='alert alert-success'>Le mot de passe a bien été modifié ! Vous allez maintenant pouvoir vous connectez !</div>";
			header('Location: /index.php');
		}
		else if (isset($_GET['value']) && $_GET['value'] == 'new_new2_same')
			echo "<div class='alert alert-danger'>Nouveau mot de passe différent de celui confirmé !</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'oups')
			echo "<div class='alert alert-danger'>Oups, un problème est survenu, êtes vous sur de ne pas déjà avoir changé votre mot de passe ?!</div>";
	?>
	<button type="submit" class="btn btn-primary">Changer le mot de passe</button>
</form>

<?php require_once("../views/footer.php") ?>