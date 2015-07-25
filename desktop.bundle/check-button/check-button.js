//Could be generated
var BH = require('../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../common.blocks/check-button/check-button.bh.js')(bh)
require('../../common.blocks/check-button/__control/check-button__control.bh.js')(bh)
require('../../common.blocks/check-button/__text/check-button__text.bh.js')(bh)
require('../../common.blocks/check-button/_only-icon/check-button_only-icon_yes.bh.js')(bh)


var CheckButton = BH.React.createClass({
    displayName: 'checkbutton',
    __block: 'check-button',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    }
})

module.exports = CheckButton
