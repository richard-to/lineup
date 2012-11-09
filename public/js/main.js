require(['lib/config'], function() {
    require(['jquery.fileupload'], function(){
        $(function () {
            $('#fileupload').fileupload({
                dataType: 'json',
                done: function (e, data) {
                    $('<p/>').text(data.result.image).appendTo(document.body);
                }
            });
        });   
    });
});
