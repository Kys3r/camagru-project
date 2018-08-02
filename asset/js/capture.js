let principalContent = document.getElementById("user-img-principal");


let makeCanvas = () =>
{
	let canvas = document.createElement('canvas');
	canvas.id = "canvas";
	canvas.classList = "canvas-render";
	canvas.width = 620;
	canvas.height = 480;
	return (canvas);
}

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
{
	navigator.mediaDevices.getUserMedia({ video: true }).then((stream) =>
	{
		video.src = window.URL.createObjectURL(stream);
		video.play();
	});
}


// Create principale canvas with the webcam capture

if(document.getElementById("snap"))
{
	document.getElementById("snap").addEventListener("click", () =>
	{
		deleteCanv();
		let canvas = makeCanvas();
		let context = canvas.getContext('2d'),
		video = document.getElementById('video');
		principalContent.appendChild(canvas);
		context.drawImage(video, 0, 0, 620, 480);
		canvasNextStep();
		publishEvent();
	});
}


function el(id){return document.getElementById(id);} // Get elem by ID

function readImage()
{
	deleteCanv();
	let canvas = makeCanvas();
	principalContent.appendChild(canvas);
	canvas  = el("canvas");
	var context = canvas.getContext("2d");
    if ( this.files && this.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
           var img = new Image();
           img.addEventListener("load", function() {
             context.drawImage(img, 0, 0, 620, 480);
           });
           img.src = e.target.result;
        };       
        FR.readAsDataURL( this.files[0] );
    }
	canvasNextStep();
	publishEvent();
}

el("imgUser").addEventListener("change", readImage, false);

let canvasNextStep = () =>   // Best func name ever
{
	if (!document.getElementById("publish-btn"))
	{
		let divRow = document.createElement("div");
		let button = document.createElement("button");
		let node = document.createTextNode("Publier !");
		let creator = document.getElementById("creator");
		let checkbox = document.getElementById("checkbox-div");
		button.appendChild(node);           
		divRow.classList = "row justify-content-center publish-btn";
		button.id = "publish-btn";
		button.type = 'submit';
		button.classList = "btn btn-primary button-creator";
		button.name = "button";
		divRow.append(button);
		creator.append(divRow);
		checkbox.style.display = "flex";
		createFilter();
	}
}


// Put a filter inside canvas

let createFilter = () =>
{
	let radio = document.creatorForm.radio;
	let div = document.getElementById('user-img-principal');
	let prev = null;
	(function() 
	{
		let divRadio = document.createElement("img");
		divRadio.id = "filterCanvas";
		divRadio.classList = "imgCanvas"
		divRadio.src = "/asset/img/creator/bang.png";
		div.appendChild(divRadio);
		let filter = document.getElementById('filterCanvas');
		let active = false;
		canvas.addEventListener('mousemove', (e) =>
		{
			filter.addEventListener('mousedown', (e) =>
			{
				active = true;
				canvas.addEventListener('mouseup', (e) =>
				{
					active = false;
				});
				filter.addEventListener('mouseup', (e) =>
				{
					active = false;
				});
			});
			let pos = getPosition(filter);
			if (active === true)
				filter.style.transform = "translate(" + (e.clientX - (pos.x * 1.2)) + "px, " + (e.clientY - (pos.y * 1.2)) + "px)";
		});
	})();
	for(let i = 0; i < radio.length; i++)
	{
		
	    radio[i].onclick = function() 
		{
			removeFilter();
	        if(this !== prev)
	            prev = this;
			let divRadio = document.createElement("img");
			divRadio.id = "filterCanvas";
			divRadio.classList = "imgCanvas"
			divRadio.src = this.value;
			div.appendChild(divRadio);
			let filter = document.getElementById('filterCanvas');
			let active = false;
			canvas.addEventListener('mousemove', (e) =>
			{
				filter.addEventListener('mousedown', (e) =>
				{
					active = true;
					canvas.addEventListener('mouseup', (e) =>
					{
						active = false;
					});
					filter.addEventListener('mouseup', (e) =>
					{
						active = false;
					});
				});
				let pos = getPosition(filter);
				if (active === true)
					filter.style.transform = "translate(" + (e.clientX - (pos.x * 1.2)) + "px, " + (e.clientY - (pos.y * 1.2)) + "px)";
			});
	    };
	}
}


let publishEvent = () =>
{
	// submit part
	document.getElementById("publish-btn").addEventListener("click", () =>
	{
		let radio = document.getElementById("filterCanvas");
		let dataURL = canvas.toDataURL("image/png");
        document.getElementById('hidden_data').value = dataURL;
		document.getElementById('hidden_radio').value = dataURL;
		document.getElementById("creator").submit();
	});
};


// Delete the principal image  (canvas id)

let deleteCanv = () => 
{
	if (document.getElementById("canvas"))
		principalContent.removeChild(document.getElementById("canvas"));
}


// Delete the current filter 

let removeFilter = () =>
{
	if (document.getElementById("filterCanvas"))
		principalContent.removeChild(document.getElementById("filterCanvas"));
}


// Return X Y position of mouse cursor

function getPosition(el) {
	let xPosition = 0;
	let yPosition = 0;

	while (el)
	{
		if (el.tagName == "BODY")
		{
			let xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
			let yScrollPos = el.scrollTop || document.documentElement.scrollTop;

			xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
			yPosition += (el.offsetTop - yScrollPos + el.clientTop);
		}
		else
		{
			xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
			yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
		}
		el = el.offsetParent;
	}
	return {x: xPosition, y: yPosition};
}


// When user click for delete a post in creator

let deletePost = (id_post, id_html) =>
{
	let parent = document.getElementById('old-post');
	let post = document.getElementById('post_' + id_post);
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/controllers/capture_post_co.php", true);
	xhttp.onreadystatechange = function ()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			if (this.responseText)
			{
				let id = "post_" + id_html;
				let elem = document.getElementById(id);
				elem.parentElement.removeChild(elem);
			}
		}
	};
	xhttp.open("POST", "/controllers/capture_post_co.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("id_post=" + id_post);
}
