//Could be generated
var BH = require('../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../common.blocks/popup2/popup2.bhz.js')(bh)
require('../../common.blocks/popup2/_target/popup2_target.js')(bh)
require('../../common.blocks/popup2/_target/popup2_target_anchor.js')(bh)
require('../../common.blocks/popup2/_target/popup2_target_position.js')(bh)

module.exports = BH.React.createClass({
    displayName: 'popup',
    __block: 'popup',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    }
})
