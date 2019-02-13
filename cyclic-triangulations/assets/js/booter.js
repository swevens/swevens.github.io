$(document).ready(function(){
    
	var controls = $('#controls');
	var canvas = $('#canvas');
	
	var recursionController = new SWEVENS.Recursion();
	var colorPicker;

	var presets = {preset:''}, preset={};
	for(var j in SWEVENS.CONFIG.PRESETS) {preset[j] = j;}

	// control buttons
	var stopButton = $('<div>');
	var createText = $('<div>');
	var counter = $('<div>');
	var control = $('<div>');
	control.css({
				float: 'left',
				position: 'absolute',
				top: 0,
				padding: 0,
				margin: 0,
				color: '#ffffff',
				'font-size': '10px'
			});
	createText.css({
				float: 'left',
				padding: '3px 10px 3px 10px',
				margin: 3,
				width: 75,
				height: 15,
				color: '#999999',
				background: '#333333'
			});
	stopButton.css({
				float: 'left',
				padding: '3px 10px 3px 10px',
				margin: 3,
				width: 90,
				height: 15,
				background: '#333333',
				cursor: 'pointer'
			});
	counter.css({
				float: 'left',
				padding: '3px 10px 3px 10px',
				margin: 3,
				width: 120,
				height: 15,
				background: '#333333',
			});
	counter.append('Active Triangles: 0000');		
	stopButton.append('Stop Generating');
	stopButton.click(function(){
			recursionController.stopGen();
	});
	createText.append('Click to create');
	
	control.append(createText);
	control.append(stopButton);
	control.append(counter);
	$('body').append(control);
	
	// GUI & Recursion
	
	//preinit
	var temporaryPreset = SWEVENS.CONFIG.PRESETS["Sunflower"];
	SWEVENS.CONFIG.PARTICLE_DENSITY     = temporaryPreset.PARTICLE_DENSITY;
	SWEVENS.CONFIG.DISTANCE_FROM_CENTER = temporaryPreset.DISTANCE_FROM_CENTER;
	SWEVENS.CONFIG.SIZE 		  		= temporaryPreset.SIZE;
	SWEVENS.CONFIG.GROWTH_RATE    		= temporaryPreset.GROWTH_RATE;
	SWEVENS.CONFIG.DECAY_RATE     		= temporaryPreset.DECAY_RATE;
	SWEVENS.CONFIG.TRIANGLE_RATIO 		= temporaryPreset.TRIANGLE_RATIO;
	SWEVENS.CONFIG.LEVEL_GAP 	  		= temporaryPreset.LEVEL_GAP;
	SWEVENS.CONFIG.ENTROPY 		  		= temporaryPreset.ENTROPY;
	SWEVENS.CONFIG.VARIANCE 	  		= temporaryPreset.VARIANCE;
	SWEVENS.CONFIG.COLOR				= SWEVENS.CONFIG.COLORS[temporaryPreset.COLOR];
	
	var GUI = new dat.GUI({width: 400});
	GUI.add(presets, 'preset', preset).onChange(function(){
		var temporaryPreset2 = 	SWEVENS.CONFIG.PRESETS[presets.preset];
		
		SWEVENS.CONFIG.PARTICLE_DENSITY     = temporaryPreset2.PARTICLE_DENSITY;
		SWEVENS.CONFIG.DISTANCE_FROM_CENTER = temporaryPreset2.DISTANCE_FROM_CENTER;
		SWEVENS.CONFIG.SIZE 		  		= temporaryPreset2.SIZE;
		SWEVENS.CONFIG.GROWTH_RATE    		= temporaryPreset2.GROWTH_RATE;
		SWEVENS.CONFIG.DECAY_RATE     		= temporaryPreset2.DECAY_RATE;
		SWEVENS.CONFIG.TRIANGLE_RATIO 		= temporaryPreset2.TRIANGLE_RATIO;
		SWEVENS.CONFIG.LEVEL_GAP 	  		= temporaryPreset2.LEVEL_GAP;
		SWEVENS.CONFIG.ENTROPY 		  		= temporaryPreset2.ENTROPY;
		SWEVENS.CONFIG.VARIANCE 	  		= temporaryPreset2.VARIANCE;
		SWEVENS.CONFIG.COLOR				= SWEVENS.CONFIG.COLORS[temporaryPreset2.COLOR]
		colorPicker.setValue(temporaryPreset2.COLOR);
	});
	
	GUI.add(SWEVENS.CONFIG, 'LIVE_DRAW').listen();
	
	var folder = GUI.addFolder('Recursion Settings');
	colorPicker = folder.add(SWEVENS.CONFIG,'COLOR_SCHEMES', SWEVENS.CONFIG.COLOR_SCHEMES).listen();	
	colorPicker.onChange(function(value){SWEVENS.CONFIG.COLOR = SWEVENS.CONFIG.COLORS[value];});
	
	folder.add(SWEVENS.CONFIG, 'ENTROPY', 0.1, 1.0).step(0.1).listen();
	folder.add(SWEVENS.CONFIG, 'VARIANCE', 0.1 , 1.0).step(0.1).listen();
	folder.add(SWEVENS.CONFIG, 'DECAY_RATE',0,10).step(1).listen();
	folder.add(SWEVENS.CONFIG, 'GROWTH_RATE',1,20).step(1).listen();
	folder.add(SWEVENS.CONFIG, 'SIZE', 2, 50).step(1).listen();
	folder.add(SWEVENS.CONFIG, 'TRIANGLE_RATIO', 0.4, 1).step(0.1).listen();
	folder.add(SWEVENS.CONFIG, 'LEVEL_GAP',0,100).step(1).listen();
	folder.add(SWEVENS.CONFIG, 'DISTANCE_FROM_CENTER', 1, 150).step(1).listen();
	folder.add(SWEVENS.CONFIG, 'PARTICLE_DENSITY', 4, 128).step(1).listen();
	
	folder.open();
	GUI.add(recursionController, 'save').name('Save as PNG');
	GUI.add(recursionController, 'clear').name('Clear');
	
	
	colorPicker.setValue(temporaryPreset.COLOR);
	
	recursionController.preInit(canvas,counter);
	
});