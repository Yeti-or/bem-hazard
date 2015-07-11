
var common___buton2_type_submit = {
    componentWillMount: function() {
        this.match({block: 'button2', modName: 'type', modVal: 'submit'}, function(ctx, json) {
            ctx.attr('type', 'submit')
        })
    }
}
