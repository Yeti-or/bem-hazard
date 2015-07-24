(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var React = window.React || (typeof require !== 'undefined') && require('react')
var assign = Object.assign || (typeof require !== 'undefined') && require('object-assign')

var BH = (function() {
var __lastGenId = 0

var BH = function() {
    //TODO: make it better
    this.__matchers = {}
    BEM_Hazard.bh = this
    BEM_Hazard.__expandoId = new Date().getTime()
    this.utils = BEM_Hazard
    this.BEM = React.createClass({
        displayName: '',
        __block: '',
        mixins: [BEM_Hazard],
        render: function() {
            return this.__node()
        }
    })
}

BH._ = '_'
BH.__ = '__'
BH.React = React
BH._getDecl =  function(selector) {
    var decl = {},
        decls,
        isElem = ~selector.indexOf(BH.__)
    isElem ?
        decls = selector.split(BH.__) :
        decls = selector.split(BH._)

    decl.block = decls.shift()

    if (isElem) {
        decls = decls[0].split(BH._)
        decl.elem = decls.shift()
    }

    decl.modName = decls.shift()
    decl.modVal = decls.shift()
    return decl
}

BH.prototype = {
    noBoolMods: false, //For LEGO set true
    apply: function(bemJson) {
        if (!bemJson) return ''
        var el = React.createElement(this.BEM, bemJson)
        return React.renderToStaticMarkup(el)
    },
    match: function(selector, matcher) {
        if (!selector || !matcher) return this
        var decl = BH._getDecl(selector)
        this.__matchers[decl.block] || (this.__matchers[decl.block] = [])
        this.__matchers[decl.block].push([decl, matcher])
        return this
    },
    xmlEscape: function(x) {
        //Because React will do it for us
        //TODO: or do we need this?
        return x
    },
    attrEscape: function(x) {
        return x
    },
    jsAttrEscape: function(x) {
        return x
    },
    enableInfiniteLoopDetection: function() {
        //V8 will do it for us
    }
}

var BEM_Hazard = {
    js: function() {return this},
    bem: function() {return this},
    extend: assign,
    isSimple: function(obj) {
        if (!obj || obj === true) return true
        var t = typeof obj
        return t === 'string' || t === 'number'
    },
    generateId: function() {
        return 'uniq' + this.__expandoId + (++__lastGenId);
    },
    param: function(param, val, force) {
        if (val) {
            (!this.__json[param] || force) && (this.__json[param] = val)
            return this
        } else {
            return this.__json[param]
        }
    },
    tParam: function(key, val, force) {
        if (arguments.length > 1) {
            this.__json.$tParam || (this.__json.$tParam = {})
            if (!this.__json.$tParam[key] || force) {this.__json.$tParam[key] = val}
            return this
        } else {
            return this.__json.$tParam && this.__json.$tParam[key]
        }
    },
    cls: function(cls, force) {
        if (cls) {
            (!this.__json.cls || force) && (this.__json.cls = cls)
            return this
        } else {
            return this.__json.cls
        }
    },
    attrs: function(values, force) {
        var attrs = this.__json.attrs || {}
        if (values !== undefined) {
            this.__json.attrs = force ? this.extend(attrs, values) : this.extend(values, attrs)
            return this
        } else {
            return attrs
        }
    },
    attr: function(key, val, force) {
        if (arguments.length > 1) {
            this.__json.attrs ?
                (!this.__json.attrs.hasOwnProperty(key) || force) && (this.__json.attrs[key] = val) :
                (this.__json.attrs = {})[key] = val
            return this
        } else {
            return this.__json.attrs && this.__json.attrs[key]
        }
    },
    //TODO: Refactor mod, mods, muMod, muMods
    //Think about declMumods ? setMuMod delMuMod getMuMod
    mod: function(mod, val, force) {
        var mods = this.mods()
        if (arguments.length > 1) {
            (!mods.hasOwnProperty(mod) || force) && (mods[mod] = val)
            return this
        } else {
            if (mods.hasOwnProperty(mod)) {
                return mods[mod]
            } else {
                return this.muMod(mod)
            }
        }
    },
    mods: function(values, force) {
        var field = this.__json.elem ? 'elemMods' : 'mods'
        var mods = this.__json[field]
        if (values !== undefined) {
            this.__json[field] = force ? this.extend(mods, values) : this.extend(values, mods)
            return this
        } else {
            return mods
        }
    },
    muStates: function(states) {
        if (states) {
            if (this.__flag) {
                this.__muStates = this.extend({}, this.__muStates, states)
            }
            return this
        } else {
            return this.__muStates || {}
        }
    },
    muMods: function(mods) {
        if (mods) {
            if (this.__flag) {
                this.__muMods = this.extend({}, this.__muMods, mods)
            }
            return this
        } else {
            return this.__muMods || {}
        }
    },
    muState: function(state, val) {
        if (arguments.length > 1) {
            if (!this.__flag) {
                if (this.state[state] !== val) {
                    var newState = {}
                    newState[state] = val
                    this.setState(newState)
                }
            }
            (this.__muStates || (this.__muStates = {}))[state] = val
            return this
        } else {
            return this.muStates()[state]
        }
    },
    muMod: function(mod, val) {
        if (arguments.length > 1) {
            if (!this.__flag) {
                if (this.state[mod] !== val) {
                    var newState = {}
                    newState[mod] = val
                    this.setState(newState)
                }
            }
            (this.__muMods || (this.__muMods = {}))[mod] = val
            return this
        } else {
            return this.muMods()[mod]
        }
    },
    toggleMuMod : function(modName) {
        //TODO: Refactor me
        this.muMod(modName, !this.muMod(modName))
        return this
    },
    tag: function(tag, force) {
        if (tag) {
            (!this.__json.tag || force) && (this.__json.tag = tag)
            return this
        } else {
            return this.__json.tag
        }
    },
    mix: function(mix, force) {
        if (mix) {
            this.__json.mix = (!this.__json.mix || force) ?
                mix :
                (Array.isArray(this.__json.mix) ? this.__json.mix : [this.__json.mix]).concat(mix)
            return this
        } else {
            return this.__json.mix
        }
    },
    content: function(content, force) {
        if (arguments.length > 0) {
                (!this.__json.content || force) && (this.__json.content = content)
            return this
        } else {
            return this.__json.content
        }
    },
    position: function() {
        return this.__json.$position
    },
    isFirst: function() {
        return this.position() === 1
    },
    isLast: function() {
        return this.__json.$isLast
    },
    json: function() {
        return this.__json
    },
    stop: function() {
        this.__json.__stop = true
        return this
    },
    applyBase: function() {
        this.__processMatch()
        return this
    },
    __processMatch: function() {
        var retVal,
            ctx = this,
            json = this.__json,
            b_ = json.block,
            __e = json.elem,
            mods = this.mods(),
            matchers = json.__matchers,
            i = matchers.length - 1,
            matched = json.__matched,
            matchMods = function(decl) {
                if (decl.modName) {
                    if (mods && mods[decl.modName] && (mods[decl.modName] === decl.modVal || mods[decl.modName] === true)) {
                        matched.push(i)
                        retVal = cb(ctx, json)
                    }
                } else {
                    matched.push(i)
                    retVal = cb(ctx, json)
                }
            }
        for (; i >= 0 && !retVal && !json.__stop; i--) {
            var rule = matchers[i],
                decl = rule[0],
                cb = rule[1]

            if (~matched.indexOf(i)) { continue }
            if (decl.elem || __e) {
                (decl.elem === __e) && matchMods(decl)
            } else {
                matchMods(decl)
            }
        }
        if (retVal)  {
            retVal = [].concat(retVal).map(function(retVal) {
                if (retVal.block && retVal.block !== json.block) {
                    var matchers = this.bh.__matchers[retVal.block] || []

                    this.__json = retVal
                    this.__json.__stop = false
                    this.__json.__matched = []
                    this.__json.__matchers = matchers
                } else {
                    retVal.__stop = json.__stop
                    retVal.__matched = json.__matched
                    retVal.__matchers = json.__matchers
                    retVal.elem && (retVal.block = json.block)
                    this.__json = retVal
                }
                this.__processMatch()
                return this.__json
            }, this)
            retVal.length == 1 && (retVal = retVal[0])
            this.__json = retVal
        }
    },
    __match: function() {
        var b_ =  this.__json.block,
            matchers = this.bh.__matchers[b_] || []

        this.__json.__stop = false
        this.__json.__matched = []
        this.__json.__matchers = matchers
        this.__processMatch()
    },

    componentWillMount: function() {
        this._composeCurNode(this.props)
        this.__flag = true
        this.__match()
    },
    componentDidMount: function() {
        this.state = this.extend({}, this.state, this.muStates(), this.muMods())
    },
    componentWillReceiveProps: function(props) {
        this.__props = props
        this._composeCurNode(props)
        this.beforeUpdate().forEach(function(bUpdate) {
            bUpdate.bind(this)(this, this.__json)
        }, this)
    },
    componentWillUpdate: function() {
        if (this.__props) {
            this.__props = undefined
        } else {
            this._composeCurNode(this.props)
        }
    },
    __node: function() {
        if (this.__flag) {
            this.__flag = false
        } else {
            this.__match()
        }

        var renderNodes = function(json, result) {
            return json.reduce(function(result, json) {
                if (Array.isArray(json)) {
                    renderNodes(json, result)
                } else {
                    this.__json = json
                    var cls = this._buildClassName() + (this.cls() ? ' ' + this.cls() : ''),
                        content = this._processTree(this.content()),
                        attrs = this.attrs(),
                        events = this._events(),
                        props = {children: content}

                    cls && (props.className = cls)
                    result.push(React.createElement(this.tag() || 'div', this.extend(props, attrs, events)))
                }
                return result
            }.bind(this), result || [])
        }.bind(this)

        var node,
            nodes = renderNodes([].concat(this.__json))

        if (nodes.length == 1) {
            node = nodes[0]
        } else {
            node = React.createElement('span', {children: nodes})
        }
        return node
    },

    _composeCurNode: function(pp) {
        //TODO: Think about caching/diffing bemJsonTree/content
        this.__json = this.extend({}, pp, {content: pp.children || pp.content})
        var mods = Object.keys(this.__json).reduce(function(mods, key) {
            return key[0] === BH._ && (mods[key.slice(1)] = pp[key]), mods
        }, {})
        this.__block && (this.__json.block = this.__block)
        this.__elem && (this.__json.elem = this.__elem)
        if (this.__json.elem) {
            this.__json.elemMods || (this.__json.elemMods = (this.__json.mods || {}))
        } else {
            this.__json.mods || (this.__json.mods = {})
        }
        if (Object.keys(mods).length > 0) {
            if (this.__json.elem) {
                this.__json.elemMods = this.extend(this.__json.elemMods, mods)
            } else {
                this.__json.mods = this.extend(this.__json.mods, mods)
            }
        }
    },
    _buildClassName: function() {
        var b_ = this.__json.block,
            __e = this.__json.elem,
            cls = {},
            mods = this.extend({}, this.mods(), this.muMods())

        function addEnity(b_, __e, mods, mix) {
            var entity = b_

            if (__e) {
                entity += BH.__ + __e
            }
            cls[entity] = entity
            Object.keys(mods).forEach(function(modName) {
                var modValue = mods[modName]
                if (!modValue && modValue !== 0) return
                var modEntity = entity + BH._ + modName
                if (typeof modValue === 'boolean') {
                    BH.noBoolMods && modValue && (modEntity += BH._ + 'yes')
                } else {
                    modEntity += BH._ + modValue
                }
                cls[modEntity] = modEntity
            })
        }

        b_ && addEnity(b_, __e, mods, false)
        this.__json.mix && [].concat(this.__json.mix).forEach(function(mix) {
            if (!mix) { return }
            if (!mix.block) {
                if (!b_) { return }
                mix.block = b_
                mix.elem || (mix.elem = __e)
            }
            addEnity(mix.block, mix.elem, mix.mods || mix.elemMods || {}, true)
        })

        return Object.keys(cls).join(' ')
    },
    _processTree: function(tree, position) {
        tree = [].concat(tree)
        position || (position = {val: 0, last: 0})
        position.last += (tree.length - 1)
        var content = tree.map(function(node) {
            if (Array.isArray(node)) {
                return this._processTree(node, position)
            }
            if (!node || (!node.block && !node.elem && !node.tag && !node.content && !node.type)) {
                return node
            }
            if (node.type) {
                var name = node.type.displayName
                if (!name) { return node }
                var decl = BH._getDecl(name)
                node = node.props || {}
                node.block = decl.block.toLowerCase()
                node.elem = decl.elem
            }
            if (node.elem) {
                node.block || (node.block = this.__json.block)
                node.ref = node.block + BH.__ + node.elem + '~' + this.generateId()
            }
            this.__json.$tParam && (node.$tParam = this.extend({}, this.__json.$tParam))
            position.last === position.val && (node.$isLast = true)
            node.$position = ++position.val

            return React.createElement(this.bh.BEM, node)
        }, this)
        content.length == 1 && (content = content[0])
        return content
    },
    elem: function(elemName) {
        if (this.__flag) { return }
        var elems = [].concat(this.elemCtx(elemName)).map(function(elemCtx) {
            return elemCtx.domElem()
        })
        elems.length == 1 && (elems = elems[0])
        return elems
    },
    elemCtx: function(elemName) {
        var elems = [],
            entity = this.__json.block + BH.__ + elemName,
            _elemCtx = function(refs) {
                Object.keys(refs).forEach(function(refKey) {
                    var ref = refs[refKey]
                    if (!ref) { return }
                    if (refKey.split('~')[0] === entity) {
                        elems.push(ref)
                    } else {
                        _elemCtx(ref.refs)
                    }
                })
            }

        _elemCtx(this.refs)
        elems.length == 1 && (elems = elems[0])
        return elems
    },
    _events: function(events) {
        if (events) {
            this._eventsProps || (this._eventsProps = {})
            this.extend(this._eventsProps, events)
        } else {
            return this._eventsProps
        }
    },
    beforeUpdate: function(cb) {
        if (cb) {
            this.__flag && (this.__bUpdate || (this.__bUpdate = [])).push(cb)
            return this
        } else {
            return this.__bUpdate || []
        }
    },
    bind: function(events) {
        if (this.__flag) {
            var attrs = {}
            this.__events || (this.__events = {})
            Object
                .keys(events)
                .forEach(function(eventName){
                    var cb = events[eventName]
                    this.__events[eventName] || (this.__events[eventName] = [])
                    this.__events[eventName].push(cb)
                    attrs[eventName] = function(e) {
                        this.__events[eventName].forEach(function(fn) {
                            fn.bind(this)(e)
                        }, this)
                    }.bind(this)
                }, this)

            this._events(attrs)
        }
        return this
    },
    domElem: function() {
        return React.findDOMNode(this)
    }
}

BH.BEM_Hazard = BEM_Hazard

return BH
})()

if (typeof module !== 'undefined') {
    module.exports = BH
}

},{"object-assign":11,"react":10}],2:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('radiobox__control', function(ctx) {
        ctx
            .tag('input')
            .attrs(ctx.tParam('controlAttrs'));
    });
    bh.match('radiobox__control', function(ctx) {
        ctx
            //XXX: supress React warning
            //     we handle onChange in radiobox__radio
            // we could change contolAttrs.check -> controlAttrs.defaultCheck
            .bind({onChange: function() {}})
    });
}

},{}],3:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('radiobox__radio', function(ctx, json) {

        var controlAttrs = ctx.extend({
                id: ctx.generateId(),
                type: 'radio',
                name: ctx.tParam('name')
            }, json.controlAttrs),

            // value блока совпало с value в controlAttrs элемента radio
            isValuesMatch = controlAttrs.value !== undefined && controlAttrs.value === ctx.tParam('value');

        ctx.mods({
            disabled: ctx.tParam('disabled'),
            checked: isValuesMatch ? 'yes' : ''
        });

        if(ctx.mod('disabled') === 'yes') {
            controlAttrs.disabled = 'disabled';
            controlAttrs.tabIndex = -1;
        }

        if(ctx.mod('checked') === 'yes') {
            controlAttrs.checked = 'checked';
        }

        ctx
            .tag('label')
            .attr('htmlFor', controlAttrs.id)
            .tParam('controlAttrs', controlAttrs)
            .content([
                {
                    elem: 'box',
                    tag: 'span',
                    content: {elem: 'control'}
                },
                ctx.content()
            ], true);
    });

    //bhz.js
    bh.match('radiobox__radio', function(ctx) {
        var controlAttrs = ctx.tParam('controlAttrs')
        //XXX: this is because we reRender only radiobox__radio not full radio so we have controlAttrs already
        //we can change in radiobox__radio.bh.js => tParam('controlAttrs', controlAttrs, true)
        if (controlAttrs) {
            ctx.tParam('controlAttrs', undefined, true)
        }

        //TODO: make it js mix control-focusable
        ctx
            .muMods({
                focused: false
            })
            .bind({
                onFocus: function() {
                    ctx.mod('disabled') || ctx.muMod('focused', true)
                },
                onBlur: function() {
                    ctx.muMod('focused', false)
                }
            })

        //TODO: make it js mix desktop/control-hoverable
            .muMods({
                hovered: false
            })
            .bind({
                onMouseEnter: function() {
                    ctx.mod('disabled') || ctx.muMod('hovered', true)
                },
                onMouseLeave: function() {
                    ctx.muMod('hovered', false)
                }
            })

            .bind({
                onClick: function() {
                    if (!ctx.mod('disabled')) {
                        ctx
                            .muMod('focused', true)
                            .elem('control').focus()
                    }
                }
            })
    })
}

},{}],4:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('radiobox', function(ctx, json) {
        ctx
            .tag('span')
            .js(ctx.extend({live: false}, ctx.js()))
            .mod('theme', 'normal')
            .tParam('disabled', ctx.mod('disabled'))
            .tParam('name', json.name)
            .tParam('value', json.value);
    });

    bh.match('radiobox', function(ctx, json) {
        ctx
            .muStates({
                value: json.value
            })
            .tParam('value', ctx.muState('value'))
            .bind({
                onChange: function(e) {
                    ctx.muState('value', e.target.value)
                }
            })
    })
}

},{}],5:[function(require,module,exports){
var BH = require('../../common.blocks/bem/bem.js')

BH.noBoolMods = true

var bh = new BH()
var BEM = bh.BEM

module.exports.React = BH.React
module.exports.bh = bh
module.exports.BEM = BEM

},{"../../common.blocks/bem/bem.js":1}],6:[function(require,module,exports){
//Could be generated
var BH = require('../../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../../common.blocks/radiobox/__radio/radiobox__radio.bh.js')(bh)
require('../../../common.blocks/radiobox/__control/radiobox__control.bh.js')(bh)

var Radiobox__radio = BH.React.createClass({
    displayName: 'radiobox__radio',
    __block: 'radiobox',
    __elem: 'radio',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    },
})

module.exports = Radiobox__radio

},{"../../../common.blocks/radiobox/__control/radiobox__control.bh.js":2,"../../../common.blocks/radiobox/__radio/radiobox__radio.bh.js":3,"../../../desktop.blocks/bem/bem.js":5}],7:[function(require,module,exports){
//Could be generated
var BH = require('../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../common.blocks/radiobox/radiobox.bh.js')(bh)

var Radiobox__radio = require('./__radio/radiobox__radio.js')

var Radiobox = BH.React.createClass({
    displayName: 'radiobox',
    __block: 'radiobox',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    }
})

Radiobox.Radio = Radiobox__radio

module.exports = Radiobox

},{"../../common.blocks/radiobox/radiobox.bh.js":4,"../../desktop.blocks/bem/bem.js":5,"./__radio/radiobox__radio.js":6}],8:[function(require,module,exports){
module.exports=[
    {
        block: 'radiobox',
        mods: {size: 's', theme: 'pseudo'},
        attrs: {style: {backgroundColor: 'lightgray'}},
        name: 'bla',
        content: [
            {
                elem: 'radio',
                content: 'Радио 1',
                controlAttrs: {value: 'val-1'}
            },
            { tag: 'span', content: '\u00a0\u00a0\u00a0\u00a0'},
            {
                elem: 'radio',
                content: 'Радио 2',
                controlAttrs: {value: 'val-2'}
            },
            { tag: 'span', content: '\u00a0\u00a0\u00a0\u00a0'},
            {
                elem: 'radio',
                content: 'Радио 3',
                controlAttrs: {value: 'val-3'}
            }
        ]
    },
    { tag: 'br' },
    { tag: 'br' },
    {
        block: 'radiobox',
        mods: {size: 'm'},
        attrs: {style: {backgroundColor: 'lightgray'}},
        name: 'bla',
        value: 'val-1',
        content: [
            {
                elem: 'radio',
                content: 'Радио 1',
                controlAttrs: {value: 'val-1'}
            },
            { tag: 'span', content: '\u00a0\u00a0\u00a0\u00a0'},
            {
                elem: 'radio',
                content: 'Радио 2',
                elemMods: {disabled: 'yes'},
                controlAttrs: {value: 'val-2'}
            },
            { tag: 'span', content: '\u00a0\u00a0\u00a0\u00a0'},
            {
                elem: 'radio',
                content: 'Радио 3',
                controlAttrs: {value: 'val-3'}
            }
        ]
    },
    { tag: 'br' },
    { tag: 'br' },
    {
        block: 'radiobox',
        mods: {size: 's', disabled: 'yes'},
        name: 'bla',
        value: 'val-1',
        content: [
            {
                elem: 'radio',
                content: 'Радио 1',
                controlAttrs: {value: 'val-1'}
            },
            { tag: 'span', content: '\u00a0\u00a0\u00a0\u00a0'},
            {
                elem: 'radio',
                content: 'Радио 2',
                controlAttrs: {value: 'val-2'}
            },
            { tag: 'span', content: '\u00a0\u00a0\u00a0\u00a0'},
            {
                elem: 'radio',
                content: 'Радио 3',
                controlAttrs: {value: 'val-3'}
            }
        ]
    }
]

},{}],9:[function(require,module,exports){
var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

var bemJson = require('./radiobox.bem.json')
var Radiobox = require('../desktop.bundle/radiobox/radiobox.js')
var Radiobox__radio = require('../desktop.bundle/radiobox/__radio/radiobox__radio.js')

var Example = BH.React.createClass({
    render: function() {
        return (
            React.createElement(BEM, {attrs: {style:{margin: 20}}}, 
                bemJson, 
                React.createElement("br", null), 
                React.createElement("br", null), 
                React.createElement(Radiobox, {mods: {size:"s", disabled:'yes'}, name: "bla", value: "val-2"}, 
                    React.createElement(Radiobox__radio, {controlAttrs: {value: 'val-1'}}, 
                        "JSX Radio 1"
                    ), 
                    "    ", 
                    React.createElement(Radiobox__radio, {controlAttrs: {value: 'val-2'}}, 
                        "JSX Radio 2"
                    ), 
                    "    ", 
                    React.createElement(Radiobox__radio, {controlAttrs: {value: 'val-3'}}, 
                        "JSX Radio 3"
                    )
                ), 
                React.createElement("br", null), 
                React.createElement("br", null), 
                React.createElement(Radiobox, {_size: "m", name: "bla", value: "val-2"}, 
                    React.createElement(Radiobox.Radio, {controlAttrs: {value: 'val-1'}}, 
                        "JSX Radio 1"
                    ), 
                    "    ", 
                    React.createElement(Radiobox.Radio, {controlAttrs: {value: 'val-2'}}, 
                        "JSX Radio 2"
                    ), 
                    "    ", 
                    React.createElement(Radiobox.Radio, {controlAttrs: {value: 'val-3'}}, 
                        "JSX Radio 3"
                    )
                )
            )
        )
    }
})

React.render(
    React.createElement(Example, null),
    document.body
)

},{"../desktop.blocks/bem/bem.js":5,"../desktop.bundle/radiobox/__radio/radiobox__radio.js":6,"../desktop.bundle/radiobox/radiobox.js":7,"./radiobox.bem.json":8}],10:[function(require,module,exports){

},{}],11:[function(require,module,exports){
'use strict';
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function ownEnumerableKeys(obj) {
	var keys = Object.getOwnPropertyNames(obj);

	if (Object.getOwnPropertySymbols) {
		keys = keys.concat(Object.getOwnPropertySymbols(obj));
	}

	return keys.filter(function (key) {
		return propIsEnumerable.call(obj, key);
	});
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = ownEnumerableKeys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}]},{},[9])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvYmVtL2JlbS5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9yYWRpb2JveC9fX2NvbnRyb2wvcmFkaW9ib3hfX2NvbnRyb2wuYmguanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvcmFkaW9ib3gvX19yYWRpby9yYWRpb2JveF9fcmFkaW8uYmguanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvcmFkaW9ib3gvcmFkaW9ib3guYmguanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2Rlc2t0b3AuYmxvY2tzL2JlbS9iZW0uanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2Rlc2t0b3AuYnVuZGxlL3JhZGlvYm94L19fcmFkaW8vcmFkaW9ib3hfX3JhZGlvLmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9kZXNrdG9wLmJ1bmRsZS9yYWRpb2JveC9yYWRpb2JveC5qcyIsImpzL3JhZGlvYm94LmJlbS5qc29uIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9qcy9yYWRpb2JveC5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L2xpYi9fZW1wdHkuanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLE9BQU8sS0FBSyxXQUFXLEtBQUssT0FBTyxDQUFDLE9BQU8s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QUMsR0FBQSxFQUFHLENBQUMsSUFBQSxFQUFJLENBQUMsS0FBQSxFQUFLLENBQUMsS0FBQSxFQUFLLENBQUMsT0FBUSxDQUFBLEVBQUE7b0JBQ3pDLG9CQUFDLGNBQWMsRUFBQSxDQUFBLENBQUMsWUFBQSxFQUFZLENBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFHLENBQUEsRUFBQTtBQUFBLHdCQUFBLGFBQUE7QUFBQSxvQkFFL0IsQ0FBQSxFQUFBO0FBQUEsb0JBQUEsTUFBQSxFQUFBO0FBQUEsb0JBRWpCLG9CQUFDLGNBQWMsRUFBQSxDQUFBLENBQUMsWUFBQSxFQUFZLENBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFHLENBQUEsRUFBQTtBQUFBLHdCQUFBLGFBQUE7QUFBQSxvQkFFL0IsQ0FBQSxFQUFBO0FBQUEsb0JBQUEsTUFBQSxFQUFBO0FBQUEsb0JBRWpCLG9CQUFDLGNBQWMsRUFBQSxDQUFBLENBQUMsWUFBQSxFQUFZLENBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFHLENBQUEsRUFBQTtBQUFBLHdCQUFBLGFBQUE7QUFBQSxvQkFFL0IsQ0FBQTtnQkFDVixDQUFBO1lBQ1QsQ0FBQTtTQUNUO0tBQ0o7QUFDTCxDQUFDLENBQUM7O0FBRUYsS0FBSyxDQUFDLE1BQU07SUFDUixvQkFBQyxPQUFPLEVBQUEsSUFBQSxDQUFHLENBQUE7SUFDWCxRQUFRLENBQUMsSUFBSTtDQUNoQjs7O0FDbEREOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHdpbmRvdy5SZWFjdCB8fCAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKSAmJiByZXF1aXJlKCdyZWFjdCcpXG52YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKSAmJiByZXF1aXJlKCdvYmplY3QtYXNzaWduJylcblxudmFyIEJIID0gKGZ1bmN0aW9uKCkge1xudmFyIF9fbGFzdEdlbklkID0gMFxuXG52YXIgQkggPSBmdW5jdGlvbigpIHtcbiAgICAvL1RPRE86IG1ha2UgaXQgYmV0dGVyXG4gICAgdGhpcy5fX21hdGNoZXJzID0ge31cbiAgICBCRU1fSGF6YXJkLmJoID0gdGhpc1xuICAgIEJFTV9IYXphcmQuX19leHBhbmRvSWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgIHRoaXMudXRpbHMgPSBCRU1fSGF6YXJkXG4gICAgdGhpcy5CRU0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiAnJyxcbiAgICAgICAgX19ibG9jazogJycsXG4gICAgICAgIG1peGluczogW0JFTV9IYXphcmRdLFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19ub2RlKClcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbkJILl8gPSAnXydcbkJILl9fID0gJ19fJ1xuQkguUmVhY3QgPSBSZWFjdFxuQkguX2dldERlY2wgPSAgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICB2YXIgZGVjbCA9IHt9LFxuICAgICAgICBkZWNscyxcbiAgICAgICAgaXNFbGVtID0gfnNlbGVjdG9yLmluZGV4T2YoQkguX18pXG4gICAgaXNFbGVtID9cbiAgICAgICAgZGVjbHMgPSBzZWxlY3Rvci5zcGxpdChCSC5fXykgOlxuICAgICAgICBkZWNscyA9IHNlbGVjdG9yLnNwbGl0KEJILl8pXG5cbiAgICBkZWNsLmJsb2NrID0gZGVjbHMuc2hpZnQoKVxuXG4gICAgaWYgKGlzRWxlbSkge1xuICAgICAgICBkZWNscyA9IGRlY2xzWzBdLnNwbGl0KEJILl8pXG4gICAgICAgIGRlY2wuZWxlbSA9IGRlY2xzLnNoaWZ0KClcbiAgICB9XG5cbiAgICBkZWNsLm1vZE5hbWUgPSBkZWNscy5zaGlmdCgpXG4gICAgZGVjbC5tb2RWYWwgPSBkZWNscy5zaGlmdCgpXG4gICAgcmV0dXJuIGRlY2xcbn1cblxuQkgucHJvdG90eXBlID0ge1xuICAgIG5vQm9vbE1vZHM6IGZhbHNlLCAvL0ZvciBMRUdPIHNldCB0cnVlXG4gICAgYXBwbHk6IGZ1bmN0aW9uKGJlbUpzb24pIHtcbiAgICAgICAgaWYgKCFiZW1Kc29uKSByZXR1cm4gJydcbiAgICAgICAgdmFyIGVsID0gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLkJFTSwgYmVtSnNvbilcbiAgICAgICAgcmV0dXJuIFJlYWN0LnJlbmRlclRvU3RhdGljTWFya3VwKGVsKVxuICAgIH0sXG4gICAgbWF0Y2g6IGZ1bmN0aW9uKHNlbGVjdG9yLCBtYXRjaGVyKSB7XG4gICAgICAgIGlmICghc2VsZWN0b3IgfHwgIW1hdGNoZXIpIHJldHVybiB0aGlzXG4gICAgICAgIHZhciBkZWNsID0gQkguX2dldERlY2woc2VsZWN0b3IpXG4gICAgICAgIHRoaXMuX19tYXRjaGVyc1tkZWNsLmJsb2NrXSB8fCAodGhpcy5fX21hdGNoZXJzW2RlY2wuYmxvY2tdID0gW10pXG4gICAgICAgIHRoaXMuX19tYXRjaGVyc1tkZWNsLmJsb2NrXS5wdXNoKFtkZWNsLCBtYXRjaGVyXSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIHhtbEVzY2FwZTogZnVuY3Rpb24oeCkge1xuICAgICAgICAvL0JlY2F1c2UgUmVhY3Qgd2lsbCBkbyBpdCBmb3IgdXNcbiAgICAgICAgLy9UT0RPOiBvciBkbyB3ZSBuZWVkIHRoaXM/XG4gICAgICAgIHJldHVybiB4XG4gICAgfSxcbiAgICBhdHRyRXNjYXBlOiBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiB4XG4gICAgfSxcbiAgICBqc0F0dHJFc2NhcGU6IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuIHhcbiAgICB9LFxuICAgIGVuYWJsZUluZmluaXRlTG9vcERldGVjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vVjggd2lsbCBkbyBpdCBmb3IgdXNcbiAgICB9XG59XG5cbnZhciBCRU1fSGF6YXJkID0ge1xuICAgIGpzOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpc30sXG4gICAgYmVtOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpc30sXG4gICAgZXh0ZW5kOiBhc3NpZ24sXG4gICAgaXNTaW1wbGU6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBpZiAoIW9iaiB8fCBvYmogPT09IHRydWUpIHJldHVybiB0cnVlXG4gICAgICAgIHZhciB0ID0gdHlwZW9mIG9ialxuICAgICAgICByZXR1cm4gdCA9PT0gJ3N0cmluZycgfHwgdCA9PT0gJ251bWJlcidcbiAgICB9LFxuICAgIGdlbmVyYXRlSWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJ3VuaXEnICsgdGhpcy5fX2V4cGFuZG9JZCArICgrK19fbGFzdEdlbklkKTtcbiAgICB9LFxuICAgIHBhcmFtOiBmdW5jdGlvbihwYXJhbSwgdmFsLCBmb3JjZSkge1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAoIXRoaXMuX19qc29uW3BhcmFtXSB8fCBmb3JjZSkgJiYgKHRoaXMuX19qc29uW3BhcmFtXSA9IHZhbClcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb25bcGFyYW1dXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRQYXJhbTogZnVuY3Rpb24oa2V5LCB2YWwsIGZvcmNlKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5fX2pzb24uJHRQYXJhbSB8fCAodGhpcy5fX2pzb24uJHRQYXJhbSA9IHt9KVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9fanNvbi4kdFBhcmFtW2tleV0gfHwgZm9yY2UpIHt0aGlzLl9fanNvbi4kdFBhcmFtW2tleV0gPSB2YWx9XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLiR0UGFyYW0gJiYgdGhpcy5fX2pzb24uJHRQYXJhbVtrZXldXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNsczogZnVuY3Rpb24oY2xzLCBmb3JjZSkge1xuICAgICAgICBpZiAoY2xzKSB7XG4gICAgICAgICAgICAoIXRoaXMuX19qc29uLmNscyB8fCBmb3JjZSkgJiYgKHRoaXMuX19qc29uLmNscyA9IGNscylcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uY2xzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGF0dHJzOiBmdW5jdGlvbih2YWx1ZXMsIGZvcmNlKSB7XG4gICAgICAgIHZhciBhdHRycyA9IHRoaXMuX19qc29uLmF0dHJzIHx8IHt9XG4gICAgICAgIGlmICh2YWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fX2pzb24uYXR0cnMgPSBmb3JjZSA/IHRoaXMuZXh0ZW5kKGF0dHJzLCB2YWx1ZXMpIDogdGhpcy5leHRlbmQodmFsdWVzLCBhdHRycylcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYXR0cnNcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXR0cjogZnVuY3Rpb24oa2V5LCB2YWwsIGZvcmNlKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5fX2pzb24uYXR0cnMgP1xuICAgICAgICAgICAgICAgICghdGhpcy5fX2pzb24uYXR0cnMuaGFzT3duUHJvcGVydHkoa2V5KSB8fCBmb3JjZSkgJiYgKHRoaXMuX19qc29uLmF0dHJzW2tleV0gPSB2YWwpIDpcbiAgICAgICAgICAgICAgICAodGhpcy5fX2pzb24uYXR0cnMgPSB7fSlba2V5XSA9IHZhbFxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fanNvbi5hdHRycyAmJiB0aGlzLl9fanNvbi5hdHRyc1trZXldXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vVE9ETzogUmVmYWN0b3IgbW9kLCBtb2RzLCBtdU1vZCwgbXVNb2RzXG4gICAgLy9UaGluayBhYm91dCBkZWNsTXVtb2RzID8gc2V0TXVNb2QgZGVsTXVNb2QgZ2V0TXVNb2RcbiAgICBtb2Q6IGZ1bmN0aW9uKG1vZCwgdmFsLCBmb3JjZSkge1xuICAgICAgICB2YXIgbW9kcyA9IHRoaXMubW9kcygpXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgKCFtb2RzLmhhc093blByb3BlcnR5KG1vZCkgfHwgZm9yY2UpICYmIChtb2RzW21vZF0gPSB2YWwpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG1vZHMuaGFzT3duUHJvcGVydHkobW9kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb2RzW21vZF1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVNb2QobW9kKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtb2RzOiBmdW5jdGlvbih2YWx1ZXMsIGZvcmNlKSB7XG4gICAgICAgIHZhciBmaWVsZCA9IHRoaXMuX19qc29uLmVsZW0gPyAnZWxlbU1vZHMnIDogJ21vZHMnXG4gICAgICAgIHZhciBtb2RzID0gdGhpcy5fX2pzb25bZmllbGRdXG4gICAgICAgIGlmICh2YWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fX2pzb25bZmllbGRdID0gZm9yY2UgPyB0aGlzLmV4dGVuZChtb2RzLCB2YWx1ZXMpIDogdGhpcy5leHRlbmQodmFsdWVzLCBtb2RzKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG11U3RhdGVzOiBmdW5jdGlvbihzdGF0ZXMpIHtcbiAgICAgICAgaWYgKHN0YXRlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19mbGFnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX211U3RhdGVzID0gdGhpcy5leHRlbmQoe30sIHRoaXMuX19tdVN0YXRlcywgc3RhdGVzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fbXVTdGF0ZXMgfHwge31cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbXVNb2RzOiBmdW5jdGlvbihtb2RzKSB7XG4gICAgICAgIGlmIChtb2RzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2ZsYWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fbXVNb2RzID0gdGhpcy5leHRlbmQoe30sIHRoaXMuX19tdU1vZHMsIG1vZHMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19tdU1vZHMgfHwge31cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbXVTdGF0ZTogZnVuY3Rpb24oc3RhdGUsIHZhbCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fX2ZsYWcpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZVtzdGF0ZV0gIT09IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3U3RhdGUgPSB7fVxuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZVtzdGF0ZV0gPSB2YWxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAodGhpcy5fX211U3RhdGVzIHx8ICh0aGlzLl9fbXVTdGF0ZXMgPSB7fSkpW3N0YXRlXSA9IHZhbFxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm11U3RhdGVzKClbc3RhdGVdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG11TW9kOiBmdW5jdGlvbihtb2QsIHZhbCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fX2ZsYWcpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZVttb2RdICE9PSB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1N0YXRlID0ge31cbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGVbbW9kXSA9IHZhbFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICh0aGlzLl9fbXVNb2RzIHx8ICh0aGlzLl9fbXVNb2RzID0ge30pKVttb2RdID0gdmFsXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVNb2RzKClbbW9kXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB0b2dnbGVNdU1vZCA6IGZ1bmN0aW9uKG1vZE5hbWUpIHtcbiAgICAgICAgLy9UT0RPOiBSZWZhY3RvciBtZVxuICAgICAgICB0aGlzLm11TW9kKG1vZE5hbWUsICF0aGlzLm11TW9kKG1vZE5hbWUpKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgdGFnOiBmdW5jdGlvbih0YWcsIGZvcmNlKSB7XG4gICAgICAgIGlmICh0YWcpIHtcbiAgICAgICAgICAgICghdGhpcy5fX2pzb24udGFnIHx8IGZvcmNlKSAmJiAodGhpcy5fX2pzb24udGFnID0gdGFnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fanNvbi50YWdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbWl4OiBmdW5jdGlvbihtaXgsIGZvcmNlKSB7XG4gICAgICAgIGlmIChtaXgpIHtcbiAgICAgICAgICAgIHRoaXMuX19qc29uLm1peCA9ICghdGhpcy5fX2pzb24ubWl4IHx8IGZvcmNlKSA/XG4gICAgICAgICAgICAgICAgbWl4IDpcbiAgICAgICAgICAgICAgICAoQXJyYXkuaXNBcnJheSh0aGlzLl9fanNvbi5taXgpID8gdGhpcy5fX2pzb24ubWl4IDogW3RoaXMuX19qc29uLm1peF0pLmNvbmNhdChtaXgpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLm1peFxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb250ZW50OiBmdW5jdGlvbihjb250ZW50LCBmb3JjZSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAoIXRoaXMuX19qc29uLmNvbnRlbnQgfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbi5jb250ZW50ID0gY29udGVudClcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uY29udGVudFxuICAgICAgICB9XG4gICAgfSxcbiAgICBwb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fanNvbi4kcG9zaXRpb25cbiAgICB9LFxuICAgIGlzRmlyc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbigpID09PSAxXG4gICAgfSxcbiAgICBpc0xhc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uJGlzTGFzdFxuICAgIH0sXG4gICAganNvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fanNvblxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX19qc29uLl9fc3RvcCA9IHRydWVcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGFwcGx5QmFzZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX19wcm9jZXNzTWF0Y2goKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgX19wcm9jZXNzTWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmV0VmFsLFxuICAgICAgICAgICAgY3R4ID0gdGhpcyxcbiAgICAgICAgICAgIGpzb24gPSB0aGlzLl9fanNvbixcbiAgICAgICAgICAgIGJfID0ganNvbi5ibG9jayxcbiAgICAgICAgICAgIF9fZSA9IGpzb24uZWxlbSxcbiAgICAgICAgICAgIG1vZHMgPSB0aGlzLm1vZHMoKSxcbiAgICAgICAgICAgIG1hdGNoZXJzID0ganNvbi5fX21hdGNoZXJzLFxuICAgICAgICAgICAgaSA9IG1hdGNoZXJzLmxlbmd0aCAtIDEsXG4gICAgICAgICAgICBtYXRjaGVkID0ganNvbi5fX21hdGNoZWQsXG4gICAgICAgICAgICBtYXRjaE1vZHMgPSBmdW5jdGlvbihkZWNsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlY2wubW9kTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kcyAmJiBtb2RzW2RlY2wubW9kTmFtZV0gJiYgKG1vZHNbZGVjbC5tb2ROYW1lXSA9PT0gZGVjbC5tb2RWYWwgfHwgbW9kc1tkZWNsLm1vZE5hbWVdID09PSB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZC5wdXNoKGkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRWYWwgPSBjYihjdHgsIGpzb24pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goaSlcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsID0gY2IoY3R4LCBqc29uKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgZm9yICg7IGkgPj0gMCAmJiAhcmV0VmFsICYmICFqc29uLl9fc3RvcDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgcnVsZSA9IG1hdGNoZXJzW2ldLFxuICAgICAgICAgICAgICAgIGRlY2wgPSBydWxlWzBdLFxuICAgICAgICAgICAgICAgIGNiID0gcnVsZVsxXVxuXG4gICAgICAgICAgICBpZiAofm1hdGNoZWQuaW5kZXhPZihpKSkgeyBjb250aW51ZSB9XG4gICAgICAgICAgICBpZiAoZGVjbC5lbGVtIHx8IF9fZSkge1xuICAgICAgICAgICAgICAgIChkZWNsLmVsZW0gPT09IF9fZSkgJiYgbWF0Y2hNb2RzKGRlY2wpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hdGNoTW9kcyhkZWNsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXRWYWwpICB7XG4gICAgICAgICAgICByZXRWYWwgPSBbXS5jb25jYXQocmV0VmFsKS5tYXAoZnVuY3Rpb24ocmV0VmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJldFZhbC5ibG9jayAmJiByZXRWYWwuYmxvY2sgIT09IGpzb24uYmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoZXJzID0gdGhpcy5iaC5fX21hdGNoZXJzW3JldFZhbC5ibG9ja10gfHwgW11cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbiA9IHJldFZhbFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX3N0b3AgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZWQgPSBbXVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZXJzID0gbWF0Y2hlcnNcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXRWYWwuX19zdG9wID0ganNvbi5fX3N0b3BcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsLl9fbWF0Y2hlZCA9IGpzb24uX19tYXRjaGVkXG4gICAgICAgICAgICAgICAgICAgIHJldFZhbC5fX21hdGNoZXJzID0ganNvbi5fX21hdGNoZXJzXG4gICAgICAgICAgICAgICAgICAgIHJldFZhbC5lbGVtICYmIChyZXRWYWwuYmxvY2sgPSBqc29uLmJsb2NrKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbiA9IHJldFZhbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9fcHJvY2Vzc01hdGNoKClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb25cbiAgICAgICAgICAgIH0sIHRoaXMpXG4gICAgICAgICAgICByZXRWYWwubGVuZ3RoID09IDEgJiYgKHJldFZhbCA9IHJldFZhbFswXSlcbiAgICAgICAgICAgIHRoaXMuX19qc29uID0gcmV0VmFsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9fbWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYl8gPSAgdGhpcy5fX2pzb24uYmxvY2ssXG4gICAgICAgICAgICBtYXRjaGVycyA9IHRoaXMuYmguX19tYXRjaGVyc1tiX10gfHwgW11cblxuICAgICAgICB0aGlzLl9fanNvbi5fX3N0b3AgPSBmYWxzZVxuICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZWQgPSBbXVxuICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZXJzID0gbWF0Y2hlcnNcbiAgICAgICAgdGhpcy5fX3Byb2Nlc3NNYXRjaCgpXG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvc2VDdXJOb2RlKHRoaXMucHJvcHMpXG4gICAgICAgIHRoaXMuX19mbGFnID0gdHJ1ZVxuICAgICAgICB0aGlzLl9fbWF0Y2goKVxuICAgIH0sXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5leHRlbmQoe30sIHRoaXMuc3RhdGUsIHRoaXMubXVTdGF0ZXMoKSwgdGhpcy5tdU1vZHMoKSlcbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKHByb3BzKSB7XG4gICAgICAgIHRoaXMuX19wcm9wcyA9IHByb3BzXG4gICAgICAgIHRoaXMuX2NvbXBvc2VDdXJOb2RlKHByb3BzKVxuICAgICAgICB0aGlzLmJlZm9yZVVwZGF0ZSgpLmZvckVhY2goZnVuY3Rpb24oYlVwZGF0ZSkge1xuICAgICAgICAgICAgYlVwZGF0ZS5iaW5kKHRoaXMpKHRoaXMsIHRoaXMuX19qc29uKVxuICAgICAgICB9LCB0aGlzKVxuICAgIH0sXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9fcHJvcHMpIHtcbiAgICAgICAgICAgIHRoaXMuX19wcm9wcyA9IHVuZGVmaW5lZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9zZUN1ck5vZGUodGhpcy5wcm9wcylcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX19ub2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX19mbGFnKSB7XG4gICAgICAgICAgICB0aGlzLl9fZmxhZyA9IGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9fbWF0Y2goKVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlbmRlck5vZGVzID0gZnVuY3Rpb24oanNvbiwgcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4ganNvbi5yZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBqc29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoanNvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTm9kZXMoanNvbiwgcmVzdWx0KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uID0ganNvblxuICAgICAgICAgICAgICAgICAgICB2YXIgY2xzID0gdGhpcy5fYnVpbGRDbGFzc05hbWUoKSArICh0aGlzLmNscygpID8gJyAnICsgdGhpcy5jbHMoKSA6ICcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLl9wcm9jZXNzVHJlZSh0aGlzLmNvbnRlbnQoKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRycyA9IHRoaXMuYXR0cnMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMgPSB7Y2hpbGRyZW46IGNvbnRlbnR9XG5cbiAgICAgICAgICAgICAgICAgICAgY2xzICYmIChwcm9wcy5jbGFzc05hbWUgPSBjbHMpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy50YWcoKSB8fCAnZGl2JywgdGhpcy5leHRlbmQocHJvcHMsIGF0dHJzLCBldmVudHMpKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCByZXN1bHQgfHwgW10pXG4gICAgICAgIH0uYmluZCh0aGlzKVxuXG4gICAgICAgIHZhciBub2RlLFxuICAgICAgICAgICAgbm9kZXMgPSByZW5kZXJOb2RlcyhbXS5jb25jYXQodGhpcy5fX2pzb24pKVxuXG4gICAgICAgIGlmIChub2Rlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbm9kZSA9IG5vZGVzWzBdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlID0gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHtjaGlsZHJlbjogbm9kZXN9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgfSxcblxuICAgIF9jb21wb3NlQ3VyTm9kZTogZnVuY3Rpb24ocHApIHtcbiAgICAgICAgLy9UT0RPOiBUaGluayBhYm91dCBjYWNoaW5nL2RpZmZpbmcgYmVtSnNvblRyZWUvY29udGVudFxuICAgICAgICB0aGlzLl9fanNvbiA9IHRoaXMuZXh0ZW5kKHt9LCBwcCwge2NvbnRlbnQ6IHBwLmNoaWxkcmVuIHx8IHBwLmNvbnRlbnR9KVxuICAgICAgICB2YXIgbW9kcyA9IE9iamVjdC5rZXlzKHRoaXMuX19qc29uKS5yZWR1Y2UoZnVuY3Rpb24obW9kcywga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5WzBdID09PSBCSC5fICYmIChtb2RzW2tleS5zbGljZSgxKV0gPSBwcFtrZXldKSwgbW9kc1xuICAgICAgICB9LCB7fSlcbiAgICAgICAgdGhpcy5fX2Jsb2NrICYmICh0aGlzLl9fanNvbi5ibG9jayA9IHRoaXMuX19ibG9jaylcbiAgICAgICAgdGhpcy5fX2VsZW0gJiYgKHRoaXMuX19qc29uLmVsZW0gPSB0aGlzLl9fZWxlbSlcbiAgICAgICAgaWYgKHRoaXMuX19qc29uLmVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX19qc29uLmVsZW1Nb2RzIHx8ICh0aGlzLl9fanNvbi5lbGVtTW9kcyA9ICh0aGlzLl9fanNvbi5tb2RzIHx8IHt9KSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX19qc29uLm1vZHMgfHwgKHRoaXMuX19qc29uLm1vZHMgPSB7fSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoT2JqZWN0LmtleXMobW9kcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19qc29uLmVsZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5lbGVtTW9kcyA9IHRoaXMuZXh0ZW5kKHRoaXMuX19qc29uLmVsZW1Nb2RzLCBtb2RzKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5tb2RzID0gdGhpcy5leHRlbmQodGhpcy5fX2pzb24ubW9kcywgbW9kcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2J1aWxkQ2xhc3NOYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJfID0gdGhpcy5fX2pzb24uYmxvY2ssXG4gICAgICAgICAgICBfX2UgPSB0aGlzLl9fanNvbi5lbGVtLFxuICAgICAgICAgICAgY2xzID0ge30sXG4gICAgICAgICAgICBtb2RzID0gdGhpcy5leHRlbmQoe30sIHRoaXMubW9kcygpLCB0aGlzLm11TW9kcygpKVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEVuaXR5KGJfLCBfX2UsIG1vZHMsIG1peCkge1xuICAgICAgICAgICAgdmFyIGVudGl0eSA9IGJfXG5cbiAgICAgICAgICAgIGlmIChfX2UpIHtcbiAgICAgICAgICAgICAgICBlbnRpdHkgKz0gQkguX18gKyBfX2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsc1tlbnRpdHldID0gZW50aXR5XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhtb2RzKS5mb3JFYWNoKGZ1bmN0aW9uKG1vZE5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kVmFsdWUgPSBtb2RzW21vZE5hbWVdXG4gICAgICAgICAgICAgICAgaWYgKCFtb2RWYWx1ZSAmJiBtb2RWYWx1ZSAhPT0gMCkgcmV0dXJuXG4gICAgICAgICAgICAgICAgdmFyIG1vZEVudGl0eSA9IGVudGl0eSArIEJILl8gKyBtb2ROYW1lXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtb2RWYWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIEJILm5vQm9vbE1vZHMgJiYgbW9kVmFsdWUgJiYgKG1vZEVudGl0eSArPSBCSC5fICsgJ3llcycpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kRW50aXR5ICs9IEJILl8gKyBtb2RWYWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbHNbbW9kRW50aXR5XSA9IG1vZEVudGl0eVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGJfICYmIGFkZEVuaXR5KGJfLCBfX2UsIG1vZHMsIGZhbHNlKVxuICAgICAgICB0aGlzLl9fanNvbi5taXggJiYgW10uY29uY2F0KHRoaXMuX19qc29uLm1peCkuZm9yRWFjaChmdW5jdGlvbihtaXgpIHtcbiAgICAgICAgICAgIGlmICghbWl4KSB7IHJldHVybiB9XG4gICAgICAgICAgICBpZiAoIW1peC5ibG9jaykge1xuICAgICAgICAgICAgICAgIGlmICghYl8pIHsgcmV0dXJuIH1cbiAgICAgICAgICAgICAgICBtaXguYmxvY2sgPSBiX1xuICAgICAgICAgICAgICAgIG1peC5lbGVtIHx8IChtaXguZWxlbSA9IF9fZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZEVuaXR5KG1peC5ibG9jaywgbWl4LmVsZW0sIG1peC5tb2RzIHx8IG1peC5lbGVtTW9kcyB8fCB7fSwgdHJ1ZSlcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY2xzKS5qb2luKCcgJylcbiAgICB9LFxuICAgIF9wcm9jZXNzVHJlZTogZnVuY3Rpb24odHJlZSwgcG9zaXRpb24pIHtcbiAgICAgICAgdHJlZSA9IFtdLmNvbmNhdCh0cmVlKVxuICAgICAgICBwb3NpdGlvbiB8fCAocG9zaXRpb24gPSB7dmFsOiAwLCBsYXN0OiAwfSlcbiAgICAgICAgcG9zaXRpb24ubGFzdCArPSAodHJlZS5sZW5ndGggLSAxKVxuICAgICAgICB2YXIgY29udGVudCA9IHRyZWUubWFwKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NUcmVlKG5vZGUsIHBvc2l0aW9uKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFub2RlIHx8ICghbm9kZS5ibG9jayAmJiAhbm9kZS5lbGVtICYmICFub2RlLnRhZyAmJiAhbm9kZS5jb250ZW50ICYmICFub2RlLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IG5vZGUudHlwZS5kaXNwbGF5TmFtZVxuICAgICAgICAgICAgICAgIGlmICghbmFtZSkgeyByZXR1cm4gbm9kZSB9XG4gICAgICAgICAgICAgICAgdmFyIGRlY2wgPSBCSC5fZ2V0RGVjbChuYW1lKVxuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLnByb3BzIHx8IHt9XG4gICAgICAgICAgICAgICAgbm9kZS5ibG9jayA9IGRlY2wuYmxvY2sudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIG5vZGUuZWxlbSA9IGRlY2wuZWxlbVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUuZWxlbSkge1xuICAgICAgICAgICAgICAgIG5vZGUuYmxvY2sgfHwgKG5vZGUuYmxvY2sgPSB0aGlzLl9fanNvbi5ibG9jaylcbiAgICAgICAgICAgICAgICBub2RlLnJlZiA9IG5vZGUuYmxvY2sgKyBCSC5fXyArIG5vZGUuZWxlbSArICd+JyArIHRoaXMuZ2VuZXJhdGVJZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9fanNvbi4kdFBhcmFtICYmIChub2RlLiR0UGFyYW0gPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5fX2pzb24uJHRQYXJhbSkpXG4gICAgICAgICAgICBwb3NpdGlvbi5sYXN0ID09PSBwb3NpdGlvbi52YWwgJiYgKG5vZGUuJGlzTGFzdCA9IHRydWUpXG4gICAgICAgICAgICBub2RlLiRwb3NpdGlvbiA9ICsrcG9zaXRpb24udmFsXG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMuYmguQkVNLCBub2RlKVxuICAgICAgICB9LCB0aGlzKVxuICAgICAgICBjb250ZW50Lmxlbmd0aCA9PSAxICYmIChjb250ZW50ID0gY29udGVudFswXSlcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRcbiAgICB9LFxuICAgIGVsZW06IGZ1bmN0aW9uKGVsZW1OYW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9fZmxhZykgeyByZXR1cm4gfVxuICAgICAgICB2YXIgZWxlbXMgPSBbXS5jb25jYXQodGhpcy5lbGVtQ3R4KGVsZW1OYW1lKSkubWFwKGZ1bmN0aW9uKGVsZW1DdHgpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtQ3R4LmRvbUVsZW0oKVxuICAgICAgICB9KVxuICAgICAgICBlbGVtcy5sZW5ndGggPT0gMSAmJiAoZWxlbXMgPSBlbGVtc1swXSlcbiAgICAgICAgcmV0dXJuIGVsZW1zXG4gICAgfSxcbiAgICBlbGVtQ3R4OiBmdW5jdGlvbihlbGVtTmFtZSkge1xuICAgICAgICB2YXIgZWxlbXMgPSBbXSxcbiAgICAgICAgICAgIGVudGl0eSA9IHRoaXMuX19qc29uLmJsb2NrICsgQkguX18gKyBlbGVtTmFtZSxcbiAgICAgICAgICAgIF9lbGVtQ3R4ID0gZnVuY3Rpb24ocmVmcykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHJlZnMpLmZvckVhY2goZnVuY3Rpb24ocmVmS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWYgPSByZWZzW3JlZktleV1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWYpIHsgcmV0dXJuIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZktleS5zcGxpdCgnficpWzBdID09PSBlbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1zLnB1c2gocmVmKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2VsZW1DdHgocmVmLnJlZnMpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF9lbGVtQ3R4KHRoaXMucmVmcylcbiAgICAgICAgZWxlbXMubGVuZ3RoID09IDEgJiYgKGVsZW1zID0gZWxlbXNbMF0pXG4gICAgICAgIHJldHVybiBlbGVtc1xuICAgIH0sXG4gICAgX2V2ZW50czogZnVuY3Rpb24oZXZlbnRzKSB7XG4gICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50c1Byb3BzIHx8ICh0aGlzLl9ldmVudHNQcm9wcyA9IHt9KVxuICAgICAgICAgICAgdGhpcy5leHRlbmQodGhpcy5fZXZlbnRzUHJvcHMsIGV2ZW50cylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldmVudHNQcm9wc1xuICAgICAgICB9XG4gICAgfSxcbiAgICBiZWZvcmVVcGRhdGU6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgdGhpcy5fX2ZsYWcgJiYgKHRoaXMuX19iVXBkYXRlIHx8ICh0aGlzLl9fYlVwZGF0ZSA9IFtdKSkucHVzaChjYilcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2JVcGRhdGUgfHwgW11cbiAgICAgICAgfVxuICAgIH0sXG4gICAgYmluZDogZnVuY3Rpb24oZXZlbnRzKSB7XG4gICAgICAgIGlmICh0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgdmFyIGF0dHJzID0ge31cbiAgICAgICAgICAgIHRoaXMuX19ldmVudHMgfHwgKHRoaXMuX19ldmVudHMgPSB7fSlcbiAgICAgICAgICAgIE9iamVjdFxuICAgICAgICAgICAgICAgIC5rZXlzKGV2ZW50cylcbiAgICAgICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihldmVudE5hbWUpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2IgPSBldmVudHNbZXZlbnROYW1lXVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fZXZlbnRzW2V2ZW50TmFtZV0gfHwgKHRoaXMuX19ldmVudHNbZXZlbnROYW1lXSA9IFtdKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChjYilcbiAgICAgICAgICAgICAgICAgICAgYXR0cnNbZXZlbnROYW1lXSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19ldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uYmluZCh0aGlzKShlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcylcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgfSwgdGhpcylcblxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzKGF0dHJzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICBkb21FbGVtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpXG4gICAgfVxufVxuXG5CSC5CRU1fSGF6YXJkID0gQkVNX0hhemFyZFxuXG5yZXR1cm4gQkhcbn0pKClcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBCSFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaCkge1xuICAgIGJoLm1hdGNoKCdyYWRpb2JveF9fY29udHJvbCcsIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICBjdHhcbiAgICAgICAgICAgIC50YWcoJ2lucHV0JylcbiAgICAgICAgICAgIC5hdHRycyhjdHgudFBhcmFtKCdjb250cm9sQXR0cnMnKSk7XG4gICAgfSk7XG4gICAgYmgubWF0Y2goJ3JhZGlvYm94X19jb250cm9sJywgZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLy9YWFg6IHN1cHJlc3MgUmVhY3Qgd2FybmluZ1xuICAgICAgICAgICAgLy8gICAgIHdlIGhhbmRsZSBvbkNoYW5nZSBpbiByYWRpb2JveF9fcmFkaW9cbiAgICAgICAgICAgIC8vIHdlIGNvdWxkIGNoYW5nZSBjb250b2xBdHRycy5jaGVjayAtPiBjb250cm9sQXR0cnMuZGVmYXVsdENoZWNrXG4gICAgICAgICAgICAuYmluZCh7b25DaGFuZ2U6IGZ1bmN0aW9uKCkge319KVxuICAgIH0pO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaCkge1xuICAgIGJoLm1hdGNoKCdyYWRpb2JveF9fcmFkaW8nLCBmdW5jdGlvbihjdHgsIGpzb24pIHtcblxuICAgICAgICB2YXIgY29udHJvbEF0dHJzID0gY3R4LmV4dGVuZCh7XG4gICAgICAgICAgICAgICAgaWQ6IGN0eC5nZW5lcmF0ZUlkKCksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3JhZGlvJyxcbiAgICAgICAgICAgICAgICBuYW1lOiBjdHgudFBhcmFtKCduYW1lJylcbiAgICAgICAgICAgIH0sIGpzb24uY29udHJvbEF0dHJzKSxcblxuICAgICAgICAgICAgLy8gdmFsdWUg0LHQu9C+0LrQsCDRgdC+0LLQv9Cw0LvQviDRgSB2YWx1ZSDQsiBjb250cm9sQXR0cnMg0Y3Qu9C10LzQtdC90YLQsCByYWRpb1xuICAgICAgICAgICAgaXNWYWx1ZXNNYXRjaCA9IGNvbnRyb2xBdHRycy52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIGNvbnRyb2xBdHRycy52YWx1ZSA9PT0gY3R4LnRQYXJhbSgndmFsdWUnKTtcblxuICAgICAgICBjdHgubW9kcyh7XG4gICAgICAgICAgICBkaXNhYmxlZDogY3R4LnRQYXJhbSgnZGlzYWJsZWQnKSxcbiAgICAgICAgICAgIGNoZWNrZWQ6IGlzVmFsdWVzTWF0Y2ggPyAneWVzJyA6ICcnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKGN0eC5tb2QoJ2Rpc2FibGVkJykgPT09ICd5ZXMnKSB7XG4gICAgICAgICAgICBjb250cm9sQXR0cnMuZGlzYWJsZWQgPSAnZGlzYWJsZWQnO1xuICAgICAgICAgICAgY29udHJvbEF0dHJzLnRhYkluZGV4ID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjdHgubW9kKCdjaGVja2VkJykgPT09ICd5ZXMnKSB7XG4gICAgICAgICAgICBjb250cm9sQXR0cnMuY2hlY2tlZCA9ICdjaGVja2VkJztcbiAgICAgICAgfVxuXG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLnRhZygnbGFiZWwnKVxuICAgICAgICAgICAgLmF0dHIoJ2h0bWxGb3InLCBjb250cm9sQXR0cnMuaWQpXG4gICAgICAgICAgICAudFBhcmFtKCdjb250cm9sQXR0cnMnLCBjb250cm9sQXR0cnMpXG4gICAgICAgICAgICAuY29udGVudChbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBlbGVtOiAnYm94JyxcbiAgICAgICAgICAgICAgICAgICAgdGFnOiAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHtlbGVtOiAnY29udHJvbCd9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjdHguY29udGVudCgpXG4gICAgICAgICAgICBdLCB0cnVlKTtcbiAgICB9KTtcblxuICAgIC8vYmh6LmpzXG4gICAgYmgubWF0Y2goJ3JhZGlvYm94X19yYWRpbycsIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICB2YXIgY29udHJvbEF0dHJzID0gY3R4LnRQYXJhbSgnY29udHJvbEF0dHJzJylcbiAgICAgICAgLy9YWFg6IHRoaXMgaXMgYmVjYXVzZSB3ZSByZVJlbmRlciBvbmx5IHJhZGlvYm94X19yYWRpbyBub3QgZnVsbCByYWRpbyBzbyB3ZSBoYXZlIGNvbnRyb2xBdHRycyBhbHJlYWR5XG4gICAgICAgIC8vd2UgY2FuIGNoYW5nZSBpbiByYWRpb2JveF9fcmFkaW8uYmguanMgPT4gdFBhcmFtKCdjb250cm9sQXR0cnMnLCBjb250cm9sQXR0cnMsIHRydWUpXG4gICAgICAgIGlmIChjb250cm9sQXR0cnMpIHtcbiAgICAgICAgICAgIGN0eC50UGFyYW0oJ2NvbnRyb2xBdHRycycsIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vVE9ETzogbWFrZSBpdCBqcyBtaXggY29udHJvbC1mb2N1c2FibGVcbiAgICAgICAgY3R4XG4gICAgICAgICAgICAubXVNb2RzKHtcbiAgICAgICAgICAgICAgICBmb2N1c2VkOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5iaW5kKHtcbiAgICAgICAgICAgICAgICBvbkZvY3VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm1vZCgnZGlzYWJsZWQnKSB8fCBjdHgubXVNb2QoJ2ZvY3VzZWQnLCB0cnVlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25CbHVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm11TW9kKCdmb2N1c2VkJywgZmFsc2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAvL1RPRE86IG1ha2UgaXQganMgbWl4IGRlc2t0b3AvY29udHJvbC1ob3ZlcmFibGVcbiAgICAgICAgICAgIC5tdU1vZHMoe1xuICAgICAgICAgICAgICAgIGhvdmVyZWQ6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmJpbmQoe1xuICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5tb2QoJ2Rpc2FibGVkJykgfHwgY3R4Lm11TW9kKCdob3ZlcmVkJywgdHJ1ZSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5tdU1vZCgnaG92ZXJlZCcsIGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC5iaW5kKHtcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjdHgubW9kKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubXVNb2QoJ2ZvY3VzZWQnLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lbGVtKCdjb250cm9sJykuZm9jdXMoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9KVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaCkge1xuICAgIGJoLm1hdGNoKCdyYWRpb2JveCcsIGZ1bmN0aW9uKGN0eCwganNvbikge1xuICAgICAgICBjdHhcbiAgICAgICAgICAgIC50YWcoJ3NwYW4nKVxuICAgICAgICAgICAgLmpzKGN0eC5leHRlbmQoe2xpdmU6IGZhbHNlfSwgY3R4LmpzKCkpKVxuICAgICAgICAgICAgLm1vZCgndGhlbWUnLCAnbm9ybWFsJylcbiAgICAgICAgICAgIC50UGFyYW0oJ2Rpc2FibGVkJywgY3R4Lm1vZCgnZGlzYWJsZWQnKSlcbiAgICAgICAgICAgIC50UGFyYW0oJ25hbWUnLCBqc29uLm5hbWUpXG4gICAgICAgICAgICAudFBhcmFtKCd2YWx1ZScsIGpzb24udmFsdWUpO1xuICAgIH0pO1xuXG4gICAgYmgubWF0Y2goJ3JhZGlvYm94JywgZnVuY3Rpb24oY3R4LCBqc29uKSB7XG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLm11U3RhdGVzKHtcbiAgICAgICAgICAgICAgICB2YWx1ZToganNvbi52YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50UGFyYW0oJ3ZhbHVlJywgY3R4Lm11U3RhdGUoJ3ZhbHVlJykpXG4gICAgICAgICAgICAuYmluZCh7XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm11U3RhdGUoJ3ZhbHVlJywgZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9KVxufVxuIiwidmFyIEJIID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uLmJsb2Nrcy9iZW0vYmVtLmpzJylcblxuQkgubm9Cb29sTW9kcyA9IHRydWVcblxudmFyIGJoID0gbmV3IEJIKClcbnZhciBCRU0gPSBiaC5CRU1cblxubW9kdWxlLmV4cG9ydHMuUmVhY3QgPSBCSC5SZWFjdFxubW9kdWxlLmV4cG9ydHMuYmggPSBiaFxubW9kdWxlLmV4cG9ydHMuQkVNID0gQkVNXG4iLCIvL0NvdWxkIGJlIGdlbmVyYXRlZFxudmFyIEJIID0gcmVxdWlyZSgnLi4vLi4vLi4vZGVza3RvcC5ibG9ja3MvYmVtL2JlbS5qcycpXG52YXIgYmggPSBCSC5iaFxuXG5yZXF1aXJlKCcuLi8uLi8uLi9jb21tb24uYmxvY2tzL3JhZGlvYm94L19fcmFkaW8vcmFkaW9ib3hfX3JhZGlvLmJoLmpzJykoYmgpXG5yZXF1aXJlKCcuLi8uLi8uLi9jb21tb24uYmxvY2tzL3JhZGlvYm94L19fY29udHJvbC9yYWRpb2JveF9fY29udHJvbC5iaC5qcycpKGJoKVxuXG52YXIgUmFkaW9ib3hfX3JhZGlvID0gQkguUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAncmFkaW9ib3hfX3JhZGlvJyxcbiAgICBfX2Jsb2NrOiAncmFkaW9ib3gnLFxuICAgIF9fZWxlbTogJ3JhZGlvJyxcbiAgICBfX21hdGNoZXJzOiBiaC5fX21hdGNoZXJzLFxuICAgIG1peGluczogW0JILkJFTV9IYXphcmRdLFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fbm9kZSgpXG4gICAgfSxcbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gUmFkaW9ib3hfX3JhZGlvXG4iLCIvL0NvdWxkIGJlIGdlbmVyYXRlZFxudmFyIEJIID0gcmVxdWlyZSgnLi4vLi4vZGVza3RvcC5ibG9ja3MvYmVtL2JlbS5qcycpXG52YXIgYmggPSBCSC5iaFxuXG5yZXF1aXJlKCcuLi8uLi9jb21tb24uYmxvY2tzL3JhZGlvYm94L3JhZGlvYm94LmJoLmpzJykoYmgpXG5cbnZhciBSYWRpb2JveF9fcmFkaW8gPSByZXF1aXJlKCcuL19fcmFkaW8vcmFkaW9ib3hfX3JhZGlvLmpzJylcblxudmFyIFJhZGlvYm94ID0gQkguUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAncmFkaW9ib3gnLFxuICAgIF9fYmxvY2s6ICdyYWRpb2JveCcsXG4gICAgX19tYXRjaGVyczogYmguX19tYXRjaGVycyxcbiAgICBtaXhpbnM6IFtCSC5CRU1fSGF6YXJkXSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX25vZGUoKVxuICAgIH1cbn0pXG5cblJhZGlvYm94LlJhZGlvID0gUmFkaW9ib3hfX3JhZGlvXG5cbm1vZHVsZS5leHBvcnRzID0gUmFkaW9ib3hcbiIsIm1vZHVsZS5leHBvcnRzPVtcbiAgICB7XG4gICAgICAgIGJsb2NrOiAncmFkaW9ib3gnLFxuICAgICAgICBtb2RzOiB7c2l6ZTogJ3MnLCB0aGVtZTogJ3BzZXVkbyd9LFxuICAgICAgICBhdHRyczoge3N0eWxlOiB7YmFja2dyb3VuZENvbG9yOiAnbGlnaHRncmF5J319LFxuICAgICAgICBuYW1lOiAnYmxhJyxcbiAgICAgICAgY29udGVudDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW06ICdyYWRpbycsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ9Cg0LDQtNC40L4gMScsXG4gICAgICAgICAgICAgICAgY29udHJvbEF0dHJzOiB7dmFsdWU6ICd2YWwtMSd9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyB0YWc6ICdzcGFuJywgY29udGVudDogJ1xcdTAwYTBcXHUwMGEwXFx1MDBhMFxcdTAwYTAnfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlbGVtOiAncmFkaW8nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfQoNCw0LTQuNC+IDInLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xBdHRyczoge3ZhbHVlOiAndmFsLTInfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6ICdcXHUwMGEwXFx1MDBhMFxcdTAwYTBcXHUwMGEwJ30sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbTogJ3JhZGlvJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn0KDQsNC00LjQviAzJyxcbiAgICAgICAgICAgICAgICBjb250cm9sQXR0cnM6IHt2YWx1ZTogJ3ZhbC0zJ31cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAgeyB0YWc6ICdicicgfSxcbiAgICB7IHRhZzogJ2JyJyB9LFxuICAgIHtcbiAgICAgICAgYmxvY2s6ICdyYWRpb2JveCcsXG4gICAgICAgIG1vZHM6IHtzaXplOiAnbSd9LFxuICAgICAgICBhdHRyczoge3N0eWxlOiB7YmFja2dyb3VuZENvbG9yOiAnbGlnaHRncmF5J319LFxuICAgICAgICBuYW1lOiAnYmxhJyxcbiAgICAgICAgdmFsdWU6ICd2YWwtMScsXG4gICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlbGVtOiAncmFkaW8nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfQoNCw0LTQuNC+IDEnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xBdHRyczoge3ZhbHVlOiAndmFsLTEnfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgdGFnOiAnc3BhbicsIGNvbnRlbnQ6ICdcXHUwMGEwXFx1MDBhMFxcdTAwYTBcXHUwMGEwJ30sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbTogJ3JhZGlvJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn0KDQsNC00LjQviAyJyxcbiAgICAgICAgICAgICAgICBlbGVtTW9kczoge2Rpc2FibGVkOiAneWVzJ30sXG4gICAgICAgICAgICAgICAgY29udHJvbEF0dHJzOiB7dmFsdWU6ICd2YWwtMid9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyB0YWc6ICdzcGFuJywgY29udGVudDogJ1xcdTAwYTBcXHUwMGEwXFx1MDBhMFxcdTAwYTAnfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlbGVtOiAncmFkaW8nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfQoNCw0LTQuNC+IDMnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xBdHRyczoge3ZhbHVlOiAndmFsLTMnfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7IHRhZzogJ2JyJyB9LFxuICAgIHsgdGFnOiAnYnInIH0sXG4gICAge1xuICAgICAgICBibG9jazogJ3JhZGlvYm94JyxcbiAgICAgICAgbW9kczoge3NpemU6ICdzJywgZGlzYWJsZWQ6ICd5ZXMnfSxcbiAgICAgICAgbmFtZTogJ2JsYScsXG4gICAgICAgIHZhbHVlOiAndmFsLTEnLFxuICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbTogJ3JhZGlvJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn0KDQsNC00LjQviAxJyxcbiAgICAgICAgICAgICAgICBjb250cm9sQXR0cnM6IHt2YWx1ZTogJ3ZhbC0xJ31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IHRhZzogJ3NwYW4nLCBjb250ZW50OiAnXFx1MDBhMFxcdTAwYTBcXHUwMGEwXFx1MDBhMCd9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW06ICdyYWRpbycsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ9Cg0LDQtNC40L4gMicsXG4gICAgICAgICAgICAgICAgY29udHJvbEF0dHJzOiB7dmFsdWU6ICd2YWwtMid9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyB0YWc6ICdzcGFuJywgY29udGVudDogJ1xcdTAwYTBcXHUwMGEwXFx1MDBhMFxcdTAwYTAnfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlbGVtOiAncmFkaW8nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfQoNCw0LTQuNC+IDMnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xBdHRyczoge3ZhbHVlOiAndmFsLTMnfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfVxuXVxuIiwidmFyIEJIID0gcmVxdWlyZSgnLi4vZGVza3RvcC5ibG9ja3MvYmVtL2JlbS5qcycpXG52YXIgQkVNID0gQkguQkVNXG5cbnZhciBiZW1Kc29uID0gcmVxdWlyZSgnLi9yYWRpb2JveC5iZW0uanNvbicpXG52YXIgUmFkaW9ib3ggPSByZXF1aXJlKCcuLi9kZXNrdG9wLmJ1bmRsZS9yYWRpb2JveC9yYWRpb2JveC5qcycpXG52YXIgUmFkaW9ib3hfX3JhZGlvID0gcmVxdWlyZSgnLi4vZGVza3RvcC5idW5kbGUvcmFkaW9ib3gvX19yYWRpby9yYWRpb2JveF9fcmFkaW8uanMnKVxuXG52YXIgRXhhbXBsZSA9IEJILlJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEJFTSBhdHRycz17e3N0eWxlOnttYXJnaW46IDIwfX19PlxuICAgICAgICAgICAgICAgIHtiZW1Kc29ufVxuICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICA8UmFkaW9ib3ggbW9kcz17e3NpemU6XCJzXCIsIGRpc2FibGVkOid5ZXMnfX0gbmFtZT1cImJsYVwiIHZhbHVlPVwidmFsLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvYm94X19yYWRpbyBjb250cm9sQXR0cnM9e3t2YWx1ZTogJ3ZhbC0xJ319PlxuICAgICAgICAgICAgICAgICAgICAgICAgSlNYIFJhZGlvIDFcbiAgICAgICAgICAgICAgICAgICAgPC9SYWRpb2JveF9fcmFkaW8+XG4gICAgICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwO1xuICAgICAgICAgICAgICAgICAgICA8UmFkaW9ib3hfX3JhZGlvIGNvbnRyb2xBdHRycz17e3ZhbHVlOiAndmFsLTInfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBKU1ggUmFkaW8gMlxuICAgICAgICAgICAgICAgICAgICA8L1JhZGlvYm94X19yYWRpbz5cbiAgICAgICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7XG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb2JveF9fcmFkaW8gY29udHJvbEF0dHJzPXt7dmFsdWU6ICd2YWwtMyd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIEpTWCBSYWRpbyAzXG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9ib3hfX3JhZGlvPlxuICAgICAgICAgICAgICAgIDwvUmFkaW9ib3g+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIDxSYWRpb2JveCBfc2l6ZT1cIm1cIiBuYW1lPVwiYmxhXCIgdmFsdWU9XCJ2YWwtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW9ib3guUmFkaW8gY29udHJvbEF0dHJzPXt7dmFsdWU6ICd2YWwtMSd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIEpTWCBSYWRpbyAxXG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9ib3guUmFkaW8+XG4gICAgICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwO1xuICAgICAgICAgICAgICAgICAgICA8UmFkaW9ib3guUmFkaW8gY29udHJvbEF0dHJzPXt7dmFsdWU6ICd2YWwtMid9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIEpTWCBSYWRpbyAyXG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9ib3guUmFkaW8+XG4gICAgICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwO1xuICAgICAgICAgICAgICAgICAgICA8UmFkaW9ib3guUmFkaW8gY29udHJvbEF0dHJzPXt7dmFsdWU6ICd2YWwtMyd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIEpTWCBSYWRpbyAzXG4gICAgICAgICAgICAgICAgICAgIDwvUmFkaW9ib3guUmFkaW8+XG4gICAgICAgICAgICAgICAgPC9SYWRpb2JveD5cbiAgICAgICAgICAgIDwvQkVNPlxuICAgICAgICApXG4gICAgfVxufSlcblxuUmVhY3QucmVuZGVyKFxuICAgIDxFeGFtcGxlIC8+LFxuICAgIGRvY3VtZW50LmJvZHlcbilcbiIsbnVsbCwiJ3VzZSBzdHJpY3QnO1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiBUb09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gb3duRW51bWVyYWJsZUtleXMob2JqKSB7XG5cdHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcblxuXHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdGtleXMgPSBrZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaikpO1xuXHR9XG5cblx0cmV0dXJuIGtleXMuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRyZXR1cm4gcHJvcElzRW51bWVyYWJsZS5jYWxsKG9iaiwga2V5KTtcblx0fSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciBrZXlzO1xuXHR2YXIgdG8gPSBUb09iamVjdCh0YXJnZXQpO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IGFyZ3VtZW50c1tzXTtcblx0XHRrZXlzID0gb3duRW51bWVyYWJsZUtleXMoT2JqZWN0KGZyb20pKTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dG9ba2V5c1tpXV0gPSBmcm9tW2tleXNbaV1dO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iXX0=
