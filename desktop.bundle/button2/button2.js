//Could be generated

var Button = Button2 = React.createClass({
    block: 'button2',
    mixins: [BEM, common___button2, desktop___button2, common___button2_type_link],
    render: function() {

        this.mods(function() {
            return {
                type: this.props.type,
                size: this.props.size,
                theme: this.props.theme,
                pin: this.props.pin,
                disabled: this.props.disabled
            }
        })

        return this.node()
    },
})
