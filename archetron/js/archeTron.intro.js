archeTron.intro = (function(){
    return {
         show : function(){
            var $definition     = $('#intro');
            var $list           = $definition.find('ul');
            var $items          = $list.find('li');
            var $target         = $items.first();
            var words = [];var counter = 1;

            $items.each(function(){
                words.push( $(this).text() );
            });
            $list.css({
                opacity: 1,
                left: 0
            });
           
            var timer = setInterval(updateSlice,10000);
            function updateSlice() {
                $target.pushText({
                text: words[ counter ],
                duration: 1000,
                ratio: 0.5
            });

            $items.not($target).remove();
            
            counter = (counter + 1) % words.length;
            };   

            var trons = document.querySelector('#intro');
            trons.addEventListener('load',function(){
                    trons.contentDocument.querySelectorAll('[id^="tron_"]').forEach(function(el,i) {
                });                                
            })
        },

        init : function(){
             $(".enter").click(function(){
                $("#intro").fadeOut();
                //clearTimers
                $("#visualization").fadeIn();
                archeTron.wrapper.energize();
                
            }) 
        },
        close:function(){

        },
    }
})();