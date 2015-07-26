var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

var Link = require('../desktop.bundle/link/link.js')

var Example = BH.React.createClass({
    render: function() {
        return (
            <BEM attrs={{style:{margin: 20}}}>
                <Link url='http://ya.ru'>
                    Самая посещаемая страница Рунета
                </Link>
            </BEM>
        )
    }
})

React.render(
    <Example />,
    document.body
)
