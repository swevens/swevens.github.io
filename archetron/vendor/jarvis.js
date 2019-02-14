var jarvisIsOn = false;

function typeCommand(cmd, location, html) {

    if (location == undefined && html == undefined) {
        var _html = '<div class="jarvis-text"><span></span>' + cmd + '</div><div class="clear"></div>';
    } else if (html != undefined) {
        var _html = '<div class="jarvis-text"><span></span>' + html + '</div><div class="clear"></div>';
    } else {
        var _html = '<div class="jarvis-text paddingRight-50"><span></span>' + cmd + '<div class="location" data-location=' + location + '></div></div><div class="clear"></div>';
    }

    $(".communication-panel").append(_html);
    scrollWindowtoEnd();
}

function userCommand(cmd) {
    var _html = '<div class="user-text"><span></span>' + cmd + '</div><div class="clear"></div>';
    $(".communication-panel").append(_html);
    scrollWindowtoEnd();
}

function scrollWindowtoEnd() {
    $(".communication-panel").scrollTop($(".communication-panel").height() + 100);
}

function callJarvis(txt, location, html) {
    if (jarvisIsOn) {
        var msg = new SpeechSynthesisUtterance(txt);
        window.speechSynthesis.speak(msg);
        typeCommand(txt, location, html);
    }
}

//*******************************************************************//
//*              COMMON COMPONENTS WRAPPER / OBJECT                 *//
//*******************************************************************//
(function(MODULE, $, undefined) {

    MODULE.addHTML = (function() {
        function _subModule() {
            /* Caching HTML objects */
            var params = {
                _startTalkBtn: ".jarvis-splash .btn-tap-to-start"
            },
                $cached = {
                    _startTalkBtn: $(params._startTalkBtn),
                },
                commonApp = {
                    anyangSetup: function() {
                        if (annyang) {
                            // Add our commands to annyang
                            annyang.addCommands(commands);
                            annyang.debug();
                            annyang.setLanguage('en');
                            // Start listening. You can call this here, or attach this call to an event, button, etc.
                            annyang.start();
                            console.log("1");
                        }
                    },
                    transitions: function() {
                    },
                    userSaysInput: function() {
                        $("#userSays").keypress(function(event) {
                            if (event.which === 13) {
                                // call your `change` logic here
                                clickHandler();
                                // Cancel the event
                                return false;
                            }
                        });
                        $(".userSays-go").on('click', function() {
                            clickHandler();
                        });

                        function clickHandler() {
                            var cmd = $("#userSays").val();
                            $("#userSays").val("");
                            userCommand(cmd);
                            commands[cmd.replace(/[^a-zA-Z 0-9]+/g, '').toLowerCase()]();
                        }
                    },
                    init: function() {
                        //jarvisData.initFn();
                        this.anyangSetup();
                        //this.transitions();
                        //this.userSaysInput();
                    }
                },
                //Calling all functionalities
                applyFunctionality = function() {
                    commonApp.init();
                    //Context condition for VLP specific app
                }
                /**
                 * Init call
                 */
            this.init = function() {
                applyFunctionality();
                return this; /*this refere to MODULE.subModule*/
            };
            return this.init(); /*this refere to MODULE.subModule.init()*/
        }
        return new _subModule(); /*creating a new object of subModule rather then a funtion*/
    }());
    /*
     * Check to evaluate whether 'MODULE' exists in the global namespace - if not, assign window.MODULE an object literal
     */
}(window.jarvis = window.jarvis || {}, jQuery));