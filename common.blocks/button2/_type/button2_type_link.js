
var common___button2_type_link = {
    componentWillMount: function() {
        this.match({modName: 'type', modVal: 'link'}, function(ctx) {
            ctx.tag('a')
            .attrs({
                type: undefined,
                target: this.props.target
            })
            .muAttrs(function(props) {
                return {
                    href: props.disabled ? undefined : props.url
                }
            })
        })
    }
}

