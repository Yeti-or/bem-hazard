
var common___button2_type_link = {
    componentWillMount: function() {
        if (this.props.type === 'link') {
            this
                .tag('a')
                .attrs({
                    type: undefined,
                    target: this.props.target
                })
                .muAttrs(function(props) {
                    return {
                        href: props.disabled ? undefined : props.url
                    }
                })
        }
    }
}

