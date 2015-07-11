
var common___button2 = {
    propTypes: {
        tabindex: React.PropTypes.number,
        //TODO: declare all props
        //TODO: type - enum
        type: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
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
    }
}

bh.match({block: 'button2'}, function(ctx, json) {
    var block = 'button2',
        content = json.children,
        cls__text = block + '__' + 'text'
    ctx
        .tag('button')

        .attrs({
            type: 'button',
            id : json.id,
            name : json.name,
            title : json.title,
            value : json.val,
            tabIndex: 0
        })

        .content(<span className={cls__text}>{content}</span>)
})
