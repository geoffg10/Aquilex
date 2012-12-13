
        $.ajax({
            type: 'get',
            url: '../test/hello',
            dataType: 'json',
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log('error', error);
            }
        });