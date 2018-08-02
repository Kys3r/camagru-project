<!DOCTYPE html>
<html lang="FR">
	<head>
		<meta charset="utf-8">
		<title>Insta-101</title>
		<link rel="stylesheet" href="/asset/css/style-header.css">
		<link rel="stylesheet" href="/asset/css/style-creator.css">
		<link rel="stylesheet" href="/asset/css/style-global.css">
		<link rel="stylesheet" href="/asset/css/style-newsfeed.css">
		<link rel="stylesheet" href="/asset/css/style-admin.css">
		<link rel="stylesheet" href="/asset/css/switch.css">
		<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
	</head>
	<body>
		<?php session_start() ?>
		<nav class="navbar navbar-expand-lg navbar-light bg-light nav-header" id="nav-height">
		  <button class="navbar-toggler" onclick="toggle()" type="button" data-toggle="collapse" data-target="#section" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="navbar-collapse" id="section">
		    <ul class="navbar-nav d-flex justify-content-around header-link">
		      <li class="nav-item">
		        <a class="nav-link header-li" href="/views/creator.php">Pict-Creator</a>
		      </li class="nav-item">
			  <li class="nav-item">
			  	<a class="navbar-brand h1-global" href="/">InstaLike</a>
			  </li>
				<?php
					require_once("/var/www/html/models/user_mod.php");
					$user = New User();
				?>

					<?php if (isset($_SESSION['current_loggued'])): ?>
							<li class="nav-item"><a class='nav-link header-li' href='/views/account.php'>Mon compte</a></li>
							<li class="nav-item"><a class='nav-link header-li' href='/controllers/logout_co.php'>Se Deconnecter</a></li>

						<?php if ($user->isAdmin($_SESSION['current_loggued']) == '1'): ?>

							<li class="nav-item"><a class='nav-link header-li' href='/views/admin.php'>Admin section</a></li>

						<?php endif; ?>

					<?php endif; ?>

					<?php if (!isset($_SESSION['current_loggued'])): ?>

						<li class="nav-item"><a class='nav-link header-li' href='/views/register.php'>S'inscrire</a></li>
						<li class="nav-item"><a class='nav-link header-li' href='/views/login.php'>Se connecter</a></li>

					<?php endif; ?>

		    </ul>
		    <form class="form-inline my-2 my-lg-0">
		    </form>
		  </div>
		</nav>
	</body>
</html>
<script type="text/javascript" src="../asset/js/header.js"></script>