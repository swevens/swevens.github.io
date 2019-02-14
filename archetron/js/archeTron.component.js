archeTron.component = (function(){
    var maxDays;
    var maxSkills;
    var maxSubNodes;
    var coordinateCollection = [];
    var clickedParticle;
    var energize = true;
    var clusters = false;

    var skillSetModel,appModel,maxDays,maxSubNodes,maxSkills,proficiencyModel,skillSetModel;

    var context = $('#main')[0].getContext('2d');
    var canvas = document.getElementById('main');
    

    return {

   	  init : function(){
   	  			
   	  			canvas.width = window.innerWidth;
    			canvas.height = window.innerHeight;
    			context.font = "bold 18px SapientSansBold";

    			appModel = ApplicationModel;
		        
		        maxDays = appModel.getInstance().config().maxEntropy;
		        maxSubNodes = appModel.getInstance().config().maxSubNodes;

		        maxSkills = appModel.getInstance().config().maxSkills;

		        proficiencyModel = ProficiencyModel;
		        proficiencyModel.dataProvider(appModel.getInstance().proficiencyMeter());

		        skillSetModel = SkillSetModel;
		        skillSetModel.dataProvider(appModel.getInstance().skillChart());

		        $('a.search').on('mousedown', function(e) {
		            jessie.listen();
		            energize = false;
		            CONFIG.SPIN_FORCE = .3;
		            CONFIG.ROTATION_FORCE = .03;
		            $('.cell-right,.list').hide();
		            $('.cell-left').css({"z-index": -200});
		            archeTron.searchPanel.show(particleCount, particleGalaxy, skillSetModel);
		        });

		        $("#pageTitle, a.back").on("click", function() {
		        	energize = true;
		        	archeTron.searchPanel.close();
	                $(".cell-right,.list").show();
	            });
   	  },
   	  close:function(){

      },

   	  show : function(){

   	  },
      generateParticleSystem : function(category) {

      		archeTron.component.init();
	        category = category || '';
	        particleGalaxy = [];
	        teamStrength = 0;
	        var tronCount = 0;
 
	        var nodesList = EmployeeCollection.getInstance();
	        
	        var maxMin = Util.getMaxMin(nodesList);

	        var len = nodesList.length();

	        //loop for creaing atoms or indipendent nodes
	        for (var i = 0; i < len; i++)
	        {
	            var dataObj = nodesList.getItemAt(i);
	            var subNodes = dataObj.team, subNodesLength = dataObj.team.length;
	            var particleSystem = new ParticleSystem($('#main')),
	                    particleX = Util.randomRange(0, $('#main').attr('width')), particleY = Util.randomRange(0, $('#main').attr('height'));
	            var particle = {
	                innerArc: "",
	                outerArc: [],
	                rotationForce: 0,
	                spinForce: 0,
	                children: [],
	                x: 0,
	                y: 0,
	                wanderForce: 0,
	                index: 0,
	                id: 0,
	                countLevelA: 0,
	                name: "",
	                active: "true"
	            };

	            particle.name = dataObj.empName;
	            particle.rotationForce = (1 - dataObj.maxEntropy / maxDays);
	            particle.spinForce = (1 - dataObj.skills.length / maxSkills);
	            particle.countLevelA = subNodesLength;
	            particle.type = "cluster";
	            particle.center = dataObj.center;
	            // loop for nodes connected to independent nodes/atoms
	            for (var j = 0; j < subNodesLength; j++)
	            {
	                var flagger = false;
	                var child = {
	                    innerArc: "",
	                    outerArc: [],
	                    rotationForce: 0,
	                    spinForce: 0,
	                    variance: 0,
	                    name: "",
	                    email: "",
	                    company: "",
	                    skills: [],
	                    active: "false"
	                },
	                subNode = subNodes[j],
	                        skillLen = subNode.skills.length;

	                for (var k = 0; k < skillLen; k++) {
	                    if (category == "")
	                        flagger = true;
	                    var teamSkillsObj = subNode.skills[k];
	                    for (var l = 0; l < skillSetModel.getInstance().collection().length; l++) {
	                        var skillSetObj = skillSetModel.getInstance().getItemAt(l);
	                        if (teamSkillsObj == skillSetObj.cluster) {
	                            if (teamSkillsObj == category)
	                                flagger = true;
	                            child.outerArc.push({color: skillSetObj.color, value: 60, rgb: Util.hexToRGB(skillSetObj.color)});
	                            break;
	                        }
	                    }
	                }
	                child.name = subNode.name;
	                child.email = subNode.mailID;
	                child.entropy = subNode.entropy;
	                child.innerArc = Util.getLocationColor(subNode.location,appModel.getInstance().locationData);
	                child.rotationForce = (1 - subNode.entropy / maxDays);
	                child.spinForce = (1 - skillLen / maxSkills);
	                child.variance = subNode.variance;
	                //child.active = subNode.active;
	                child.skills = subNode.skills;
	                child.links = subNode.links;
	                child.type = "person";
	                child.coordinates = subNode.coordinates;
	                if (flagger)
	                    particle.children.push(child);
	            }
	            tronCount += particle.children.length;
	            for (var m = 0; m < dataObj.skills.length; m++) {
	                var skillObj = dataObj.skills[m];
	                for (var l = 0; l < skillSetModel.getInstance().collection().length; l++) {
	                    var skillSetObj = skillSetModel.getInstance().getItemAt(l);
	                    if (skillObj == skillSetObj.cluster) {
	                        particle.outerArc.push({color: skillSetObj.color, value: 360});
	                        break;
	                    }
	                }
	            }

	            for (var kk = 0; kk < coordinateCollection.length; kk++) {
	                var coords = coordinateCollection[kk];
	                var distance = Util.lineDistance({x: particleX, y: particleY}, {x: coords.x, y: coords.y});
	                if (distance <= CONFIG.proximity) {
	                    particleX += CONFIG.proximity;
	                    particleY += CONFIG.proximity;
	                }
	            }

	            coordinateCollection.push({x: particleX, y: particleY});
	            particle.x = particleX;
	            particle.y = particleY;
	            particle.innerArc = Util.getLocationColor(dataObj.location);
	            particle.wanderForce = (1 - ((subNodesLength) / 30));
	            particle.index = i;
	            particle.maxentropy = dataObj.maxEntropy;
	            particle.tags = dataObj.tags;
	            particleSystem.init(particle);
	            particleGalaxy.push(particleSystem);
	            teamStrength += particle.children.length;
	        }
	        teamStrength += EmployeeCollection.getInstance().length();
	        particleCount = particleGalaxy.length;
	        
	        //archeTron.component.update();
    	},

    	update: function() {
	        context.clearRect(0, 0, $('#main').attr('width'), $('#main').attr('height'));
	        for (var i = 0; i < particleCount; i++) {
	            var particle = particleGalaxy[i];
	            if (clickedParticle == null && energize && !clusters)
	            {
	                particle.animate();
	            }
	            else
	            {
	                if (particle != clickedParticle){   	
	                    particle.redraw(clusters);
	                }
	                else {
	                    particle.collapse();
	                }
	            }
	        }
	        window.requestAnimationFrame(archeTron.component.update);
    	},

     	redrawParticles: function() {
	        for (var i = 0; i < particleGalaxy.length; i++) {
	            particleGalaxy[i].animateObjects = false;
	            if (particleGalaxy[i] != particleObject) {
	                particleGalaxy[i].redraw();
	            }
	        }
  	    }

    }

})();