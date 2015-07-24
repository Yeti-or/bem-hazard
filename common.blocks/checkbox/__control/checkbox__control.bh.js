module.exports = function(bh) {
    bh.match('checkbox__control', function(ctx) {
        ctx
            .tag('input')
            .attrs(ctx.extend(
                {
                    type: 'checkbox',
                    autocomplete: 'off',
                    'aria-labelledby': ctx.tParam('labelId')
                },
                ctx.tParam('checkboxAttrs')
            ));
    });
};
