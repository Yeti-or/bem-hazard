
var common___button2_type_check = {
    getInitialState: function() {
        return this.match({modName: 'type', modVal: 'check'}, function(ctx) {
            return {
                checked: false
            }
        })
    },
    componentWillMount: function() {
        this.match({modName: 'type', modVal: 'check'}, function(ctx) {
            ctx
                .muMods(function() {
                    return {
                        checked: this.state.checked
                    }
                })
                .muAttrs(function() {
                    return {
                        'aria-pressed': ctx.mod('checked')
                    }
                })
                .bind({
                    onClick: function() {
                        this.setState({checked: !this.state.checked})
                    }
                })
        })
    }
}
