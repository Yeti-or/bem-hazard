var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

var bemJson = require('./checkbox.bem.json')
require('../desktop.bundle/checkbox/checkbox.js')

var Example = BH.React.createClass({
    render: function() {
        return (
            <BEM>
                {bemJson}
            </BEM>
        )
    }
})

React.render(
    <Example />,
    document.body
)
