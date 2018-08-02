<?php require_once("../views/header.php") ?>

<?php
	require_once('../models/user_mod.php');
	$user = New User();
	$is_check = $user->selectOnce('t_user', 'notif', 'login', $_SESSION['current_loggued']);
	if ($is_check == 1)
		$is_check = "checked";
	else
		$is_check = '';
?>
<div class="container-fluid">
	<div class="container account-container">
		
		<div class="account-link-block">
			<button type="button href-button" class="btn btn-info"><a class="href" href="change_login.php">Modifier votre login</a></button>
		</div>
		<div class="account-link-block">
			<button type="button href-button" class="btn btn-info"><a class="href" href="change_mail.php">Modifier votre addresse mail</a></button>
		</div>
		<div class="account-link-block">
			<button type="button href-button" class="btn btn-info"><a class="href"  href="change_pwd.php">Modifier votre mot de passe</a></button>
		</div>
		<div id="notif">
			<p>Activer / Désactiver les notifications</p>
		</div>
		<label class="switch" onclick="notifState('<?php echo $_SESSION['current_loggued'] ?>');">
		  <input type="checkbox" <?php echo $is_check; ?>>
		  <span class="slider round"></span>
		</label>
	</div>
</div>
<script type="text/javascript" src="../asset/js/param.js"></script>

<?php require_once("../views/footer.php") ?>