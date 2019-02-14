    var commands = {
        // 'energize': function() {
        //     jarvisIsOn = true;
        //     callJarvis("Powering up");
        //     $('.cell-right').trigger('mousedown');
        // },
        // 'power up': function() {
        //     jarvisIsOn = true;
        //     callJarvis("Powering up");
        //     $('.cell-right').trigger('mousedown');
        // },
        // 'launch': function() {
        //     jarvisIsOn = true;
        //     callJarvis("Powering up");
        //     $('.cell-right').trigger('mousedown');
        // },
        'find *name': function(name) {
            jarvisIsOn = true;
            console.log(name);
            findByName(name);
            callJarvis("Search for " + name);
        },
        'close' : function(){
            $("#pageTitle").trigger("click");
        },
        'search' : function(){
            overlay();
            jarvisIsOn = true;
            callJarvis("Speak a name");
        }
    }