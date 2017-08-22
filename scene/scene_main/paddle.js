var Paddle = function(){
	var o = {
		x : 80,
		y : 150,
		w : 100,
		h : 20,
		speed : 15,

		moveLeft: function(){
			if(this.x > this.speed){
				this.x -= this.speed;
			}else {
				this.x = 0;
			}
			
			
		},
		moveRight: function(){
			if(400 - this.x - this.w > this.speed){
				this.x += this.speed;
			}else {
				this.x = 400 - this.w;
			}
					
		 }

	};
	return o;
}