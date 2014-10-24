function init(){
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
	
	draw();
}
function draw(){
    //mouse dragging
    if (mouse.leftButton){
        gameLeftDrag();
    }
    //mouse
	canvas.addEventListener('mousemove', function(e){
		var rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - (canvas.width/2) - rect.left;
		mouse.y = e.clientY - (canvas.height/2) - rect.top;
		if (mouse.leftButton){
			gameLeftDrag();
		}
	});
	canvas.addEventListener('mousedown', function(e){
		var rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - (canvas.width/2) - rect.left;
		mouse.y = e.clientY - (canvas.height/2) - rect.top;
		mouse.leftButton = true;
		gameLeftDown();
	});
    canvas.addEventListener('mouseup', function(e){
    		var rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - (canvas.width/2) - rect.left;
		mouse.y = e.clientY - (canvas.height/2) - rect.top;
		mouse.leftButton = false;
		gameLeftUp();
	});
    //touches
    canvas.addEventListener('touchmove', function(e){
		e.preventDefault();
		mouse.x = e.targetTouches[0].pageX - (canvas.width/2) - canvas.offsetLeft;
		mouse.y = e.targetTouches[0].pageY - (canvas.height/2) - canvas.offsetTop;
		if (mouse.leftButton){
			gameLeftDrag();
		}
	});
	canvas.addEventListener('touchstart', function(e){
		e.preventDefault();
		mouse.x = e.targetTouches[0].pageX - (canvas.width/2) - canvas.offsetLeft;
		mouse.y = e.targetTouches[0].pageY - (canvas.height/2) - canvas.offsetTop;
		mouse.leftButton = true;
		gameLeftDown();
	});
	canvas.addEventListener('touchend', function(e){
		e.preventDefault();
		mouse.x = e.targetTouches[0].pageX - (canvas.width/2) - canvas.offsetLeft;
		mouse.y = e.targetTouches[0].pageY - (canvas.height/2) - canvas.offsetTop;
		mouse.leftButton = false;
		gameLeftUp();
	});
	
	ctx.clearRect(0, 0, canvas.width, canvas.heigth); //initial clearing of context
	
	ctx.save();
	ctx.translate(Math.round(canvas.width/2 - player.x), Math.round(canvas.height/2 - player.y)); //initial centring transformation
	
	gameDraw();
	
	ctx.restore(); //removing centring transformation
	requestAnimationFrame(draw);
}

window.addEventListener('load', init);


