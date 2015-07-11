
bh.match({block: 'button2', modName: 'type', modVal: 'check'}, function(ctx, json) {
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
