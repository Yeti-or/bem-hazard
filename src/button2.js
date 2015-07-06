var Button = Button2 = React.createClass({
    render: function() {
        var //attrs
            attrs = {
                tabIndex : this.props.tabindex || 0,
                id : this.props.id,
                name : this.props.name,
                title : this.props.title,
                value : this.props.val
            },
            //mods
            type = this.props.type || 'button',
            size = this.props.size,
            theme = this.props.theme,
            //content
            content = this.props.children
            //TODO: BEM naming plugin
            block = 'button2'
            cls = block
                + (theme ? ' ' + block + '_theme_' + theme : '')
                + (size ? ' ' + block + '_size_' + size : '')
                + (this.state.hover ? ' ' + block + '_hovered_yes' : '')
                + (this.state.focus ? ' ' + block + '_focused_yes' : '')
            cls__text = block + '__' + 'text'
        return (
            <button className={cls} {...attrs}
                    onFocus={this.onFocus} onBlur={this.onBlur}
                    onMouseEnter={this.onMouseenter} onMouseLeave={this.onMouseleave} >
                <span className={cls__text}>{content}</span>
            </button>
        )
    },
    getInitialState: function() {
        return {
            hover: false,
            focus: false
        }
    },
    onMouseenter: function() {
        this.setState({hover: true})
    },
    onMouseleave: function() {
        this.setState({hover: false})
    },
    onFocus: function() {
        this.setState({focus: true})
    },
    onBlur: function() {
        this.setState({focus: false})
    }
})
