var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

require('../desktop.bundle/check-button/check-button.js')

var bemJson = require('./check-button.bem.json')

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
