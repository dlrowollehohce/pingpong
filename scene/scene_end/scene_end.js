// var SceneEnd = function(game){
// 	var o ={};
// 	o.update = function(){};
// 	o.draw = function(){
// 		game.ctx.fillStyle = '#778899';
// 		game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
// 		game.ctx.fillStyle = '#000000';
// 		game.ctx.font = "48px serif";
// 		game.ctx.fillText('GAME OVER' ,50,100);
// 		game.ctx.font = "18px serif";
// 		game.ctx.fillText('press r to restart' ,130,120);

// 	};
// 	game.registerActions('r',function(){
// 		var start = new SceneStart(game);
// 		game.replaceScene(start);
// 	});
// 	return o;
// };

class SceneEnd extends Scene {
	constructor(game){
		super(game);
		game.registerActions('r',function(){
		var start = new SceneStart(game);
		game.replaceScene(start);
		});
	}
	draw(){
		this.game.ctx.fillStyle = '#778899';
		this.game.ctx.fillRect(0,0,this.game.canvas.width,this.game.canvas.height);
		this.game.ctx.fillStyle = '#000000';
		this.game.ctx.font = "48px serif";
		this.game.ctx.fillText('GAME OVER' ,50,100);
		this.game.ctx.font = "18px serif";
		this.game.ctx.fillText('press r to restart' ,130,120);
	}
}




