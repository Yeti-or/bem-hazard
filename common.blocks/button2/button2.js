
var Button = Button2 = React.createClass({
    block: 'button2',
    mixins: [BEM],
    propTypes: {
        tabindex: React.PropTypes.number,
        //TODO: declare all props
        //TODO: type - enum
        type: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            tabindex: 0
        }
    },
    getInitialState: function() {
        return {
            active: false,
            hover: false,
            focus: false
        }
    },
    componentWillMount: function() {
        var block = this.block,
            content = this.props.children,
            cls__text = block + '__' + 'text'

        this.content(<span className={cls__text}>{content}</span>)
        this.tag('button');

        var events = {
            onClick:this._onClick,
            onFocus:this._onFocus, onBlur:this._onBlur,
            onKeyDown:this._onKeyDown, onKeyUp:this._onKeyUp,
            onMouseDown:this._onMouseDown, onMouseUp:this._onMouseUp,
            onMouseEnter:this._onMouseenter, onMouseLeave:this._onMouseleave
        }

        this.attr(events)
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.disabled && this.state.focus) {
            React.findDOMNode(this).blur()
            this._onBlur()
        }
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

        return this.node();
    },
    _onClick: function(e) {
        this.props.disabled || this.props.onClick && this.props.onClick(e)
    },
    _onMouseenter: function() {
        this.props.disabled || this.setState({hover: true})
    },
    _onMouseleave: function() {
        this.setState({hover: false})
        //TODO: bindToDoc diff from native btn
        this.setState({active: false})
    },
    _onMouseDown: function() {
        this.setState({active: true})
    },
    _onMouseUp: function() {
        this.setState({active: false})
    },
    _onKeyDown: function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            this.setState({active: true})
        }
    },
    _onKeyUp: function(e) {
        this.setState({active: false})
    },
    _onFocus: function() {
        if (!this.props.disabled) {
            this.setState({focus: true})
        }
    },
    _onBlur: function() {
        this.setState({focus: false})
    }
})
