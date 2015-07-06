var Button2 = React.createClass({displayName: "Button2",
    render: function() {
        var //attrs
            tabindex = this.props.tabindex || 0,
            id = this.props.id,
            name = this.props.name,
            title = this.props.title,
            value = this.props.val,
            //mods
            type = this.props.type || 'button',
            size = this.props.size,
            theme = this.props.theme,
            //content
            children = this.props.children
            //TODO: BEM naming plugin
            block = 'button2'
            cls = block
                + (theme ? ' ' + block + '_theme_' + theme : '')
                + (size ? ' ' + block + '_size_' + size : '')
                + (this.state.hover ? ' ' + block + '_hovered_yes' : '')
            cls__text = block + '__' + 'text'
        return (
            React.createElement("button", {className: cls, onMouseEnter: this.onMouseenter, onMouseLeave: this.onMouseleave, type: type, /*tabIndex={tabindex}*/ id: id, name: name, title: title, value: value}, 
                React.createElement("span", {className: cls__text}, children)
            )
        )
    },
    getInitialState: function() {
        return {
            hover: false
        }
    },
    onMouseenter: function() {
        this.setState({hover: true})
    },
    onMouseleave: function() {
        this.setState({hover: false})
    }
});
