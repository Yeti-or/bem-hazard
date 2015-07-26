module.exports = function(bh) {
    bh.match('link', function(ctx, json) {
        var attrs = {},
            url = json.url,
            tabindex = json.tabindex;

        ['title', 'target', 'id', 'tabindex'].forEach(function(param) {
            json[param] && (attrs[param] = json[param]);
        });

        if(tabindex) {
            ctx.js({origTabindex: tabindex});
        }

        if(url) {
            ctx.tag('a');
            attrs.href = ctx.isSimple(url) ? url : bh.apply(url);
        } else {
            ctx.tag('span');
            attrs.role = 'button';
            attrs.tabindex || (attrs.tabindex = 0);
        }

        ctx.attrs(attrs);
    });

    bh.match('link__inner', function(ctx) {
        ctx.tag('span');
    });
};
