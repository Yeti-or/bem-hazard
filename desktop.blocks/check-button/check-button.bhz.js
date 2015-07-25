module.exports = function(bh) {
    bh.match('check-button', function(ctx) {
        ctx
            .mixJs({block: 'control', mods: {'focused': true}})
            .mixJs({block: 'control', mods: {'hovered': true}})
    })
}
