module.exports = function(bh) {
    bh.match('image', function(ctx, json) {
        ctx
            .tag('img')
            .attrs({
                src: json.url || '//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif',
                alt: json.alt || '',
                width: json.width,
                height: json.height
            });
    });
};
