var Util=function(){};

Util.randomRange=function(min,max){
	if(isNaN(max)){
		max=min;
		min=0;
	}
	return min + Math.random() * (max - min);//Math.floor(Math.random() * (max - min + 1)) + min;
};

Util.componentToHex=function(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
};

Util.rgbToHex=function(r, g, b) {
	return "#" + Util.componentToHex(r) + Util.componentToHex(g) + Util.componentToHex(b);
};

Util.randomArr=function(len){
	var num=[],randomNum=[];
	for(var i=0;i<len;i++){
		num.push(i);
	}
	var length=len,j=0;

	while(length--){
		j = Math.floor(Math.random() * (length + 1));
		randomNum.push(num[j]);
		num.splice(j, 1);
	}
	return randomNum;
};

Util.getMaxMin=function(arr){
	var obj={};
	max = arr[0];
	min = arr[0];
	for (var i = 1; i < arr.length; i++) {
		if (arr[i] > max) {
			max = arr[i];
		}
		if (arr[i] < min) {
			min = arr[i];
		}
	}

	obj.max = max;
	obj.min = min;
	return obj;
};

Util.getCount=function(arr){
	var obj=Util.getMaxMin(arr);
	var minCounter=0;
	var maxCounter=0;
	var output;
	for (var i = 0; i < arr.length; i++) {
		if(arr[i]==obj.max){
			maxCounter++;
		}else if(arr[i]==obj.min){
			minCounter++;
		}
	}
	output={minCount:minCounter,maxCount:maxCounter};
	return output;
};

Util.lineDistance=function(point1,point2){
	var xs = 0;
	var ys = 0;
	xs = point2.x - point1.x;
	xs = xs * xs;
	ys = point2.y - point1.y;
	ys = ys * ys;
	return Math.sqrt(xs + ys);
};

Util.getLocationColor=function(location,model) {
        if (!location) {
            return "rgba(255,255,255,1)";
        }
        location = location.toUpperCase();
        //var color;
        for (var item in model) {
            var loc = appModel.getInstance().locationData()[item].location.toString().toUpperCase();
            if (location.match(loc) != null) {
                return "rgba(" + appModel.getInstance().locationData()[item].color + ")";
            }
        }
        return "rgba(255,255,255,1)";
    }

Util.hexToRGB = function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ?
                {
                    r: parseInt(result[1], 16),
                    b: parseInt(result[2], 16),
                    g: parseInt(result[3], 16)
                }
        : null;
}



Object.defineProperty(Array.prototype, 'random', {
    enumerable: false,
    value: function() { return this[Math.floor(Math.random() * this.length)]; }
});

Object.defineProperty(String.prototype, 'replaceAt',{
     enumerable: false,
    value: function(index, character) {  return this.substr(0, index) + character + this.substr(index+character.length); }
});