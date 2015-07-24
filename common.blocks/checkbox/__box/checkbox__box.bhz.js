module.exports = function(bh) {
    bh.match('checkbox__box', function(ctx) {
        ctx.mixJs({block: 'control', mods: {'focused': true}})
    })
};
