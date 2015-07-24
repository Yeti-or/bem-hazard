var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

var bemJson = require('./radiobox.bem.json')
var Radiobox = require('../desktop.bundle/radiobox/radiobox.js')
var Radiobox__radio = require('../desktop.bundle/radiobox/__radio/radiobox__radio.js')

var Example = BH.React.createClass({
    render: function() {
        return (
            <BEM attrs={{style:{margin: 20}}}>
                {bemJson}
                <br/>
                <br/>
                <Radiobox mods={{size:"s", disabled:'yes'}} name="bla" value="val-2">
                    <Radiobox__radio controlAttrs={{value: 'val-1'}}>
                        JSX Radio 1
                    </Radiobox__radio>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Radiobox__radio controlAttrs={{value: 'val-2'}}>
                        JSX Radio 2
                    </Radiobox__radio>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Radiobox__radio controlAttrs={{value: 'val-3'}}>
                        JSX Radio 3
                    </Radiobox__radio>
                </Radiobox>
                <br/>
                <br/>
                <Radiobox _size="m" name="bla" value="val-2">
                    <Radiobox.Radio controlAttrs={{value: 'val-1'}}>
                        JSX Radio 1
                    </Radiobox.Radio>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Radiobox.Radio controlAttrs={{value: 'val-2'}}>
                        JSX Radio 2
                    </Radiobox.Radio>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Radiobox.Radio controlAttrs={{value: 'val-3'}}>
                        JSX Radio 3
                    </Radiobox.Radio>
                </Radiobox>
            </BEM>
        )
    }
})

React.render(
    <Example />,
    document.body
)
