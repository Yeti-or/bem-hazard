var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

var RadioButton = require('../desktop.bundle/radio-button/radio-button.js')
var RadioButton__radio = require('../desktop.bundle/radio-button/__radio/radio-button__radio.js')

var bemJson = require('./radio-button.bem.json')

var Example = BH.React.createClass({
    render: function() {
        return (
            <BEM attrs={{style:{margin: 20}}}>
                {bemJson}
            </BEM>
        )
    }
})

React.render(
    <Example />,
    document.body
)
