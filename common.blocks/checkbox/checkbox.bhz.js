module.exports = function(bh) {
    bh.match('checkbox', function(ctx, json) {
        ctx
            .muMods({
                checked: ctx.mod('checked')
            })
            .bind({
                onChange: function(e) {
                    ctx.muMod('checked', e.target.checked)
                }
            })
    })
}
