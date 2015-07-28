# lego-hazard
Reactive Islands

_in Progress..._

##BEM-HAZARD:
Обертка над [React](https://facebook.github.io) с синтаксисом [bh](https://github.com/bem/bh)

##LEGO:
* [BEM](https://github.yandex-team.ru/pages/yeti-or/lego-hazard/bem.html)
* [Button2](https://github.yandex-team.ru/pages/yeti-or/lego-hazard/button2.html)
* [Checkbox](https://github.yandex-team.ru/pages/yeti-or/lego-hazard/checkbox.html)
* [Check-button](https://github.yandex-team.ru/pages/yeti-or/lego-hazard/check-button.html)
* [Icon](https://github.yandex-team.ru/pages/yeti-or/lego-hazard/icon.html)
* [Image](https://github.yandex-team.ru/pages/yeti-or/lego-hazard/image.html)
* [Link](https://github.yandex-team.ru/pages/yeti-or/lego-hazard/link.html)
* [Radiobox](https://github.yandex-team.ru/pages/yeti-or/lego-hazard/radiobox.html)
* [Radio-button](https://github.yandex-team.ru/pages/yeti-or/lego-hazard/radio-button.html)
* [Popup2 - WIP](https://github.yandex-team.ru/pages/yeti-or/lego-hazard/popup.html)
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

![lego-zombie-outbreak 1](https://github.yandex-team.ru/github-enterprise-assets/0000/1623/0000/2211/d68d24cc-263e-11e5-88ca-f05b39469090.png)
