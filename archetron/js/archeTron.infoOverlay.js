archeTron.infoOverlay = (function(){
    return {

         init:function(){
         	
         },
         showInfoOverlay: function(count,category){
            $('.infoOverlay > h4').html('[ ' + category + ' ]');
            $('.infoOverlay > h2').html(count + ' trons');
            $('.infoOverlay').addClass('show');
            setTimeout(function(){
                $('.infoOverlay').removeClass('show');
            }, 3000);
         },
         close:function(){

         }

}
})();