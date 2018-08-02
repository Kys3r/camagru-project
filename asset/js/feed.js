// Like button

let likeEffect = (id_post, login) =>
{
	let button = document.getElementById('like_' + id_post);
	let nb_like = document.getElementById('nb_likes_' + id_post);
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/controllers/like_co.php", true);
	xhttp.onreadystatechange = function ()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			button.innerHTML = this.responseText == 1 ? "Dislike" : "Like";
			let tmp = parseInt(nb_like.innerHTML);
			nb_like.innerHTML = this.responseText == 1 ? tmp + 1 : tmp - 1;
		}
	};
	xhttp.open("POST", "/controllers/like_co.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("id_post=" + id_post + "&login=" + login);
}


let removeInput = (id) =>
{
	document.getElementById('commentaire_' + id).value = '';
}


let addComment = (message, id_post, login) =>
{
	if (message != '')
	{
		const xhttp = new XMLHttpRequest();
		xhttp.open("POST", "../../controllers/newsfeed_co.php", true);
		xhttp.onreadystatechange = function ()
		{
		    if (this.readyState == 4 && this.status == 200)
			{
				let mediaMt3 = document.createElement('div');
				let mediaBody = document.createElement('div');
				let h5 = document.createElement('h5');
				let comment = document.createElement('div');
				let bodyComment = document.getElementById('body-comment_' + id_post);

				mediaMt3.className = 'media mt-3';
				mediaBody.className = 'media-body';
				h5.className = 'mt-0 h5-login';
				h5.innerHTML = login;
				comment.className = 'comment_post';
				comment.innerHTML = message;
				mediaMt3.appendChild(mediaBody);
				mediaBody.appendChild(h5);
				mediaBody.appendChild(comment);
				bodyComment.appendChild(mediaMt3);
				
		    }
		};
		xhttp.open("POST", "/controllers/newsfeed_co.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("id_post=" + id_post + "&login=" + login + "&message=" + message);
		(() =>
		{
			const xxhttp = new XMLHttpRequest();
			xxhttp.open("POST", "../../controllers/notification_mail.php", true);
			xxhttp.onreadystatechange = function ()
			{
			    if (this.readyState == 4 && this.status == 200)
				{
					console.log(this.responseText);
					
			    }
			};
			xxhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xxhttp.send("id_post=" + id_post + "&login_comment=" + login + "&message=" + message);
		})();
	}
}
