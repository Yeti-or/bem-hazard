
var desktop___button2 = {
}

bh.match({block: 'button2'}, function(ctx, json) {
    ctx
        .muMods({
            hovered: false
        })
        .bind({
            onMouseEnter: function() {
                this.mod('disabled') || this.setState({hovered: true})
            },
            onMouseLeave: function() {
                this.setState({hovered: false})
            }
        })
})

