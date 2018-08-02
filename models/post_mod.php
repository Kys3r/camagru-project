<?php 
	/**
	* 
	*/
	require_once('models.php');

	class Post extends Models
	{

// Return a table row
		public function getRow($table)
		{
			$array = [];
			$req = $this->connect->prepare("SELECT * FROM $table");
			$req->execute();
			foreach ($req->fetchAll() as $value)
			{
				array_push($array, $value);
			}
			return ($array);
		}


// Insert row in a table

		public function InsertRowPost($id, $path, $message)
		{
			try
			{
				$verif = $this->connect->prepare("INSERT INTO `t_post` (user_id, path_img, message) VALUES (?, ?, ?)");
				$verif->execute([$id, $path, $message]);
			} catch (PDOException $e)
			{
				echo "Erreur lors de l'insertion de l'element: " . $e->getMessage();
			}
			
		}


//Insert comment

		public function insertComment($id_post, $login, $message)
		{
			try
			{
				$req = $this->connect->prepare("INSERT INTO `t_comment` (id_post, id_login, comment) VALUES (?, ?, ?)");
				$req->execute([$id_post, $this->getID('login', $login, 't_user'), $message]);
			} catch (PDOException $e)
			{
				echo "Erreur lors de l'ajout du commentaire: " . $e;
			}
			
		}


// return if user liked post

		public function is_liked($id_post, $login)
		{
			try
			{
				$req = $this->connect->prepare("SELECT id from t_like WHERE EXISTS (SELECT id FROM t_like WHERE id_post = ? AND id_login = ?)");
				$req->execute([$id_post, $login]);
				$verif = $req->fetch(PDO::FETCH_ASSOC);
				if ($verif)
					return (1);
				else
					return (0);
			} catch (PDOException $e)
			{
				return (false);
			}
			if ($verif != false)
				return (1);
			else 
				return (0);
		}


// When user like or dislike change data in db

		public function db_likes($id_post, $login)
		{
			try
			{
				$exist = $this->is_liked($id_post, $login);
				if (!$exist)
				{
					try
					{
						$req = $this->connect->prepare("INSERT INTO `t_like` (id_post, id_login) VALUES (?,?)");
						$req->execute([$id_post, $login]);
						return (true);
					} catch (PDOException $e)
					{
						echo "Erreur lors de l'ajout du like: " . $e;
					}	
				}
				else
				{
					try
					{
						$req = $this->connect->prepare("DELETE FROM `t_like` WHERE id_post = ? AND id_login = ?");
						$req->execute([$id_post, $login]);
						return (false);
					} catch (PDOException $e)
					{
						echo "Erreur lors de la suppression du like: " . $e;
					}
				}
			} catch (PDOException $e)
			{
				echo "Erreur lors de la recherche du like: " . $e;
			}
		}


// return count likes for one post

		public function nb_likes($id_post)
		{
			try
			{
				$req = $this->connect->prepare("SELECT * FROM t_like WHERE id_post = ?");
				$req->execute([$id_post]);
				return ($req->rowCount());
			} catch (PDOException $e)
			{
				echo "Le nombre de like n'a pas pu etre retourne: " . $e;
			}
		}
	}
?>