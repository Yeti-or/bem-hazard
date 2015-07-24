//Could be generated
var BH = require('../../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../../common.blocks/radio-button/radio-button.bh.js')(bh)

require('../../../common.blocks/radio-button/__radio/radio-button__radio.bh.js')(bh)
require('../../../common.blocks/radio-button/__radio/_only-icon/radio-button__radio_only-icon_yes.bh.js')(bh)
require('../../../common.blocks/radio-button/__control/radio-button__control.bh.js')(bh)
require('../../../common.blocks/radio-button/__text/radio-button__text.bh.js')(bh)

var RadioButton__radio = BH.React.createClass({
    displayName: 'radiobutton__radio',
    __block: 'radio-button',
    __elem: 'radio',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    },
})

module.exports = RadioButton__radio
