<?php

	/**
	 * 
	 */
	require_once('models.php');
	class Admin extends Models
	{
		
// Change User in admin part

		public function updateUser($table, $set1, $set2, $where1, $where2)
		{
			try
			{
				$update = $this->connect->prepare("UPDATE $table SET $set1 = ? WHERE $where1 = ?");
				$update->execute([$set2, $where2]);
			} catch (PDOException $e)
			{
				echo "Probleme lors de la modification de l'user: " . $e;
			}
		}
		
		public function if_exist($table, $where1, $where2)
		{
			try
			{
				$select = $this->connect->prepare("SELECT * FROM $table WHERE $where1 = ?");
				$select->execute([$where2]);
				return ($select->rowCount());
			} catch (PDOException $e)
			{
				echo "La donnée n'a pas pu être trouvé: " . $e;
			}
		}
	}
?>