
var common___button2 = {
    componentWillReceiveProps: function(props) {


    },
    componentWillMount: function() {

    }
}

bh.match({block: 'button2'}, function(ctx, json) {
    var block = 'button2',
        content = json.children,
        cls__text = block + '__' + 'text'

    var attrs = {
        type: 'button',
        id: json.id,
        title: json.title,
        name: json.name,
        value: json.val
    };

    ctx
        .content(<span className={cls__text}>{content}</span>)

        ctx.param('tabindex', '0');

        if(ctx.mod('disabled')) {
            attrs.disabled = true;
            attrs['aria-disabled'] = true;
        } else {
            attrs.tabIndex = json.tabIndex;
        }

        ctx
            .tag('button')
            .js({_tabindex: json.tabindex})
            .attrs(attrs)
            .tParam('_size', ctx.mod('size'));


        ctx
        .muMods({
            pressed: false,
            focused: false
        })

        .beforeUpdate(function() {
            debugger;
            if (this.mod('disabled')) {
                this.attr('tabIndex', undefined)
                if (this.state.focus) {
                    this.setState({focus: false})
                    React.findDOMNode(this).blur()
                }
            }
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
