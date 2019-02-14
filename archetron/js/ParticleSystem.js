var ParticleSystem=function(canvas){
	var cos = Math.cos(), sin = Math.sin();

	var self=this;
	self.collapseFlag = false;
	self.id=0;
	self.particleCount=0;
	self.particles=[];
	self.centerNode=new Node();
	self.canvas=canvas;
	self.context=self.canvas[0].getContext('2d');
	self.ox=0;
	self.oy=0;
	self.zIndex=0;
	self.TWO_PI=Math.PI*2;
	self.PI=Math.PI;
	self.center = {};
	self.wanderAngle = Util.randomRange(self.TWO_PI);
	self.wanderSpeed;
	self.maxStep=Util.randomRange(self.PI*0.025);
	self.theta=0;
	self.k=1.38062*Math.pow(10,-15);
	//W is the number of microstates in a given macrostate
	self.W=Math.log(Util.randomRange(0,20));
	//S is the symbol for entropy, the equation below is Boltzmann's formula for entropy in thermodynamics
	self.S=self.k*self.W;
	self.haloRequired = false;
	self.animateObjects = true;
	self.phaseShift=0.25;
	self.displayProfilePic=true;
	var w,h;
	self.props;
	var particle, numChild;
	
	self.init=function(properties)
	{
		//particle = properties;
		self.props = properties;
		numChild = properties.children.length;
		self.smallAngle=Math.abs(360/self.props.countLevelB);
		self.largeAngle=Math.abs(360/self.props.countLevelA);
		self.center = properties.center;
		w=parseInt(self.canvas.attr('width'));
		h=parseInt(self.canvas.attr('height'));
		self.ox=self.props.x;
		self.oy=self.props.y;
		self.wanderSpeed = self.props.wanderForce;
		self.drawParticles();
		self.drawNucleus();
	};

	self.drawNucleus = function(){
		self.centerNode.init(self.props.name,self.ox,self.oy,self.props.type,self.canvas,0,self.props.spinForce,null,null,self.props.variance,self.props.active);
		self.centerNode.centralFill=self.props.innerArc;
		self.centerNode.draw(self.props.outerArc,self.collapseFlag);
		self.centerNode.createCentralNode(5);
	}

	self.pulseNucleus=function(){
		self.centerNode.startBeat();
	};

	self.drawParticles=function(){
		var smallAngleCounter=0, largeAngleCounter=0;
		self.maxStep = Util.randomRange(self.PI*0.05/self.props.outerArc.length);
		for (var i = 0; i < numChild; i++) {
			var nodes = new Node();
			var theta,x,y;
			var child = self.props.children[i];
			//if(child.type==CONFIG.HEIRARCHY_LEVEL_3){
				theta=(self.PI*self.largeAngle)/180*largeAngleCounter + self.phaseShift;
				largeAngleCounter++;
				x=self.ox+Math.cos(theta)*CONFIG.HEIRARCHY_LEVEL_3_ORBITRADIUS * child.variance;
				y=self.oy+Math.sin(theta)*CONFIG.HEIRARCHY_LEVEL_3_ORBITRADIUS * child.variance;
				nodes.init(child.name,x,y,child.type,self.canvas,child.rotationForce,child.spinForce,CONFIG.HEIRARCHY_LEVEL_3_LINETHICKNESS,CONFIG.HEIRARCHY_LEVEL_3_ORBITRADIUS,child.variance,child.active,child.links);
				nodes.centralFill=child.innerArc;
				//nodes.showProfileImage(self.particleImages[i]);
				nodes.join({x:self.ox,y:self.oy},{x:x,y:y});
				nodes.draw(child.outerArc);
				nodes.theta=theta;
				nodes.coordinates = child.coordinates;
				nodes.createCentralNode(4);
				//self.largeNodeCollection.push(nodes);				
			//}

		
			nodes.id=i;
			self.particles.push(nodes);	
		}
	};

	self.displayHeadCount=function(){
		if (self.particleCount == 1){
			self.centerNode.displayText(0);
		}else{
			self.centerNode.displayText(self.particleCount);
		}
	};

	self.animate=function(){
		if(!self.animateObjects){
			return;
		}
		//self.drawArrow(fromX,fromY,toX,toY);
		self.redraw();
		self.wander();
	};

	self.collapse = function(){
		self.collapseFlag = true;
		var len = self.particles.length, node, x,y,i = 0;
		var rad;
		for (;i<len;i++) {
			node = self.particles[i];
			node.theta += (node.force * CONFIG.ROTATION_FORCE);	
			node.orbitRadius -= node.orbitRadius/7;
			rad = node.orbitRadius;
			if(rad<1)return;

			x = self.ox + Math.cos(node.theta) * rad;
			y = self.oy + Math.sin(node.theta) * rad;
			node.update(x, y);
			node.join({x: self.ox,y: self.oy}, {x: x,y: y});
			node.draw(particle.children[i].outerArc);
			node.createCentralNode(2);
		}
		self.drawNucleus();
	}

	self.redraw=function(clusters){
		self.collapseFlag = false;
		
		var len = self.particles.length, node, x,y,i = 0;

		var rad;
		for (;i<len;i++) {
			node = self.particles[i];

			node.theta += (node.force * CONFIG.ROTATION_FORCE);
			
			rad=CONFIG.HEIRARCHY_LEVEL_3_ORBITRADIUS  * node.variance;
			
			
			if(clusters)
			{
					node.update(node.x, node.y);
					node.join({x: self.ox,y: self.oy}, {x: node.x,y: node.y});
				
				 if(node.active == "true")
				{
					for(var l = 0; l< node.links.length && l < 1; l++)
						node.join({x: node.x,y: node.y}, {x: node.links[l].x *  3500 + window.innerWidth/2,y: node.links[l].y * 1800 + window.innerHeight/2});
				}

			}
			else
			{
				x = self.ox + Math.cos(node.theta) * rad;
				y = self.oy + Math.sin(node.theta) * rad;
				node.update(x, y);
				node.join({x: self.ox,y: self.oy}, {x: x,y: y});
			}
			node.draw(self.props.children[i].outerArc);
			node.createCentralNode(2);			
		}
		self.drawNucleus();
	};

	self.wander=function(){
		{
			self.ox = self.ox < 0 ? w : self.ox > w ? 0 : self.ox;
			self.oy = self.oy < 0 ? h : self.oy > h ? 0 : self.oy;

			self.wanderAngle = self.wanderAngle + Util.randomRange(-self.maxStep,self.maxStep);

			self.ox += Math.cos(self.wanderAngle) * self.wanderSpeed * CONFIG.WANDER_FORCE;
			self.oy += Math.sin(self.wanderAngle) * self.wanderSpeed * CONFIG.WANDER_FORCE;
		}
					
	};

	self.pulseNodes=function(callback){
		self.nodeTimer++;
		
		var node;
		if(self.nodeIndex==0){
			node=self.centerNode;
		}else if(self.nodeIndex==1){
			self.currentIndex=0//Util.randomRange(0,self.largeNodeCollection.length-1);
			node=self.largeNodeCollection[self.currentIndex];
			if(!node){
				node=self.smallNodeCollection[self.smallNodeCollection.length-1];
			}
			self.currentNodeIndex=self.particles.indexOf(node);
		}else if(self.nodeIndex==2){
			self.currentIndex=0//Util.randomRange(0,self.smallNodeCollection.length-1);
			node=self.smallNodeCollection[self.currentIndex];
			if(!node){
				node=self.largeNodeCollection[self.largeNodeCollection.length-1];
			}
			self.currentNodeIndex=self.particles.indexOf(node);
		}else if (self.nodeIndex == 3){				
			callback();
		}

		if(node){
			node.startBeat();
		}
		if(self.nodeTimer>=50){
			self.nodeTimer=0;
			self.nodeIndex++;
		}
	};
};