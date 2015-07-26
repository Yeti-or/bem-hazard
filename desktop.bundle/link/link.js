//Could be generated
var BH = require('../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../common.blocks/link/link.bh.js')(bh)

var Link = BH.React.createClass({
    displayName: 'link',
    __block: 'link',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    }
})

module.exports = Link
