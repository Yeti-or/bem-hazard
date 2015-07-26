//Could be generated
var BH = require('../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../common.blocks/image/image.bh.js')(bh)

var Image = BH.React.createClass({
    displayName: 'image',
    __block: 'image',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    }
})

module.exports = Image
