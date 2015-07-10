
var common___button2_type_link = {
    componentWillMount: function() {
        this.match({modName: 'type', modVal: 'link'}, function(ctx, json) {
            ctx
                .tag('a')
                .attrs({
                    type: undefined,
                    target: json.target
                })
                .muAttrs(function(json) {
                    return {
                        href: ctx.mod('disabled') ? undefined : json.url
                    }
                })
        })
    }
}

