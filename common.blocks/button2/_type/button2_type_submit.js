
bh.match({block: 'button2', modName: 'type', modVal: 'submit'}, function(ctx, json) {
    ctx.attr('type', 'submit')
})
