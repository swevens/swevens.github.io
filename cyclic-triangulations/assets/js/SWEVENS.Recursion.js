
/**
 * Copyright (C) 2013 by Taran J Singh
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * --------------------
 * @Class Recursion
 * --------------------
 */

SWEVENS.Recursion = function() {

	var canvas;
	var context;
	
	var decay      = false;
	var started    = false;
	var fractalOX  = NaN;
	var fractalOY  = NaN;
	var level = 1;
	var color  = NaN;
	var particleDensity = NaN;
	var distanceFromCenter = NaN;
	var size = NaN;
	var growthRate = NaN;
	var decayRate = NaN;
	var triangleRatio = NaN;
	var levelGap = NaN;
	var variance = NaN;
	var entropy = NaN;
	var recursionIndex = 0;
	var colors = [];
	
	var counter;
	
	function update() {
		
		requestAnimFrame(update);
		
		//fadeout dead nodes
		
		if(SWEVENS.CONFIG.LIVE_DRAW)
		setProperties();
		
		if((recursionIndex++) % (decayRate) == 0){
		   context.beginPath();	
		   context.fillStyle = "rgba(0, 0, 0, 0.05)";
		   context.fillRect (0, 0, window.innerWidth, window.innerHeight);
		   context.closePath();
		}
		
		var count = NODES.length.toString();
		while(count.length < 4) { count = '0' + count; }
		counter.text('Active Triangles: ' + count);
		
		if(started){
			var i, n, branch;
			var theta, radius;
			
			// variance 0.9 (actual 1) means a phase shift
			if(variance != .9)
			theta = (TWO_PI) * (NODES.length / particleDensity) + random(0,variance) * level * HALF_PI / colors.length + HALF_PI * (level%4 + 1) ;
			else
			theta = (TWO_PI) * (NODES.length / particleDensity) +  level * PI / colors.length;
			
			color = colors[ NODES.length % colors.length ];
			
			var _node = new SWEVENS.NODE(fractalOX, fractalOY, theta, color, level, 1, size, growthRate, distanceFromCenter, triangleRatio, levelGap, random(0,entropy)/10) ;
			_node.update();
			NODES.push(_node);
			
			//draw reverse
			
			for(i = NODES.length-1, n = 0 ; i >= n; i--) {
				branch = NODES[i];
				branch.render(context);
				console.log(NODES.length);
			}
			
			//levelChange
			if(NODES.length % particleDensity == 0){
				level ++;
			}
		}
	}
	
	function onResize(e) {
		canvas.width  = window.innerWidth;
		canvas.height = window.innerHeight;	
	}
	
	function setProperties(){
	
		particleDensity = SWEVENS.CONFIG.PARTICLE_DENSITY;
		decayConstant = SWEVENS.CONFIG.DECAY_CONSTANT;
		distanceFromCenter = SWEVENS.CONFIG.DISTANCE_FROM_CENTER;
		size = SWEVENS.CONFIG.SIZE;
		growthRate = SWEVENS.CONFIG.GROWTH_RATE;
	 	decayRate = SWEVENS.CONFIG.DECAY_RATE;
		triangleRatio = SWEVENS.CONFIG.TRIANGLE_RATIO;
		levelGap = SWEVENS.CONFIG.LEVEL_GAP;
		variance = SWEVENS.CONFIG.VARIANCE - 0.1; //fix for dat.gui issue
		entropy = SWEVENS.CONFIG.ENTROPY - 0.1; //fix for dat.gui issue
		decayRate = SWEVENS.CONFIG.DECAY_RATE;
		colors = SWEVENS.CONFIG.COLOR;
		
	}
	
	function setVariables(){
		started = false;
		level = 1;
		decay = false;	
		
		setProperties();
	}
	
	function clean(){
		started = false;
			for(i = NODES.length-1, n = 0 ; i >= n; i--)
					NODES[i].destroy();
			NODES = [];
	}
	
	function onClick(e){
			clean();
			fractalOX    = e.clientX;
			fractalOY    = e.clientY;
			init();
	}
	
	function init(){
		setVariables();
		if(!started) {
			$(window).resize(onResize);
			started = true;
		}
	}
	return {
		clear: function() {
			clean();
			canvas.width = canvas.width;
		},
		preInit: function($canvas, $counter){
		   canvas = $canvas[0];
		   context = canvas.getContext('2d');
			 
		   counter = $counter; 
		   
		   fractalOX    = canvas.width/2;
		   fractalOY    = canvas.height/2;
			
		   $('#stage').click(onClick);
		   onResize();
		   // fill the canvas with black
		   context.beginPath();	
		   context.fillStyle = "rgba(0, 0, 0, 1)";
		   context.fillRect (0, 0, window.innerWidth, window.innerHeight);
	  	   context.closePath();
		   update();
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
			head.append($('<title>Cyclic Triangulations</title>'));
			body.append($('<img src="' + image + '"/>'));
			html.append(head);
			html.append(body);
			win.document.write('<!DOCTYPE html>' + html.html());
			win.document.close();
		},
		stopGen: function(){
			started = false;
			decayRate = 0;
			clean();
		}
	};
}