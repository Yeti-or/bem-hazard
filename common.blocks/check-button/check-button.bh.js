module.exports = function(bh) {
    bh.match('check-button', function(ctx, json) {
        var id = (json.controlAttrs || {}).id || ctx.generateId(),
            controlAttrs = ctx.extend({
                id: id,
                'aria-labelledby': 'text' + id,
                name: json.name,
                tabindex: json.tabindex,
                value: (json.value || json.content)
            }, json.controlAttrs);

        if(ctx.mod('disabled')) {
            controlAttrs.disabled = 'disabled';
        }

        if(ctx.mod('checked')) {
            controlAttrs.checked = 'checked';
        }

        ctx
            .tag('label')
            .js(ctx.extend({live: false}, ctx.js()))
            .mod('theme', 'normal')
            .attr('for', controlAttrs.id)
            .tParam('controlAttrs', controlAttrs)
            .content([
                {
                    elem: 'control'
                },
                {
                    elem: 'text',
                    tag: 'span',
                    content: ctx.content()
                }
            ], true);
    });
};
