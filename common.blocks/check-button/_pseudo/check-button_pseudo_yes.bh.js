module.exports = function(bh) {
    bh.match('check-button_pseudo_yes', function(ctx) {
        ctx.mod('theme', 'pseudo');
    });

    bh.match('check-button_pseudo_yes__control', function(ctx) {
        ctx.attr('value', '', true);
    });
};
