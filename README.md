# lego-hazard
Reactive Islands

_in Progress..._

##Набор блоков
* [Button2](https://github.yandex-team.ru/pages/yeti-or/lego-hazard/button2.html)
* пока всё =)

Внутри как-то так:
```javascript
var common___button2_type_check = { 
    getInitialState: function() {
        return this.match({modName: 'type', modVal: 'check'}, function(ctx) {
            return {
                checked: false
            }   
        })  
    },  
    componentWillMount: function() {
        this.match({modName: 'type', modVal: 'check'}, function(ctx) {
            ctx.mods(function() {
                return {
                    checked: this.state.checked ? 'yes' : ''
                }   
            })  
            .muAttrs(function(props) {
                return {
                    'aria-pressed': this.state.checked
                }   
            })  
            .bind({
                onClick: function() {
                    this.setState({checked: !this.state.checked})
                }   
            })  
        })  
    }   
}
```

![lego-zombie-outbreak 1](https://github.yandex-team.ru/github-enterprise-assets/0000/1623/0000/2211/d68d24cc-263e-11e5-88ca-f05b39469090.png)
