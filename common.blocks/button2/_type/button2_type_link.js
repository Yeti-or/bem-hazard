
var common___button2_type_link = {
    componentWillMount: function() {
        if (this.props.type === 'link') {
            this
                .tag('a')
                .attrs({
                    href: this.props.disabled ? undefined : this.props.url,
                    type: undefined,
                    target: this.props.target
                })
        }
    },
    componentWillReceiveProps: function(props) {
        if (props.type === 'link') {
            this.attr('href', props.disabled ? undefined : props.url)
        }
    }
}

