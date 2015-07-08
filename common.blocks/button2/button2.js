
var button2_type_link = {
    componentWillMount: function() {
        if (this.props.type === 'link') {
            this.tag('a')
            this.attr
        }
    }
}

var button2 = {
    block: 'button2',
    getDefaultProps: function() {
        return {
            tabindex: 0
        }
    },
    getInitialState: function() {
        return {
            active: false,
            focus: false
        }
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.disabled && this.state.focus) {
            React.findDOMNode(this).blur()
            this.setState({focus: false})
        }
    },
    componentWillMount: function() {
        var block = this.block,
            content = this.props.children,
            cls__text = block + '__' + 'text'

        this.content(<span className={cls__text}>{content}</span>)
        this.tag('button')

        this.bind({
            onClick: function(e) {
                this.props.disabled || this.props.onClick && this.props.onClick(e)
            },
            onMouseleave: function() {
                //TODO: bindToDoc diff from native btn
                this.setState({active: false})
            },
            onMouseDown: function() {
                this.setState({active: true})
            },
            onMouseUp: function() {
                this.setState({active: false})
            },
            onKeyDown: function(e) {
                if (e.key === ' ' || e.key === 'Enter') {
                    this.setState({active: true})
                }
            },
            onKeyUp: function(e) {
                this.setState({active: false})
            },
            onFocus: function() {
                if (!this.props.disabled) {
                    this.setState({focus: true})
                }
            },
            onBlur: function() {
                this.setState({focus: false})
            }
        })
    }
}

var desktop___button2 = {
    getInitialState: function() {
        return {
            hover: false
        }
    },
    componentWillMount: function() {
        this.bind({
            onMouseEnter: function() {
                this.props.disabled || this.setState({hover: true})
            },
            onMouseLeave: function() {
                this.setState({hover: false})
            }
        })
    }
}

var Button = Button2 = React.createClass({
    mixins: [BEM, button2, desktop___button2, button2_type_link],
    propTypes: {
        tabindex: React.PropTypes.number,
        //TODO: declare all props
        //TODO: type - enum
        type: React.PropTypes.string
    },
    render: function() {
        var
            //mods
            type = this.props.type,
            size = this.props.size,
            theme = this.props.theme,
            disabled = this.props.disabled,
            pin = this.props.pin,
            //attrs
            attrs = {
                type: this.props.type || 'button',
                id : this.props.id,
                name : this.props.name,
                title : this.props.title,
                value : this.props.val,
                //TODO: how to remove tabIndex instead of using -1
                tabIndex : disabled ? -1 : this.props.tabindex,
                //TODO: why disabled=true?
                disabled: disabled,
                'aria-disabled': disabled
            },
            //TODO: BEM naming plugin
            block = this.block,
            cls = block
                + (theme ? ' ' + block + '_theme_' + theme : '')
                + (size ? ' ' + block + '_size_' + size : '')
                + (pin ? ' ' + block + '_pin_' + pin : '')
                + (disabled ? ' ' + block + '_disabled_yes' : '')
                + (this.state.hover ? ' ' + block + '_hovered_yes' : '')
                + (this.state.focus ? ' ' + block + '_focused_yes' : '')
                + (this.state.active ? ' ' + block + '_pressed_yes' : '')
            ,

            att = {
                className:cls, ...attrs,
            }

            this.attr(att)

        return this.node()
    },
})
