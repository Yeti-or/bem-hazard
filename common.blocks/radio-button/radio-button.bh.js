module.exports = function(bh) {
    bh.match('radio-button', function(ctx, json) {
        ctx
            .tag('span')
            .js(ctx.extend({live: false}, ctx.js()))
            .mod('theme', 'normal')
            .tParam('_radioButton', {
                name: json.name,
                value: json.value,
                disabled: Boolean(ctx.mod('disabled')),
                nextForPressed: false
            })
            .content((function() {
                var content = ctx.content(),
                    isSimple = ctx.isSimple;
                return Array.isArray(content)
                    ? content.filter(function(e) {
                        return !isSimple(e);
                    })
                    : content;
            })(), true);
    });
};
