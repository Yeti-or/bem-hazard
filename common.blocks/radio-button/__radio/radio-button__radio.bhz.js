module.exports = function(bh) {
    bh.match('radio-button__radio', function(ctx, json) {
        //XXX: this is because we reRender only radiobutton__radio not full radio so we have controlAttrs already
        //we can change in radiobutton__radio.bh.js => tParam('_controlAttrs', controlAttrs, true)
        if (ctx.tParam('_controlAttrs')) {
            ctx.tParam('_controlAttrs', undefined, true)
        }

        ctx
            .mixJs({block: 'radiobox', elem: 'radio'})
            .mixJs({block: 'control', mods: {'pressed': true}})
    })
}
