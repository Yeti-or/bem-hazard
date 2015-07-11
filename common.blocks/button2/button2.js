
var common___button2 = {
    propTypes: {
        tabindex: React.PropTypes.number,
        //TODO: declare all props
        //TODO: type - enum
        type: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            tabIndex: 0
        }
    },
    componentWillReceiveProps: function(props) {

        if (props.disabled && this.state.focus) {
            this.setState({focus: false})
            React.findDOMNode(this).blur()
        }

    },
    componentWillMount: function() {

    }
}

bh.match({block: 'button2'}, function(ctx, json) {
    var block = 'button2',
        content = json.children,
        cls__text = block + '__' + 'text'

    ctx
        .tag('button')

        .content(<span className={cls__text}>{content}</span>)

        .attrs({
            type: 'button',
            id : json.id,
            name : json.name,
            title : json.title,
            value : json.val,
            //TODO: how to remove tabIndex instead of using -1
            tabIndex : ctx.mod('disabled') ? -1 : json.tabIndex,
            //TODO: why disabled=true?
            disabled: json.disabled,
            'aria-disabled': json.disabled
        })


        .muMods({
            pressed: false,
            focused: false
        })

        .bind({
            onClick: function(e) {
                this.props.disabled || this.props.onClick && this.props.onClick(e)
            },
            onMouseLeave: function() {
                //TODO: bindToDoc diff from native btn
                this.setState({pressed: false})
            },
            onMouseDown: function() {
                this.setState({pressed: true})
            },
            onMouseUp: function() {
                this.setState({pressed: false})
            },
            onKeyDown: function(e) {
                if (e.key === ' ' || e.key === 'Enter') {
                    this.setState({pressed: true})
                }
            },
            onKeyUp: function(e) {
                this.setState({pressed: false})
            },
            onFocus: function() {
                if (!this.props.disabled) {
                    this.setState({focused: true})
                }
            },
            onBlur: function() {
                this.setState({focused: false})
            }
        })

})
