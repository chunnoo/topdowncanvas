function init(){
	canvas = document.getElementById('canvas');
	canvas.width = 512;
	canvas.heigth = 512;
	ctx = canvas.getContext('2d');
	
	mouse = {
		x: 0,
		y: 0
	};
	
	draw();
}
function draw(){
	canvas.addEventListener('mousemove', function(e){
		var rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - (canvas.width/2) - rect.left;
		mouse.y = e.clientY - (canvas.height/2) - rect.top;
	});
	
	ctx.clearRect(0, 0, canvas.width, canvas.heigth); //initial clearing of context
	
	ctx.save();
	ctx.translate(canvas.width/2, canvas.height/2); //initial centring transformation
	
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(mouse.x, mouse.y);
	ctx.stroke();
	
	ctx.restore(); //removing centring transformation
	setTimeout(draw, 1000/60);
}

window.addEventListener('load', init);
