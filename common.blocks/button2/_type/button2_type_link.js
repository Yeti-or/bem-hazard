
bh.match('button2_type_link', function(ctx, json) {
    ctx
        .tag('a')
        .js({_url: json.url})
        .attrs({
            target: json.target,
            type: undefined,
            href: ctx.mod('disabled') ? undefined : json.url
        })
})
