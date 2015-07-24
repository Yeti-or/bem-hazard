module.exports = function(bh) {
    bh.match('check-button_only-icon_yes', function(ctx) {
        var content = ctx.content();
        ctx.applyBase();
        ctx.content([
            {elem: 'control'},
            '&#160;',
            content
        ], true);
    });
};
