
bh.match({block: 'button2', modName: 'type', modVal: 'link'}, function(ctx, json) {
    ctx
        .tag('a')
        .js({_url: json.url})
        .attrs({
            target: json.target,
            type: undefined,
            href: ctx.mod('disabled') ? undefined : json.url
        })
})
