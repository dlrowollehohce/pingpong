class Game {
	constructor(callback){
		this.callback = callback;
		this.scene = null;
		this.actions = {};
		this.keydowns = {};
		this.canvas = document.getElementById('id-canvas');
		this.ctx = this.canvas.getContext('2d');
		window.addEventListener('keydown',e => {
		this.keydowns[e.key] = true;
		});
		window.addEventListener('keyup',e => {
		this.keydowns[e.key] = false;
		});
		window.fps = 50;
		callback(this);
	}
	registerActions(key,callback){
		this.actions[key] = callback;
	}
	drawPaddle(obj){
		this.ctx.fillStyle = '#DC143C';
		this.ctx.fillRect(obj.x,obj.y,obj.w,obj.h);
	}
	drawBall(obj){
		this.ctx.fillStyle = '#0000CD';
	 	this.ctx.beginPath();
		this.ctx.arc(obj.x,obj.y,obj.r,0,Math.PI*2,true);
		this.ctx.fill();
	}
	drawBlock(obj){
		if(obj.lives == 1){
			this.ctx.fillStyle = '#CDCD00';
		} else if(obj.lives == 2){
			this.ctx.fillStyle = '#D2691E';
		} else if(obj.lives == 3){
			this.ctx.fillStyle = '#C71585';
		}
		this.ctx.fillRect(obj.x,obj.y,obj.w,obj.h);
	}
	drawScore(score){
		this.ctx.fillStyle = '#000000';
		this.ctx.font = "16px serif";
		this.ctx.fillText('score: '+score ,5,195);
	}
	update(){
		this.scene.update();
	}
	draw(){
		this.scene.draw();
	}
	runloop(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		var keys = Object.keys(this.actions);
		for (var i = 0,l = keys.length; i < l; i++) {
			var k = keys[i];
			//如果按键被按下，执行对应的事件处理函数
			if(this.keydowns[k]){
				this.actions[k]();
			}
		}
		this.draw();
		this.update();
		setTimeout(() => {
			this.runloop();
		},1000/window.fps);
	}
	runWithScene(scene){
		this.scene = scene;
		setTimeout(() => {
			this.runloop();
		},1000/window.fps);
	}
	replaceScene(scene){
		this.scene = scene;
	}
}


// var Game = function(callback){
// 	var canvas = document.getElementById('id-canvas');
// 	var ctx = canvas.getContext('2d');
// 	var o = {
// 		scene: null,
// 		keydowns: {},
// 		actions: {}
// 	};

// 	o.canvas = canvas;
// 	o.ctx = ctx;
// 	o.drawPaddle = function(obj){
// 		o.ctx.fillStyle = '#DC143C';
// 		o.ctx.fillRect(obj.x,obj.y,obj.w,obj.h);
// 	};
// 	o.drawBall = function(obj){
// 		o.ctx.fillStyle = '#0000CD';
// 	 	o.ctx.beginPath();
// 		o.ctx.arc(obj.x,obj.y,obj.r,0,Math.PI*2,true);
// 		o.ctx.fill();
// 	};
// 	o.drawBlock = function(obj){
// 		if(obj.lives == 1){
// 			o.ctx.fillStyle = '#CDCD00';
// 		} else if(obj.lives == 2){
// 			o.ctx.fillStyle = '#D2691E';
// 		} else if(obj.lives == 3){
// 			o.ctx.fillStyle = '#C71585';
// 		}
// 		o.ctx.fillRect(obj.x,obj.y,obj.w,obj.h);
// 	};
// 	o.drawScore = function(score){
// 		o.ctx.fillStyle = '#000000';
// 		o.ctx.font = "16px serif";
// 		o.ctx.fillText('score: '+score ,5,195);
// 	};
// 	o.update = function(){
// 		o.scene.update();
// 	};
// 	o.draw = function(){
// 		o.scene.draw();
// 	};

// 	//events
// 	//存储按键按下时的状态为true，松开时状态为false
// 	window.addEventListener('keydown',function(e){
// 		o.keydowns[e.key] = true;
// 	});
// 	window.addEventListener('keyup',function(e){
// 		o.keydowns[e.key] = false;
// 	});
// 	//存储按键和对应的事件处理函数，在__main函数中注册
// 	o.registerActions = function(key,callback){
// 		o.actions[key] = callback;
// 	};
// 	//timer
// 	window.fps = 50;
// 	o.runloop = function(){
// 		ctx.clearRect(0,0,canvas.width,canvas.height);
// 		var keys = Object.keys(o.actions);
// 		for (var i = 0,l = keys.length; i < l; i++) {
// 			var k = keys[i];
// 			//如果按键被按下，执行对应的事件处理函数
// 			if(o.keydowns[k]){
// 				o.actions[k]();
// 			}
// 		}
// 		o.draw();
// 		o.update();
// 		setTimeout(function(){
// 			o.runloop();
// 		},1000/window.fps);
// 	};
// 	o.runWithScene = function(scene){
// 		o.scene = scene;
// 		setTimeout(function(){
// 			o.runloop();
// 		},1000/window.fps);
// 	};
// 	o.replaceScene = function(scene){
// 		o.scene = scene;
// 	};
	

// 	callback(o);

// 	// setInterval(function(){
// 	// 	ctx.clearRect(0,0,canvas.width,canvas.height);
// 	// 	var keys = Object.keys(o.actions);
// 	// 	for (var i = 0,l = keys.length; i < l; i++) {
// 	// 		var k = keys[i];
// 	// 		//如果按键被按下，执行对应的事件处理函数
// 	// 		if(o.keydowns[k]){
// 	// 			o.actions[k]();
// 	// 		}
// 	// 	}
// 	// 	o.draw();
// 	// 	o.update();
// 	// },1000/fps);

	
// 	return o;
// }