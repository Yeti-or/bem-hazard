var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

BH.bh
    .match('popup2_visible_yes', function(ctx, json) {})
BH.bh
    .match('popup2_visible_yes', function(ctx, json) {
debugger
        var style = ctx.attr('style') || {},
            zIndex = style.zIndex
        zIndex && ctx.attr('data-z-index', zIndex)
    })

var Link = require('../desktop.bundle/link/link.js')
var Popup = require('../desktop.bundle/popup2/popup2.js')

var bemJson = require('./popup.bem.json')

BH.bh
    .match('directions', function(ctx) {
        ctx.tag('table')
    })
    .match('directions__row', function(ctx) {
        ctx.tag('tr')
    })
    .match('directions__cell', function(ctx) {
        ctx.tag('td')
    })


    .match('test', function(ctx) {
        ctx
            .muStates({
                'popup-opened': false
            })

            .match('link', function(ctxL) {
                ctxL.bind({
                    onClick: function(e) {
                        ctx._anchor = e.target
                        ctx.muState('popup-opened', !ctx.muState('popup-opened'))
                    }
                })
            })

            .match('popup2', function(ctxP) {
                ctx._anchor && (ctxP._anchor || ctxP.setAnchor(ctx._anchor))
                ctxP.mod('visible', ctx.muState('popup-opened') ? 'yes' : 'no', true)
            })
    })

var Example = BH.React.createClass({
    render: function() {
        return (
            <BEM attrs={{style:{margin: 20}}}>
                {bemJson}
            </BEM>
        )
    }
})

React.render(
    <Example />,
    document.body
)
