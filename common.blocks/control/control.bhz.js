module.exports = function(bh) {
    bh.match('control_focused', function(ctx) {
        ctx
            .muMods({
                focused: false
            })
            .bind({
                onFocus: function() {
                    ctx.mod('disabled') || ctx.muMod('focused', true)
                },
                onBlur: function() {
                    ctx.muMod('focused', false)
                }
            })
    })
};
