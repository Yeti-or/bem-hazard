module.exports = function(bh) {
    bh.match('link_pseudo_yes', function(ctx, json) {
        ctx.js(true);

        if(!json.url) {
            ctx.attrs({
                role: 'button',
                tabindex: 0
            });
        }

        if(!ctx.mod('inner')) {
            ctx.content({
                elem: 'inner',
                content: json.content
            }, true);
        }
    });
};
