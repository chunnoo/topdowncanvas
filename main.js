function init(){
	fps = [];
	fps[0] = 60;
	fps[1] = new Date;
	fps[2] = new Date;
	fps[3] = false;

	canvas = document.getElementById('canvas');
	canvas.width = 512;
	canvas.heigth = 512;
	ctx = canvas.getContext('2d');
	
	mouse = {
		x: 0,
		y: 0,
		leftButton: false
	};
	
	gameInit();
	
	mouseSetup();
	keyboardSetup();
	
	draw();
}

function mouseSetup(){
	//mouse movement
	canvas.onmousemove = function(e){
		e.preventDefault();
		mouseChange(e.clientX, e.clientY);
	};
	canvas.ontouchmove = function(e){
		e.preventDefault();
		mouseChange(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
	};
	//mouse release
	canvas.onmouseup = function(e){
		mouseChange(e.clientX, e.clientY);
		mouse.leftButton = false;
		gameLeftUp();
	};
	canvas.onmouseleave = function(e){
		mouseChange(e.clientX, e.clientY);
		mouse.leftButton = false;
		gameLeftUp();
	};
	canvas.ontouchend = function(e){
		e.preventDefault();
		mouseChange(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
		mouse.leftButton = false;
		gameLeftUp();
	};
	canvas.ontouchleave = function(e){
		e.preventDefault();
		mouseChange(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
		mouse.leftButton = false;
		gameLeftUp();
	};
	canvas.ontouchcancel = function(e){
		e.preventDefault();
		mouseChange(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
		mouse.leftButton = false;
		gameLeftUp();
	};
	//mouse press
	canvas.onmousedown = function(e){
		mouseChange(e.clientX, e.clientY);
		mouse.leftButton = true;
		gameLeftDown();
	};
	canvas.onmouseenter = function(e){
		mouseChange(e.clientX, e.clientY);
	};
	canvas.ontouchstart = function(e){
		e.preventDefault();
		mouseChange(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
		mouse.leftButton = true;
		gameLeftDown();
	};
	canvas.ontouchenter = function(e){
		e.preventDefault();
		mouseChange(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
	}
}
function keyboardSetup(){
	window.addEventListener('keypress', function(e){
		if (e.charCode == 102){
			if (fps[3]){
				fps[3] = false;
			} else{
				fps[3] = true;
			}
		}
	});
}

function draw(){
	//fps counter
	if (fps[3]){
		fps[0] = 1000 / (fps[2] - fps[1]);
		fps[1] = fps[2];
		fps[2] = new Date;
	}
	
    if (mouse.leftButton){
		gameLeftDrag();
	}
	
	ctx.clearRect(0, 0, canvas.width, canvas.heigth); //initial clearing of context
	
	ctx.save();
	ctx.translate(Math.round(canvas.width/2 - player.x), Math.round(canvas.height/2 - player.y)); //initial centring transformation
	
	gameDraw();
	
	ctx.restore(); //removing centring transformation
	
	if (fps[3]){
		ctx.font = "20px Verdana";
		ctx.fillText(String(Math.floor(fps[0])), 10 , 20);
		ctx.beginPath();
		ctx.arc(10, fps[0], 5, 0, 2*Math.PI);
		ctx.fill();
	}
	
	requestAnimationFrame(draw);
}

function mouseChange(x,y){
	mouse.x = x - (canvas.width/2);// - canvas.offsetLeft;;
	mouse.y = y - (canvas.height/2);// - canvas.offsetTop;
}

window.addEventListener('load', init);


