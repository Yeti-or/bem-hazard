    bh.match('icon', function(ctx, json) {
        ctx
            .tag('i')
            .attrs({
                'style': json.url && ('background-image:url(\'' + json.url + '\');'),
                'aria-hidden': 'true'
            });
    });
