var Block = function(){
	var o = {
		x : 20,
		y : 50,
		w : 20,
		h : 20,
		alive : true,
		lives : 1,
		kill : function(){
			this.lives--;
			if(this.lives < 1){
				this.alive = false;
			}
		}
	};
	return o;
}