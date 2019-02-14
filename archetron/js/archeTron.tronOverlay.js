archeTron.tronOverlay = (function(){
    var skillSetModel;

    return {
        init:function(){
            skillSetModel = SkillSetModel;
        },
        close:function(e){
                d3.selectAll(".wordCloud svg > *").remove();
                $(".wordCloud").empty();
                $("#tronScreen").hide();
                archeTron.searchPanel.show(particleCount, particleGalaxy, skillSetModel);  
        },
        createWordCloud : function(words){
                        var fill = d3.scale.ordinal().range([currentColor, currentColor]);
                        var maxCount = d3.max(words, function(d) {
                            return d.count;
                        });
                        d3.layout.cloud().size([window.innerWidth, window.innerHeight/2])
                                .words(words.map(function(d) {
                                    return {text: d.word, size: 15 + 15 * d.count / maxCount};
                                }))
                                .padding(10)
                                .rotate(function() {
                                    return ~~(Math.random() * 2) * 90;
                                })
                                .font("Sapient Centro Slab")
                                .fontSize(function(d) {
                                    return d.size;
                                })
                                .on("end", draw)
                                .start();

                        function draw(words) {
                            $('.wordCloud').empty();
                            console.log('here');
                            d3.select(".wordCloud").append("svg")
                                    .attr("width", window.innerWidth)
                                    .attr("height", window.innerHeight / 2)
                                    .style("oveflow", "overlay")
                                    .append("g")
                                    .attr("transform", "translate(" + (window.innerWidth / 2) + "," + (window.innerHeight / 4) + ")")
                                    .selectAll("text")
                                    .data(words)
                                    .enter().append("text")
                                    .style("font-size", function(d) {
                                        return d.size + "px";
                                    })
                                    .style("font-family", "SapientSansBold")
                                    .style("fill", function(d, i) {
                                        return fill(i);
                                    })
                                    .style("opacity", 0)
                                    .attr("text-anchor", "middle")
                                    .attr("transform", function(d) {
                                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                                    })
                                    .text(function(d) {
                                        return d.text.toUpperCase();
                                    })
                                    .transition()
                                    .delay(function(d, i) {
                                        return i * 50
                                    })
                                    .duration(300)
                                    .style("opacity", 1);
                        }
        },



        drawVariance : function(p) {
                        var ratingEntropyCnt = d3.select(document.getElementById('ratingEntropy')),
                                ratingEntropy = radialProgress(document.getElementById('ratingEntropy'), currentColor)
                                .label("Entropy")
                                .diameter(window.innerWidth/6)
                                .value(p.spinForce)
                                .render();

                        var ratingVarianceCnt = d3.select(document.getElementById('ratingVariance')),
                                ratingVariance = radialProgress(document.getElementById('ratingVariance'), currentColor)
                                .label("Variance")
                                .diameter(window.innerWidth/6)
                                .value(p.variance)
                                .render();
        },

        createHexBin : function(SelecterLetter)
        {
                var Hex = document.querySelector('#tronHex');
                    Hex.addEventListener('load',function(){
                    Hex.contentDocument.childNodes[1].querySelectorAll(".ring").forEach(function(el,i) {
                        //el.setAttribute('translate', '100px 100px 0px');
                        var cOx = el.cx.baseVal.value - .1 * el.cx.baseVal.value,
                            cOy = el.cy.baseVal.value - .1 * el.cy.baseVal.value;

                        console.log(cOx,el.cx.baseVal.value);
                        el.animate([{opacity:0,transform:"matrix(.1, 0, 0, .1," + cOx + "," + cOy + ")",stroke:currentColor},{opacity:1,transform:"matrix(1, 0, 0, 1, 0, 0 )",stroke:currentColor}],
                                        {duration:300+Math.random()*200,easing:"ease-out",delay:Math.random()*100*i,iterations:1,fill:"forwards"});
                    });

                    Hex.contentDocument.childNodes[1].querySelectorAll("polygon").forEach(function(el,i) {
                        el.animate([{opacity:0,fill:"black"},{opacity:.3,fill:currentColor}],{duration:300,delay:500+Math.random()*800,iterations:1,fill:"forwards"});
                        if(CONFIG.LETTERS[SelecterLetter].indexOf(i+1)>=0)
                            el.animate([{opacity:1,fill:"black"},{opacity:.8,fill:currentColor}],{duration:300,delay:1500+Math.random()*800,iterations:1,fill:"forwards"});
                    });

                    Hex.contentDocument.childNodes[1].querySelectorAll(".labels").forEach(function(el,i) {
                        el.animate([{opacity:0,fill:"black"},{opacity:.7,fill:currentColor}],{duration:300,delay:500+Math.random()*800,iterations:1,fill:"forwards"});
                    });

                    Hex.contentDocument.childNodes[1].querySelectorAll(".path").forEach(function(el,i) {
                        var s = el.getAttribute('id');
                        //s = s.split(",");
                        console.log(s);
                        el.animate([{opacity:1,stroke:currentColor},{opacity:1,stroke:currentColor}],{duration:300,delay:500+Math.random()*800,iterations:1,fill:"forwards"});
                    });                    
                        
                })
        },

        tronOverlay : function(p, clusterName, tags, maxEntropy)
        {
            //init elements
            console.log('done done')
            $(".searching").hide();
            var words = tags || [{"word": "CLUSTER", "count": 300}, {"word": "INFORMATION", "count": 300}, {"word": "NOT", "count": 300}, {"word": "AVAILABLE", "count": 300}];
            maxEntropy = maxEntropy || 1;
            
            $("#tronScreen").show();

            SelecterLetter = p.name.substr(0, 1).toUpperCase();

            p.company = p.company || "";

            
            d3.selectAll(".wordCloud svg > *").remove();
            $(".wordCloud").empty();
            $(".cluster").empty();

            $(".Lower .type").text(clusterName);
            $(".infoRate").empty().append("<div id='ratingEntropy'></div><div id='ratingVariance'></div>");
            $(".ratingEntropy ul").empty();
            $(".ratingVariance ul").empty();
            
            var stringstr = [];
            if (p.skills.length > 1)
            {
                $(".cluster").append("PROXIMITY TO - ( " + p.skills.join().toUpperCase() + " )").css("color", "white");
            }

            for (var i = 0; i < skillSetModel.getInstance().collection().length; i++) {
                var obj = skillSetModel.getInstance().collection()[i];

                if ((clusterName).toLowerCase() === (obj.cluster).toLowerCase()) {
                    currentColor = obj.color;//Set color for current profile
                    break;
                }
            }
            
            /*word cloud*/
            window.setTimeout(function(){
                archeTron.tronOverlay.createWordCloud(words);
                archeTron.tronOverlay.drawVariance(p);
            }, 1500);
         
            /*color stuffs*/
            $(".Lower .type").css("color", currentColor);
            $(".info").css("color", currentColor);
            var maxlength = 20;

            for (var i = 0; i < maxlength; i++) {
                if (i < (Math.floor(maxlength * (p.entropy) / (maxEntropy)))) {
                    $(".ratingEntropy ul svg polygon").css("fill", currentColor);
                }
                if (i < Math.floor(maxlength * (p.variance))) {
                    $(".ratingVariance ul svg polygon").css("fill", currentColor);
                }   
            }
            
               $(".info h2").empty().append("TRON ACTIVE");
                $(".info .name").text(p.name);
                $(".info .email").text(p.email);
                $(".info .cmpy").text(p.company);

                $("a.exploreMore").on('click',this.close);

            /* hexbin*/
            archeTron.tronOverlay.createHexBin(SelecterLetter);
        }

    }

})();