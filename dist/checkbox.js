(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var React = (typeof window !== 'undefined') && window.React || (typeof require !== 'undefined') && require('react')
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
            if (this.__isMix) {return this}
            (!this.__json[param] || force) && (this.__json[param] = val)
            return this
        } else {
            return this.__json[param]
        }
    },
    tParam: function(key, val, force) {
        if (arguments.length > 1) {
            if (this.__isMix) {return this}
            this.__json.$tParam || (this.__json.$tParam = {})
            if (!this.__json.$tParam[key] || force) {this.__json.$tParam[key] = val}
            return this
        } else {
            return this.__json.$tParam && this.__json.$tParam[key]
        }
    },
    cls: function(cls, force) {
        if (cls) {
            if (this.__isMix) {return this}
            (!this.__json.cls || force) && (this.__json.cls = cls)
            return this
        } else {
            return this.__json.cls
        }
    },
    needCapitalize: true,
    attrCapitalized: {
        acceptcharset: 'acceptCharset',
        accesskey: 'accessKey',
        allowfullscreen: 'allowFullScreen',
        allowtransparency: 'allowTransparency',
        autocomplete: 'autoComplete',
        autofocus: 'autoFocus',
        autoplay: 'autoPlay',
        cellpadding: 'cellPadding',
        cellspacing: 'cellSpacing',
        charset: 'charSet',
        classid: 'classID',
        'class': 'className',
        classname: 'className',
        colspan: 'colSpan',
        contenteditable: 'contentEditable',
        contextmenu: 'contextMenu',
        crossorigin: 'crossOrigin',
        datetime: 'dateTime',
        enctype: 'encType',
        formaction: 'formAction',
        formenctype: 'formEncType',
        formmethod: 'formMethod',
        formnovalidate: 'formNoValidate',
        formtarget: 'formTarget',
        frameborder: 'frameBorder',
        htmlfor: 'htmlFor',
        'for': 'htmlFor',
        httpequiv: 'httpEquiv',
        marginheight: 'marginHeight',
        marginwidth: 'marginWidth',
        maxlength: 'maxLength',
        mediagroup: 'mediaGroup',
        novalidate: 'noValidate',
        radiogroup: 'radioGroup',
        readonly: 'readOnly',
        rowspan: 'rowSpan',
        spellcheck: 'spellCheck',
        srcdoc: 'srcDoc',
        srcset: 'srcSet',
        tabindex: 'tabIndex',
        usemap: 'useMap'
    },
    attrs: function(values, force) {
        var attrs = this.__json.attrs || {}
        if (values !== undefined) {
            if (this.__isMix) {return this}
            this.__json.attrs = force ? this.extend(attrs, values) : this.extend(values, attrs)
            return this
        } else {
            return attrs
        }
    },
    attr: function(key, val, force) {
        if (arguments.length > 1) {
            if (this.__isMix) {return this}
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
            if (this.__isMix) {return this}
            (!mods.hasOwnProperty(mod) || force) && (mods[mod] = val)
            return this
        } else {
            if (this.muMods().hasOwnProperty(mod)) {
                return this.muMod(mod)
            } else if (mods.hasOwnProperty(mod)) {
                return mods[mod]
            }
        }
    },
    mods: function(values, force) {
        var field = this.__json.elem ? 'elemMods' : 'mods'
        var mods = this.__json[field]
        if (values !== undefined) {
            if (this.__isMix) {return this}
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
            if (this.__isMix) {return this}
            (!this.__json.tag || force) && (this.__json.tag = tag)
            return this
        } else {
            return this.__json.tag
        }
    },
    
    match: function(selector, matcher) {
        if (!this.__flag) return this
        if (!selector || !matcher) return this
        var decl = BH._getDecl(selector)
        this.__json.$subMatchers || (this.__json.$subMatchers = {})
        this.__json.$subMatchers[decl.block] || (this.__json.$subMatchers[decl.block] = [])
        this.__json.$subMatchers[decl.block].push([decl, matcher])
        return this
    },

    mixJs: function(mix) {
        if (mix.block && mix.block !== this.__json.block) {
            var matchers = this.bh.__matchers[mix.block]
            if (matchers) {
                var json = this.extend({}, this.__json)
                this.extend(this.__json, mix)
                this.__json.elem = mix.elem
                this.__json.__stop = false
                this.__json.__matched = []
                this.__json.__matchers = matchers

                this.__isMix = true
                this.__processMatch()
                this.__json = json
                this.__isMix = false
            }
        }
        return this
    },
    mix: function(mix, force) {
        if (mix) {
            if (this.__isMix) {return this}
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
            if (this.__isMix) {return this}
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
        if (this.__isMix) {return this}
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
            subMatchers = (this.__json.$subMatchers && this.__json.$subMatchers[b_]) || [],
            matchers = (this.bh.__matchers[b_] || []).concat(subMatchers)

        this.__json.__stop = false
        this.__json.__matched = []
        this.__json.__matchers = matchers
        this.__processMatch()
    },

    componentWillMount: function() {
        this._composeCurNode(this.props)
        this.__flag = true
        this.statics || (this.statics = {})
        this.__self = this.statics;
        this.__match()
        this.willMount().forEach(function(willMount) {
            willMount.bind(this)(this, this.__json)
        }, this)
    },
    componentDidMount: function() {
        this.state = this.extend({}, this.state, this.muStates(), this.muMods())
        this.didMount().forEach(function(didMount) {
            didMount.bind(this)(this, this.__json)
        }, this)
    },
    componentWillReceiveProps: function(props) {
        this.willReceiveProps().forEach(function(bUpdate) {
            bUpdate.bind(this)(this, props)
        }, this)
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

                    this.needCapitalize && Object.keys(attrs).forEach(function(key) {
                        var _key
                        if (this.attrCapitalized[key]) {
                            _key = this.attrCapitalized[key]
                            attrs[_key] = attrs[key]
                            delete attrs[key]
                        }
                    }, this)

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
            if (this.__json.$subMatchers) {
                var subMatchers = this.__json.$subMatchers[node.block]
                subMatchers && ((node.$subMatchers = {})[node.block] = subMatchers)
            }
            position.last === position.val ? (node.$isLast = true) : (node.$isLast = false)
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
    willMount: function(cb) {
        if (cb) {
            this.__flag && (this.__willMount || (this.__willMount = [])).push(cb)
            return this
        } else {
            return this.__willMount || []
        }
    },
    didMount: function(cb) {
        if (cb) {
            this.__flag && (this.__didMount || (this.__didMount = [])).push(cb)
            return this
        } else {
            return this.__didMount || []
        }
    },
    willReceiveProps: function(cb) {
        if (cb) {
            this.__flag && (this.__willReceive || (this.__willReceive = [])).push(cb)
            return this
        } else {
            return this.__willReceive || []
        }
    },
//TODO: Delete this fn
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

},{"object-assign":16,"react":15}],2:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('checkbox__box', function(ctx) {
        ctx.mixJs({block: 'control', mods: {'focused': true}})
    })
};

},{}],3:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('checkbox__control', function(ctx) {
        ctx
            .tag('input')
            .attrs(ctx.extend(
                {
                    type: 'checkbox',
                    autocomplete: 'off',
                    'aria-labelledby': ctx.tParam('labelId')
                },
                ctx.tParam('checkboxAttrs')
            ));
    });
};

},{}],4:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('checkbox__label', function(ctx) {
        ctx
            .tag('label')
            .attrs({
                'for': ctx.tParam('checkboxAttrs').id,
                'id': ctx.tParam('labelId'),
                'aria-hidden': true
            });
    });
};

},{}],5:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('checkbox', function(ctx, json) {
        var checkboxAttrs = ctx.extend({id: ctx.generateId()}, json.checkboxAttrs),
            jsParams = ctx.extend({live: false}, ctx.js());

        if(ctx.mod('disabled')) {
            checkboxAttrs.disabled = 'disabled';
        }
        if(ctx.mod('checked')) {
            checkboxAttrs.defaultChecked = 'checked';
        }

        ctx
            .tag('span')
            .js(jsParams)
            .mod('theme', 'normal')
            .tParam('checkboxAttrs', checkboxAttrs)
            .tParam('labelId', 'label' + checkboxAttrs.id)
            .content([
                {
                    elem: 'box',
                    tag: 'span',
                    elemMods: {checked: ctx.mod('checked')},
                    content: [
                        {elem: 'control'},
                        {elem: 'tick', tag: 'i'}
                    ]
                },
                ctx.content()
            ], true);
    });
};

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('control_focused', function(ctx) {
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
    })
    bh.match('control_pressed', function(ctx) {
        ctx
            .muMods({
                pressed: false
            })
            .bind({
                onMouseLeave: function() {
                    //TODO: bindToDoc diff from native btn
                    ctx.muMod('pressed', false)
                },
                onMouseDown: function() {
                    ctx.muMod('pressed', true)
                },
                onMouseUp: function() {
                    ctx.muMod('pressed', false)
                }
            })
    })
};

},{}],8:[function(require,module,exports){
var BH = require('../../common.blocks/bem/bem.js')

BH.noBoolMods = true

var bh = new BH()
var BEM = bh.BEM

module.exports.React = BH.React
module.exports.bh = bh
module.exports.BEM = BEM

},{"../../common.blocks/bem/bem.js":1}],9:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('checkbox', function(ctx) {
        ctx.mixJs({block: 'control', mods: {'hovered': true}})
    })
};

},{}],10:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('control_hovered', function(ctx) {
        ctx
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
    })
}

},{}],11:[function(require,module,exports){
//Could be generated
var BH = require('../../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../../common.blocks/checkbox/__control/checkbox__control.bh.js')(bh)
require('../../../common.blocks/checkbox/__label/checkbox__label.bh.js')(bh)

var Checkbox__label = BH.React.createClass({
    displayName: 'checkbox__label',
    __block: 'checkbox',
    __elem: 'label',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    },
})

module.exports = Checkbox__label

},{"../../../common.blocks/checkbox/__control/checkbox__control.bh.js":3,"../../../common.blocks/checkbox/__label/checkbox__label.bh.js":4,"../../../desktop.blocks/bem/bem.js":8}],12:[function(require,module,exports){
//Could be generated
var BH = require('../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../common.blocks/control/control.bhz.js')(bh)
require('../../desktop.blocks/control/control.bhz.js')(bh)

require('../../common.blocks/checkbox/checkbox.bh.js')(bh)
require('../../common.blocks/checkbox/checkbox.bhz.js')(bh)
require('../../desktop.blocks/checkbox/checkbox.bhz.js')(bh)
require('../../common.blocks/checkbox/__box/checkbox__box.bhz.js')(bh)

var Checkbox__label = require('./__label/checkbox__label.js')

var Checkbox = BH.React.createClass({
    displayName: 'checkbox',
    __block: 'checkbox',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    }
})

Checkbox.Label = Checkbox__label

module.exports = Checkbox

},{"../../common.blocks/checkbox/__box/checkbox__box.bhz.js":2,"../../common.blocks/checkbox/checkbox.bh.js":5,"../../common.blocks/checkbox/checkbox.bhz.js":6,"../../common.blocks/control/control.bhz.js":7,"../../desktop.blocks/bem/bem.js":8,"../../desktop.blocks/checkbox/checkbox.bhz.js":9,"../../desktop.blocks/control/control.bhz.js":10,"./__label/checkbox__label.js":11}],13:[function(require,module,exports){
module.exports=[
    {
        block: 'example',
        content: [
            {
                attrs: {style: {margin: 20}},
                content: [
                    {tag: 'b', content: 'Размер S:'},
                    {tag: 'br'},
                    {block: 'example', elem: 'example-text', content: 'normal \u00a0'},
                    {
                        block: 'checkbox',
                        mods: {size: 's'}
                    },
                    {tag: 'br'},
                    {block: 'example', elem: 'example-text', content: 'checked \u00a0'},
                    {
                        block: 'checkbox',
                        mods: {size: 's', checked: 'yes'}
                    },
                    {tag: 'br'},
                    {block: 'example', elem: 'example-text', content: 'disabled \u00a0'},
                    {
                        block: 'checkbox',
                        mods: {size: 's', disabled: 'yes'}
                    },
                    {tag: 'br'},
                    {block: 'example', elem: 'example-text', content: 'with label \u00a0'},
                    {
                        block: 'checkbox',
                        mods: {size: 's', checked: 'yes'},
                        content: {elem: 'label', content: 'label'}
                    },
                    {tag: 'br'},
                    {block: 'example', elem: 'example-text', content: 'disabled with label \u00a0'},
                    {
                        block: 'checkbox',
                        mods: {size: 's', checked: 'yes', disabled: 'yes'},
                        content: {elem: 'label', content: 'label'}
                    }
                ]
            },
            {
                attrs: {style: {margin: 20}},
                content: [
                    {tag: 'b', content: 'Размер M:'},
                    {tag: 'br'},
                    {block: 'example', elem: 'example-text', content: 'normal \u00a0'},
                    {
                        block: 'checkbox',
                        mods: {size: 'm'},
                        checkboxAttrs: {id: 'nnn', value: 'iu', accesskey: 'kj', name: 'text', tabindex: 1}
                    },
                    {tag: 'br'},
                    {block: 'example', elem: 'example-text', content: 'checked \u00a0'},
                    {
                        block: 'checkbox',
                        mods: {size: 'm', checked: 'yes'}
                    },
                    {tag: 'br'},
                    {block: 'example', elem: 'example-text', content: 'disabled \u00a0'},
                    {
                        block: 'checkbox',
                        mods: {size: 'm', disabled: 'yes'}
                    },
                    {tag: 'br'},
                    {block: 'example', elem: 'example-text', content: 'with label \u00a0'},
                    {
                        block: 'checkbox',
                        mods: {size: 'm', checked: 'yes'},
                        content: {elem: 'label', content: 'label'}
                    },
                    {tag: 'br'},
                    {block: 'example', elem: 'example-text', content: 'disabled with label \u00a0'},
                    {
                        block: 'checkbox',
                        mods: {size: 'm', disabled: 'yes', checked: 'yes'},
                        content: {elem: 'label', content: 'label'}
                    }
                ]
            }
        ]
    }
]

},{}],14:[function(require,module,exports){
var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

var bemJson = require('./checkbox.bem.json')
require('../desktop.bundle/checkbox/checkbox.js')

var Example = BH.React.createClass({
    render: function() {
        return (
            React.createElement(BEM, null, 
                bemJson
            )
        )
    }
})

React.render(
    React.createElement(Example, null),
    document.body
)

},{"../desktop.blocks/bem/bem.js":8,"../desktop.bundle/checkbox/checkbox.js":12,"./checkbox.bem.json":13}],15:[function(require,module,exports){

},{}],16:[function(require,module,exports){
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

},{}]},{},[14])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvYmVtL2JlbS5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9jaGVja2JveC9fX2JveC9jaGVja2JveF9fYm94LmJoei5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9jaGVja2JveC9fX2NvbnRyb2wvY2hlY2tib3hfX2NvbnRyb2wuYmguanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvY2hlY2tib3gvX19sYWJlbC9jaGVja2JveF9fbGFiZWwuYmguanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvY2hlY2tib3gvY2hlY2tib3guYmguanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvY2hlY2tib3gvY2hlY2tib3guYmh6LmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9jb21tb24uYmxvY2tzL2NvbnRyb2wvY29udHJvbC5iaHouanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2Rlc2t0b3AuYmxvY2tzL2JlbS9iZW0uanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2Rlc2t0b3AuYmxvY2tzL2NoZWNrYm94L2NoZWNrYm94LmJoei5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvZGVza3RvcC5ibG9ja3MvY29udHJvbC9jb250cm9sLmJoei5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvZGVza3RvcC5idW5kbGUvY2hlY2tib3gvX19sYWJlbC9jaGVja2JveF9fbGFiZWwuanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2Rlc2t0b3AuYnVuZGxlL2NoZWNrYm94L2NoZWNrYm94LmpzIiwianMvY2hlY2tib3guYmVtLmpzb24iLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2pzL2NoZWNrYm94LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sT0FBTyxLQUFLLFdBQVcsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ25ILElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLE9BQU8sS0FBSyxXQUFXLEtBQUssT0FBTyxDQUFDLGVBQWUsQ0FBQzs7QUFFMUYsSUFBSSxFQUFFLEdBQUcsQ0FBQyxXQUFXO0FBQ3JCLElBQUksV0FBVyxHQUFHLENBQUM7O0FBRW5CLElBQUksRUFBRSxHQUFHLFdBQVc7O0lBRWhCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUNwQixVQUFVLENBQUMsRUFBRSxHQUFHLElBQUk7SUFDcEIsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRTtJQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVU7SUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQ3pCLFdBQVcsRUFBRSxFQUFFO1FBQ2YsT0FBTyxFQUFFLEVBQUU7UUFDWCxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDcEIsTUFBTSxFQUFFLFdBQVc7WUFDZixPQUFPLElB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RUFBRSxDQUFDLEdBQUc7O0FBRWhCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztBQUM1QyxPQUFPLENBQUMsd0NBQXdDLENBQUM7O0FBRWpELElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO0lBQy9CLE1BQU0sRUFBRSxXQUFXO1FBQ2Y7WUFDSSxvQkFBQyxHQUFHLEVBQUEsSUFBQyxFQUFBO2dCQUNBLE9BQVE7WUFDUCxDQUFBO1NBQ1Q7S0FDSjtBQUNMLENBQUMsQ0FBQzs7QUFFRixLQUFLLENBQUMsTUFBTTtJQUNSLG9CQUFDLE9BQU8sRUFBQSxJQUFBLENBQUcsQ0FBQTtJQUNYLFFBQVEsQ0FBQyxJQUFJO0NBQ2hCOzs7QUNuQkQ7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSAmJiB3aW5kb3cuUmVhY3QgfHwgKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJykgJiYgcmVxdWlyZSgncmVhY3QnKVxudmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJykgJiYgcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpXG5cbnZhciBCSCA9IChmdW5jdGlvbigpIHtcbnZhciBfX2xhc3RHZW5JZCA9IDBcblxudmFyIEJIID0gZnVuY3Rpb24oKSB7XG4gICAgLy9UT0RPOiBtYWtlIGl0IGJldHRlclxuICAgIHRoaXMuX19tYXRjaGVycyA9IHt9XG4gICAgQkVNX0hhemFyZC5iaCA9IHRoaXNcbiAgICBCRU1fSGF6YXJkLl9fZXhwYW5kb0lkID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICB0aGlzLnV0aWxzID0gQkVNX0hhemFyZFxuICAgIHRoaXMuQkVNID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAgICBkaXNwbGF5TmFtZTogJycsXG4gICAgICAgIF9fYmxvY2s6ICcnLFxuICAgICAgICBtaXhpbnM6IFtCRU1fSGF6YXJkXSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fbm9kZSgpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5CSC5fID0gJ18nXG5CSC5fXyA9ICdfXydcbkJILlJlYWN0ID0gUmVhY3RcbkJILl9nZXREZWNsID0gIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgdmFyIGRlY2wgPSB7fSxcbiAgICAgICAgZGVjbHMsXG4gICAgICAgIGlzRWxlbSA9IH5zZWxlY3Rvci5pbmRleE9mKEJILl9fKVxuICAgIGlzRWxlbSA/XG4gICAgICAgIGRlY2xzID0gc2VsZWN0b3Iuc3BsaXQoQkguX18pIDpcbiAgICAgICAgZGVjbHMgPSBzZWxlY3Rvci5zcGxpdChCSC5fKVxuXG4gICAgZGVjbC5ibG9jayA9IGRlY2xzLnNoaWZ0KClcblxuICAgIGlmIChpc0VsZW0pIHtcbiAgICAgICAgZGVjbHMgPSBkZWNsc1swXS5zcGxpdChCSC5fKVxuICAgICAgICBkZWNsLmVsZW0gPSBkZWNscy5zaGlmdCgpXG4gICAgfVxuXG4gICAgZGVjbC5tb2ROYW1lID0gZGVjbHMuc2hpZnQoKVxuICAgIGRlY2wubW9kVmFsID0gZGVjbHMuc2hpZnQoKVxuICAgIHJldHVybiBkZWNsXG59XG5cbkJILnByb3RvdHlwZSA9IHtcbiAgICBub0Jvb2xNb2RzOiBmYWxzZSwgLy9Gb3IgTEVHTyBzZXQgdHJ1ZVxuICAgIGFwcGx5OiBmdW5jdGlvbihiZW1Kc29uKSB7XG4gICAgICAgIGlmICghYmVtSnNvbikgcmV0dXJuICcnXG4gICAgICAgIHZhciBlbCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5CRU0sIGJlbUpzb24pXG4gICAgICAgIHJldHVybiBSZWFjdC5yZW5kZXJUb1N0YXRpY01hcmt1cChlbClcbiAgICB9LFxuICAgIG1hdGNoOiBmdW5jdGlvbihzZWxlY3RvciwgbWF0Y2hlcikge1xuICAgICAgICBpZiAoIXNlbGVjdG9yIHx8ICFtYXRjaGVyKSByZXR1cm4gdGhpc1xuICAgICAgICB2YXIgZGVjbCA9IEJILl9nZXREZWNsKHNlbGVjdG9yKVxuICAgICAgICB0aGlzLl9fbWF0Y2hlcnNbZGVjbC5ibG9ja10gfHwgKHRoaXMuX19tYXRjaGVyc1tkZWNsLmJsb2NrXSA9IFtdKVxuICAgICAgICB0aGlzLl9fbWF0Y2hlcnNbZGVjbC5ibG9ja10ucHVzaChbZGVjbCwgbWF0Y2hlcl0pXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICB4bWxFc2NhcGU6IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgLy9CZWNhdXNlIFJlYWN0IHdpbGwgZG8gaXQgZm9yIHVzXG4gICAgICAgIC8vVE9ETzogb3IgZG8gd2UgbmVlZCB0aGlzP1xuICAgICAgICByZXR1cm4geFxuICAgIH0sXG4gICAgYXR0ckVzY2FwZTogZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4geFxuICAgIH0sXG4gICAganNBdHRyRXNjYXBlOiBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiB4XG4gICAgfSxcbiAgICBlbmFibGVJbmZpbml0ZUxvb3BEZXRlY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL1Y4IHdpbGwgZG8gaXQgZm9yIHVzXG4gICAgfVxufVxuXG52YXIgQkVNX0hhemFyZCA9IHtcbiAgICBqczogZnVuY3Rpb24oKSB7cmV0dXJuIHRoaXN9LFxuICAgIGJlbTogZnVuY3Rpb24oKSB7cmV0dXJuIHRoaXN9LFxuICAgIGV4dGVuZDogYXNzaWduLFxuICAgIGlzU2ltcGxlOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgaWYgKCFvYmogfHwgb2JqID09PSB0cnVlKSByZXR1cm4gdHJ1ZVxuICAgICAgICB2YXIgdCA9IHR5cGVvZiBvYmpcbiAgICAgICAgcmV0dXJuIHQgPT09ICdzdHJpbmcnIHx8IHQgPT09ICdudW1iZXInXG4gICAgfSxcbiAgICBnZW5lcmF0ZUlkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICd1bmlxJyArIHRoaXMuX19leHBhbmRvSWQgKyAoKytfX2xhc3RHZW5JZCk7XG4gICAgfSxcbiAgICBwYXJhbTogZnVuY3Rpb24ocGFyYW0sIHZhbCwgZm9yY2UpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc01peCkge3JldHVybiB0aGlzfVxuICAgICAgICAgICAgKCF0aGlzLl9fanNvbltwYXJhbV0gfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbltwYXJhbV0gPSB2YWwpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uW3BhcmFtXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB0UGFyYW06IGZ1bmN0aW9uKGtleSwgdmFsLCBmb3JjZSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uLiR0UGFyYW0gfHwgKHRoaXMuX19qc29uLiR0UGFyYW0gPSB7fSlcbiAgICAgICAgICAgIGlmICghdGhpcy5fX2pzb24uJHRQYXJhbVtrZXldIHx8IGZvcmNlKSB7dGhpcy5fX2pzb24uJHRQYXJhbVtrZXldID0gdmFsfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fanNvbi4kdFBhcmFtICYmIHRoaXMuX19qc29uLiR0UGFyYW1ba2V5XVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjbHM6IGZ1bmN0aW9uKGNscywgZm9yY2UpIHtcbiAgICAgICAgaWYgKGNscykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc01peCkge3JldHVybiB0aGlzfVxuICAgICAgICAgICAgKCF0aGlzLl9fanNvbi5jbHMgfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbi5jbHMgPSBjbHMpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLmNsc1xuICAgICAgICB9XG4gICAgfSxcbiAgICBuZWVkQ2FwaXRhbGl6ZTogdHJ1ZSxcbiAgICBhdHRyQ2FwaXRhbGl6ZWQ6IHtcbiAgICAgICAgYWNjZXB0Y2hhcnNldDogJ2FjY2VwdENoYXJzZXQnLFxuICAgICAgICBhY2Nlc3NrZXk6ICdhY2Nlc3NLZXknLFxuICAgICAgICBhbGxvd2Z1bGxzY3JlZW46ICdhbGxvd0Z1bGxTY3JlZW4nLFxuICAgICAgICBhbGxvd3RyYW5zcGFyZW5jeTogJ2FsbG93VHJhbnNwYXJlbmN5JyxcbiAgICAgICAgYXV0b2NvbXBsZXRlOiAnYXV0b0NvbXBsZXRlJyxcbiAgICAgICAgYXV0b2ZvY3VzOiAnYXV0b0ZvY3VzJyxcbiAgICAgICAgYXV0b3BsYXk6ICdhdXRvUGxheScsXG4gICAgICAgIGNlbGxwYWRkaW5nOiAnY2VsbFBhZGRpbmcnLFxuICAgICAgICBjZWxsc3BhY2luZzogJ2NlbGxTcGFjaW5nJyxcbiAgICAgICAgY2hhcnNldDogJ2NoYXJTZXQnLFxuICAgICAgICBjbGFzc2lkOiAnY2xhc3NJRCcsXG4gICAgICAgICdjbGFzcyc6ICdjbGFzc05hbWUnLFxuICAgICAgICBjbGFzc25hbWU6ICdjbGFzc05hbWUnLFxuICAgICAgICBjb2xzcGFuOiAnY29sU3BhbicsXG4gICAgICAgIGNvbnRlbnRlZGl0YWJsZTogJ2NvbnRlbnRFZGl0YWJsZScsXG4gICAgICAgIGNvbnRleHRtZW51OiAnY29udGV4dE1lbnUnLFxuICAgICAgICBjcm9zc29yaWdpbjogJ2Nyb3NzT3JpZ2luJyxcbiAgICAgICAgZGF0ZXRpbWU6ICdkYXRlVGltZScsXG4gICAgICAgIGVuY3R5cGU6ICdlbmNUeXBlJyxcbiAgICAgICAgZm9ybWFjdGlvbjogJ2Zvcm1BY3Rpb24nLFxuICAgICAgICBmb3JtZW5jdHlwZTogJ2Zvcm1FbmNUeXBlJyxcbiAgICAgICAgZm9ybW1ldGhvZDogJ2Zvcm1NZXRob2QnLFxuICAgICAgICBmb3Jtbm92YWxpZGF0ZTogJ2Zvcm1Ob1ZhbGlkYXRlJyxcbiAgICAgICAgZm9ybXRhcmdldDogJ2Zvcm1UYXJnZXQnLFxuICAgICAgICBmcmFtZWJvcmRlcjogJ2ZyYW1lQm9yZGVyJyxcbiAgICAgICAgaHRtbGZvcjogJ2h0bWxGb3InLFxuICAgICAgICAnZm9yJzogJ2h0bWxGb3InLFxuICAgICAgICBodHRwZXF1aXY6ICdodHRwRXF1aXYnLFxuICAgICAgICBtYXJnaW5oZWlnaHQ6ICdtYXJnaW5IZWlnaHQnLFxuICAgICAgICBtYXJnaW53aWR0aDogJ21hcmdpbldpZHRoJyxcbiAgICAgICAgbWF4bGVuZ3RoOiAnbWF4TGVuZ3RoJyxcbiAgICAgICAgbWVkaWFncm91cDogJ21lZGlhR3JvdXAnLFxuICAgICAgICBub3ZhbGlkYXRlOiAnbm9WYWxpZGF0ZScsXG4gICAgICAgIHJhZGlvZ3JvdXA6ICdyYWRpb0dyb3VwJyxcbiAgICAgICAgcmVhZG9ubHk6ICdyZWFkT25seScsXG4gICAgICAgIHJvd3NwYW46ICdyb3dTcGFuJyxcbiAgICAgICAgc3BlbGxjaGVjazogJ3NwZWxsQ2hlY2snLFxuICAgICAgICBzcmNkb2M6ICdzcmNEb2MnLFxuICAgICAgICBzcmNzZXQ6ICdzcmNTZXQnLFxuICAgICAgICB0YWJpbmRleDogJ3RhYkluZGV4JyxcbiAgICAgICAgdXNlbWFwOiAndXNlTWFwJ1xuICAgIH0sXG4gICAgYXR0cnM6IGZ1bmN0aW9uKHZhbHVlcywgZm9yY2UpIHtcbiAgICAgICAgdmFyIGF0dHJzID0gdGhpcy5fX2pzb24uYXR0cnMgfHwge31cbiAgICAgICAgaWYgKHZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5hdHRycyA9IGZvcmNlID8gdGhpcy5leHRlbmQoYXR0cnMsIHZhbHVlcykgOiB0aGlzLmV4dGVuZCh2YWx1ZXMsIGF0dHJzKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhdHRyc1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhdHRyOiBmdW5jdGlvbihrZXksIHZhbCwgZm9yY2UpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5hdHRycyA/XG4gICAgICAgICAgICAgICAgKCF0aGlzLl9fanNvbi5hdHRycy5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8IGZvcmNlKSAmJiAodGhpcy5fX2pzb24uYXR0cnNba2V5XSA9IHZhbCkgOlxuICAgICAgICAgICAgICAgICh0aGlzLl9fanNvbi5hdHRycyA9IHt9KVtrZXldID0gdmFsXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLmF0dHJzICYmIHRoaXMuX19qc29uLmF0dHJzW2tleV1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy9UT0RPOiBSZWZhY3RvciBtb2QsIG1vZHMsIG11TW9kLCBtdU1vZHNcbiAgICAvL1RoaW5rIGFib3V0IGRlY2xNdW1vZHMgPyBzZXRNdU1vZCBkZWxNdU1vZCBnZXRNdU1vZFxuICAgIG1vZDogZnVuY3Rpb24obW9kLCB2YWwsIGZvcmNlKSB7XG4gICAgICAgIHZhciBtb2RzID0gdGhpcy5tb2RzKClcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAoIW1vZHMuaGFzT3duUHJvcGVydHkobW9kKSB8fCBmb3JjZSkgJiYgKG1vZHNbbW9kXSA9IHZhbClcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tdU1vZHMoKS5oYXNPd25Qcm9wZXJ0eShtb2QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVNb2QobW9kKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtb2RzLmhhc093blByb3BlcnR5KG1vZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kc1ttb2RdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1vZHM6IGZ1bmN0aW9uKHZhbHVlcywgZm9yY2UpIHtcbiAgICAgICAgdmFyIGZpZWxkID0gdGhpcy5fX2pzb24uZWxlbSA/ICdlbGVtTW9kcycgOiAnbW9kcydcbiAgICAgICAgdmFyIG1vZHMgPSB0aGlzLl9fanNvbltmaWVsZF1cbiAgICAgICAgaWYgKHZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICB0aGlzLl9fanNvbltmaWVsZF0gPSBmb3JjZSA/IHRoaXMuZXh0ZW5kKG1vZHMsIHZhbHVlcykgOiB0aGlzLmV4dGVuZCh2YWx1ZXMsIG1vZHMpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1vZHNcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbXVTdGF0ZXM6IGZ1bmN0aW9uKHN0YXRlcykge1xuICAgICAgICBpZiAoc3RhdGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2ZsYWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fbXVTdGF0ZXMgPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5fX211U3RhdGVzLCBzdGF0ZXMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19tdVN0YXRlcyB8fCB7fVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtdU1vZHM6IGZ1bmN0aW9uKG1vZHMpIHtcbiAgICAgICAgaWYgKG1vZHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19tdU1vZHMgPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5fX211TW9kcywgbW9kcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX211TW9kcyB8fCB7fVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtdVN0YXRlOiBmdW5jdGlvbihzdGF0ZSwgdmFsKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlW3N0YXRlXSAhPT0gdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdTdGF0ZSA9IHt9XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlW3N0YXRlXSA9IHZhbFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICh0aGlzLl9fbXVTdGF0ZXMgfHwgKHRoaXMuX19tdVN0YXRlcyA9IHt9KSlbc3RhdGVdID0gdmFsXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVTdGF0ZXMoKVtzdGF0ZV1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbXVNb2Q6IGZ1bmN0aW9uKG1vZCwgdmFsKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlW21vZF0gIT09IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3U3RhdGUgPSB7fVxuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZVttb2RdID0gdmFsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKHRoaXMuX19tdU1vZHMgfHwgKHRoaXMuX19tdU1vZHMgPSB7fSkpW21vZF0gPSB2YWxcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tdU1vZHMoKVttb2RdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRvZ2dsZU11TW9kIDogZnVuY3Rpb24obW9kTmFtZSkge1xuICAgICAgICAvL1RPRE86IFJlZmFjdG9yIG1lXG4gICAgICAgIHRoaXMubXVNb2QobW9kTmFtZSwgIXRoaXMubXVNb2QobW9kTmFtZSkpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICB0YWc6IGZ1bmN0aW9uKHRhZywgZm9yY2UpIHtcbiAgICAgICAgaWYgKHRhZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc01peCkge3JldHVybiB0aGlzfVxuICAgICAgICAgICAgKCF0aGlzLl9fanNvbi50YWcgfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbi50YWcgPSB0YWcpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLnRhZ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBtYXRjaDogZnVuY3Rpb24oc2VsZWN0b3IsIG1hdGNoZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9fZmxhZykgcmV0dXJuIHRoaXNcbiAgICAgICAgaWYgKCFzZWxlY3RvciB8fCAhbWF0Y2hlcikgcmV0dXJuIHRoaXNcbiAgICAgICAgdmFyIGRlY2wgPSBCSC5fZ2V0RGVjbChzZWxlY3RvcilcbiAgICAgICAgdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzIHx8ICh0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnMgPSB7fSlcbiAgICAgICAgdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzW2RlY2wuYmxvY2tdIHx8ICh0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnNbZGVjbC5ibG9ja10gPSBbXSlcbiAgICAgICAgdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzW2RlY2wuYmxvY2tdLnB1c2goW2RlY2wsIG1hdGNoZXJdKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBtaXhKczogZnVuY3Rpb24obWl4KSB7XG4gICAgICAgIGlmIChtaXguYmxvY2sgJiYgbWl4LmJsb2NrICE9PSB0aGlzLl9fanNvbi5ibG9jaykge1xuICAgICAgICAgICAgdmFyIG1hdGNoZXJzID0gdGhpcy5iaC5fX21hdGNoZXJzW21peC5ibG9ja11cbiAgICAgICAgICAgIGlmIChtYXRjaGVycykge1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gdGhpcy5leHRlbmQoe30sIHRoaXMuX19qc29uKVxuICAgICAgICAgICAgICAgIHRoaXMuZXh0ZW5kKHRoaXMuX19qc29uLCBtaXgpXG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24uZWxlbSA9IG1peC5lbGVtXG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24uX19zdG9wID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZWQgPSBbXVxuICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fbWF0Y2hlcnMgPSBtYXRjaGVyc1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fX2lzTWl4ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMuX19wcm9jZXNzTWF0Y2goKVxuICAgICAgICAgICAgICAgIHRoaXMuX19qc29uID0ganNvblxuICAgICAgICAgICAgICAgIHRoaXMuX19pc01peCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIG1peDogZnVuY3Rpb24obWl4LCBmb3JjZSkge1xuICAgICAgICBpZiAobWl4KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5taXggPSAoIXRoaXMuX19qc29uLm1peCB8fCBmb3JjZSkgP1xuICAgICAgICAgICAgICAgIG1peCA6XG4gICAgICAgICAgICAgICAgKEFycmF5LmlzQXJyYXkodGhpcy5fX2pzb24ubWl4KSA/IHRoaXMuX19qc29uLm1peCA6IFt0aGlzLl9fanNvbi5taXhdKS5jb25jYXQobWl4KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fanNvbi5taXhcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudDogZnVuY3Rpb24oY29udGVudCwgZm9yY2UpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAgICAgKCF0aGlzLl9fanNvbi5jb250ZW50IHx8IGZvcmNlKSAmJiAodGhpcy5fX2pzb24uY29udGVudCA9IGNvbnRlbnQpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLmNvbnRlbnRcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcG9zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uJHBvc2l0aW9uXG4gICAgfSxcbiAgICBpc0ZpcnN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24oKSA9PT0gMVxuICAgIH0sXG4gICAgaXNMYXN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLiRpc0xhc3RcbiAgICB9LFxuICAgIGpzb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2pzb25cbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgIHRoaXMuX19qc29uLl9fc3RvcCA9IHRydWVcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGFwcGx5QmFzZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX19wcm9jZXNzTWF0Y2goKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgX19wcm9jZXNzTWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmV0VmFsLFxuICAgICAgICAgICAgY3R4ID0gdGhpcyxcbiAgICAgICAgICAgIGpzb24gPSB0aGlzLl9fanNvbixcbiAgICAgICAgICAgIGJfID0ganNvbi5ibG9jayxcbiAgICAgICAgICAgIF9fZSA9IGpzb24uZWxlbSxcbiAgICAgICAgICAgIG1vZHMgPSB0aGlzLm1vZHMoKSxcbiAgICAgICAgICAgIG1hdGNoZXJzID0ganNvbi5fX21hdGNoZXJzLFxuICAgICAgICAgICAgaSA9IG1hdGNoZXJzLmxlbmd0aCAtIDEsXG4gICAgICAgICAgICBtYXRjaGVkID0ganNvbi5fX21hdGNoZWQsXG4gICAgICAgICAgICBtYXRjaE1vZHMgPSBmdW5jdGlvbihkZWNsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlY2wubW9kTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kcyAmJiBtb2RzW2RlY2wubW9kTmFtZV0gJiYgKG1vZHNbZGVjbC5tb2ROYW1lXSA9PT0gZGVjbC5tb2RWYWwgfHwgbW9kc1tkZWNsLm1vZE5hbWVdID09PSB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZC5wdXNoKGkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRWYWwgPSBjYihjdHgsIGpzb24pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goaSlcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsID0gY2IoY3R4LCBqc29uKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgZm9yICg7IGkgPj0gMCAmJiAhcmV0VmFsICYmICFqc29uLl9fc3RvcDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgcnVsZSA9IG1hdGNoZXJzW2ldLFxuICAgICAgICAgICAgICAgIGRlY2wgPSBydWxlWzBdLFxuICAgICAgICAgICAgICAgIGNiID0gcnVsZVsxXVxuXG4gICAgICAgICAgICBpZiAofm1hdGNoZWQuaW5kZXhPZihpKSkgeyBjb250aW51ZSB9XG4gICAgICAgICAgICBpZiAoZGVjbC5lbGVtIHx8IF9fZSkge1xuICAgICAgICAgICAgICAgIChkZWNsLmVsZW0gPT09IF9fZSkgJiYgbWF0Y2hNb2RzKGRlY2wpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hdGNoTW9kcyhkZWNsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXRWYWwpICB7XG4gICAgICAgICAgICByZXRWYWwgPSBbXS5jb25jYXQocmV0VmFsKS5tYXAoZnVuY3Rpb24ocmV0VmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJldFZhbC5ibG9jayAmJiByZXRWYWwuYmxvY2sgIT09IGpzb24uYmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoZXJzID0gdGhpcy5iaC5fX21hdGNoZXJzW3JldFZhbC5ibG9ja10gfHwgW11cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbiA9IHJldFZhbFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX3N0b3AgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZWQgPSBbXVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZXJzID0gbWF0Y2hlcnNcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXRWYWwuX19zdG9wID0ganNvbi5fX3N0b3BcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsLl9fbWF0Y2hlZCA9IGpzb24uX19tYXRjaGVkXG4gICAgICAgICAgICAgICAgICAgIHJldFZhbC5fX21hdGNoZXJzID0ganNvbi5fX21hdGNoZXJzXG4gICAgICAgICAgICAgICAgICAgIHJldFZhbC5lbGVtICYmIChyZXRWYWwuYmxvY2sgPSBqc29uLmJsb2NrKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbiA9IHJldFZhbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9fcHJvY2Vzc01hdGNoKClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb25cbiAgICAgICAgICAgIH0sIHRoaXMpXG4gICAgICAgICAgICByZXRWYWwubGVuZ3RoID09IDEgJiYgKHJldFZhbCA9IHJldFZhbFswXSlcbiAgICAgICAgICAgIHRoaXMuX19qc29uID0gcmV0VmFsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9fbWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYl8gPSAgdGhpcy5fX2pzb24uYmxvY2ssXG4gICAgICAgICAgICBzdWJNYXRjaGVycyA9ICh0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnMgJiYgdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzW2JfXSkgfHwgW10sXG4gICAgICAgICAgICBtYXRjaGVycyA9ICh0aGlzLmJoLl9fbWF0Y2hlcnNbYl9dIHx8IFtdKS5jb25jYXQoc3ViTWF0Y2hlcnMpXG5cbiAgICAgICAgdGhpcy5fX2pzb24uX19zdG9wID0gZmFsc2VcbiAgICAgICAgdGhpcy5fX2pzb24uX19tYXRjaGVkID0gW11cbiAgICAgICAgdGhpcy5fX2pzb24uX19tYXRjaGVycyA9IG1hdGNoZXJzXG4gICAgICAgIHRoaXMuX19wcm9jZXNzTWF0Y2goKVxuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9jb21wb3NlQ3VyTm9kZSh0aGlzLnByb3BzKVxuICAgICAgICB0aGlzLl9fZmxhZyA9IHRydWVcbiAgICAgICAgdGhpcy5zdGF0aWNzIHx8ICh0aGlzLnN0YXRpY3MgPSB7fSlcbiAgICAgICAgdGhpcy5fX3NlbGYgPSB0aGlzLnN0YXRpY3M7XG4gICAgICAgIHRoaXMuX19tYXRjaCgpXG4gICAgICAgIHRoaXMud2lsbE1vdW50KCkuZm9yRWFjaChmdW5jdGlvbih3aWxsTW91bnQpIHtcbiAgICAgICAgICAgIHdpbGxNb3VudC5iaW5kKHRoaXMpKHRoaXMsIHRoaXMuX19qc29uKVxuICAgICAgICB9LCB0aGlzKVxuICAgIH0sXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5leHRlbmQoe30sIHRoaXMuc3RhdGUsIHRoaXMubXVTdGF0ZXMoKSwgdGhpcy5tdU1vZHMoKSlcbiAgICAgICAgdGhpcy5kaWRNb3VudCgpLmZvckVhY2goZnVuY3Rpb24oZGlkTW91bnQpIHtcbiAgICAgICAgICAgIGRpZE1vdW50LmJpbmQodGhpcykodGhpcywgdGhpcy5fX2pzb24pXG4gICAgICAgIH0sIHRoaXMpXG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihwcm9wcykge1xuICAgICAgICB0aGlzLndpbGxSZWNlaXZlUHJvcHMoKS5mb3JFYWNoKGZ1bmN0aW9uKGJVcGRhdGUpIHtcbiAgICAgICAgICAgIGJVcGRhdGUuYmluZCh0aGlzKSh0aGlzLCBwcm9wcylcbiAgICAgICAgfSwgdGhpcylcbiAgICAgICAgdGhpcy5fX3Byb3BzID0gcHJvcHNcbiAgICAgICAgdGhpcy5fY29tcG9zZUN1ck5vZGUocHJvcHMpXG4gICAgICAgIHRoaXMuYmVmb3JlVXBkYXRlKCkuZm9yRWFjaChmdW5jdGlvbihiVXBkYXRlKSB7XG4gICAgICAgICAgICBiVXBkYXRlLmJpbmQodGhpcykodGhpcywgdGhpcy5fX2pzb24pXG4gICAgICAgIH0sIHRoaXMpXG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsVXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX19wcm9wcykge1xuICAgICAgICAgICAgdGhpcy5fX3Byb3BzID0gdW5kZWZpbmVkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb3NlQ3VyTm9kZSh0aGlzLnByb3BzKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBfX25vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fX2ZsYWcpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX19tYXRjaCgpXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVuZGVyTm9kZXMgPSBmdW5jdGlvbihqc29uLCByZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBqc29uLnJlZHVjZShmdW5jdGlvbihyZXN1bHQsIGpzb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShqc29uKSkge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJOb2Rlcyhqc29uLCByZXN1bHQpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2pzb24gPSBqc29uXG4gICAgICAgICAgICAgICAgICAgIHZhciBjbHMgPSB0aGlzLl9idWlsZENsYXNzTmFtZSgpICsgKHRoaXMuY2xzKCkgPyAnICcgKyB0aGlzLmNscygpIDogJycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IHRoaXMuX3Byb2Nlc3NUcmVlKHRoaXMuY29udGVudCgpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzID0gdGhpcy5hdHRycygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcyA9IHtjaGlsZHJlbjogY29udGVudH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRDYXBpdGFsaXplICYmIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9rZXlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmF0dHJDYXBpdGFsaXplZFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2tleSA9IHRoaXMuYXR0ckNhcGl0YWxpemVkW2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyc1tfa2V5XSA9IGF0dHJzW2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cnNba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKVxuXG4gICAgICAgICAgICAgICAgICAgIGNscyAmJiAocHJvcHMuY2xhc3NOYW1lID0gY2xzKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMudGFnKCkgfHwgJ2RpdicsIHRoaXMuZXh0ZW5kKHByb3BzLCBhdHRycywgZXZlbnRzKSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgcmVzdWx0IHx8IFtdKVxuICAgICAgICB9LmJpbmQodGhpcylcblxuICAgICAgICB2YXIgbm9kZSxcbiAgICAgICAgICAgIG5vZGVzID0gcmVuZGVyTm9kZXMoW10uY29uY2F0KHRoaXMuX19qc29uKSlcblxuICAgICAgICBpZiAobm9kZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2Rlc1swXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7Y2hpbGRyZW46IG5vZGVzfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgIH0sXG5cbiAgICBfY29tcG9zZUN1ck5vZGU6IGZ1bmN0aW9uKHBwKSB7XG4gICAgICAgIC8vVE9ETzogVGhpbmsgYWJvdXQgY2FjaGluZy9kaWZmaW5nIGJlbUpzb25UcmVlL2NvbnRlbnRcbiAgICAgICAgdGhpcy5fX2pzb24gPSB0aGlzLmV4dGVuZCh7fSwgcHAsIHtjb250ZW50OiBwcC5jaGlsZHJlbiB8fCBwcC5jb250ZW50fSlcbiAgICAgICAgdmFyIG1vZHMgPSBPYmplY3Qua2V5cyh0aGlzLl9fanNvbikucmVkdWNlKGZ1bmN0aW9uKG1vZHMsIGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleVswXSA9PT0gQkguXyAmJiAobW9kc1trZXkuc2xpY2UoMSldID0gcHBba2V5XSksIG1vZHNcbiAgICAgICAgfSwge30pXG4gICAgICAgIHRoaXMuX19ibG9jayAmJiAodGhpcy5fX2pzb24uYmxvY2sgPSB0aGlzLl9fYmxvY2spXG4gICAgICAgIHRoaXMuX19lbGVtICYmICh0aGlzLl9fanNvbi5lbGVtID0gdGhpcy5fX2VsZW0pXG4gICAgICAgIGlmICh0aGlzLl9fanNvbi5lbGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5lbGVtTW9kcyB8fCAodGhpcy5fX2pzb24uZWxlbU1vZHMgPSAodGhpcy5fX2pzb24ubW9kcyB8fCB7fSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5tb2RzIHx8ICh0aGlzLl9fanNvbi5tb2RzID0ge30pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKG1vZHMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fanNvbi5lbGVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24uZWxlbU1vZHMgPSB0aGlzLmV4dGVuZCh0aGlzLl9fanNvbi5lbGVtTW9kcywgbW9kcylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24ubW9kcyA9IHRoaXMuZXh0ZW5kKHRoaXMuX19qc29uLm1vZHMsIG1vZHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9idWlsZENsYXNzTmFtZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBiXyA9IHRoaXMuX19qc29uLmJsb2NrLFxuICAgICAgICAgICAgX19lID0gdGhpcy5fX2pzb24uZWxlbSxcbiAgICAgICAgICAgIGNscyA9IHt9LFxuICAgICAgICAgICAgbW9kcyA9IHRoaXMuZXh0ZW5kKHt9LCB0aGlzLm1vZHMoKSwgdGhpcy5tdU1vZHMoKSlcblxuICAgICAgICBmdW5jdGlvbiBhZGRFbml0eShiXywgX19lLCBtb2RzLCBtaXgpIHtcbiAgICAgICAgICAgIHZhciBlbnRpdHkgPSBiX1xuXG4gICAgICAgICAgICBpZiAoX19lKSB7XG4gICAgICAgICAgICAgICAgZW50aXR5ICs9IEJILl9fICsgX19lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbHNbZW50aXR5XSA9IGVudGl0eVxuICAgICAgICAgICAgT2JqZWN0LmtleXMobW9kcykuZm9yRWFjaChmdW5jdGlvbihtb2ROYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZFZhbHVlID0gbW9kc1ttb2ROYW1lXVxuICAgICAgICAgICAgICAgIGlmICghbW9kVmFsdWUgJiYgbW9kVmFsdWUgIT09IDApIHJldHVyblxuICAgICAgICAgICAgICAgIHZhciBtb2RFbnRpdHkgPSBlbnRpdHkgKyBCSC5fICsgbW9kTmFtZVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbW9kVmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICBCSC5ub0Jvb2xNb2RzICYmIG1vZFZhbHVlICYmIChtb2RFbnRpdHkgKz0gQkguXyArICd5ZXMnKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZEVudGl0eSArPSBCSC5fICsgbW9kVmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xzW21vZEVudGl0eV0gPSBtb2RFbnRpdHlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBiXyAmJiBhZGRFbml0eShiXywgX19lLCBtb2RzLCBmYWxzZSlcbiAgICAgICAgdGhpcy5fX2pzb24ubWl4ICYmIFtdLmNvbmNhdCh0aGlzLl9fanNvbi5taXgpLmZvckVhY2goZnVuY3Rpb24obWl4KSB7XG4gICAgICAgICAgICBpZiAoIW1peCkgeyByZXR1cm4gfVxuICAgICAgICAgICAgaWYgKCFtaXguYmxvY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoIWJfKSB7IHJldHVybiB9XG4gICAgICAgICAgICAgICAgbWl4LmJsb2NrID0gYl9cbiAgICAgICAgICAgICAgICBtaXguZWxlbSB8fCAobWl4LmVsZW0gPSBfX2UpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRFbml0eShtaXguYmxvY2ssIG1peC5lbGVtLCBtaXgubW9kcyB8fCBtaXguZWxlbU1vZHMgfHwge30sIHRydWUpXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGNscykuam9pbignICcpXG4gICAgfSxcbiAgICBfcHJvY2Vzc1RyZWU6IGZ1bmN0aW9uKHRyZWUsIHBvc2l0aW9uKSB7XG4gICAgICAgIHRyZWUgPSBbXS5jb25jYXQodHJlZSlcbiAgICAgICAgcG9zaXRpb24gfHwgKHBvc2l0aW9uID0ge3ZhbDogMCwgbGFzdDogMH0pXG4gICAgICAgIHBvc2l0aW9uLmxhc3QgKz0gKHRyZWUubGVuZ3RoIC0gMSlcbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0cmVlLm1hcChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzVHJlZShub2RlLCBwb3NpdGlvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbm9kZSB8fCAoIW5vZGUuYmxvY2sgJiYgIW5vZGUuZWxlbSAmJiAhbm9kZS50YWcgJiYgIW5vZGUuY29udGVudCAmJiAhbm9kZS50eXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBub2RlLnR5cGUuZGlzcGxheU5hbWVcbiAgICAgICAgICAgICAgICBpZiAoIW5hbWUpIHsgcmV0dXJuIG5vZGUgfVxuICAgICAgICAgICAgICAgIHZhciBkZWNsID0gQkguX2dldERlY2wobmFtZSlcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wcm9wcyB8fCB7fVxuICAgICAgICAgICAgICAgIG5vZGUuYmxvY2sgPSBkZWNsLmJsb2NrLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICBub2RlLmVsZW0gPSBkZWNsLmVsZW1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLmVsZW0pIHtcbiAgICAgICAgICAgICAgICBub2RlLmJsb2NrIHx8IChub2RlLmJsb2NrID0gdGhpcy5fX2pzb24uYmxvY2spXG4gICAgICAgICAgICAgICAgbm9kZS5yZWYgPSBub2RlLmJsb2NrICsgQkguX18gKyBub2RlLmVsZW0gKyAnficgKyB0aGlzLmdlbmVyYXRlSWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fX2pzb24uJHRQYXJhbSAmJiAobm9kZS4kdFBhcmFtID0gdGhpcy5leHRlbmQoe30sIHRoaXMuX19qc29uLiR0UGFyYW0pKVxuICAgICAgICAgICAgaWYgKHRoaXMuX19qc29uLiRzdWJNYXRjaGVycykge1xuICAgICAgICAgICAgICAgIHZhciBzdWJNYXRjaGVycyA9IHRoaXMuX19qc29uLiRzdWJNYXRjaGVyc1tub2RlLmJsb2NrXVxuICAgICAgICAgICAgICAgIHN1Yk1hdGNoZXJzICYmICgobm9kZS4kc3ViTWF0Y2hlcnMgPSB7fSlbbm9kZS5ibG9ja10gPSBzdWJNYXRjaGVycylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvc2l0aW9uLmxhc3QgPT09IHBvc2l0aW9uLnZhbCA/IChub2RlLiRpc0xhc3QgPSB0cnVlKSA6IChub2RlLiRpc0xhc3QgPSBmYWxzZSlcbiAgICAgICAgICAgIG5vZGUuJHBvc2l0aW9uID0gKytwb3NpdGlvbi52YWxcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5iaC5CRU0sIG5vZGUpXG4gICAgICAgIH0sIHRoaXMpXG4gICAgICAgIGNvbnRlbnQubGVuZ3RoID09IDEgJiYgKGNvbnRlbnQgPSBjb250ZW50WzBdKVxuICAgICAgICByZXR1cm4gY29udGVudFxuICAgIH0sXG4gICAgZWxlbTogZnVuY3Rpb24oZWxlbU5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX19mbGFnKSB7IHJldHVybiB9XG4gICAgICAgIHZhciBlbGVtcyA9IFtdLmNvbmNhdCh0aGlzLmVsZW1DdHgoZWxlbU5hbWUpKS5tYXAoZnVuY3Rpb24oZWxlbUN0eCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1DdHguZG9tRWxlbSgpXG4gICAgICAgIH0pXG4gICAgICAgIGVsZW1zLmxlbmd0aCA9PSAxICYmIChlbGVtcyA9IGVsZW1zWzBdKVxuICAgICAgICByZXR1cm4gZWxlbXNcbiAgICB9LFxuICAgIGVsZW1DdHg6IGZ1bmN0aW9uKGVsZW1OYW1lKSB7XG4gICAgICAgIHZhciBlbGVtcyA9IFtdLFxuICAgICAgICAgICAgZW50aXR5ID0gdGhpcy5fX2pzb24uYmxvY2sgKyBCSC5fXyArIGVsZW1OYW1lLFxuICAgICAgICAgICAgX2VsZW1DdHggPSBmdW5jdGlvbihyZWZzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocmVmcykuZm9yRWFjaChmdW5jdGlvbihyZWZLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiA9IHJlZnNbcmVmS2V5XVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlZikgeyByZXR1cm4gfVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVmS2V5LnNwbGl0KCd+JylbMF0gPT09IGVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbXMucHVzaChyZWYpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZWxlbUN0eChyZWYucmVmcylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgX2VsZW1DdHgodGhpcy5yZWZzKVxuICAgICAgICBlbGVtcy5sZW5ndGggPT0gMSAmJiAoZWxlbXMgPSBlbGVtc1swXSlcbiAgICAgICAgcmV0dXJuIGVsZW1zXG4gICAgfSxcbiAgICBfZXZlbnRzOiBmdW5jdGlvbihldmVudHMpIHtcbiAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzUHJvcHMgfHwgKHRoaXMuX2V2ZW50c1Byb3BzID0ge30pXG4gICAgICAgICAgICB0aGlzLmV4dGVuZCh0aGlzLl9ldmVudHNQcm9wcywgZXZlbnRzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50c1Byb3BzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHdpbGxNb3VudDogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICB0aGlzLl9fZmxhZyAmJiAodGhpcy5fX3dpbGxNb3VudCB8fCAodGhpcy5fX3dpbGxNb3VudCA9IFtdKSkucHVzaChjYilcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3dpbGxNb3VudCB8fCBbXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBkaWRNb3VudDogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICB0aGlzLl9fZmxhZyAmJiAodGhpcy5fX2RpZE1vdW50IHx8ICh0aGlzLl9fZGlkTW91bnQgPSBbXSkpLnB1c2goY2IpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19kaWRNb3VudCB8fCBbXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB3aWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihjYikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnICYmICh0aGlzLl9fd2lsbFJlY2VpdmUgfHwgKHRoaXMuX193aWxsUmVjZWl2ZSA9IFtdKSkucHVzaChjYilcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3dpbGxSZWNlaXZlIHx8IFtdXG4gICAgICAgIH1cbiAgICB9LFxuLy9UT0RPOiBEZWxldGUgdGhpcyBmblxuICAgIGJlZm9yZVVwZGF0ZTogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICB0aGlzLl9fZmxhZyAmJiAodGhpcy5fX2JVcGRhdGUgfHwgKHRoaXMuX19iVXBkYXRlID0gW10pKS5wdXNoKGNiKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fYlVwZGF0ZSB8fCBbXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBiaW5kOiBmdW5jdGlvbihldmVudHMpIHtcbiAgICAgICAgaWYgKHRoaXMuX19mbGFnKSB7XG4gICAgICAgICAgICB2YXIgYXR0cnMgPSB7fVxuICAgICAgICAgICAgdGhpcy5fX2V2ZW50cyB8fCAodGhpcy5fX2V2ZW50cyA9IHt9KVxuICAgICAgICAgICAgT2JqZWN0XG4gICAgICAgICAgICAgICAgLmtleXMoZXZlbnRzKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50TmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjYiA9IGV2ZW50c1tldmVudE5hbWVdXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19ldmVudHNbZXZlbnROYW1lXSB8fCAodGhpcy5fX2V2ZW50c1tldmVudE5hbWVdID0gW10pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19ldmVudHNbZXZlbnROYW1lXS5wdXNoKGNiKVxuICAgICAgICAgICAgICAgICAgICBhdHRyc1tldmVudE5hbWVdID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2V2ZW50c1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5iaW5kKHRoaXMpKGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKVxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9LCB0aGlzKVxuXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMoYXR0cnMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGRvbUVsZW06IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuZmluZERPTU5vZGUodGhpcylcbiAgICB9XG59XG5cbkJILkJFTV9IYXphcmQgPSBCRU1fSGF6YXJkXG5cbnJldHVybiBCSFxufSkoKVxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEJIXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJoKSB7XG4gICAgYmgubWF0Y2goJ2NoZWNrYm94X19ib3gnLCBmdW5jdGlvbihjdHgpIHtcbiAgICAgICAgY3R4Lm1peEpzKHtibG9jazogJ2NvbnRyb2wnLCBtb2RzOiB7J2ZvY3VzZWQnOiB0cnVlfX0pXG4gICAgfSlcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJoKSB7XG4gICAgYmgubWF0Y2goJ2NoZWNrYm94X19jb250cm9sJywgZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLnRhZygnaW5wdXQnKVxuICAgICAgICAgICAgLmF0dHJzKGN0eC5leHRlbmQoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6ICdvZmYnLFxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbGxlZGJ5JzogY3R4LnRQYXJhbSgnbGFiZWxJZCcpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjdHgudFBhcmFtKCdjaGVja2JveEF0dHJzJylcbiAgICAgICAgICAgICkpO1xuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmgpIHtcbiAgICBiaC5tYXRjaCgnY2hlY2tib3hfX2xhYmVsJywgZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLnRhZygnbGFiZWwnKVxuICAgICAgICAgICAgLmF0dHJzKHtcbiAgICAgICAgICAgICAgICAnZm9yJzogY3R4LnRQYXJhbSgnY2hlY2tib3hBdHRycycpLmlkLFxuICAgICAgICAgICAgICAgICdpZCc6IGN0eC50UGFyYW0oJ2xhYmVsSWQnKSxcbiAgICAgICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJoKSB7XG4gICAgYmgubWF0Y2goJ2NoZWNrYm94JywgZnVuY3Rpb24oY3R4LCBqc29uKSB7XG4gICAgICAgIHZhciBjaGVja2JveEF0dHJzID0gY3R4LmV4dGVuZCh7aWQ6IGN0eC5nZW5lcmF0ZUlkKCl9LCBqc29uLmNoZWNrYm94QXR0cnMpLFxuICAgICAgICAgICAganNQYXJhbXMgPSBjdHguZXh0ZW5kKHtsaXZlOiBmYWxzZX0sIGN0eC5qcygpKTtcblxuICAgICAgICBpZihjdHgubW9kKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICBjaGVja2JveEF0dHJzLmRpc2FibGVkID0gJ2Rpc2FibGVkJztcbiAgICAgICAgfVxuICAgICAgICBpZihjdHgubW9kKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgIGNoZWNrYm94QXR0cnMuZGVmYXVsdENoZWNrZWQgPSAnY2hlY2tlZCc7XG4gICAgICAgIH1cblxuICAgICAgICBjdHhcbiAgICAgICAgICAgIC50YWcoJ3NwYW4nKVxuICAgICAgICAgICAgLmpzKGpzUGFyYW1zKVxuICAgICAgICAgICAgLm1vZCgndGhlbWUnLCAnbm9ybWFsJylcbiAgICAgICAgICAgIC50UGFyYW0oJ2NoZWNrYm94QXR0cnMnLCBjaGVja2JveEF0dHJzKVxuICAgICAgICAgICAgLnRQYXJhbSgnbGFiZWxJZCcsICdsYWJlbCcgKyBjaGVja2JveEF0dHJzLmlkKVxuICAgICAgICAgICAgLmNvbnRlbnQoW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbTogJ2JveCcsXG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICBlbGVtTW9kczoge2NoZWNrZWQ6IGN0eC5tb2QoJ2NoZWNrZWQnKX0sXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbGVtOiAnY29udHJvbCd9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2VsZW06ICd0aWNrJywgdGFnOiAnaSd9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGN0eC5jb250ZW50KClcbiAgICAgICAgICAgIF0sIHRydWUpO1xuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmgpIHtcbiAgICBiaC5tYXRjaCgnY2hlY2tib3gnLCBmdW5jdGlvbihjdHgsIGpzb24pIHtcbiAgICAgICAgY3R4XG4gICAgICAgICAgICAubXVNb2RzKHtcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBjdHgubW9kKCdjaGVja2VkJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYmluZCh7XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm11TW9kKCdjaGVja2VkJywgZS50YXJnZXQuY2hlY2tlZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgIH0pXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJoKSB7XG4gICAgYmgubWF0Y2goJ2NvbnRyb2xfZm9jdXNlZCcsIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICBjdHhcbiAgICAgICAgICAgIC5tdU1vZHMoe1xuICAgICAgICAgICAgICAgIGZvY3VzZWQ6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmJpbmQoe1xuICAgICAgICAgICAgICAgIG9uRm9jdXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjdHgubW9kKCdkaXNhYmxlZCcpIHx8IGN0eC5tdU1vZCgnZm9jdXNlZCcsIHRydWUpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkJsdXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjdHgubXVNb2QoJ2ZvY3VzZWQnLCBmYWxzZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgIH0pXG4gICAgYmgubWF0Y2goJ2NvbnRyb2xfcHJlc3NlZCcsIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICBjdHhcbiAgICAgICAgICAgIC5tdU1vZHMoe1xuICAgICAgICAgICAgICAgIHByZXNzZWQ6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmJpbmQoe1xuICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogYmluZFRvRG9jIGRpZmYgZnJvbSBuYXRpdmUgYnRuXG4gICAgICAgICAgICAgICAgICAgIGN0eC5tdU1vZCgncHJlc3NlZCcsIGZhbHNlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Nb3VzZURvd246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjdHgubXVNb2QoJ3ByZXNzZWQnLCB0cnVlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Nb3VzZVVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm11TW9kKCdwcmVzc2VkJywgZmFsc2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9KVxufTtcbiIsInZhciBCSCA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi5ibG9ja3MvYmVtL2JlbS5qcycpXG5cbkJILm5vQm9vbE1vZHMgPSB0cnVlXG5cbnZhciBiaCA9IG5ldyBCSCgpXG52YXIgQkVNID0gYmguQkVNXG5cbm1vZHVsZS5leHBvcnRzLlJlYWN0ID0gQkguUmVhY3Rcbm1vZHVsZS5leHBvcnRzLmJoID0gYmhcbm1vZHVsZS5leHBvcnRzLkJFTSA9IEJFTVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaCkge1xuICAgIGJoLm1hdGNoKCdjaGVja2JveCcsIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICBjdHgubWl4SnMoe2Jsb2NrOiAnY29udHJvbCcsIG1vZHM6IHsnaG92ZXJlZCc6IHRydWV9fSlcbiAgICB9KVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmgpIHtcbiAgICBiaC5tYXRjaCgnY29udHJvbF9ob3ZlcmVkJywgZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLm11TW9kcyh7XG4gICAgICAgICAgICAgICAgaG92ZXJlZDogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYmluZCh7XG4gICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm1vZCgnZGlzYWJsZWQnKSB8fCBjdHgubXVNb2QoJ2hvdmVyZWQnLCB0cnVlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm11TW9kKCdob3ZlcmVkJywgZmFsc2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9KVxufVxuIiwiLy9Db3VsZCBiZSBnZW5lcmF0ZWRcbnZhciBCSCA9IHJlcXVpcmUoJy4uLy4uLy4uL2Rlc2t0b3AuYmxvY2tzL2JlbS9iZW0uanMnKVxudmFyIGJoID0gQkguYmhcblxucmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uLmJsb2Nrcy9jaGVja2JveC9fX2NvbnRyb2wvY2hlY2tib3hfX2NvbnRyb2wuYmguanMnKShiaClcbnJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi5ibG9ja3MvY2hlY2tib3gvX19sYWJlbC9jaGVja2JveF9fbGFiZWwuYmguanMnKShiaClcblxudmFyIENoZWNrYm94X19sYWJlbCA9IEJILlJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ2NoZWNrYm94X19sYWJlbCcsXG4gICAgX19ibG9jazogJ2NoZWNrYm94JyxcbiAgICBfX2VsZW06ICdsYWJlbCcsXG4gICAgX19tYXRjaGVyczogYmguX19tYXRjaGVycyxcbiAgICBtaXhpbnM6IFtCSC5CRU1fSGF6YXJkXSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX25vZGUoKVxuICAgIH0sXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrYm94X19sYWJlbFxuIiwiLy9Db3VsZCBiZSBnZW5lcmF0ZWRcbnZhciBCSCA9IHJlcXVpcmUoJy4uLy4uL2Rlc2t0b3AuYmxvY2tzL2JlbS9iZW0uanMnKVxudmFyIGJoID0gQkguYmhcblxucmVxdWlyZSgnLi4vLi4vY29tbW9uLmJsb2Nrcy9jb250cm9sL2NvbnRyb2wuYmh6LmpzJykoYmgpXG5yZXF1aXJlKCcuLi8uLi9kZXNrdG9wLmJsb2Nrcy9jb250cm9sL2NvbnRyb2wuYmh6LmpzJykoYmgpXG5cbnJlcXVpcmUoJy4uLy4uL2NvbW1vbi5ibG9ja3MvY2hlY2tib3gvY2hlY2tib3guYmguanMnKShiaClcbnJlcXVpcmUoJy4uLy4uL2NvbW1vbi5ibG9ja3MvY2hlY2tib3gvY2hlY2tib3guYmh6LmpzJykoYmgpXG5yZXF1aXJlKCcuLi8uLi9kZXNrdG9wLmJsb2Nrcy9jaGVja2JveC9jaGVja2JveC5iaHouanMnKShiaClcbnJlcXVpcmUoJy4uLy4uL2NvbW1vbi5ibG9ja3MvY2hlY2tib3gvX19ib3gvY2hlY2tib3hfX2JveC5iaHouanMnKShiaClcblxudmFyIENoZWNrYm94X19sYWJlbCA9IHJlcXVpcmUoJy4vX19sYWJlbC9jaGVja2JveF9fbGFiZWwuanMnKVxuXG52YXIgQ2hlY2tib3ggPSBCSC5SZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdjaGVja2JveCcsXG4gICAgX19ibG9jazogJ2NoZWNrYm94JyxcbiAgICBfX21hdGNoZXJzOiBiaC5fX21hdGNoZXJzLFxuICAgIG1peGluczogW0JILkJFTV9IYXphcmRdLFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fbm9kZSgpXG4gICAgfVxufSlcblxuQ2hlY2tib3guTGFiZWwgPSBDaGVja2JveF9fbGFiZWxcblxubW9kdWxlLmV4cG9ydHMgPSBDaGVja2JveFxuIiwibW9kdWxlLmV4cG9ydHM9W1xuICAgIHtcbiAgICAgICAgYmxvY2s6ICdleGFtcGxlJyxcbiAgICAgICAgY29udGVudDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7c3R5bGU6IHttYXJnaW46IDIwfX0sXG4gICAgICAgICAgICAgICAgY29udGVudDogW1xuICAgICAgICAgICAgICAgICAgICB7dGFnOiAnYicsIGNvbnRlbnQ6ICfQoNCw0LfQvNC10YAgUzonfSxcbiAgICAgICAgICAgICAgICAgICAge3RhZzogJ2JyJ30sXG4gICAgICAgICAgICAgICAgICAgIHtibG9jazogJ2V4YW1wbGUnLCBlbGVtOiAnZXhhbXBsZS10ZXh0JywgY29udGVudDogJ25vcm1hbCBcXHUwMGEwJ30sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrOiAnY2hlY2tib3gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kczoge3NpemU6ICdzJ31cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge3RhZzogJ2JyJ30sXG4gICAgICAgICAgICAgICAgICAgIHtibG9jazogJ2V4YW1wbGUnLCBlbGVtOiAnZXhhbXBsZS10ZXh0JywgY29udGVudDogJ2NoZWNrZWQgXFx1MDBhMCd9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9jazogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHM6IHtzaXplOiAncycsIGNoZWNrZWQ6ICd5ZXMnfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7dGFnOiAnYnInfSxcbiAgICAgICAgICAgICAgICAgICAge2Jsb2NrOiAnZXhhbXBsZScsIGVsZW06ICdleGFtcGxlLXRleHQnLCBjb250ZW50OiAnZGlzYWJsZWQgXFx1MDBhMCd9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9jazogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHM6IHtzaXplOiAncycsIGRpc2FibGVkOiAneWVzJ31cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge3RhZzogJ2JyJ30sXG4gICAgICAgICAgICAgICAgICAgIHtibG9jazogJ2V4YW1wbGUnLCBlbGVtOiAnZXhhbXBsZS10ZXh0JywgY29udGVudDogJ3dpdGggbGFiZWwgXFx1MDBhMCd9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9jazogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHM6IHtzaXplOiAncycsIGNoZWNrZWQ6ICd5ZXMnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHtlbGVtOiAnbGFiZWwnLCBjb250ZW50OiAnbGFiZWwnfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7dGFnOiAnYnInfSxcbiAgICAgICAgICAgICAgICAgICAge2Jsb2NrOiAnZXhhbXBsZScsIGVsZW06ICdleGFtcGxlLXRleHQnLCBjb250ZW50OiAnZGlzYWJsZWQgd2l0aCBsYWJlbCBcXHUwMGEwJ30sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrOiAnY2hlY2tib3gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kczoge3NpemU6ICdzJywgY2hlY2tlZDogJ3llcycsIGRpc2FibGVkOiAneWVzJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB7ZWxlbTogJ2xhYmVsJywgY29udGVudDogJ2xhYmVsJ31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtzdHlsZToge21hcmdpbjogMjB9fSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICAgICAgICAgIHt0YWc6ICdiJywgY29udGVudDogJ9Cg0LDQt9C80LXRgCBNOid9LFxuICAgICAgICAgICAgICAgICAgICB7dGFnOiAnYnInfSxcbiAgICAgICAgICAgICAgICAgICAge2Jsb2NrOiAnZXhhbXBsZScsIGVsZW06ICdleGFtcGxlLXRleHQnLCBjb250ZW50OiAnbm9ybWFsIFxcdTAwYTAnfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RzOiB7c2l6ZTogJ20nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94QXR0cnM6IHtpZDogJ25ubicsIHZhbHVlOiAnaXUnLCBhY2Nlc3NrZXk6ICdraicsIG5hbWU6ICd0ZXh0JywgdGFiaW5kZXg6IDF9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHt0YWc6ICdicid9LFxuICAgICAgICAgICAgICAgICAgICB7YmxvY2s6ICdleGFtcGxlJywgZWxlbTogJ2V4YW1wbGUtdGV4dCcsIGNvbnRlbnQ6ICdjaGVja2VkIFxcdTAwYTAnfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RzOiB7c2l6ZTogJ20nLCBjaGVja2VkOiAneWVzJ31cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge3RhZzogJ2JyJ30sXG4gICAgICAgICAgICAgICAgICAgIHtibG9jazogJ2V4YW1wbGUnLCBlbGVtOiAnZXhhbXBsZS10ZXh0JywgY29udGVudDogJ2Rpc2FibGVkIFxcdTAwYTAnfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RzOiB7c2l6ZTogJ20nLCBkaXNhYmxlZDogJ3llcyd9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHt0YWc6ICdicid9LFxuICAgICAgICAgICAgICAgICAgICB7YmxvY2s6ICdleGFtcGxlJywgZWxlbTogJ2V4YW1wbGUtdGV4dCcsIGNvbnRlbnQ6ICd3aXRoIGxhYmVsIFxcdTAwYTAnfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RzOiB7c2l6ZTogJ20nLCBjaGVja2VkOiAneWVzJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB7ZWxlbTogJ2xhYmVsJywgY29udGVudDogJ2xhYmVsJ31cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge3RhZzogJ2JyJ30sXG4gICAgICAgICAgICAgICAgICAgIHtibG9jazogJ2V4YW1wbGUnLCBlbGVtOiAnZXhhbXBsZS10ZXh0JywgY29udGVudDogJ2Rpc2FibGVkIHdpdGggbGFiZWwgXFx1MDBhMCd9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9jazogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHM6IHtzaXplOiAnbScsIGRpc2FibGVkOiAneWVzJywgY2hlY2tlZDogJ3llcyd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDoge2VsZW06ICdsYWJlbCcsIGNvbnRlbnQ6ICdsYWJlbCd9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9XG5dXG4iLCJ2YXIgQkggPSByZXF1aXJlKCcuLi9kZXNrdG9wLmJsb2Nrcy9iZW0vYmVtLmpzJylcbnZhciBCRU0gPSBCSC5CRU1cblxudmFyIGJlbUpzb24gPSByZXF1aXJlKCcuL2NoZWNrYm94LmJlbS5qc29uJylcbnJlcXVpcmUoJy4uL2Rlc2t0b3AuYnVuZGxlL2NoZWNrYm94L2NoZWNrYm94LmpzJylcblxudmFyIEV4YW1wbGUgPSBCSC5SZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxCRU0+XG4gICAgICAgICAgICAgICAge2JlbUpzb259XG4gICAgICAgICAgICA8L0JFTT5cbiAgICAgICAgKVxuICAgIH1cbn0pXG5cblJlYWN0LnJlbmRlcihcbiAgICA8RXhhbXBsZSAvPixcbiAgICBkb2N1bWVudC5ib2R5XG4pXG4iLG51bGwsIid1c2Ugc3RyaWN0JztcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gVG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIG93bkVudW1lcmFibGVLZXlzKG9iaikge1xuXHR2YXIga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XG5cblx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRrZXlzID0ga2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopKTtcblx0fVxuXG5cdHJldHVybiBrZXlzLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG5cdFx0cmV0dXJuIHByb3BJc0VudW1lcmFibGUuY2FsbChvYmosIGtleSk7XG5cdH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIga2V5cztcblx0dmFyIHRvID0gVG9PYmplY3QodGFyZ2V0KTtcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBhcmd1bWVudHNbc107XG5cdFx0a2V5cyA9IG93bkVudW1lcmFibGVLZXlzKE9iamVjdChmcm9tKSk7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRvW2tleXNbaV1dID0gZnJvbVtrZXlzW2ldXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIl19