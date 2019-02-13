
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
 * @Class NODE
 * --------------------
 */
//centerX, centerY, angle projected by midpoint on triangle base to the center, color, level/generation, decay Variable, size, growthRate, distance of midpoint from center, triangleRatio, gap between multiple levels, entropy
SWEVENS.NODE = function(orignX, orignY, theta, color, level, scale, size, growthRate, distanceFromCenter, triangleRatio, levelGap, entropy) {
	this.fractalCenterX = orignX;
	this.fractalCenterY = orignY;
	this.midx        = NaN;
	this.midy        = NaN;
	this.x1          = NaN;
	this.x2          = NaN;
	this.y1          = NaN;
	this.y2          = NaN;
	this.x3          = NaN;
	this.y3          = NaN;
	this.level  	 = level || 1;
	this.altitude	 = 8 + growthRate/5  + (level-1) * growthRate * growthRate * size  * triangleRatio / 10 ;
	this.baseSideBy2 = 4 + growthRate/5  + (level-1) * growthRate * growthRate * size  * (1 - triangleRatio) / 10;
	this.distanceFromCenter = distanceFromCenter + this.altitude / growthRate  + (level-1) * levelGap;
	this.theta 		 = theta;
	this.entropy 	 = entropy;
	this.growing     = true;
	this.color		 = color;
}

SWEVENS.NODE.prototype = {
	
	update: function() {
		if(this.growing) {
			//add entropy
			this.altitude += this.entropy*this.altitude;
			this.baseSideBy2 += this.entropy*this.baseSideBy2;
			//incase 
			if( this.baseSideBy2 > this.altitude * 0.8) 
				this.baseSideBy2 = this.altitude * 0.8;
				
			var cosTheta = Math.cos(this.theta);
			var sinTheta = Math.sin(this.theta);
			
			var altSq = this.altitude*this.altitude;
			var baseSq = this.baseSideBy2*this.baseSideBy2;
			
			this.midx = this.fractalCenterX + (this.distanceFromCenter)	*cosTheta;
			this.midy = this.fractalCenterY + (this.distanceFromCenter)	*sinTheta;
			//co-ord of vertex with non-similar angle
			this.x1 = this.fractalCenterX + (this.distanceFromCenter + this.altitude)*cosTheta;
			this.y1 = this.fractalCenterY + (this.distanceFromCenter + this.altitude)*sinTheta;
			
			var radSq =  altSq + baseSq;
			var rad = Math.sqrt(radSq);
			//calculating half angle from cosine forula for triangles
			var angle =  Math.acos((altSq + radSq - baseSq)/(2*this.altitude*rad)) + this.theta ;
			var angle2 = TWO_PI - Math.acos((altSq + radSq - baseSq)/(2*this.altitude*rad)) + this.theta;
			//other 2 vertex sides
			this.x2 = this.x1 - Math.cos(angle) * rad;
			this.y2 = this.y1 - Math.sin(angle) * rad;
			this.x3 = this.x1 - Math.cos(angle2) * rad;
			this.y3 = this.y1 - Math.sin(angle2) * rad;
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
			context.lineWidth = 0.5;
			context.strokeStyle = '#000';
			context.lineCap = 'round';
			context.fillStyle = 'rgb(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')';
			context.fill();
			context.stroke();
			context.closePath();
			context.restore();
		}	
	},

	destroy: function() {
		this.growing = false;
	}
};