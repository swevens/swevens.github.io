var Node=function(){
	var self=this;
	self.x=0;
	self.y=0;
	self.z=0;
	self.id=0;
	self.radius=10;
	self.skillWidth=10;
	self.beatRadius=0;
	self.startAngle=0;
	self.container=null;
	self.context=null;
	self.rad=null;
	
	self.SHADOW_WIDTH=3 + Math.random();
	self.NUCLEUS_SHADOW_WIDTH=8;
    self.origShadowAlpha = 0.7;
	self.SHADOW_ALPHA=0.6;
	self.LINE_WIDTH=1;
	self.STROKE_COLOR="#fff";
	self.theta=0;
	self.beatFrequency=0.02;
	self.nucleusBeatFrequency=0.008;
	self.nucleusBeatFrequency2=0.007;
	self.nucleusBeatFrequency3=0.005;

    self.beatIncrement = 1;
	self.nucleusBeatIncrement=0;
	self.nucleusShadowAlpha1=0.5;
	self.nucleusShadowAlpha2=0.6;
	self.nucleusShadowAlpha3=0.7;
	self.centralFill='rgba(255,255,255,0.7)';
	self.scaleFactor=0;
	self.scaleSteps=CONFIG.node_scale_steps;
	self.initRescale=false;
	self.centralFillAlpha=0.6;
	self.TWO_PI=Math.PI*2;
	self.PI=Math.PI;
	self.url="";
	self.cumulativeAngle = -Math.PI/2;
	self.spin = 0;

	var skillNum;
	self.skillArr=[];

	self.init=function(name,x,y,type,container,force,spin,widthMultiple,orbitRadius,variance,active,links){
		self.x=x;
		self.name = name;
		self.y=y;
		self.force = force;
		self.links = links;
		//console.log(active + name);
		 self.active = active;//==="true"?true:false;
		 //self.active = active||false;
		self.variance = variance;
		self.spin = spin == NaN ? 0:spin;
		self.widthMultiple = widthMultiple;

		self.rotateAnimation = 1;

		//self.radius = .8 * self.totalRadius;

		self.type = type;
		self.orbitRadius = orbitRadius;

		self.skillWidth = .2*self.totalRadius;
		self.container=container;
		self.context=self.container[0].getContext('2d');
        self.beatIncrement = 13;
        
	};

	self.update = function(x,y){
		self.x=x;
		self.y=y;	
	};

	self.draw=function(skillArray,isCollapse){		
		
		if(self.type == CONFIG.HEIRARCHY_LEVEL_1)
			self.rad=CONFIG.HEIRARCHY_LEVEL_1_RADIUS;
		else
			self.rad=CONFIG.HEIRARCHY_LEVEL_3_RADIUS;

		self.context.lineWidth = .15*self.rad;
		self.skillArr=skillArray;
		drawDonut(self.skillArr,self.rad);
		self.context.globalAlpha=1;
		self.context.beginPath();
		self.context.arc(self.x,self.y,.6*self.rad-self.context.lineWidth/2,self.startAngle,self.TWO_PI);
		self.context.closePath();

		self.context.fillStyle='rgba(255,255,255,'+self.centralFillAlpha+')';
		self.context.strokeStyle=self.centralFill;
		
		self.context.fill();
		self.context.stroke();
	};

	function drawDonut(skillArr,rad){
			var segmentTotal = 0;
			var donutRadius = rad;
			var cutoutRadius = .6*rad;

			var len;
			var fillArr=[];

			if(skillArr && skillArr.length>0)
				fillArr=skillArr;
			
			len=fillArr.length>5?5:fillArr.length;
			var scaleAnimation = 1,
			rotateAnimation = 1;
			//self.cumulativeAngle = 0

			segmentTotal=fillArr[0].value*len;
			self.cumulativeAngle += self.spin*self.rotateAnimation*CONFIG.SPIN_FORCE;
			
			for (var i = 0; i < len;i++){
				var segmentAngle = rotateAnimation * ((fillArr[i].value/segmentTotal) * (self.TWO_PI));
				self.context.beginPath();
				self.context.arc(self.x,self.y,scaleAnimation * donutRadius,self.cumulativeAngle,self.cumulativeAngle + segmentAngle,false);
				self.context.arc(self.x,self.y,scaleAnimation * cutoutRadius,self.cumulativeAngle + segmentAngle,self.cumulativeAngle,true);
				self.context.closePath();
				// if(self.active)
					self.context.fillStyle = fillArr[i].color;
				// else
				// 	self.context.fillStyle = 'rgba(' + fillArr[i].rgb.r + ',' + fillArr[i].rgb.g + ',' + fillArr[i].rgb.b + ',0.2)';
				self.context.fill();
				self.cumulativeAngle += segmentAngle;
			}
	}

	self.join=function(origin,end){

		self.context.strokeStyle='rgba(255,255,255, ' + self.widthMultiple + ')';
        self.context.lineWidth = 1;
		self.context.beginPath();
		self.context.moveTo(origin.x,origin.y);
		self.context.lineTo(end.x,end.y);
		self.context.closePath();
		self.context.stroke();
	};

	self.createCentralNode=function(thickness){
		self.context.beginPath();
		self.context.arc(self.x,self.y,thickness,self.startAngle,self.TWO_PI);
		self.context.closePath();
		self.context.fillStyle=self.skillArr[0].color;
		self.context.strokeStyle='rgba(255,255,255,.2)';
		self.context.fill();
		self.context.stroke();
	};

	

	self.drawHalo=function(){
		self.context.beginPath();
		self.context.arc(self.x,self.y,1.15*self.totalRadius,self.startAngle,self.TWO_PI);
		self.context.closePath();
		self.context.strokeStyle='rgba(255,255,255,0.2)';
		self.context.lineWidth=5;
		self.context.stroke();
	};
	
	self.clear=function(){
		self.context.clearRect(0, 0, self.container.attr('width'), self.container.attr('height'));
	};
//todos//

	self.displayText=function(text){
		self.context.fillStyle="rgba(50,50,50,1)";
		self.context.textBaseline = "middle";
		self.context.textAlign="center";
		self.context.fillText(text,self.x,self.y,2*self.radius);
	};

	self.showProfileImage=function(url){
		self.url=url;
		var  imgObj=new Image();
		imgObj.src=url;
		self.context.drawImage(imgObj,self.x-self.radius,self.y-self.radius,2*self.radius,2*self.radius);
	};


	self.startBeat=function(){
		//console.log("called")
		self.context.beginPath();
		
		self.beatIncrement += self.beatIncrement/9;//11;
		self.context.arc(self.x,self.y,self.beatRadius+self.beatIncrement,self.startAngle,self.TWO_PI);
		self.context.closePath();
		
		if(self.SHADOW_ALPHA<=0){
			self.SHADOW_ALPHA = self.origShadowAlpha;
            self.beatIncrement=1;
		}

		self.context.strokeStyle="rgba(255,255,255,"+self.SHADOW_ALPHA+")";
		self.SHADOW_ALPHA=self.SHADOW_ALPHA - self.beatFrequency;
		self.context.lineWidth = self.SHADOW_WIDTH;
		self.context.stroke();
	};

	self.startMultipleBeats=function(){

		self.SHADOW_ALPHA=self.SHADOW_ALPHA-self.nucleusBeatFrequency;
		self.nucleusShadowAlpha1=self.nucleusShadowAlpha1-self.nucleusBeatFrequency;
		self.nucleusShadowAlpha2=self.nucleusShadowAlpha2-self.nucleusBeatFrequency2;
		self.nucleusShadowAlpha3=self.nucleusShadowAlpha3-self.nucleusBeatFrequency3;
		self.context.lineWidth = self.NUCLEUS_SHADOW_WIDTH;

		self.nucleusBeatIncrement+=0.5;
		self.context.beginPath();
		self.context.arc(self.x,self.y,(self.beatRadius+30)/5+self.nucleusBeatIncrement,self.startAngle,self.TWO_PI);
		self.context.closePath();
		self.context.strokeStyle="rgba(255,255,255,"+self.nucleusShadowAlpha1+")";
		self.context.stroke();
		self.context.beginPath();
		self.context.arc(self.x,self.y,(self.beatRadius+18)/5+self.nucleusBeatIncrement,self.startAngle,self.TWO_PI);
		self.context.closePath();
		self.context.strokeStyle="rgba(255,255,255,"+self.nucleusShadowAlpha2+")";
		self.context.stroke();
		self.context.beginPath();
		self.context.arc(self.x,self.y,(self.beatRadius+6)/5+self.nucleusBeatIncrement,self.startAngle,self.TWO_PI);
		self.context.closePath();
		self.context.strokeStyle="rgba(255,255,255,"+self.nucleusShadowAlpha3+")";
		self.context.stroke();

		if(self.SHADOW_ALPHA<=0){
			self.SHADOW_ALPHA=0.7;
			self.nucleusBeatIncrement=0;
			self.nucleusShadowAlpha1=0.5;
			self.nucleusShadowAlpha2=0.6;
			self.nucleusShadowAlpha3=0.7;
		}
		//self.context.lineWidth = self.NUCLEUS_SHADOW_WIDTH;

	};

	self.nodeSize=function(){
		/*if(self.skillWidth==null){
			self.skillWidth=0;
			//console.log(self.radius,self.skillWidth)
		}*/
		return self.radius+self.skillWidth;
	};

	self.initBeat=function(){
		setInterval(pulse,1000/60);

		function pulse(){

			self.context.beginPath();
			self.context.arc(self.x,self.y,self.beatRadius+(self.beatRadius* (-Math.pow(2, -10 * 3.5) + 1))+self.beatIncrement+5,self.startAngle,self.TWO_PI);
			self.context.closePath();

			self.context.strokeStyle="rgba(255,255,255,"+self.SHADOW_ALPHA+")";
			self.SHADOW_ALPHA=self.SHADOW_ALPHA-self.beatFrequency;

			if(self.SHADOW_ALPHA<=0){
				self.SHADOW_ALPHA=Math.random()*0.6;
				//self.initBeat();
			}else{
				//pulse();
			}

			self.context.lineWidth = self.SHADOW_WIDTH;
			self.context.stroke();
		}
	};


	self.scale=function(factor,xPos, yPos,callback){
		self.x=xPos;
		self.y=yPos;
		if(self.scaleFactor<=factor && self.initRescale==false){
			self.radius++;
			self.skillWidth++;
			self.scaleFactor+=factor/self.scaleSteps;
		}else{
			self.initRescale=true;
			self.resetScale(factor,callback);
		}

		self.showProfileImage(self.url);
		self.draw(self.skillArr);
	};

	self.resetScale=function(factor,callback){
		if(self.scaleFactor>0){
			self.radius--;
			self.skillWidth--;
			self.scaleFactor-=factor/self.scaleSteps;
		}

		self.showProfileImage(self.url);
		self.draw(self.skillArr);

		if(self.scaleFactor<=0){
			self.initRescale=false;
			if(callback){
				callback();
			}
		}

	};

};