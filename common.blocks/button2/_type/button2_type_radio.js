
bh.match({block: 'button2', modName: 'type', modVal: 'radio'}, function(ctx) {
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
