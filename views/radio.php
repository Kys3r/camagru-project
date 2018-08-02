<div class="container hidden filter-creator" id="checkbox-div">
	<div class="row form-creator">
		<?php 
			require('message.php');
			$dirname = "../asset/img/creator/";
			$images = glob($dirname."*.*");
			$firstElem = 1;
			foreach($images as $image)
			{
				if ($firstElem == 1)
				{
					echo '<label class="col-md-2 checkbox-label">';
						echo '<input class="input-radio" id="radio-checked" type="radio" name="radio" value=' . $image . ' checked="checked">';
						echo '<img class="checkbox-creator" src="'. $image .'"/>';
					echo '</label>';
					$firstElem = 0;
				}
				else
				{
					echo '<label class="col-md-2 checkbox-label">';
						echo '<input class="input-radio" type="radio" name="radio" value=' . $image . '>';
						echo '<img class="checkbox-creator" src="'. $image .'"/>';
					echo '</label>';
				}
			}
		?>
	</div>
</div>