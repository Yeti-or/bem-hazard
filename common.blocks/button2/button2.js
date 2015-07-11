
var common___button2 = {
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
            focus: false
        }
    },
    componentWillReceiveProps: function(props) {

        if (props.disabled && this.state.focus) {
            this.setState({focus: false})
            React.findDOMNode(this).blur()
        }

    },
    componentWillMount: function() {
        var block = this.__block,
            content = this.props.children,
            cls__text = block + '__' + 'text'

        this.match({block: 'button2'}, function(ctx, json) {
        ctx
            .content(<span className={cls__text}>{content}</span>)
            .tag('button')

            //immutable attrs
            .attrs({
                type: 'button',
                id : json.id,
                name : json.name,
                title : json.title,
                value : json.val,
            })

            .muAttrs(function(props) {
                return {
                    //TODO: how to remove tabIndex instead of using -1
                    tabIndex : props.disabled ? -1 : props.tabindex,
                    //TODO: why disabled=true?
                    disabled: props.disabled,
                    'aria-disabled': props.disabled
                }
            })

            .muMods(function() {
                return {
                    pressed: this.state.active,
                    focused: this.state.focus
                }
            })

            .bind({
                onClick: function(e) {
                    this.props.disabled || this.props.onClick && this.props.onClick(e)
                },
                onMouseLeave: function() {
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
        })
    }
}
