var Ball = function(){
	var o = {
		x : 90,
		y : 90,
		r : 10,
		speedX : 5,
		speedY : 5,
		fired: false,

		bounceX: function(){
			this.speedX *= -1;
			return true;
		},
		bounceY: function(){
			this.speedY *= -1;
			return true;
		},
		move: function(){
			if(this.fired){
				if(this.x - this.r < 0 || this.x + this.r > 400){
					this.bounceX();
				}
				if(this.y - this.r < 0 || this.y + this.r > 200){
					this.bounceY();
				}
				this.x += this.speedX;
				this.y += this.speedY;
			}
		},
		fire: function(){
			this.fired = true;
		},
		cross: function(){
			if(this.x - this.r >= 0 && this.x + this.r <= 400){
				if(this.y - this.r >= 0 && this.y + this.r <= 200)
					return false;
			}
			return true;

		},
		moveInside: function(){
			if(this.x < this.r){
				this.x = this.r;
			} else if(this.x + this.r > 400){
				this.x = 400 - this.r;
			} 
			if(this.y < this.r){
				this.y = this.r;
			} else if(this.y + this.r > 200){
				this.y = 200 - this.r;
			}
		}
	};
	return o;
}