function gameInit(){
	player = {
		x: 100,
		y: 0,
		speed: 2,
		destX: false,
		destY: false
	};
	
	objects = [];
	
	setupTest01();
}

function gameDraw(){
	//Drawing player
	ctx.beginPath();
	ctx.arc(player.x, player.y, 25, 0, 2*Math.PI);
	ctx.stroke();
	
	//Drawing player destination
	if (player.destX && player.destY) {
		ctx.beginPath();
		ctx.moveTo(player.destX - 5, player.destY - 5);
		ctx.lineTo(player.destX + 5, player.destY + 5);
		ctx.moveTo(player.destX + 5, player.destY - 5);
		ctx.lineTo(player.destX - 5, player.destY + 5);
		ctx.stroke();
	}
	
	//Drawing mouse pointer
	ctx.save();
	ctx.setTransform(1,0,0,1,0,0);
	ctx.translate(canvas.width/2, canvas.height/2);
	ctx.beginPath();
	ctx.arc(mouse.x, mouse.y, 5, 0, 2*Math.PI);
	ctx.fill();
	ctx.restore();
	
	//Drawing objects
	for (var i=0; i<objects.length; i++){
		ctx.beginPath();
		ctx.moveTo(objects[i][0], objects[i][1]);
		for (var j=1; j<objects[i].length; j++){
			ctx.lineTo(objects[i][j*2], objects[i][j*2 + 1]);
		}
		ctx.lineTo(objects[i][0], objects[i][1]);
		ctx.stroke();
	}
	
	//player movement
	if (player.destX && player.destY) {
		var x = player.destX - player.x;
		var y = player.destY - player.y;
		var l = Math.sqrt(x*x + y*y);
		if (l > player.speed){
			player.x += Math.round((x/l) * player.speed);
			player.y += Math.round((y/l) * player.speed);
		}else {
			player.x = Math.round(player.destX);
			player.destX = false;
			player.y = Math.round(player.destY);
			player.destY = false;
		}
	}
}

function gameLeftDrag(){
	player.destX = mouse.x + player.x;
	player.destY = mouse.y + player.y;
}

function gameLeftDown(){
    player.destX = mouse.x + player.x;
	player.destY = mouse.y + player.y;
}

function gameLeftUp(){

}



