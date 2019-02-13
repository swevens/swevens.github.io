var CONFIG  = {
	COLORS: [
			 [222,153,72],[38,135,166],[77,87,112],[252,255,246],[161,112,57]
   		/*[145, 156, 134],[158,55,62],[43,46,54],[209,185,147],[196,90,59] 
	 	/*[349, 99, 63],[25,86,83],[177,42,76],[350, 65, 46],[185, 19, 40],[46,  75, 70],[153, 22, 60] */  
    ]
	};

/**
 * --------------------
 * CONSTS
 * --------------------
 */
var PI           = Math.PI;
var TWO_PI       = Math.PI * 2;
var HALF_PI      = Math.PI / 2;
var NODES     = [];

/**
 * --------------------
 * UTILS
 * --------------------
 */
 
function random(min, max) {
	return min + Math.random() * (max - min);
}

/**
 * --------------------
 * NODE
 * --------------------
 */
 //decayVar, init_size, growth_rate, center_space, shape_ratio, inter_space
SWEVENS.NODE = function(orignX, orignY, theta, color, generation, scale, decay, init_size, growth_rate, voidAtCenter, ratio, spacing, entropy) {
	this.fractalCenterX = orignX;
	this.fractalCenterY = orignY;
	this.midx        = 0;
	this.midy        = 0;
	this.x1          = 0;
	this.x2          = 0;
	this.y1          = 0;
	this.y2          = 0;
	this.x3          = 0;
	this.y3          = 0;
	this.generation  		 = generation || 1;
	this.altitude	         = 8 + (generation-1) * growth_rate * init_size  * ratio / 5 ;
	this.baseSideBy2         = 4 + (generation-1) * growth_rate * init_size  * (1 - ratio) / 5;
	this.voidAtCenter		 = voidAtCenter + this.altitude / growth_rate  + (generation-1) * spacing;
	this.theta 		 = theta;
	this.angle       = 0;
	this.angle2		 = 0;
	this.rad 		 = 0;
	this.entropy 	 = entropy;
	//implicit
	this.scale       = scale || 1.5;
	this.growing     = true;
	this.age         = 0;
	this.color		 = [Math.floor(color[0] - color[0] * decay), Math.floor(color[1] - color[1] * decay), Math.floor(color[2] - color[2] * decay)] ;
}

SWEVENS.NODE.prototype = {
	
	update: function() {
		
		if(this.growing) {
			
			//add entropy
			this.altitude += this.entropy*this.altitude;
			this.baseSideBy2 += this.entropy*this.baseSideBy2;
			
			//incase 
			if( this.baseSideBy2 > this.altitude) 
				this.baseSideBy2 = this.altitude;
			
			this.midx = this.fractalCenterX + (this.voidAtCenter)	*Math.cos(this.theta);
			this.midy = this.fractalCenterY + (this.voidAtCenter)	*Math.sin(this.theta);
			//co-ord of vertex with non-similar angle
			this.x1 = this.fractalCenterX + (this.voidAtCenter + this.altitude)*Math.cos(this.theta);
			this.y1 = this.fractalCenterY + (this.voidAtCenter + this.altitude)*Math.sin(this.theta);
			// pythagorus to calculate the equal sides
			this.rad =  Math.sqrt(this.altitude*this.altitude + this.baseSideBy2*this.baseSideBy2);
			//calculating half angle from cosine forula for triangles
			this.angle =  Math.acos((this.altitude*this.altitude + this.rad*this.rad - this.baseSideBy2*this.baseSideBy2)/(2*this.altitude*this.rad)) + this.theta ;
			this.angle2 = TWO_PI - Math.acos((this.altitude*this.altitude + this.rad*this.rad - this.baseSideBy2*this.baseSideBy2)/(2*this.altitude*this.rad)) + this.theta;
			//other 2 vertex sides
			this.x2 = this.x1 - Math.cos(this.angle) * this.rad;
			this.y2 = this.y1 - Math.sin(this.angle) * this.rad;
			this.x3 = this.x1 - Math.cos(this.angle2) * this.rad;
			this.y3 = this.y1 - Math.sin(this.angle2) * this.rad;
		}
	},

	render: function(context) {
		if(this.growing) {
			
			context.save();
			context.beginPath();	
			context.moveTo(this.x1, this.y1);
			context.lineTo(this.x1, this.y1);
			context.lineTo(this.x2, this.y2);
			context.lineTo(this.x3, this.y3);
			context.lineWidth = .5;
			context.strokeStyle = '#000';
			context.lineCap = 'round';
			context.fillStyle = 'rgb(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')';
			context.stroke();
			context.fill();
			context.closePath();
			context.restore();
		}	
	},

	destroy: function() {
	}
};

/**
 * --------------------
 * SKETCH
 * --------------------
 */

