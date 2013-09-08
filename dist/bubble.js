(function() {
	game.bubble = {
		id: null,
		x: null,
		y: null,
		diameter: null,
		velocity: {},
		create: function(id, x, y, diameter) {
			this.id = id;
			this.x = x;
			this.y = y;
			this.diameter = diameter;

			this.velocity = Object.create({
				x: Math.floor(Math.random() * 10) - 5,
				y: Math.floor(Math.random() * 10) - 5
			});

			this.type = id % 2 === 1;
		},
		collide: function() {
			for (var i = this.id + 1; i < game.config.numbubbles; i++) {
				var dx = game.bubbles[i].x - this.x,
					dy = game.bubbles[i].y - this.y,
					distance = Math.sqrt(dx*dx + dy*dy),
					minDist = game.bubbles[i].diameter/2 + this.diameter/2;

				var maxVelocity = game.config.maxVelocity,
					spring = game.config.spring,
					bubbles = game.bubbles;

				if (distance <= minDist) {
					var angle = Math.atan2(dy, dx),
						targetX = this.x + Math.cos(angle) * minDist,
						targetY = this.y + Math.sin(angle) * minDist,
						ax = (targetX - game.bubbles[i].x) * spring,
						ay = (targetY - game.bubbles[i].y) * spring;

					this.velocity.x -= ax;
					this.velocity.y -= ay;
					if (Math.abs(this.velocity.x) > maxVelocity) {
						this.velocity.x = Math.abs(this.velocity.x) / this.velocity.x * maxVelocity
					}
					if (Math.abs(this.velocity.y) > maxVelocity) {
						this.velocity.y = Math.abs(this.velocity.y) / this.velocity.y * maxVelocity
					}

					bubbles[i].velocity.x += ax;
					bubbles[i].velocity.y += ay;

					if (Math.abs(bubbles[i].velocity.x) > maxVelocity) {
						bubbles[i].velocity.x = Math.abs(bubbles[i].velocity.x) / bubbles[i].velocity.x * maxVelocity
					}
					if (Math.abs(bubbles[i].velocity.y) > maxVelocity) {
						bubbles[i].velocity.y = Math.abs(bubbles[i].velocity.y) / bubbles[i].velocity.y * maxVelocity
					}
				}
			}
		},
		move: function() {
			this.x += this.velocity.x;
			this.y += this.velocity.y;

			if ((this.x + this.diameter/2) > game.width) {
				this.x = game.width - this.diameter/2;
				this.velocity.x = this.velocity.x * game.config.friction;
			} else if ((this.x - this.diameter/2) < 0) {
				this.x = this.diameter/2;
				this.velocity.x = this.velocity.x * game.config.friction;
			}

			if ((this.y + this.diameter/2) > game.height) {
				this.y = game.height - this.diameter/2;
				this.velocity.y = this.velocity.y * game.config.friction;
			} else if ((this.y - this.diameter/2) < 0) {
				this.y = this.diameter/2;
				this.velocity.y = this.velocity.y * game.config.friction;
			}
		},
		render: function() {
			game.gfx.drawBubble(this.x, this.y, this.diameter, this.type);
		}
	}

}());