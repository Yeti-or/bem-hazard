_in Progress..._

##BEM-HAZARD:
Обертка над [React](https://facebook.github.io) с синтаксисом [bh](https://github.com/bem/bh)

##LEGO:
* [BEM](http://yeti-or.github.io/bem-hazard/bem.html)
* [Button](http://yeti-or.github.io/bem-hazard/button2.html)
* [Checkbox](http://yeti-or.github.io/bem-hazard/checkbox.html)
* [Check-button](http://yeti-or.github.io/bem-hazard/check-button.html)
* [Icon](http://yeti-or.github.io/bem-hazard/icon.html)
* [Image](http://yeti-or.github.io/bem-hazard/image.html)
* [Link](http://yeti-or.github.io/bem-hazard/link.html)
* [Radiobox](http://yeti-or.github.io/bem-hazard/radiobox.html)
* [Radio-button](http://yeti-or.github.io/bem-hazard/radio-button.html)
* [Popup - WIP](http://yeti-or.github.io/bem-hazard/popup.html)
* пока всё =)

Внутри как-то так:
```javascript
module.exports = function(bh) {
    bh.match('checkbox', function(ctx, json) {
        ctx
            .muMods({
                checked: ctx.mod('checked')
            })
            .bind({
                onChange: function(e) {
                    ctx.muMod('checked', e.target.checked)
                }
            })
    })
}
```

![lego-zombies](https://cloud.githubusercontent.com/assets/1813468/9577293/1586324a-4fe8-11e5-875a-5380fb0d4202.jpg)
