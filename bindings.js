(function($, window, document, undefined){
    var bind_to_jsbox = function(){
        $('#jsbox').submit(function() {
            eval($("#jsbox textarea").val());
            return false;
        })
    };
    $(bind_to_jsbox);
})(jQuery, window, document);
