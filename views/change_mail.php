<?php require_once("../views/header.php") ?>

<form action="../controllers/change_mail_co.php" method="post" autocomplete="on">
	<div class="form-group col-md-3">
		<label>Entrez une nouvelle adresse mail</label>
		<input type="email" class="form-control" name="email" aria-describedby="emailHelp" placeholder="Entrez une nouvelle adresse mail">
	</div>
	<button type="submit" class="btn btn-primary">Changer mon E-mail</button>
	<?php
		if (isset($_GET['value']) && $_GET['value'] == 'mail_same')
			echo "<div class='alert alert-danger'>La nouvelle adresse mail doit être différente de l'ancienne !</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'mail_change')
			echo "<div class='alert alert-success'>L'adresse mail a bien été modifié !</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'mail_exist')
			echo "<div class='alert alert-danger'>Ce mail existe déjà !</div>";
		else if (isset($_GET['value']) && $_GET['value'] == 'mail_empty')
			echo "<div class='alert alert-danger'>Entrez un mail valide !</div>";
	?>
</form>

<?php require_once("../views/footer.php") ?>