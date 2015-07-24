module.exports = function(bh) {
    bh.match('checkbox', function(ctx, json) {
        var checkboxAttrs = ctx.extend({id: ctx.generateId()}, json.checkboxAttrs),
            jsParams = ctx.extend({live: false}, ctx.js());

        if(ctx.mod('disabled')) {
            checkboxAttrs.disabled = 'disabled';
        }
        if(ctx.mod('checked')) {
            checkboxAttrs.defaultChecked = 'checked';
        }

        ctx
            .tag('span')
            .js(jsParams)
            .mod('theme', 'normal')
            .tParam('checkboxAttrs', checkboxAttrs)
            .tParam('labelId', 'label' + checkboxAttrs.id)
            .content([
                {
                    elem: 'box',
                    tag: 'span',
                    elemMods: {checked: ctx.mod('checked')},
                    content: [
                        {elem: 'control'},
                        {elem: 'tick', tag: 'i'}
                    ]
                },
                ctx.content()
            ], true);
    });
};
