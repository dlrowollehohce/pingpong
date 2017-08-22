class SceneMain extends Scene {
	constructor(game){
		super(game);
		this.paddle = Paddle();
		this.ball = Ball();
		this.b = {
					blocks:[]
				};
		this.score = 0;
		this.game.registerActions('a',() => {
			this.paddle.moveLeft();
		});
		this.game.registerActions('d',() => {
			this.paddle.moveRight();
		});
		this.game.registerActions('f',() => {
			this.ball.fire();
		});
		enableDebugMode(true,this.b,this.ball,this.game);
	}
	update(){
		this.ball.move(this.ball.speedX, this.ball.speedY);
		if(this.ball.y > this.paddle.y){
			var end = new SceneEnd(this.game);
			this.game.replaceScene(end);
			var div = document.querySelector('#id-div');
			div.style.visibility = "hidden";
		}
		ballIntersectRect(this.ball,this.paddle);
		for(var i = 0,l = this.b.blocks.length; i < l; i++){
			//如果block已经消失就不判断其是否与ball相撞
			if(this.b.blocks[i].alive){
				var collide = ballIntersectRect(this.ball,this.b.blocks[i]);
				if(collide){
					this.b.blocks[i].kill();
					this.score += 100;
				}
			}
		}
	}
	draw(){
		this.game.ctx.fillStyle = '#778899';
		this.game.ctx.fillRect(0,0,this.game.canvas.width,this.game.canvas.height);
		this.game.drawPaddle(this.paddle);
		this.game.drawBall(this.ball);
		for(var i = 0; i < this.b.blocks.length; i++){
			if(this.b.blocks[i].alive){
				this.game.drawBlock(this.b.blocks[i]);
			}
		}
		this.game.drawScore(this.score);
	}
}


// var SceneMain = function(game){
// 	var paddle = Paddle();
// 	var ball = Ball();
// 	var o = {
// 		game: game,
// 		paddle: paddle,
// 		ball: ball,
// 		b: {blocks: []}
// 	};
// 	var score = 0;
// 	o.update = function(){
// 		ball.move(ball.speedX, ball.speedY);
// 		if(ball.y > paddle.y){
// 			var end = new SceneEnd(game);
// 			o.game.replaceScene(end);
// 			var div = document.querySelector('#id-div');
// 			div.style.visibility = "hidden";
// 		}
// 		ballIntersectRect(ball,paddle);
// 		for(var i = 0,l = o.b.blocks.length; i < l; i++){
// 			//如果block已经消失就不判断其是否与ball相撞
// 			if(o.b.blocks[i].alive){
// 				var collide = ballIntersectRect(ball,o.b.blocks[i]);
// 				if(collide){
// 					o.b.blocks[i].kill();
// 					score += 100;
// 				}
// 			}
// 		}
// 	};
// 	o.draw = function(){
// 		game.ctx.fillStyle = '#778899';
// 		game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
// 		game.drawPaddle(paddle);
// 		game.drawBall(ball);
// 		for(var i = 0; i < o.b.blocks.length; i++){
// 			if(o.b.blocks[i].alive){
// 				game.drawBlock(o.b.blocks[i]);
// 			}
// 		}
// 		game.drawScore(score);
// 	};
// 	game.registerActions('a',function(){
// 		paddle.moveLeft();
// 	});
// 	game.registerActions('d',function(){
// 		paddle.moveRight();
// 	});
// 	game.registerActions('f',function(){
// 		ball.fire();
// 	});
// 	enableDebugMode(true,o.b,o.ball,game);
// 	return o;
// }

