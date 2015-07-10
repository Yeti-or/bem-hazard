
var desktop___button2 = {
    getInitialState: function() {
        return {
            hovered: false
        }
    },
    componentWillMount: function() {
        this
        .bind({
            onMouseEnter: function() {
                this.props.disabled || this.setState({hovered: true})
            },
            onMouseLeave: function() {
                this.setState({hovered: false})
            }
        })

        .muMods(function() {
            return {
                hovered: this.props.disabled ? false : this.state.hovered
            }
        })
    }
}

