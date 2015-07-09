
var desktop___button2 = {
    getInitialState: function() {
        return {
            hover: false
        }
    },
    componentWillMount: function() {
        this
        .bind({
            onMouseEnter: function() {
                this.props.disabled || this.setState({hover: true})
            },
            onMouseLeave: function() {
                this.setState({hover: false})
            }
        })

        .mods(function() {
            return {
                hovered: this.state.hover
            }
        })
    }
}

