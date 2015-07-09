
var common___button2_type_radio = {
    getInitialState: function() {
        if (this.props.type === 'radio') {
            return {
                checked: false
            }
        }
    },
    componentWillMount: function() {
        if (this.props.type === 'radio') {
            this
                .mods(function() {
                    return {
                        checked: this.state.checked ? 'yes' : ''
                    }
                })
                .muAttrs(function(props) {
                    return {
                        'aria-pressed': this.state.checked
                    }
                })
                .bind({
                    onClick: function() {
                        this.setState({checked: true})
                    }
                })
        }
    }
}
