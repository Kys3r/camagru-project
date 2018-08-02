	<?php
	require_once('../models/models.php');
	require_once('../models/user_mod.php');
	require_once('../models/post_mod.php');
	session_start();

	$models = New Models();
	$user = New User();
	$post = New Post();

	function imagecopymerge_alpha($dst_im, $src_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, $pct) {
	    $cut = imagecreatetruecolor($src_w, $src_h); 
	    imagecopy($cut, $dst_im, 0, 0, $dst_x, $dst_y, $src_w, $src_h);
	    imagecopy($cut, $src_im, 0, 0, $src_x, $src_y, $src_w, $src_h);
	    imagecopymerge($dst_im, $cut, $dst_x, $dst_y, 0, 0, $src_w, $src_h, $pct);
	    return ($dst_im);
	}
	
	if (isset($_POST['canvas'], $_POST['radio']) && !empty($_POST['canvas']) && !empty($_POST['radio']))
	{
		$dest = "data:image/png;base64," . base64_encode(file_get_contents($_POST['canvas']));
		$src = false;
		$login = $_SESSION['current_loggued'];
		$message = $_POST['message'];
		$id_user = $user->getID('login', $login, 't_user');
		$token = strval($models->newToken());
		if (isset($_POST['radio']) && !empty($_POST['radio']))
		{
			$src = "data:image/png;base64," . base64_encode(file_get_contents($_POST['radio']));
			$src = imagecreatefrompng($src);
			$dest = imagecreatefrompng($dest);
			imagecopymerge_alpha($dest, $src, 50, 50, 0, 0, 168, 168, 100);
		}
		else
			$dest = imagecreatefrompng($dest);
		if (!is_dir('../asset/img/login/' . $login))
			mkdir('../asset/img/login/' . $login);
		imagepng($dest, '../asset/img/login/' . $login . '/' . $token . '.png');
		imagedestroy($dest);
		if ($src)
			imagedestroy($src);
		$path = '/asset/img/login/' . $login . '/' . $token . '.png';
		$post->InsertRowPost($id_user, $path, $message);
		header('Location: ../views/creator.php');
	}
	else
		header('Location: ../views/creator.php?value=empty');
?>