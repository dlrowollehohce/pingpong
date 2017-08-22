//判断球和矩形是否相交然后反弹
var ballIntersectRect = function(ball,rect){
	var CONST = Math.sqrt(0.5);
	var state = false;
	if(ball.x + (CONST * ball.r) >= rect.x && ball.x - CONST * ball.r <= rect.x + rect.w){
		if(ball.y + ball.r >= rect.y && ball.y - ball.r <= rect.y + rect.h){
			state = ball.bounceY();
		}
	}
	if(ball.x + ball.r >= rect.x && ball.x - ball.r <= rect.x + rect.w){
		if(ball.y + CONST * ball.r >= rect.y && ball.y - CONST * ball.r <= rect.y + rect.h){
			state = ball.bounceX();
		}
	}
	return state;
}
//debug用的打印
var log = console.log.bind(console);

var loadLevel = function(n){
	var blocks = [];
	var n = n - 1;
	var level = levels[n];
	for(var i = 0; i < level.length; i++){
		var p = level[i];
		var b = Block();
		b.x = p[0];
		b.y = p[1];
		b.lives = p[2];
		blocks.push(b);
	}
	return {block:blocks};
};

var getMousePos = function(canvas,e){
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
};	

var enableDebugMode = function(enable,b,ball,game){
	if(!enable){
		return;
	}
	//关卡功能和暂停功能
	window.addEventListener('keydown',function(e){
		var pause = false;
		var k = e.key;
		if('1234567'.includes(k)){
			b.blocks = loadLevel(Number(k)).block;
		} else if(k === 'p'){
			pause = true;
			if(pause){
				ball.fired = false;
			}
		}
	});
	//小球拖拽功能
	var enableDrag = false;
	var pos = {};
	game.canvas.addEventListener('mousedown',function(e){
		pos = getMousePos(game.canvas,e);
		var dis = Math.sqrt(Math.pow((pos.x - ball.x),2) + Math.pow((pos.y - ball.y),2));
		if(dis <= ball.r){
			enableDrag = true;
		}
	});
	game.canvas.addEventListener('mousemove',function(e){
		if(enableDrag){
			game.canvas.style.cursor = 'move';
			var p = getMousePos(game.canvas,e);
			var diffX = p.x - pos.x;
			var diffY = p.y - pos.y;
			if(!ball.cross()){
				ball.x += diffX;
				ball.y += diffY;
			}
			pos = p;
		}
	});
	window.addEventListener('mouseup',function(e){
		enableDrag = false;
		game.canvas.style.cursor = 'default';
		if(ball.cross()){
			ball.moveInside()
		}
	});
	//调节小球速度
	var range = document.querySelector('#id-range-speed');
	range.addEventListener('input',function(e){
		window.fps = e.target.value;
	});
};