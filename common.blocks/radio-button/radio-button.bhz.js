module.exports = function(bh) {
    bh.match('radio-button', function(ctx, json) {
        ctx
            .muStates({
                value: json.value
            })
            .bind({
                onChange: function(e) {
                    ctx.muState('value', e.target.value)
                }
            })
            .param('value', ctx.muState('value'), true)
    })
}
