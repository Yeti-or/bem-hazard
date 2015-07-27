//Could be generated
var BH = require('../../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../../common.blocks/control/control.bhz.js')(bh)
require('../../../desktop.blocks/control/control.bhz.js')(bh)

require('../../../common.blocks/radiobox/__radio/radiobox__radio.bh.js')(bh)
require('../../../common.blocks/radiobox/__control/radiobox__control.bh.js')(bh)

var Radiobox__radio = BH.React.createClass({
    displayName: 'radiobox__radio',
    __block: 'radiobox',
    __elem: 'radio',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    },
})

module.exports = Radiobox__radio
