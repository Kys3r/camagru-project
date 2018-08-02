<?php
	/**
	 * 
	 */
	class Models
	{
		public $connect;

//$connect is connect to db for all of Models method

		public function __construct()
		{
			require('/var/www/html/config/database.php');
			$this->connect = new PDO($DB, $DB_USER, $DB_PASSWORD);
			$this->connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);
			$this->connect->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_OBJ);
		}


// Check if data param exist to the specific table
		
		public function selectOnce($table, $arg1, $arg2, $target)
		{
			$verif = $this->connect->prepare("SELECT $arg1 FROM $table WHERE $arg2=?");
			$verif->execute([$target]);
			$ret = $verif->fetch(PDO::FETCH_ASSOC);
			$ret = $ret[$arg1];
			return ($ret);
		}


// Update table

		public function updateOnce($table, $column, $newData, $where1, $where2)
		{
			try
			{
				$update = $this->connect->prepare("UPDATE $table SET $column = ? WHERE $where1 = ?");
				$update->execute([$newData, $where2]);
				return (true);
			} catch (PDOException $e)
			{
				return (false);
			}
		}


// Delete once line


		public function deleteOnce($table, $arg, $target)
		{
			try
			{
				$delete = $this->connect->prepare("DELETE FROM $table WHERE $arg = ?");
				$delete->execute([$target]);
				return ($delete->rowCount());
			} catch (PDOException $e)
			{
				return (false);
			}
		}


// Get id's param with own table
		
		public function getID($where1, $where2, $table)
		{
			return ($this->selectOnce($table, 'id', $where1, $where2));
		}


// Insert one Element in a table

		public function InsertElement($table, $column, $target)
		{
			try
			{
				$verif = $this->connect->prepare("INSERT INTO $table ($column) VALUES (?)");
				$verif->execute($target);
			} catch (PDOException $e)
			{
				echo "Erreur lors de l'insertion de l'element: " . $e->getMessage();
			}	
		}


// Generate a new token

		public function newToken()
		{
			$tok = new OAuthProvider();
			$token = $tok->generateToken(16);
			$token = bin2hex($token);
			return ($token);
		}


// Send mail with user token

		public function sendMail($email, $subject, $message)
		{
		     $headers[] = 'MIME-Version: 1.0';
		     $headers[] = 'Content-type: text/html; charset=iso-8859-1';
		     $headers[] = 'From: Instalike <intalike@contact.fr>';
		     mail($email, $subject, $message, implode("\r\n", $headers));
		}
	}
?>