module.exports = function(bh) {
    bh.match('check-button__control', function(ctx) {
        ctx
            .tag('input')
            .attrs(ctx.tParam('controlAttrs'))
            .attr('type', 'checkbox');
    });
};
