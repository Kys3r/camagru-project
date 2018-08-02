<?php require_once("header.php") ?>

<?php
	require_once("../models/post_mod.php");
	$post = New Post();
	$article = $post->getRow('t_user');
?>

<!-- Form changement login -->

<div class="account-link-block">
	<form class="form-inline" action="../controllers/admin_modif_co.php" method="post">
		<label class="my-1 mr-2" for="inlineFormCustomSelectPref">Changer le login utilisateur</label>
		<select class="custom-select my-1 mr-sm-2" name="login_id">
			<option selected>Choisissez un login</option>
			<?php foreach ($article as $key => $value): ?>
				<option value="<?php echo $article[$key]->id ?>"><?php echo $article[$key]->login; ?></option>
			<?php endforeach; ?>
		</select>
		<input class="form-control input-admin" type="text" name="new_login">
		<button type="submit" class="btn btn-primary my-1">Submit</button>
	</form>
</div>

<!-- Form changement password -->

<div class="account-link-block">
	<form class="form-inline" action="../controllers/admin_modif_co.php" method="post">
		<label class="my-1 mr-2" for="inlineFormCustomSelectPref">Changer le password utilisateur</label>
		<select class="custom-select my-1 mr-sm-2" name="login_id">
			<option selected>Choisissez un login</option>
			<?php foreach ($article as $key => $value): ?>
				<option value="<?php echo $article[$key]->id ?>"><?php echo $article[$key]->login; ?></option>
			<?php endforeach; ?>
		</select>
		<input class="form-control input-admin" type="text" name="new_pwd">
		<button type="submit" class="btn btn-primary my-1">Submit</button>
	</form>
</div>

<!-- Form changement email -->

<div class="account-link-block">
<form class="form-inline" action="../controllers/admin_modif_co.php" method="post">
	<label class="my-1 mr-2" for="inlineFormCustomSelectPref">Changer l'email utilisateur</label>
	<select class="custom-select my-1 mr-sm-2" name="login_id">
		<option selected>Choisissez un login</option>
		<?php foreach ($article as $key => $value): ?>
			<option value="<?php echo $article[$key]->id ?>"><?php echo $article[$key]->login; ?></option>
		<?php endforeach; ?>
	</select>
	<input class="form-control input-admin" type="text" name="new_mail">
	<button type="submit" class="btn btn-primary my-1">Submit</button>
</form>


<!-- Form changement is_admin -->

<div class="account-link-block">
	<form class="form-inline" action="../controllers/admin_modif_co.php" method="post">
		<label class="my-1 mr-2" for="inlineFormCustomSelectPref">Changer les droits utilisateur</label>
		<select class="custom-select my-1 mr-sm-2" name="login_id">
			<option selected>Choisissez un login</option>
			<?php foreach ($article as $key => $value): ?>
				<option value="<?php echo $article[$key]->id ?>"><?php echo $article[$key]->login; ?></option>
			<?php endforeach; ?>
		</select>
		<select class="custom-select my-1 mr-sm-2" name="is_admin">
			<option selected>Ce login est il admin ?</option>
			<option value="1">Yes</option>
			<option value="0">No</option>
		</select>
		<button type="submit" class="btn btn-primary my-1">Submit</button>
	</form>
</div>


<!-- Form changement notif -->

<div class="account-link-block">
	<form class="form-inline" action="../controllers/admin_modif_co.php" method="post">
		<label class="my-1 mr-2" for="inlineFormCustomSelectPref">Changer les notifs utilisateur</label>
		<select class="custom-select my-1 mr-sm-2" name="login_id">
			<option selected>Choisissez un login</option>
			<?php foreach ($article as $key => $value): ?>
				<option value="<?php echo $article[$key]->id ?>"><?php echo $article[$key]->login; ?></option>
			<?php endforeach; ?>
		</select>
		<select class="custom-select my-1 mr-sm-2" name="notified">
			<option selected>Voulez-vous activer les notifs ?</option>
			<option value="1">Yes</option>
			<option value="0">No</option>
		</select>
		<button type="submit" class="btn btn-primary my-1">Submit</button>
	</form>
</div>

<?php
	if (isset($_GET['value']) && !empty($_GET['value']) && $_GET['value'] == "login")
		echo "<div class='alert alert-success' role='alert'>La modification du login a bien eu lieu !</div>";
	else if (isset($_GET['value']) && !empty($_GET['value']) && $_GET['value'] == "pwd")
		echo "<div class='alert alert-success' role='alert'>La modification du mot de passe a bien eu lieu !</div>";
	else if (isset($_GET['value']) && !empty($_GET['value']) && $_GET['value'] == "mail")
		echo "<div class='alert alert-success' role='alert'>La modification de l'adresse e-mail a bien eu lieu !</div>";
	else if (isset($_GET['value']) && !empty($_GET['value']) && $_GET['value'] == "isadmin")
		echo "<div class='alert alert-success' role='alert'>La modification des droits d'accés a bien eu lieu !</div>";
	else if (isset($_GET['value']) && !empty($_GET['value']) && $_GET['value'] == "notified")
		echo "<div class='alert alert-success' role='alert'>La modification des notifications a bien eu lieu !</div>";
	else if (isset($_GET['value']) && !empty($_GET['value']) && $_GET['value'] == "loginExist")
		echo "<div class='alert alert-danger' role='alert'>Le login que vous souhaitez modifier existe déja !</div>";
	else if (isset($_GET['value']) && !empty($_GET['value']) && $_GET['value'] == "mailExist")
		echo "<div class='alert alert-danger' role='alert'>L'e-mail que vous souhaitez modifier existe déja !</div>";
?>

<?php require_once("../views/footer.php") ?>