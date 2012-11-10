require(['lib/config'], function() {
    require(['jquery.fileupload'], function(){
        $(function () {
            $('#fileupload').fileupload({
                dataType: 'json',
                done: function (e, data) {
                    console.log(data.result);
                    $('<img/>').attr('src', data.result.image).appendTo(document.body);
                    for(i in data.result.optimized){
                        $('<img/>').attr('src', data.result.optimized[i].image).appendTo(document.body); 
                    }
                }
            });
        });   
    });
});
