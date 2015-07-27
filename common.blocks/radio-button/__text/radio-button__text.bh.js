module.exports = function(bh) {
    bh.match('radio-button__text', function(ctx) {
        ctx.tag('span');
    });
};
