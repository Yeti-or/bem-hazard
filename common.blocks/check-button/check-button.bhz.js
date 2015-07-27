module.exports = function(bh) {
    bh.match('check-button', function(ctx) {
        ctx
            .mixJs({block: 'control', mods: {'pressed': true}})
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
