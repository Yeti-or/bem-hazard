module.exports = function(bh) {
    bh.match('radiobox__radio', function(ctx, json) {

        var controlAttrs = ctx.extend({
                id: ctx.generateId(),
                type: 'radio',
                name: ctx.tParam('name')
            }, json.controlAttrs),

            // value блока совпало с value в controlAttrs элемента radio
            isValuesMatch = controlAttrs.value !== undefined && controlAttrs.value === ctx.tParam('value');

        ctx.mods({
            disabled: ctx.tParam('disabled'),
            checked: isValuesMatch ? 'yes' : ''
        });

        if(ctx.mod('disabled') === 'yes') {
            controlAttrs.disabled = 'disabled';
            controlAttrs.tabIndex = -1;
        }

        if(ctx.mod('checked') === 'yes') {
            controlAttrs.checked = 'checked';
        }

        ctx
            .tag('label')
            .attr('htmlFor', controlAttrs.id)
            .tParam('controlAttrs', controlAttrs)
            .content([
                {
                    elem: 'box',
                    tag: 'span',
                    content: {elem: 'control'}
                },
                ctx.content()
            ], true);
    });

    //bhz.js
    bh.match('radiobox__radio', function(ctx) {
        var controlAttrs = ctx.tParam('controlAttrs')
        //XXX: this is because we reRender only radiobox__radio not full radio so we have controlAttrs already
        //we can change in radiobox__radio.bh.js => tParam('controlAttrs', controlAttrs, true)
        if (controlAttrs) {
            ctx.tParam('controlAttrs', undefined, true)
        }

        ctx
            .mixJs({block: 'control', mods: {'focused': true}})
            .mixJs({block: 'control', mods: {'hovered': true}})
            .bind({
                onClick: function() {
                    if (!ctx.mod('disabled')) {
                        ctx
                            .muMod('focused', true)
                            .elem('control').focus()
                    }
                }
            })
    })
}
