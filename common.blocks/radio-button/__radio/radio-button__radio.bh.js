module.exports = function(bh) {
    bh.match('radio-button__radio', function(ctx, json) {

        var elemMods = ctx.mods(),
            radioButton = ctx.tParam('_radioButton'),

            // Если на всём блоке _disabled_yes.
            makeDisabled = radioButton.disabled,

            // По историческим причинам controlAttrs копируется, а не используется as is.
            controlAttrs = ctx.extend({}, json.controlAttrs || {}),

            // value блока совпало с value контрола.
            valuesMatched = controlAttrs.value !== undefined && controlAttrs.value === radioButton.value;

        // value блока совпало с value в controlAttrs элемента radio.
        if(valuesMatched) {
            elemMods.checked = 'yes';
        }

        if(makeDisabled) {
            elemMods.disabled = 'yes';
        }

        if(!elemMods.side) {
            // `isFirst * 2 + isLast` приводит комбинации isFirst/isLast к индексу от 0 до 3.
            elemMods.side = ['', 'right', 'left', 'both'][ctx.isFirst() * 2 + ctx.isLast()];
        }

        controlAttrs.checked = Boolean(elemMods.checked);
        controlAttrs.disabled = Boolean(elemMods.disabled);

        if(!controlAttrs.id) {
            controlAttrs.id = ctx.generateId();
        }

        ctx
            .tag('label')
            .attrs({
                'htmlFor': controlAttrs.id
            })
            .tParam('_controlAttrs', controlAttrs)
            .content([
                {elem: 'control'},
                {
                    elem: 'text',
                    tag: 'span',
                    content: ctx.content()
                }
            ], true);
    });
};
