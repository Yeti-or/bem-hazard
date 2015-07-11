
bh.match({block: 'button2'}, function(ctx, json) {
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

