//Could be generated
var BH = require('../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../common.blocks/radio-button/radio-button.bh.js')(bh)
var RadioButton__radio = require('./__radio/radio-button__radio.js')

var RadioButton = BH.React.createClass({
    displayName: 'radiobutton',
    __block: 'radio-button',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    }
})

RadioButton.Radio = RadioButton__radio

module.exports = RadioButton
