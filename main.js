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
	canvas.addEventListener('mousemove', function(e){
		var rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - (canvas.width/2) - rect.left;
		mouse.y = e.clientY - (canvas.height/2) - rect.top;
		if (mouse.leftButton){
			gameLeftClick();
		}
	});
	canvas.addEventListener('touchmove', function(e){
		e.preventDefault();
		mouse.x = e.targetTouches[0].pageX - (canvas.width/2) - canvas.offsetLeft;
		mouse.y = e.targetTouches[0].pageY - (canvas.height/2) - canvas.offsetTop;
		if (mouse.leftButton){
			gameLeftClick();
		}
	});
	canvas.addEventListener('mousedown', function(e){
		mouse.leftButton = true;
		gameLeftClick();
	});
	canvas.addEventListener('touchdown', function(e){
		e.preventDefault();
		mouse.leftButton = true;
		gameLeftClick();
	});
	canvas.addEventListener('mouseup', function(e){
		mouse.leftButton = false;
		gameLeftClick();
	});
	canvas.addEventListener('touchup', function(e){
		e.preventDefault();
		mouse.leftButton = false;
		gameLeftClick();
	});
	
	ctx.clearRect(0, 0, canvas.width, canvas.heigth); //initial clearing of context
	
	ctx.save();
	ctx.translate(Math.round(canvas.width/2 - player.x), Math.round(canvas.height/2 - player.y)); //initial centring transformation
	
	gameDraw();
	
	ctx.restore(); //removing centring transformation
	requestAnimationFrame(draw);
}

window.addEventListener('load', init);


