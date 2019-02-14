var jessie = {};
(function(){
    var amISupposedToLookForNames = false,
        commandMeta = {},
        commands = {},
        isListening = false,
        listener = new webkitSpeechRecognition(),
        onNameCallback = doNothing,
        speaker = new SpeechSynthesisUtterance(),
        wasIListeningBeforeIStartedSpeaking = false;

    (function(){ // Ignite.
        jessie.commands = {
            close: 'close',
            search: 'search'
        };

        for (var i in jessie.commands)
            commandMeta[i] = {
                callback: doNothing,
                calledBack: false
            };

        listener.continuous = true;
        listener.interimResults = true;
        listener.lang = 'en-in'; // English India. Understands a bit of Hinglish too.
    })();

    function doNothing(){
    }

    function registerCommandCallback(commandType, callback){
        commandMeta[commandType].callback = function(){
            if (!this.calledBack){
                this.calledBack = true;
                callback();

                /* Once the command has been called, it can't be called again for a certain time.
                   This has been done since we're using continuous speech and we can get similar results twice from the speech recognition engine. */
                var me = this;
                window.setTimeout(function(){
                    me.calledBack = false;
                }, 2000);
            }
        };
    }

    function startListening(){
        isListening = true;
        listener.onend = listener.onerror = startListening;

        try { listener.start(); }
        catch(exception) { }
    }

    function stopListening(){
        if (isListening){
            isListening = false;
            listener.onend = listener.onerror = doNothing();
            listener.stop();
        }
    }

    listener.onresult = function(event){
        for (var i=event.resultIndex; i<event.results.length; i++){
            var transcript = event.results[i][0].transcript.trim().toLowerCase();
            console.log(transcript);
            if (event.results[i].isFinal && amISupposedToLookForNames){
                for (var i in jessie.commands)
                    transcript = transcript.replace(new RegExp(jessie.commands[i], 'gi'), '')
                transcript = transcript.trim();
                if (transcript)
                    onNameCallback(transcript);
            }
            else if (!event.results[i].isFinal)
                transcript.split(' ').forEach(function(word){
                    if (amISupposedToLookForNames && jessie.commands.close.indexOf(word) !== -1)
                        commandMeta.close.callback();
                    else if (!amISupposedToLookForNames && jessie.commands.search.indexOf(word) !== -1)
                        commandMeta.search.callback();
                });
        }
    };

    listener.onstart = function(){
        isListening = true;
        return this;
    };

    jessie.listen = function(){
        startListening();
        return this;
    };

    jessie.onClose = function(callback){
        registerCommandCallback('close', function(){
            amISupposedToLookForNames = false;
            callback();
        });
        return this;
    };

    jessie.onName = function(callback){
        onNameCallback = callback;
    };

    jessie.onSearch = function(callback){
        registerCommandCallback('search', function(){
            amISupposedToLookForNames = true;
            callback();
        });
        return this;
    };

    jessie.relax = function(){
        stopListening();
        return this;
    };

    jessie.say = function(text){
        window.speechSynthesis.cancel();
        speaker.text = text;
        speechSynthesis.speak(speaker);
        return this;
    };

    speaker.onstart = function(event){
        wasIListeningBeforeIStartedSpeaking = isListening;
        stopListening();
    };

    speaker.onend = function(event){
        if (wasIListeningBeforeIStartedSpeaking){
            wasIListeningBeforeIStartedSpeaking = false;
            startListening();
        }
    };
})();