SWEVENS.Recursion = new function() {

	var decay      = false;
	var started      = false;
	var $canvas      = $('#canvas');
	var canvas       = $canvas[0];
	var context      = canvas.getContext('2d');
	var fractalOX    = canvas.width/2;
	var fractalOY    = canvas.height/2;
	var currentGeneration = 1;
	var color;
	
	
	var decayVar;
	var particle_d;
	var decay_c;
	var center_space;
	var init_size;
	var growth_rate;
	var decay_rate;
	var shape_ratio;
	var inter_space;
	var variance;
	var entropy;
	
	function update() {
		
		if(decayVar < decay_c)
			requestAnimFrame(update);
		else
			{
				cancelRequestAnimFrame(update);
				started = false;
				decay = false;
				for(i = NODES.length-1, n = 0 ; i >= n; i--) {
					NODES[i].destroy();
					//branch.destroy();
				}
				NODES = [];
				return;
			}
		
		var i, n, branch;
		var theta, radius;
		
		theta = (2*Math.PI) * (NODES.length / particle_d) + variance * currentGeneration * HALF_PI / CONFIG.COLORS.length;
		color = CONFIG.COLORS[ NODES.length % CONFIG.COLORS.length ];
		
		var _node = new SWEVENS.NODE(fractalOX, fractalOY, theta, color, currentGeneration, 1, decayVar, init_size, growth_rate, center_space, shape_ratio, inter_space, random(0,entropy)/10) ;
		_node.update();
		
		NODES.push(_node);
		_node.render(context);
		
		//draw reverse
		for(i = NODES.length-1, n = 0 ; i >= n; i--) {
			branch = NODES[i];
			branch.render(context);
			console.log(NODES.length);
		}

		if(NODES.length % particle_d == 0){
			currentGeneration ++;
			if(decay)
			{
				decayVar += CONFIG.DECAY_RATE * CONFIG.DECAY_RATE;
			}
		}
	}
	
	function onResize(e) {
		canvas.width  = window.innerWidth;
		canvas.height = window.innerHeight;	
	}
	
	function setVariables(){
		started = false;
		//NODES = [];
		decayVar = 0;
		currentGeneration = 1;
		decay = false;	
		
		particle_d = CONFIG.PARTICLE_DENSITY;
		decay_c = CONFIG.DECAY_CONSTANT;
		center_space = CONFIG.CENTER_SPACE;
		init_size = CONFIG.INITAL_SIZE;
		growth_rate = CONFIG.GROWTH_RATE;
	 	decay_rate = CONFIG.DECAY_RATE;
		shape_ratio = CONFIG.SHAPE_RATIO;
		inter_space = CONFIG.INTER_SPACE;
		variance = CONFIG.VARIANCE;
		entropy = CONFIG.ENTROPY;
	}
	
	function onClick(e){
		if(decay == false && started == true ) {
			decay = true;
		}
		if(decay == false && started == false){
			cancelRequestAnimFrame(update);
			fractalOX    = e.clientX;
			fractalOY    = e.clientY;
			Recursion.init();
		}
		
	}
	return {
		clear: function() {
			canvas.width = canvas.width;
		},
		preInit: function(){
			$('#stage').click(onClick);
			onResize();
			context.beginPath();	
			context.fillStyle = "rgba(0, 0, 0, 1)";
			context.fillRect (0, 0, window.innerWidth, window.innerHeight);
			context.closePath();
		},
		init: function() {
			setVariables();
			if(!started) {
				$(window).resize(onResize);
				started = true;
				update();
			}
			
			
		},
		save: function() {
			var image = canvas.toDataURL('image/png');
			var win = window.open('about:blank', '_blank', 'width=1000,height=700');
			var html = $('<html>');
			var head = $('<head>');
			var body = $('<body>');
			body.css({
				background: '#f2f2f2',
				padding: 0,
				margin: 0
			});
			head.append($('<title>Fractal triangles &raquo Right Click &amp; Save the Image Below</title>'));
			body.append($('<img src="' + image + '"/>'));
			html.append(head);
			html.append(body);
			win.document.write('<!DOCTYPE html>' + html.html());
			win.document.close();
		}
		
	};
}

function randomise() {
	
	// VARIANCE = phase shift variance <angle shift per level>
	// GROWTH_RATE rate = multiplying factor per level
	// DECAY_RATE rate = fade out alpha
	// PARTICLE_DENSITY - Nodes Particle per level
	// SPACING_FACTOR - ganeration gap 
	// ENTROPY = size variance factor of various triangles of same level
	// COLORS  = Array
	// CENTER_SPACE = distance from center
	// INITAL SIZE = perpendicular & side
	
	CONFIG.PARTICLE_DENSITY = 32;
	CONFIG.DECAY_CONSTANT = 1;
	CONFIG.CENTER_SPACE =  50;
	CONFIG.INITAL_SIZE =   15;
	CONFIG.GROWTH_RATE =    5;
	CONFIG.DECAY_RATE =   0.4;
	CONFIG.SHAPE_RATIO =   .5;
	CONFIG.INTER_SPACE =    0;
	CONFIG.ENTROPY 		  = 0;
	CONFIG.VARIANCE 	  = 0;
	
	var GUI = new DAT.GUI({width: 340});
	GUI.name('Pattern Settings');
	/**/GUI.add(CONFIG, 'DECAY_RATE').name('Decay Rate').min(0.0).max(1).step(0.02);
	/**/GUI.add(CONFIG, 'INTER_SPACE').name('Spacing').min(0).max(100).step(1);
	/**/GUI.add(CONFIG, 'GROWTH_RATE').name('Scale Factor').min(1).max(20).step(0.1);
	/**/GUI.add(CONFIG, 'ENTROPY').name('Entropy').min(0.0).max(1).step(0.01);
	/**/GUI.add(CONFIG, 'VARIANCE').name('Variance').min(0.0).max(1).step(0.01);
	/**/GUI.add(CONFIG, 'SHAPE_RATIO').name('Triangle Ratio').min(0.4).max(1).step(0.1);
	/**/GUI.add(CONFIG, 'CENTER_SPACE').name('Void').min(1).max(200).step(1);
	/**/GUI.add(CONFIG, 'INITAL_SIZE').name('Base Size').min(2).max(50).step(1);
	/**/GUI.add(CONFIG, 'PARTICLE_DENSITY').name('Density').min(16).max(64).step(1);
	GUI.add(SWEVENS.Recursion, 'save').name('Save as PNG');
	GUI.add(SWEVENS.Recursion, 'clear').name('Clear').onFire(SWEVENS.Recursion.reset);
	GUI.listenAll();
	SWEVENS.Recursion.preInit();
}
randomise();





//     color presets
//     multiple files
//     code cleanup
//--// mouse draws