
bh.match('button2_type_radio', function(ctx) {
        ctx
            .muMods({
                checked: ctx.mod('checked') || false
            })

            .attr('aria-pressed', ctx.mod('checked'))

            .bind({
                onClick: function() {
                    ctx.muMod('checked', true)
                }
            })
})
