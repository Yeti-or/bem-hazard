module.exports = function(bh) {
    bh.match('radio-button__radio_only-icon_yes', function(ctx) {
        ctx.content([
            {elem: 'control'},
            '&#160;', // &nbsp;
            ctx.content()
        ], true);
    });
};
