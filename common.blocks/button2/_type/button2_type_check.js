
bh.match('button2_type_check', function(ctx, json) {
        ctx
            .muMods({
                checked: ctx.mod('checked') || false
            })

            .attr('aria-pressed', ctx.mod('checked'))

            .bind({
                onClick: function() {
                    ctx.toggleMuMod('checked')
                }
            })
})
