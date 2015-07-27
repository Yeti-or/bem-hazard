module.exports = function(bh) {
    bh.match('check-button__text', function(ctx) {
        ctx.attr('id', ctx.tParam('controlAttrs')['aria-labelledby']);
    });
};
