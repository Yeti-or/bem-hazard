module.exports = function(bh) {
    bh.match('control_hovered', function(ctx) {
        ctx
            .muMods({
                hovered: false
            })
            .bind({
                onMouseEnter: function() {
                    ctx.mod('disabled') || ctx.muMod('hovered', true)
                },
                onMouseLeave: function() {
                    ctx.muMod('hovered', false)
                }
            })
    })
}
