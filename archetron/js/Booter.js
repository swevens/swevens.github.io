$(function() {    
    
//component
archeTron.wrapper.init();
   
    
    // $('#main').on('mousedown', function(e) {
    //     e.preventDefault();

    //     //If clusters are visible
    //     if (clusters) {
    //         clusters = false;
    //         $('.cell-right').show();
    //         context.clearRect(0, 0, $('#main').attr('width'), $('#main').attr('height'));

    //         CONFIG.ROTATION_FORCE = 0.05;
    //         CONFIG.SPIN_FORCE = .5;
    //         CONFIG.WANDER_FORCE = 2;
    //         for (var i = 0; i < particleCount; i++) {
    //             var particle = particleGalaxy[i];
    //             particle.ox = particle.center.x * 3500 + window.innerWidth / 2;
    //             particle.oy = particle.center.y * 1800 + window.innerHeight / 2;
    //             for (var j = 0; j < particle.particles.length; j++) {
    //                 var child = particle.particles[j];
    //                 child.ox = child.coordinates.x * 3500 + window.innerWidth / 2;
    //                 child.oy = child.coordinates.y * 1800 + window.innerHeight / 2;
    //                 child.x = child.coordinates.x * 3500 + window.innerWidth / 2;
    //                 child.y = child.coordinates.y * 1800 + window.innerHeight / 2;
    //             }
    //         }
    //     }
    // });

    // function showClusters()
    // {
    //     clusters = true;
    //     context.clearRect(0, 0, $('#main').attr('width'), $('#main').attr('height'));
    //     for (var i = 0; i < particleCount; i++) {
    //         var particle = particleGalaxy[i];
    //         particle.ox = particle.center.x * 3500 + window.innerWidth / 2;
    //         particle.oy = particle.center.y * 1800 + window.innerHeight / 2;

    //         for (var j = 0; j < particle.particles.length; j++) {
    //             var child = particle.particles[j];
    //             child.ox = child.coordinates.x * 3500 + window.innerWidth / 2;
    //             child.oy = child.coordinates.y * 1800 + window.innerHeight / 2;
    //             child.x = child.coordinates.x * 3500 + window.innerWidth / 2;
    //             child.y = child.coordinates.y * 1800 + window.innerHeight / 2;
    //         }
    //     }
    //     //coordinates
    //     CONFIG.ROTATION_FORCE = 0;
    //     CONFIG.SPIN_FORCE = .5;

    // }

/* INIT FUNCTIONS */

    

    /* INIT FUNCTIONS END */
    // jessie.onSearch(function() {
    //     isSearchOverlay = true;
    //     $('.cell-right').hide();
    //     archeTron.searchPanel.overlay(particleCount, particleGalaxy, skillSetModel, urlAjax);
    // }).onClose(function() {
    //     $("#pageTitle").trigger("click");
    // }).onName(function(name) {
    //     $("#search").hide();
    //     jessie.say("looking for " + name);
    //     findByVoice(name);
    // });

    
    // $(window).unload(function() {
    //     particleGalaxy = null;
    //     delete canvas;
    // });
});