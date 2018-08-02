<?php
	require_once('database.php');
	require_once('/var/www/html/models/models.php');

	$user_connect = "CREATE TABLE IF NOT EXISTS t_user(
		id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		login VARCHAR(12) NOT NULL,
		password VARCHAR(255) NOT NULL,
		email VARCHAR(50)  NOT NULL,
		is_admin BOOLEAN default FALSE,
		is_active BOOLEAN default FALSE,
		notif BOOLEAN default TRUE
	)";

	$t_user_active = "CREATE TABLE IF NOT EXISTS t_user_active(
		id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		user_id INT UNSIGNED NOT NULL,
		token VARCHAR(256) NOT NULL 
	)";

	$t_post = "CREATE TABLE IF NOT EXISTS t_post(
		id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		user_id INT UNSIGNED NOT NULL,
		path_img VARCHAR(256) NOT NULL,
		message VARCHAR(256),
		nb_like INT UNSIGNED default 0
	)";
	
	$t_comment = "CREATE TABLE IF NOT EXISTS t_comment(
		id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		id_post INT UNSIGNED NOT NULL,
		id_login INT UNSIGNED NOT NULL,
		comment VARCHAR(256) NOT NULL,
		nb_like INT UNSIGNED default 0
	)";
	
	$t_like = "CREATE TABLE IF NOT EXISTS t_like(
		id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		id_post INT UNSIGNED NOT NULL,
		id_login INT UNSIGNED NOT NULL
	)";
	
	$t_token_pwd = "CREATE TABLE IF NOT EXISTS t_token_pwd(
		id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		user_id INT UNSIGNED NOT NULL,
		token VARCHAR(256) NOT NULL 
	)";

	try
	{
		$sql = new PDO($DB_DSN , $DB_USER, $DB_PASSWORD);
		$sql->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql->exec("CREATE DATABASE IF NOT EXISTS db_insta");
		$sql->exec('use db_insta');
		$sql->exec($user_connect);
		$sql->exec($t_user_active);
		$sql->exec($t_post);
		$sql->exec($t_comment);
		$sql->exec($t_like);
		$sql->exec($t_token_pwd);
		$pwd = hash("whirlpool", "adminadmin");
		$models = New Models();
		if ($models->selectOnce('t_user', 'login', 'login', 'rootmaster') == false)
		{
			$add_admin = ("INSERT INTO t_user (login, password, email, is_admin, is_active)
				VALUES ('rootmaster', '$pwd', 'kawaboog@gmail.com', TRUE, TRUE)");
			$sql->exec($add_admin);
		}
	} catch (PDOException $e)
	{
		 echo "Erreur de creation de la database : " . $e->getMessage();
	}
?>
	
