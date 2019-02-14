archeTron.wrapper = (function(){

    var appModel;
    var empModel;
    var proficiencyModel;
    var skillSetModel;
    var isSearchOverlay = false;

    function parseData(json) {
        appModel = ApplicationModel;
        appModel.dataProvider(json);

        maxDays = appModel.getInstance().config().maxEntropy;
        maxSubNodes = appModel.getInstance().config().maxSubNodes;

        maxSkills = appModel.getInstance().config().maxSkills;

        proficiencyModel = ProficiencyModel;
        proficiencyModel.dataProvider(appModel.getInstance().proficiencyMeter());

        skillSetModel = SkillSetModel;
        skillSetModel.dataProvider(appModel.getInstance().skillChart());

        for (var i = 0; i < ApplicationModel.getInstance().employeeData().length; i++) {
            var dataObj = ApplicationModel.getInstance().employeeData()[i];
            empModel = new EmployeeModel();
            empModel.id = dataObj.id;
            empModel.empName = dataObj.name;
            empModel.maxEntropy = dataObj.maxEntropy;
            empModel.tags = dataObj.tags;
            empModel.skills = dataObj.skills;
            empModel.team = dataObj.team;
            EmployeeCollection.getInstance().add(empModel);
        }
        generatelistItem();
        setupConfig();
        archeTron.intro.show();
    }

    initializeGUI = function(){
        var obj = {x: 5};
        var gui = new dat.GUI();
        gui.add(CONFIG, 'HEIRARCHY_LEVEL_3_ORBITRADIUS').min(20).max(200).name('Orbit');
        gui.add(CONFIG, 'HEIRARCHY_LEVEL_3_RADIUS').min(5).max(30).name('Small Radius');
        gui.add(CONFIG, 'HEIRARCHY_LEVEL_1_RADIUS').min(10).max(50).name('Center Radius');
        gui.add(CONFIG, 'SPIN_FORCE').min(.05).max(0.5).name('VARIANCE');
        gui.add(CONFIG, 'ROTATION_FORCE').min(.005).max(0.05).name('DIVERGENCE');
        gui.add(CONFIG, 'WANDER_FORCE').min(2.0).max(10.0).name('ENTROPY');
    }

    function setupConfig() {
        archeTron.initialize();
    }

    function generatelistItem() {
        var i, len = skillSetModel.getInstance().collection().length;
        
        for (var i = 0; i < len; i++) {
            var obj = skillSetModel.getInstance().collection()[i];
            $('#outer-arc').append('<li class="legend" role="button" tabindex="'+ i +'"><span class="list-icon"><span style="background-color:' + obj.color + '">' + obj.cluster + '</span></span><span class="list-title">' + obj.cluster + '</span></li>');
        }
        $('#outer-arc').append('<li class="legend" role="button" tabindex="'+len+'"><span class="list-icon"><span style="background-color:#fff">show all</span></span><span class="list-title">Show All</span></li>');

        var j, len = appModel.getInstance().locationData().length;
        for (var j=0; j < len; j++) {
            var obj = appModel.getInstance().locationData()[j];

            var arr = obj.color.split(',');
            var r = parseInt(arr[0]);
            var g = parseInt(arr[1]);
            var b = parseInt(arr[2]);
            $('#inner-arc').append('<li class="legend" role="button" tabindex="'+ j + i +'"><span class="list-icon"><span style="background-color:' + Util.rgbToHex(r, g, b) + '"></span></span><span class="list-title">' + obj.location + '</span></li>');
        }

        listEventHandlers();
    }

    function listEventHandlers(){
        $('#outer-arc .legend').on('click', function(e) {
            var selection = e.target.firstChild.data || e.target.firstChild.innerHTML;

            if(selection == 'Show All')
                    archeTron.component.generateParticleSystem();
            else if(selection != undefined)
                    archeTron.component.generateParticleSystem(selection);
            return;
        });
        //inner arc handler
    }


    return {
        energize : function(){
            initializeGUI();
            archeTron.component.generateParticleSystem();
            archeTron.component.update();
        },

        init : function(){
            $.get("data/data.json", parseData);
        }

    }
})();