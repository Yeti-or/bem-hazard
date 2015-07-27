module.exports = function(bh) {
    bh.match('checkbox', function(ctx) {
        ctx.mixJs({block: 'control', mods: {'hovered': true}})
    })
};
