//Could be generated
var BH = require('../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../common.blocks/radiobox/radiobox.bh.js')(bh)

var Radiobox__radio = require('./__radio/radiobox__radio.js')

var Radiobox = BH.React.createClass({
    displayName: 'radiobox',
    __block: 'radiobox',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    }
})

Radiobox.Radio = Radiobox__radio

module.exports = Radiobox
