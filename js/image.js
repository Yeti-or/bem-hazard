var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

var Image = require('../desktop.bundle/image/image.js')

var Example = BH.React.createClass({
    render: function() {
        return (
            <BEM attrs={{style:{margin: 20}}}>
                <Image url='//yastatic.net/lego/_/Kx6F6RQnQFitm0qRxX7vpvfP0K0.png' alt='Иконка Серпа' />
            </BEM>
        )
    }
})

React.render(
    <Example />,
    document.body
)
