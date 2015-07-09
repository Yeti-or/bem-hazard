
var common___button2_type_radio = {
    getInitialState: function() {
        return this.match({modName: 'type', modVal: 'radio'}, function(ctx) {
            return {
                checked: false
            }
        })
    },
    componentWillMount: function() {
        this.match({modName: 'type', modVal: 'radio'}, function(ctx) {
            ctx.mods(function() {
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
        })
    }
}
