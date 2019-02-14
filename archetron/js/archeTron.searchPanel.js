archeTron.searchPanel = (function(){
    var particleCount, skillSetModel;
    var arr = [];
    var fragment = document.createDocumentFragment();

    function keyClicked(event) {
            var val = event.currentTarget.textContent.trim();
            var inputdata = '';
            if (val === "bk") 
                 arr.pop(arr.length);
            else 
                arr.push(val);
            $.each(arr, function(key, value) {
                inputdata = inputdata + value;
            });
            $(".forms input[type='text']").val(inputdata);
            dataSuggest();
    };

    function createList() {
            $(".datalist").empty();
            
            var keyboard = document.querySelector('#keyboard');
            keyboard.addEventListener('load',function(){
                keyboard.contentDocument.childNodes[1].querySelectorAll("g").forEach(function(el) {
                    el.addEventListener("click", keyClicked);
                });
            })
    };

    function dataSuggest() {
            var dataName = [];
            $(".suggest").show();

            for (var i = particleCount - 1; i >= 0; i--) {
                particleObj = particleGalaxy[i];
                
                $.each(particleObj.props.children, function(k, v) {
                    dataName.push({"name": v.name, "email": v.email});
                });
            }
            $.each(dataName, function(k, val) {
                var patt, str, result;
                patt = new RegExp("^" + ($(".forms .textarea").val()), "gi");
                str = val.name;
                result = patt.test(str);
                if (result) {
                    $(fragment).append("<li>" + (str.toUpperCase()) + "(" + val.email + ")</li>");
                }
            });
            $("#suggestData").empty().append(fragment);
            $(".suggest").niceScroll({
                autohidemode: 'false',
                cursorborderradius: '10px',
                background: '#fffff',
                cursorwidth: '8px',
                cursorcolor: '#999999'

            }).resize();
    };

    function findByName(name){
        var found = 0;

        for (var i = particleCount - 1; i >= 0; i--) {
            particleObj = particleGalaxy[i];
            var field = particleObj.props;
            $.each(particleObj.props.children, function(k, v) {
                if ((v.name).toLowerCase() == name.toLowerCase()) {
                    found = 1;
                    $("#search").hide();
                    clickedParticle = v;
                    archeTron.tronOverlay.tronOverlay(clickedParticle, field.name, field.tags, field.maxentropy);
                }
            });
        }
        if (!found) {
            jessie.listen();
            $("#pageTitle p").text("No results for " + name.toUpperCase());
        }
    };

    function textData(e) {
        $(".suggest").hide();
        $(".forms .textarea").val($(e.target).text().split("(")[0]);
    };

    function findByVoice(name) {
            jessie.relax();
            results(name);
    };

    function results(name) {
            console.log(name);
            var matches = [];
                for (var i = 0; i < particleGalaxy.length; i++) {
                    if (particleGalaxy[i].props.name.indexOf == name) {
                        data[0].email = data.mailID;
                        archeTron.tronOverlay.tronOverlay(data[0], particleGalaxy[i].props.name, particleGalaxy[i].props.tags, particleGalaxy[i].props.maxentropy);
                        return;
                    }
                }
            //    data[0].email = data[0].mailID;
              //  archeTron.tronOverlay.tronOverlay(data[0], "uncategorized", null, null);
             jessie.listen();
             return;  

             if (data.length >= 1)
            {
             
                $(".searching").hide();
                $(".voiceResults").show();
                $(".helpText").text('MATCHES FOUND').removeClass('welcome');
                ;
                var resultsFragment = document.createDocumentFragment();

                for (var j = 0; j < data.length; j++)
                {
                    $(fragment).append("<li>" + (data[j].name.toUpperCase()) + "( " + data[j].mailID + " )</li>");
                }

                $("#suggestResultsData").empty().append(fragment);
                $(".suggestResults").niceScroll({
                    autohidemode: 'false',
                    cursorborderradius: '10px',
                    background: '#fffff',
                    cursorwidth: '8px',
                    // touchbehavior: true,
                    cursorcolor: '#999999'
                }).resize();
                $(".suggestResults").on("click", triggerInputSearchAgain);
            }
            else
            {
                $(".searching").hide();
                $("#search").show();
                $("#pageTitle p").text("COULDN'T FIND TRON, PLEASE TRY AGAIN");
                $(".forms .textarea").val(name.toUpperCase());
            }
        };
    

    return {        
        init : function(name){
            $(".forms .button").on("click", function() {
                if ($(".forms .textarea").val() !== "")
                {
                    jessie.relax();
                    findByName($(".forms .textarea").val());
                }
            });
        },
        close:function(){
            jessie.relax();
            $("#search").hide();                    
        },
        
        
        show : function(pcount, pGalaxy, sModel) {
            jessie.onName(function(name) {
                //$("#search").hide();
                $("#pageTitle p").text("looking for " + name.toUpperCase());
                //jessie.say("looking for " + name);
                findByVoice(name);
            });

            particleCount = pcount;

            particleGalaxy = pGalaxy;
            skillSetModel = sModel;
            jessie.listen();
            //jessie.say("speak or type your name");
            $("#search").show();
            
            $("#pageTitle p").text("SPEAK OR TYPE YOUR NAME");
            
            $(".suggest").hide();
            createList();
            arr = [];
            
            $(".suggest").on("click",textData);
            $(".forms .textarea").val("").on("input", dataSuggest);
            
        },

        

        triggerInputSearchAgain: function(e) {
            $(".voiceResults").hide();
            findByName($(e.target).text().split("(")[0]);
        }
    }
})();