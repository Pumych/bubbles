var game = {};


(function() {
	game.config = Object.freeze({
		numbubbles: 6,
		spring: 0.15,
		friction: -1,
		maxVelocity: 10
	});

	game.width = 640;
	game.height = 480;
	game.bubbles = [];

	game.init = function() {
		game.gfx.setup(game.width, game.height);

		for (var i = 0; i < game.config.numbubbles; i++) {
			game.bubbles[i] = Object.create(game.bubble);
			game.bubbles[i].create(i, Math.floor(Math.random() * game.width), Math.floor(Math.random() * game.height), Math.floor(Math.random() * 30) + 80, game.bubbles);
		}

		setInterval(function() {
			game.draw();
		}, 25);
	};

	game.draw = function() {
		game.gfx.cls();

		for (var i = 0; i < game.config.numbubbles; i++) {
			game.bubbles[i].collide();
			game.bubbles[i].move();
			game.bubbles[i].render();
		}
	};
}());

window.onload = game.init;