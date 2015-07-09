
var common___button2_type_check = {
    getInitialState: function() {
        if (this.props.type === 'check') {
            return {
                checked: false
            }
        }
    },
    componentWillMount: function() {
        if (this.props.type === 'check') {
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
                        this.setState({checked: !this.state.checked})
                    }
                })
        }
    }
}
