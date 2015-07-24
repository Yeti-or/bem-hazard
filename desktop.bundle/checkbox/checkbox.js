//Could be generated
var BH = require('../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../common.blocks/control/control.bhz.js')(bh)
require('../../desktop.blocks/control/control.bhz.js')(bh)

require('../../common.blocks/checkbox/checkbox.bh.js')(bh)
require('../../common.blocks/checkbox/checkbox.bhz.js')(bh)
require('../../desktop.blocks/checkbox/checkbox.bhz.js')(bh)
require('../../common.blocks/checkbox/__box/checkbox__box.bhz.js')(bh)

var Checkbox__label = require('./__label/checkbox__label.js')

var Checkbox = BH.React.createClass({
    displayName: 'checkbox',
    __block: 'checkbox',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    }
})

Checkbox.Label = Checkbox__label

module.exports = Checkbox
