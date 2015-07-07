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
                    onClick={this._onClick}
                    onFocus={this._onFocus} onBlur={this._onBlur}
                    onMouseEnter={this._onMouseenter} onMouseLeave={this._onMouseleave} >
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
    _onClick: function(e) {
        this.props.onClick && this.props.onClick(e)
    },
    _onMouseenter: function() {
        this.setState({hover: true})
    },
    _onMouseleave: function() {
        this.setState({hover: false})
    },
    _onFocus: function() {
        this.setState({focus: true})
    },
    _onBlur: function() {
        this.setState({focus: false})
    }
})
