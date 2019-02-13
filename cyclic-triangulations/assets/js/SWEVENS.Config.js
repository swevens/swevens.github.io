
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
 * @Struct CONFIG
 * --------------------
 */	
	
	// VARIANCE = phase shift variance <angle shift per level>
	// GROWTH_RATE = multiplying factor per level
	// DECAY_RATE = fade out alpha
	// PARTICLE_DENSITY - Nodes Particle per level
	// LEVEL_GAP - ganeration gap 
	// ENTROPY = size variance factor of various triangles of same level
	// COLORS  = Array
	// DISTANCE_FROM_CENTER = distance from center
	// SIZE = perpendicular & side
	
	//color codes from kuler
SWEVENS.CONFIG  = {
	COLORS: {
			 PeacockBlues:[[222,153,72],[38,135,166],[77,87,112],[252,255,246],[161,112,57]],
   		     Retro:[[145,156,134],[158,55,62],[43,46,54],[209,185,147],[196,90,59]],
	 	     Festival:[[349,99,63],[25,86,83],[177,42,76],[350,65,46],[185,19,40],[46,75,70],[153,22,60]],
			 PinkHues: [[61,13,38],[102,10,62],[137,28,86],[176,39,111],[201,52,130]],
			 NewVibgyor: [[176,44,9],[255,203,0],[102,0,153],[9,107,176],[8,116,27]],
			 ModernGraffiti: [[2,150,163],[73,204,200],[255,211,78],[218,158,54],[212,64,38]],
			 GreyChrome:  [[118,117,122],[149,152,161],[252,252,255],[88,87,93]],
			 BlueBits:[[0,125,255],[51,51,51],[0,73,240],[0,0,0],[255,255,255]],
			 YellowHues:[[255,224,88],[241,178,0],[241,147,0],[228,148,0],[255,171,3]],
			 SeaViolet:[[181,221,121],[50,68,24],[112,145,65],[56,1,68],[130,65,145]],
			 Browns:[[235,169,96],[94,68,39],[158,114,65],[171,123,70],[133,96,55]]
	},
	COLOR_SCHEMES: ['PeacockBlues','Retro','Festival','PinkHues','NewVibgyor','ModernGraffiti','GreyChrome','BlueBits','YellowHues','SeaViolet','Browns'],
	PRESETS: {
		 Sunflower : 	{INSET: false, PARTICLE_DENSITY: 64, DISTANCE_FROM_CENTER: 100, TRIANGLE_RATIO: 0.7, SIZE: 15, GROWTH_RATE: 3, DECAY_RATE: 5, LEVEL_GAP:5, ENTROPY: 1.0, VARIANCE: 0.9, COLOR:'YellowHues'},
		 DigitalFlower : {INSET: false, PARTICLE_DENSITY: 16, DISTANCE_FROM_CENTER: 30, TRIANGLE_RATIO: .5, SIZE: 15, GROWTH_RATE: 2, DECAY_RATE: 5, LEVEL_GAP:0, ENTROPY: 0.1, VARIANCE: 0.3, COLOR:'BlueBits'},
		 Dandelion : {INSET: false, PARTICLE_DENSITY: 31, DISTANCE_FROM_CENTER: 0, TRIANGLE_RATIO: 0.8, SIZE: 5, GROWTH_RATE: 4, DECAY_RATE: 5, LEVEL_GAP:0, ENTROPY: 0.1, VARIANCE: 0.2, COLOR:'YellowHues'},
		 Dahlia : 	 {INSET: false, PARTICLE_DENSITY: 50, DISTANCE_FROM_CENTER: 10, TRIANGLE_RATIO: 0.7, SIZE: 5, GROWTH_RATE: 5, DECAY_RATE: 5, LEVEL_GAP:5, ENTROPY: 0.4, VARIANCE: 0.2, COLOR:'PinkHues'},
		 Corals : {INSET: false, PARTICLE_DENSITY: 32, DISTANCE_FROM_CENTER: 0, TRIANGLE_RATIO: 0.4, SIZE: 3, GROWTH_RATE: 2, DECAY_RATE: 5, LEVEL_GAP:2, ENTROPY: 1.0, VARIANCE: 0.4, COLOR:'SeaViolet'},
		 FliudSpikes : {INSET: false, PARTICLE_DENSITY: 32, DISTANCE_FROM_CENTER: 40, TRIANGLE_RATIO: 1, SIZE: 5, GROWTH_RATE: 7, DECAY_RATE: 5, LEVEL_GAP:0, ENTROPY: 0.1, VARIANCE: 0.1, COLOR:'PeacockBlues'},
		 MetalSpikes : {INSET: false, PARTICLE_DENSITY: 12, DISTANCE_FROM_CENTER: 5, TRIANGLE_RATIO: .9, SIZE: 5, GROWTH_RATE: 4, DECAY_RATE: 5, LEVEL_GAP:8, ENTROPY: 0.1, VARIANCE: 0.1, COLOR:'GreyChrome'},
		 ExplosionPainting : {INSET: false, PARTICLE_DENSITY: 128, DISTANCE_FROM_CENTER: 1, TRIANGLE_RATIO: 1, SIZE: 3, GROWTH_RATE: 15, DECAY_RATE: 5, LEVEL_GAP:0, ENTROPY: 1.0, VARIANCE: 0.8, COLOR:'YellowHues'},
    	 IllusionSwrils1 : {INSET: false, PARTICLE_DENSITY: 24, DISTANCE_FROM_CENTER: 1, TRIANGLE_RATIO: .7, SIZE: 7, GROWTH_RATE: 9, DECAY_RATE: 5, LEVEL_GAP:0, ENTROPY: 0.1, VARIANCE: 0.1, COLOR:'Retro'},
		 IllusionSwrils2 : {INSET: false, PARTICLE_DENSITY: 16, DISTANCE_FROM_CENTER: 1, TRIANGLE_RATIO: .5, SIZE: 10, GROWTH_RATE: 5, DECAY_RATE: 5, LEVEL_GAP:5, ENTROPY: 0.1, VARIANCE: 1.0, COLOR:'PeacockBlues'},
		 IllusionSwrils3 : {INSET: false, PARTICLE_DENSITY: 28, DISTANCE_FROM_CENTER: 20, TRIANGLE_RATIO: .6, SIZE: 2, GROWTH_RATE: 10, DECAY_RATE: 5, LEVEL_GAP:10, ENTROPY: 0.8, VARIANCE: 1.0, COLOR:'ModernGraffiti'},
		 Retro : {INSET: false, PARTICLE_DENSITY: 10, DISTANCE_FROM_CENTER: 1, TRIANGLE_RATIO: 0.5, SIZE: 1, GROWTH_RATE: 15, DECAY_RATE: 5, LEVEL_GAP:10, ENTROPY: 0.1, VARIANCE: 0.1, COLOR:'Retro'},
		 RetroIllusion : {INSET: false, PARTICLE_DENSITY: 8, DISTANCE_FROM_CENTER: 1, TRIANGLE_RATIO: .5, SIZE: 5, GROWTH_RATE: 7, DECAY_RATE: 5, LEVEL_GAP:5, ENTROPY: 0.1, VARIANCE: 0.1, COLOR:'ModernGraffiti'},
		 Rangoli : {INSET: false, PARTICLE_DENSITY: 16, DISTANCE_FROM_CENTER: 1, TRIANGLE_RATIO: 0.5, SIZE: 2, GROWTH_RATE: 2, DECAY_RATE: 5, LEVEL_GAP:25, ENTROPY: 0.1, VARIANCE: 1.0, COLOR:'Festival'},
		 HydronCore : {INSET: false, PARTICLE_DENSITY: 64, DISTANCE_FROM_CENTER: 1, TRIANGLE_RATIO: 1.0, SIZE: 1, GROWTH_RATE: 1, DECAY_RATE: 5, LEVEL_GAP:9, ENTROPY: 0.8, VARIANCE: 0.5, COLOR:'NewVibgyor'}
	},
	COLOR : [],
	PARTICLE_DENSITY     : 32,
	DISTANCE_FROM_CENTER :  32,
	TRIANGLE_RATIO       :  1.0,
	SIZE  		:  15,
	GROWTH_RATE :  1,
	DECAY_RATE  :  1,
	LEVEL_GAP   :  0,
	ENTROPY     :  0.1,
	VARIANCE 	:  0.1,
	LIVE_DRAW	: false
	};

/**
 * --------------------
 * CONSTS & Utils
 * --------------------
 */
var PI           = Math.PI;
var TWO_PI       = Math.PI * 2;
var HALF_PI      = Math.PI / 2;
var NODES     = [];
 
function random(min, max) {
	return min + Math.random() * (max - min);
}