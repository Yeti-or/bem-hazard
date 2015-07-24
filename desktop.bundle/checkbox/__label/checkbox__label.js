//Could be generated
var BH = require('../../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../../common.blocks/checkbox/__control/checkbox__control.bh.js')(bh)
require('../../../common.blocks/checkbox/__label/checkbox__label.bh.js')(bh)

var Checkbox__label = BH.React.createClass({
    displayName: 'checkbox__label',
    __block: 'checkbox',
    __elem: 'label',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    },
})

module.exports = Checkbox__label
