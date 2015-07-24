module.exports = function(bh) {
    bh.match('checkbox__label', function(ctx) {
        ctx
            .tag('label')
            .attrs({
                'for': ctx.tParam('checkboxAttrs').id,
                'id': ctx.tParam('labelId'),
                'aria-hidden': true
            });
    });
};
