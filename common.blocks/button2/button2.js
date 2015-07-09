
var common___button2_type_link = {
    componentWillMount: function() {
        if (this.props.type === 'link') {
            this
                .tag('a')
                .attr({
                    href: this.props.disabled ? undefined : this.props.url,
                    type: undefined,
                    target: this.props.target
                })
        }
    },
    componentWillReceiveProps: function(props) {
        if (props.type === 'link') {
            this.attr({
                href: props.disabled ? undefined : props.url
            })
        }
    }
}

var common___button2 = {
    block: 'button2',
    propTypes: {
        tabindex: React.PropTypes.number,
        //TODO: declare all props
        //TODO: type - enum
        type: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            tabindex: 0,
            type: 'button'
        }
    },
    getInitialState: function() {
        return {
            active: false,
            focus: false
        }
    },
    componentWillReceiveProps: function(props) {
        //mutable attrs
        this.attr({
            //TODO: how to remove tabIndex instead of using -1
            tabIndex : props.disabled ? -1 : props.tabindex,
            //TODO: why disabled=true?
            disabled: props.disabled,
            'aria-disabled': props.disabled
        })

        if (props.disabled && this.state.focus) {
            this.setState({focus: false})
            React.findDOMNode(this).blur()
        }

    },
    componentWillMount: function() {
        var block = this.block,
            content = this.props.children,
            cls__text = block + '__' + 'text'

        this
            .content(<span className={cls__text}>{content}</span>)
            .tag('button')

            //immutable attrs
            .attr({
                type: this.props.type,
                id : this.props.id,
                name : this.props.name,
                title : this.props.title,
                tabIndex: this.props.tabindex,
                value : this.props.val,
            })

            //TODO: 2 methods - mut/immut attrs
            .attr({
                tabIndex : this.props.disabled ? -1 : this.props.tabindex,
                disabled: this.props.disabled,
                'aria-disabled': this.props.disabled
            })

            .mods(function() {
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
    }
}

var desktop___button2 = {
    getInitialState: function() {
        return {
            hover: false
        }
    },
    componentWillMount: function() {
        this
        .bind({
            onMouseEnter: function() {
                this.props.disabled || this.setState({hover: true})
            },
            onMouseLeave: function() {
                this.setState({hover: false})
            }
        })

        .mods(function() {
            return {
                hovered: this.state.hover
            }
        })
    }
}

var Button = Button2 = React.createClass({
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
