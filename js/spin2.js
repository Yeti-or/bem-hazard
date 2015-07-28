var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

var Spin = require('../desktop.bundle/spin2/spin2.js')

var bemJson = {
    content: 'XXS, 16px|XS, 24px|S, 28px|M, 32px|L, 38px'.split('|').map(function(label) {
        var size = label.split(',')[0].toLowerCase();
        return {
            block: 'example',
            content: [
                {
                    block: 'check-button',
                    mods: {
                        theme: 'normal',
                        size: size === 'xxs' ? 'xs' : size,
                        checked: 'yes'
                    },
                    content: label
                },
                {
                    block: 'spin2',
                    mods: {
                        size: size,
                        progress: 'yes'
                    }
                }
            ]
        };
    })
}

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
