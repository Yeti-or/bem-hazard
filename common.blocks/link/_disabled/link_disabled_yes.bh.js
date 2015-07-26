module.exports = function(bh) {
    bh.match('link_disabled_yes', function(ctx) {
        ctx.attrs({
            tabindex: -1,
            'aria-disabled': true
        }, true);
    });
};
