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

},{"object-assign":15,"react":14}],2:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('check-button__control', function(ctx) {
        ctx
            .tag('input')
            .attrs(ctx.tParam('controlAttrs'))
            .attr('type', 'checkbox');
    });
};

},{}],3:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('check-button__text', function(ctx) {
        ctx.attr('id', ctx.tParam('controlAttrs')['aria-labelledby']);
    });
};

},{}],4:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('check-button_only-icon_yes', function(ctx) {
        var content = ctx.content();
        ctx.applyBase();
        ctx.content([
            {elem: 'control'},
            '&#160;',
            content
        ], true);
    });
};

},{}],5:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('check-button', function(ctx, json) {
        var id = (json.controlAttrs || {}).id || ctx.generateId(),
            controlAttrs = ctx.extend({
                id: id,
                'aria-labelledby': 'text' + id,
                name: json.name,
                tabindex: json.tabindex,
                value: (json.value || json.content)
            }, json.controlAttrs);

        if(ctx.mod('disabled')) {
            controlAttrs.disabled = 'disabled';
        }

        if(ctx.mod('checked')) {
            controlAttrs.checked = 'checked';
        }

        ctx
            .tag('label')
            .js(ctx.extend({live: false}, ctx.js()))
            .mod('theme', 'normal')
            .attr('for', controlAttrs.id)
            .tParam('controlAttrs', controlAttrs)
            .content([
                {
                    elem: 'control'
                },
                {
                    elem: 'text',
                    tag: 'span',
                    content: ctx.content()
                }
            ], true);
    });
};

},{}],6:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('check-button', function(ctx) {
        ctx
            .mixJs({block: 'control', mods: {'pressed': true}})
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
    bh.match('check-button', function(ctx) {
        ctx
            .mixJs({block: 'control', mods: {'focused': true}})
            .mixJs({block: 'control', mods: {'hovered': true}})
    })
}

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
var BH = require('../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../common.blocks/check-button/check-button.bh.js')(bh)
require('../../common.blocks/check-button/__control/check-button__control.bh.js')(bh)
require('../../common.blocks/check-button/__text/check-button__text.bh.js')(bh)
require('../../common.blocks/check-button/_only-icon/check-button_only-icon_yes.bh.js')(bh)

require('../../common.blocks/control/control.bhz.js')(bh)
require('../../desktop.blocks/control/control.bhz.js')(bh)

require('../../common.blocks/check-button/check-button.bhz.js')(bh)
require('../../desktop.blocks/check-button/check-button.bhz.js')(bh)

var CheckButton = BH.React.createClass({
    displayName: 'checkbutton',
    __block: 'check-button',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    }
})

module.exports = CheckButton

},{"../../common.blocks/check-button/__control/check-button__control.bh.js":2,"../../common.blocks/check-button/__text/check-button__text.bh.js":3,"../../common.blocks/check-button/_only-icon/check-button_only-icon_yes.bh.js":4,"../../common.blocks/check-button/check-button.bh.js":5,"../../common.blocks/check-button/check-button.bhz.js":6,"../../common.blocks/control/control.bhz.js":7,"../../desktop.blocks/bem/bem.js":8,"../../desktop.blocks/check-button/check-button.bhz.js":9,"../../desktop.blocks/control/control.bhz.js":10}],12:[function(require,module,exports){
module.exports={
    block: 'example',
    content: [
        'Найти ',
        {
            block: 'check-button',
            name: 'test',
            value: '1',
            mods: {size: 's'},
            mix: [{block: 'example', elem: 'item'}],
            content: '1'
        },
        {
            block: 'check-button',
            name: 'test',
            mods: {size: 's'},
            mix: [{block: 'example', elem: 'item'}],
            content: '2'
        },
        {
            block: 'check-button',
            name: 'test',
            value: '3',
            mods: {size: 's'},
            mix: [{block: 'example', elem: 'item'}],
            content: '3'
        },
        {
            block: 'check-button',
            name: 'test',
            value: '4plus',
            mods: {size: 's', checked: 'yes'},
            mix: [{block: 'example', elem: 'item'}],
            content: '4+'
        },
        'комнатную квартиру'
    ]
}

},{}],13:[function(require,module,exports){
var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

require('../desktop.bundle/check-button/check-button.js')

var bemJson = require('./check-button.bem.json')

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

},{"../desktop.blocks/bem/bem.js":8,"../desktop.bundle/check-button/check-button.js":11,"./check-button.bem.json":12}],14:[function(require,module,exports){

},{}],15:[function(require,module,exports){
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

},{}]},{},[13])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvYmVtL2JlbS5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9jaGVjay1idXR0b24vX19jb250cm9sL2NoZWNrLWJ1dHRvbl9fY29udHJvbC5iaC5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9jaGVjay1idXR0b24vX190ZXh0L2NoZWNrLWJ1dHRvbl9fdGV4dC5iaC5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9jaGVjay1idXR0b24vX29ubHktaWNvbi9jaGVjay1idXR0b25fb25seS1pY29uX3llcy5iaC5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9jaGVjay1idXR0b24vY2hlY2stYnV0dG9uLmJoLmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9jb21tb24uYmxvY2tzL2NoZWNrLWJ1dHRvbi9jaGVjay1idXR0b24uYmh6LmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9jb21tb24uYmxvY2tzL2NvbnRyb2wvY29udHJvbC5iaHouanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2Rlc2t0b3AuYmxvY2tzL2JlbS9iZW0uanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2Rlc2t0b3AuYmxvY2tzL2NoZWNrLWJ1dHRvbi9jaGVjay1idXR0b24uYmh6LmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9kZXNrdG9wLmJsb2Nrcy9jb250cm9sL2NvbnRyb2wuYmh6LmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9kZXNrdG9wLmJ1bmRsZS9jaGVjay1idXR0b24vY2hlY2stYnV0dG9uLmpzIiwianMvY2hlY2stYnV0dG9uLmJlbS5qc29uIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9qcy9jaGVjay1idXR0b24uanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLEtBQUssR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFDbkgsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sT0FBTyxLQUFLLFdBQVcsS0FBSyxPQUFPLENBQUMsZUFBZSxDQUFDOztBQUUxRixJQUFJLEVBQUUsR0FBRyxDQUFDLFdBQVc7QUFDckIsSUFBSSxXQUFXLEdBQUcsQ0FBQzs7QUFFbkIsSUFBSSxFQUFFLEdBQUcsV0FBVzs7SUFFaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQ3BCLFVBQVUsQ0FBQyxFQUFFLEdBQUcsSUFBSTtJQUNwQixVQUFVLENBQUMsV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO0lBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVTtJQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDekIsV0FBVyxFQUFFLEVBQUU7UUFDZixPQUFPLEVBQUUsRUFBRTtRQUNYLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUNwQixNQUFNLEVBQUUsV0FBVztZQUNmLE9BQU8sSUFBSSxDQUFDLE1BQU0s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Iiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpICYmIHdpbmRvdy5SZWFjdCB8fCAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKSAmJiByZXF1aXJlKCdyZWFjdCcpXG52YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKSAmJiByZXF1aXJlKCdvYmplY3QtYXNzaWduJylcblxudmFyIEJIID0gKGZ1bmN0aW9uKCkge1xudmFyIF9fbGFzdEdlbklkID0gMFxuXG52YXIgQkggPSBmdW5jdGlvbigpIHtcbiAgICAvL1RPRE86IG1ha2UgaXQgYmV0dGVyXG4gICAgdGhpcy5fX21hdGNoZXJzID0ge31cbiAgICBCRU1fSGF6YXJkLmJoID0gdGhpc1xuICAgIEJFTV9IYXphcmQuX19leHBhbmRvSWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgIHRoaXMudXRpbHMgPSBCRU1fSGF6YXJkXG4gICAgdGhpcy5CRU0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiAnJyxcbiAgICAgICAgX19ibG9jazogJycsXG4gICAgICAgIG1peGluczogW0JFTV9IYXphcmRdLFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19ub2RlKClcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbkJILl8gPSAnXydcbkJILl9fID0gJ19fJ1xuQkguUmVhY3QgPSBSZWFjdFxuQkguX2dldERlY2wgPSAgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICB2YXIgZGVjbCA9IHt9LFxuICAgICAgICBkZWNscyxcbiAgICAgICAgaXNFbGVtID0gfnNlbGVjdG9yLmluZGV4T2YoQkguX18pXG4gICAgaXNFbGVtID9cbiAgICAgICAgZGVjbHMgPSBzZWxlY3Rvci5zcGxpdChCSC5fXykgOlxuICAgICAgICBkZWNscyA9IHNlbGVjdG9yLnNwbGl0KEJILl8pXG5cbiAgICBkZWNsLmJsb2NrID0gZGVjbHMuc2hpZnQoKVxuXG4gICAgaWYgKGlzRWxlbSkge1xuICAgICAgICBkZWNscyA9IGRlY2xzWzBdLnNwbGl0KEJILl8pXG4gICAgICAgIGRlY2wuZWxlbSA9IGRlY2xzLnNoaWZ0KClcbiAgICB9XG5cbiAgICBkZWNsLm1vZE5hbWUgPSBkZWNscy5zaGlmdCgpXG4gICAgZGVjbC5tb2RWYWwgPSBkZWNscy5zaGlmdCgpXG4gICAgcmV0dXJuIGRlY2xcbn1cblxuQkgucHJvdG90eXBlID0ge1xuICAgIG5vQm9vbE1vZHM6IGZhbHNlLCAvL0ZvciBMRUdPIHNldCB0cnVlXG4gICAgYXBwbHk6IGZ1bmN0aW9uKGJlbUpzb24pIHtcbiAgICAgICAgaWYgKCFiZW1Kc29uKSByZXR1cm4gJydcbiAgICAgICAgdmFyIGVsID0gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLkJFTSwgYmVtSnNvbilcbiAgICAgICAgcmV0dXJuIFJlYWN0LnJlbmRlclRvU3RhdGljTWFya3VwKGVsKVxuICAgIH0sXG4gICAgbWF0Y2g6IGZ1bmN0aW9uKHNlbGVjdG9yLCBtYXRjaGVyKSB7XG4gICAgICAgIGlmICghc2VsZWN0b3IgfHwgIW1hdGNoZXIpIHJldHVybiB0aGlzXG4gICAgICAgIHZhciBkZWNsID0gQkguX2dldERlY2woc2VsZWN0b3IpXG4gICAgICAgIHRoaXMuX19tYXRjaGVyc1tkZWNsLmJsb2NrXSB8fCAodGhpcy5fX21hdGNoZXJzW2RlY2wuYmxvY2tdID0gW10pXG4gICAgICAgIHRoaXMuX19tYXRjaGVyc1tkZWNsLmJsb2NrXS5wdXNoKFtkZWNsLCBtYXRjaGVyXSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIHhtbEVzY2FwZTogZnVuY3Rpb24oeCkge1xuICAgICAgICAvL0JlY2F1c2UgUmVhY3Qgd2lsbCBkbyBpdCBmb3IgdXNcbiAgICAgICAgLy9UT0RPOiBvciBkbyB3ZSBuZWVkIHRoaXM/XG4gICAgICAgIHJldHVybiB4XG4gICAgfSxcbiAgICBhdHRyRXNjYXBlOiBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiB4XG4gICAgfSxcbiAgICBqc0F0dHJFc2NhcGU6IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuIHhcbiAgICB9LFxuICAgIGVuYWJsZUluZmluaXRlTG9vcERldGVjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vVjggd2lsbCBkbyBpdCBmb3IgdXNcbiAgICB9XG59XG5cbnZhciBCRU1fSGF6YXJkID0ge1xuICAgIGpzOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpc30sXG4gICAgYmVtOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpc30sXG4gICAgZXh0ZW5kOiBhc3NpZ24sXG4gICAgaXNTaW1wbGU6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBpZiAoIW9iaiB8fCBvYmogPT09IHRydWUpIHJldHVybiB0cnVlXG4gICAgICAgIHZhciB0ID0gdHlwZW9mIG9ialxuICAgICAgICByZXR1cm4gdCA9PT0gJ3N0cmluZycgfHwgdCA9PT0gJ251bWJlcidcbiAgICB9LFxuICAgIGdlbmVyYXRlSWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJ3VuaXEnICsgdGhpcy5fX2V4cGFuZG9JZCArICgrK19fbGFzdEdlbklkKTtcbiAgICB9LFxuICAgIHBhcmFtOiBmdW5jdGlvbihwYXJhbSwgdmFsLCBmb3JjZSkge1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAoIXRoaXMuX19qc29uW3BhcmFtXSB8fCBmb3JjZSkgJiYgKHRoaXMuX19qc29uW3BhcmFtXSA9IHZhbClcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb25bcGFyYW1dXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRQYXJhbTogZnVuY3Rpb24oa2V5LCB2YWwsIGZvcmNlKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc01peCkge3JldHVybiB0aGlzfVxuICAgICAgICAgICAgdGhpcy5fX2pzb24uJHRQYXJhbSB8fCAodGhpcy5fX2pzb24uJHRQYXJhbSA9IHt9KVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9fanNvbi4kdFBhcmFtW2tleV0gfHwgZm9yY2UpIHt0aGlzLl9fanNvbi4kdFBhcmFtW2tleV0gPSB2YWx9XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLiR0UGFyYW0gJiYgdGhpcy5fX2pzb24uJHRQYXJhbVtrZXldXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNsczogZnVuY3Rpb24oY2xzLCBmb3JjZSkge1xuICAgICAgICBpZiAoY2xzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAoIXRoaXMuX19qc29uLmNscyB8fCBmb3JjZSkgJiYgKHRoaXMuX19qc29uLmNscyA9IGNscylcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uY2xzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG5lZWRDYXBpdGFsaXplOiB0cnVlLFxuICAgIGF0dHJDYXBpdGFsaXplZDoge1xuICAgICAgICBhY2NlcHRjaGFyc2V0OiAnYWNjZXB0Q2hhcnNldCcsXG4gICAgICAgIGFjY2Vzc2tleTogJ2FjY2Vzc0tleScsXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbjogJ2FsbG93RnVsbFNjcmVlbicsXG4gICAgICAgIGFsbG93dHJhbnNwYXJlbmN5OiAnYWxsb3dUcmFuc3BhcmVuY3knLFxuICAgICAgICBhdXRvY29tcGxldGU6ICdhdXRvQ29tcGxldGUnLFxuICAgICAgICBhdXRvZm9jdXM6ICdhdXRvRm9jdXMnLFxuICAgICAgICBhdXRvcGxheTogJ2F1dG9QbGF5JyxcbiAgICAgICAgY2VsbHBhZGRpbmc6ICdjZWxsUGFkZGluZycsXG4gICAgICAgIGNlbGxzcGFjaW5nOiAnY2VsbFNwYWNpbmcnLFxuICAgICAgICBjaGFyc2V0OiAnY2hhclNldCcsXG4gICAgICAgIGNsYXNzaWQ6ICdjbGFzc0lEJyxcbiAgICAgICAgJ2NsYXNzJzogJ2NsYXNzTmFtZScsXG4gICAgICAgIGNsYXNzbmFtZTogJ2NsYXNzTmFtZScsXG4gICAgICAgIGNvbHNwYW46ICdjb2xTcGFuJyxcbiAgICAgICAgY29udGVudGVkaXRhYmxlOiAnY29udGVudEVkaXRhYmxlJyxcbiAgICAgICAgY29udGV4dG1lbnU6ICdjb250ZXh0TWVudScsXG4gICAgICAgIGNyb3Nzb3JpZ2luOiAnY3Jvc3NPcmlnaW4nLFxuICAgICAgICBkYXRldGltZTogJ2RhdGVUaW1lJyxcbiAgICAgICAgZW5jdHlwZTogJ2VuY1R5cGUnLFxuICAgICAgICBmb3JtYWN0aW9uOiAnZm9ybUFjdGlvbicsXG4gICAgICAgIGZvcm1lbmN0eXBlOiAnZm9ybUVuY1R5cGUnLFxuICAgICAgICBmb3JtbWV0aG9kOiAnZm9ybU1ldGhvZCcsXG4gICAgICAgIGZvcm1ub3ZhbGlkYXRlOiAnZm9ybU5vVmFsaWRhdGUnLFxuICAgICAgICBmb3JtdGFyZ2V0OiAnZm9ybVRhcmdldCcsXG4gICAgICAgIGZyYW1lYm9yZGVyOiAnZnJhbWVCb3JkZXInLFxuICAgICAgICBodG1sZm9yOiAnaHRtbEZvcicsXG4gICAgICAgICdmb3InOiAnaHRtbEZvcicsXG4gICAgICAgIGh0dHBlcXVpdjogJ2h0dHBFcXVpdicsXG4gICAgICAgIG1hcmdpbmhlaWdodDogJ21hcmdpbkhlaWdodCcsXG4gICAgICAgIG1hcmdpbndpZHRoOiAnbWFyZ2luV2lkdGgnLFxuICAgICAgICBtYXhsZW5ndGg6ICdtYXhMZW5ndGgnLFxuICAgICAgICBtZWRpYWdyb3VwOiAnbWVkaWFHcm91cCcsXG4gICAgICAgIG5vdmFsaWRhdGU6ICdub1ZhbGlkYXRlJyxcbiAgICAgICAgcmFkaW9ncm91cDogJ3JhZGlvR3JvdXAnLFxuICAgICAgICByZWFkb25seTogJ3JlYWRPbmx5JyxcbiAgICAgICAgcm93c3BhbjogJ3Jvd1NwYW4nLFxuICAgICAgICBzcGVsbGNoZWNrOiAnc3BlbGxDaGVjaycsXG4gICAgICAgIHNyY2RvYzogJ3NyY0RvYycsXG4gICAgICAgIHNyY3NldDogJ3NyY1NldCcsXG4gICAgICAgIHRhYmluZGV4OiAndGFiSW5kZXgnLFxuICAgICAgICB1c2VtYXA6ICd1c2VNYXAnXG4gICAgfSxcbiAgICBhdHRyczogZnVuY3Rpb24odmFsdWVzLCBmb3JjZSkge1xuICAgICAgICB2YXIgYXR0cnMgPSB0aGlzLl9fanNvbi5hdHRycyB8fCB7fVxuICAgICAgICBpZiAodmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uLmF0dHJzID0gZm9yY2UgPyB0aGlzLmV4dGVuZChhdHRycywgdmFsdWVzKSA6IHRoaXMuZXh0ZW5kKHZhbHVlcywgYXR0cnMpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGF0dHJzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGF0dHI6IGZ1bmN0aW9uKGtleSwgdmFsLCBmb3JjZSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uLmF0dHJzID9cbiAgICAgICAgICAgICAgICAoIXRoaXMuX19qc29uLmF0dHJzLmhhc093blByb3BlcnR5KGtleSkgfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbi5hdHRyc1trZXldID0gdmFsKSA6XG4gICAgICAgICAgICAgICAgKHRoaXMuX19qc29uLmF0dHJzID0ge30pW2tleV0gPSB2YWxcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uYXR0cnMgJiYgdGhpcy5fX2pzb24uYXR0cnNba2V5XVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvL1RPRE86IFJlZmFjdG9yIG1vZCwgbW9kcywgbXVNb2QsIG11TW9kc1xuICAgIC8vVGhpbmsgYWJvdXQgZGVjbE11bW9kcyA/IHNldE11TW9kIGRlbE11TW9kIGdldE11TW9kXG4gICAgbW9kOiBmdW5jdGlvbihtb2QsIHZhbCwgZm9yY2UpIHtcbiAgICAgICAgdmFyIG1vZHMgPSB0aGlzLm1vZHMoKVxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgICghbW9kcy5oYXNPd25Qcm9wZXJ0eShtb2QpIHx8IGZvcmNlKSAmJiAobW9kc1ttb2RdID0gdmFsKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm11TW9kcygpLmhhc093blByb3BlcnR5KG1vZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tdU1vZChtb2QpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vZHMuaGFzT3duUHJvcGVydHkobW9kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb2RzW21vZF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbW9kczogZnVuY3Rpb24odmFsdWVzLCBmb3JjZSkge1xuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLl9fanNvbi5lbGVtID8gJ2VsZW1Nb2RzJyA6ICdtb2RzJ1xuICAgICAgICB2YXIgbW9kcyA9IHRoaXMuX19qc29uW2ZpZWxkXVxuICAgICAgICBpZiAodmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uW2ZpZWxkXSA9IGZvcmNlID8gdGhpcy5leHRlbmQobW9kcywgdmFsdWVzKSA6IHRoaXMuZXh0ZW5kKHZhbHVlcywgbW9kcylcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kc1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtdVN0YXRlczogZnVuY3Rpb24oc3RhdGVzKSB7XG4gICAgICAgIGlmIChzdGF0ZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19tdVN0YXRlcyA9IHRoaXMuZXh0ZW5kKHt9LCB0aGlzLl9fbXVTdGF0ZXMsIHN0YXRlcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX211U3RhdGVzIHx8IHt9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG11TW9kczogZnVuY3Rpb24obW9kcykge1xuICAgICAgICBpZiAobW9kcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19mbGFnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX211TW9kcyA9IHRoaXMuZXh0ZW5kKHt9LCB0aGlzLl9fbXVNb2RzLCBtb2RzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fbXVNb2RzIHx8IHt9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG11U3RhdGU6IGZ1bmN0aW9uKHN0YXRlLCB2YWwpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX19mbGFnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVbc3RhdGVdICE9PSB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1N0YXRlID0ge31cbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGVbc3RhdGVdID0gdmFsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKHRoaXMuX19tdVN0YXRlcyB8fCAodGhpcy5fX211U3RhdGVzID0ge30pKVtzdGF0ZV0gPSB2YWxcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tdVN0YXRlcygpW3N0YXRlXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtdU1vZDogZnVuY3Rpb24obW9kLCB2YWwpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX19mbGFnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVbbW9kXSAhPT0gdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdTdGF0ZSA9IHt9XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlW21vZF0gPSB2YWxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAodGhpcy5fX211TW9kcyB8fCAodGhpcy5fX211TW9kcyA9IHt9KSlbbW9kXSA9IHZhbFxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm11TW9kcygpW21vZF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgdG9nZ2xlTXVNb2QgOiBmdW5jdGlvbihtb2ROYW1lKSB7XG4gICAgICAgIC8vVE9ETzogUmVmYWN0b3IgbWVcbiAgICAgICAgdGhpcy5tdU1vZChtb2ROYW1lLCAhdGhpcy5tdU1vZChtb2ROYW1lKSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIHRhZzogZnVuY3Rpb24odGFnLCBmb3JjZSkge1xuICAgICAgICBpZiAodGFnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAoIXRoaXMuX19qc29uLnRhZyB8fCBmb3JjZSkgJiYgKHRoaXMuX19qc29uLnRhZyA9IHRhZylcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24udGFnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIG1hdGNoOiBmdW5jdGlvbihzZWxlY3RvciwgbWF0Y2hlcikge1xuICAgICAgICBpZiAoIXRoaXMuX19mbGFnKSByZXR1cm4gdGhpc1xuICAgICAgICBpZiAoIXNlbGVjdG9yIHx8ICFtYXRjaGVyKSByZXR1cm4gdGhpc1xuICAgICAgICB2YXIgZGVjbCA9IEJILl9nZXREZWNsKHNlbGVjdG9yKVxuICAgICAgICB0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnMgfHwgKHRoaXMuX19qc29uLiRzdWJNYXRjaGVycyA9IHt9KVxuICAgICAgICB0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnNbZGVjbC5ibG9ja10gfHwgKHRoaXMuX19qc29uLiRzdWJNYXRjaGVyc1tkZWNsLmJsb2NrXSA9IFtdKVxuICAgICAgICB0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnNbZGVjbC5ibG9ja10ucHVzaChbZGVjbCwgbWF0Y2hlcl0pXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIG1peEpzOiBmdW5jdGlvbihtaXgpIHtcbiAgICAgICAgaWYgKG1peC5ibG9jayAmJiBtaXguYmxvY2sgIT09IHRoaXMuX19qc29uLmJsb2NrKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hlcnMgPSB0aGlzLmJoLl9fbWF0Y2hlcnNbbWl4LmJsb2NrXVxuICAgICAgICAgICAgaWYgKG1hdGNoZXJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGpzb24gPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5fX2pzb24pXG4gICAgICAgICAgICAgICAgdGhpcy5leHRlbmQodGhpcy5fX2pzb24sIG1peClcbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5lbGVtID0gbWl4LmVsZW1cbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX3N0b3AgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fbWF0Y2hlZCA9IFtdXG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24uX19tYXRjaGVycyA9IG1hdGNoZXJzXG5cbiAgICAgICAgICAgICAgICB0aGlzLl9faXNNaXggPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5fX3Byb2Nlc3NNYXRjaCgpXG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24gPSBqc29uXG4gICAgICAgICAgICAgICAgdGhpcy5fX2lzTWl4ID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgbWl4OiBmdW5jdGlvbihtaXgsIGZvcmNlKSB7XG4gICAgICAgIGlmIChtaXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uLm1peCA9ICghdGhpcy5fX2pzb24ubWl4IHx8IGZvcmNlKSA/XG4gICAgICAgICAgICAgICAgbWl4IDpcbiAgICAgICAgICAgICAgICAoQXJyYXkuaXNBcnJheSh0aGlzLl9fanNvbi5taXgpID8gdGhpcy5fX2pzb24ubWl4IDogW3RoaXMuX19qc29uLm1peF0pLmNvbmNhdChtaXgpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLm1peFxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb250ZW50OiBmdW5jdGlvbihjb250ZW50LCBmb3JjZSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgICAgICAoIXRoaXMuX19qc29uLmNvbnRlbnQgfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbi5jb250ZW50ID0gY29udGVudClcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uY29udGVudFxuICAgICAgICB9XG4gICAgfSxcbiAgICBwb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fanNvbi4kcG9zaXRpb25cbiAgICB9LFxuICAgIGlzRmlyc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbigpID09PSAxXG4gICAgfSxcbiAgICBpc0xhc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uJGlzTGFzdFxuICAgIH0sXG4gICAganNvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fanNvblxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgdGhpcy5fX2pzb24uX19zdG9wID0gdHJ1ZVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgYXBwbHlCYXNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fX3Byb2Nlc3NNYXRjaCgpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICBfX3Byb2Nlc3NNYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXRWYWwsXG4gICAgICAgICAgICBjdHggPSB0aGlzLFxuICAgICAgICAgICAganNvbiA9IHRoaXMuX19qc29uLFxuICAgICAgICAgICAgYl8gPSBqc29uLmJsb2NrLFxuICAgICAgICAgICAgX19lID0ganNvbi5lbGVtLFxuICAgICAgICAgICAgbW9kcyA9IHRoaXMubW9kcygpLFxuICAgICAgICAgICAgbWF0Y2hlcnMgPSBqc29uLl9fbWF0Y2hlcnMsXG4gICAgICAgICAgICBpID0gbWF0Y2hlcnMubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgIG1hdGNoZWQgPSBqc29uLl9fbWF0Y2hlZCxcbiAgICAgICAgICAgIG1hdGNoTW9kcyA9IGZ1bmN0aW9uKGRlY2wpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVjbC5tb2ROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RzICYmIG1vZHNbZGVjbC5tb2ROYW1lXSAmJiAobW9kc1tkZWNsLm1vZE5hbWVdID09PSBkZWNsLm1vZFZhbCB8fCBtb2RzW2RlY2wubW9kTmFtZV0gPT09IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goaSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldFZhbCA9IGNiKGN0eCwganNvbilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZWQucHVzaChpKVxuICAgICAgICAgICAgICAgICAgICByZXRWYWwgPSBjYihjdHgsIGpzb24pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBmb3IgKDsgaSA+PSAwICYmICFyZXRWYWwgJiYgIWpzb24uX19zdG9wOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciBydWxlID0gbWF0Y2hlcnNbaV0sXG4gICAgICAgICAgICAgICAgZGVjbCA9IHJ1bGVbMF0sXG4gICAgICAgICAgICAgICAgY2IgPSBydWxlWzFdXG5cbiAgICAgICAgICAgIGlmICh+bWF0Y2hlZC5pbmRleE9mKGkpKSB7IGNvbnRpbnVlIH1cbiAgICAgICAgICAgIGlmIChkZWNsLmVsZW0gfHwgX19lKSB7XG4gICAgICAgICAgICAgICAgKGRlY2wuZWxlbSA9PT0gX19lKSAmJiBtYXRjaE1vZHMoZGVjbClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hNb2RzKGRlY2wpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldFZhbCkgIHtcbiAgICAgICAgICAgIHJldFZhbCA9IFtdLmNvbmNhdChyZXRWYWwpLm1hcChmdW5jdGlvbihyZXRWYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAocmV0VmFsLmJsb2NrICYmIHJldFZhbC5ibG9jayAhPT0ganNvbi5ibG9jaykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlcnMgPSB0aGlzLmJoLl9fbWF0Y2hlcnNbcmV0VmFsLmJsb2NrXSB8fCBbXVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uID0gcmV0VmFsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fc3RvcCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fbWF0Y2hlZCA9IFtdXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fbWF0Y2hlcnMgPSBtYXRjaGVyc1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFZhbC5fX3N0b3AgPSBqc29uLl9fc3RvcFxuICAgICAgICAgICAgICAgICAgICByZXRWYWwuX19tYXRjaGVkID0ganNvbi5fX21hdGNoZWRcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsLl9fbWF0Y2hlcnMgPSBqc29uLl9fbWF0Y2hlcnNcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsLmVsZW0gJiYgKHJldFZhbC5ibG9jayA9IGpzb24uYmxvY2spXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uID0gcmV0VmFsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX19wcm9jZXNzTWF0Y2goKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fanNvblxuICAgICAgICAgICAgfSwgdGhpcylcbiAgICAgICAgICAgIHJldFZhbC5sZW5ndGggPT0gMSAmJiAocmV0VmFsID0gcmV0VmFsWzBdKVxuICAgICAgICAgICAgdGhpcy5fX2pzb24gPSByZXRWYWxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX19tYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBiXyA9ICB0aGlzLl9fanNvbi5ibG9jayxcbiAgICAgICAgICAgIHN1Yk1hdGNoZXJzID0gKHRoaXMuX19qc29uLiRzdWJNYXRjaGVycyAmJiB0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnNbYl9dKSB8fCBbXSxcbiAgICAgICAgICAgIG1hdGNoZXJzID0gKHRoaXMuYmguX19tYXRjaGVyc1tiX10gfHwgW10pLmNvbmNhdChzdWJNYXRjaGVycylcblxuICAgICAgICB0aGlzLl9fanNvbi5fX3N0b3AgPSBmYWxzZVxuICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZWQgPSBbXVxuICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZXJzID0gbWF0Y2hlcnNcbiAgICAgICAgdGhpcy5fX3Byb2Nlc3NNYXRjaCgpXG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvc2VDdXJOb2RlKHRoaXMucHJvcHMpXG4gICAgICAgIHRoaXMuX19mbGFnID0gdHJ1ZVxuICAgICAgICB0aGlzLnN0YXRpY3MgfHwgKHRoaXMuc3RhdGljcyA9IHt9KVxuICAgICAgICB0aGlzLl9fc2VsZiA9IHRoaXMuc3RhdGljcztcbiAgICAgICAgdGhpcy5fX21hdGNoKClcbiAgICAgICAgdGhpcy53aWxsTW91bnQoKS5mb3JFYWNoKGZ1bmN0aW9uKHdpbGxNb3VudCkge1xuICAgICAgICAgICAgd2lsbE1vdW50LmJpbmQodGhpcykodGhpcywgdGhpcy5fX2pzb24pXG4gICAgICAgIH0sIHRoaXMpXG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5zdGF0ZSwgdGhpcy5tdVN0YXRlcygpLCB0aGlzLm11TW9kcygpKVxuICAgICAgICB0aGlzLmRpZE1vdW50KCkuZm9yRWFjaChmdW5jdGlvbihkaWRNb3VudCkge1xuICAgICAgICAgICAgZGlkTW91bnQuYmluZCh0aGlzKSh0aGlzLCB0aGlzLl9fanNvbilcbiAgICAgICAgfSwgdGhpcylcbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKHByb3BzKSB7XG4gICAgICAgIHRoaXMud2lsbFJlY2VpdmVQcm9wcygpLmZvckVhY2goZnVuY3Rpb24oYlVwZGF0ZSkge1xuICAgICAgICAgICAgYlVwZGF0ZS5iaW5kKHRoaXMpKHRoaXMsIHByb3BzKVxuICAgICAgICB9LCB0aGlzKVxuICAgICAgICB0aGlzLl9fcHJvcHMgPSBwcm9wc1xuICAgICAgICB0aGlzLl9jb21wb3NlQ3VyTm9kZShwcm9wcylcbiAgICAgICAgdGhpcy5iZWZvcmVVcGRhdGUoKS5mb3JFYWNoKGZ1bmN0aW9uKGJVcGRhdGUpIHtcbiAgICAgICAgICAgIGJVcGRhdGUuYmluZCh0aGlzKSh0aGlzLCB0aGlzLl9fanNvbilcbiAgICAgICAgfSwgdGhpcylcbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fX3Byb3BzKSB7XG4gICAgICAgICAgICB0aGlzLl9fcHJvcHMgPSB1bmRlZmluZWRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvc2VDdXJOb2RlKHRoaXMucHJvcHMpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9fbm9kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgdGhpcy5fX2ZsYWcgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fX21hdGNoKClcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZW5kZXJOb2RlcyA9IGZ1bmN0aW9uKGpzb24sIHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGpzb24ucmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwganNvbikge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGpzb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck5vZGVzKGpzb24sIHJlc3VsdClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbiA9IGpzb25cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNscyA9IHRoaXMuX2J1aWxkQ2xhc3NOYW1lKCkgKyAodGhpcy5jbHMoKSA/ICcgJyArIHRoaXMuY2xzKCkgOiAnJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5fcHJvY2Vzc1RyZWUodGhpcy5jb250ZW50KCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnMgPSB0aGlzLmF0dHJzKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHMgPSB0aGlzLl9ldmVudHMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzID0ge2NoaWxkcmVuOiBjb250ZW50fVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZENhcGl0YWxpemUgJiYgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2tleVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXR0ckNhcGl0YWxpemVkW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfa2V5ID0gdGhpcy5hdHRyQ2FwaXRhbGl6ZWRba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzW19rZXldID0gYXR0cnNba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRyc1trZXldXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpXG5cbiAgICAgICAgICAgICAgICAgICAgY2xzICYmIChwcm9wcy5jbGFzc05hbWUgPSBjbHMpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy50YWcoKSB8fCAnZGl2JywgdGhpcy5leHRlbmQocHJvcHMsIGF0dHJzLCBldmVudHMpKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCByZXN1bHQgfHwgW10pXG4gICAgICAgIH0uYmluZCh0aGlzKVxuXG4gICAgICAgIHZhciBub2RlLFxuICAgICAgICAgICAgbm9kZXMgPSByZW5kZXJOb2RlcyhbXS5jb25jYXQodGhpcy5fX2pzb24pKVxuXG4gICAgICAgIGlmIChub2Rlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbm9kZSA9IG5vZGVzWzBdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlID0gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHtjaGlsZHJlbjogbm9kZXN9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgfSxcblxuICAgIF9jb21wb3NlQ3VyTm9kZTogZnVuY3Rpb24ocHApIHtcbiAgICAgICAgLy9UT0RPOiBUaGluayBhYm91dCBjYWNoaW5nL2RpZmZpbmcgYmVtSnNvblRyZWUvY29udGVudFxuICAgICAgICB0aGlzLl9fanNvbiA9IHRoaXMuZXh0ZW5kKHt9LCBwcCwge2NvbnRlbnQ6IHBwLmNoaWxkcmVuIHx8IHBwLmNvbnRlbnR9KVxuICAgICAgICB2YXIgbW9kcyA9IE9iamVjdC5rZXlzKHRoaXMuX19qc29uKS5yZWR1Y2UoZnVuY3Rpb24obW9kcywga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5WzBdID09PSBCSC5fICYmIChtb2RzW2tleS5zbGljZSgxKV0gPSBwcFtrZXldKSwgbW9kc1xuICAgICAgICB9LCB7fSlcbiAgICAgICAgdGhpcy5fX2Jsb2NrICYmICh0aGlzLl9fanNvbi5ibG9jayA9IHRoaXMuX19ibG9jaylcbiAgICAgICAgdGhpcy5fX2VsZW0gJiYgKHRoaXMuX19qc29uLmVsZW0gPSB0aGlzLl9fZWxlbSlcbiAgICAgICAgaWYgKHRoaXMuX19qc29uLmVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX19qc29uLmVsZW1Nb2RzIHx8ICh0aGlzLl9fanNvbi5lbGVtTW9kcyA9ICh0aGlzLl9fanNvbi5tb2RzIHx8IHt9KSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX19qc29uLm1vZHMgfHwgKHRoaXMuX19qc29uLm1vZHMgPSB7fSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoT2JqZWN0LmtleXMobW9kcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19qc29uLmVsZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5lbGVtTW9kcyA9IHRoaXMuZXh0ZW5kKHRoaXMuX19qc29uLmVsZW1Nb2RzLCBtb2RzKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5tb2RzID0gdGhpcy5leHRlbmQodGhpcy5fX2pzb24ubW9kcywgbW9kcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2J1aWxkQ2xhc3NOYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJfID0gdGhpcy5fX2pzb24uYmxvY2ssXG4gICAgICAgICAgICBfX2UgPSB0aGlzLl9fanNvbi5lbGVtLFxuICAgICAgICAgICAgY2xzID0ge30sXG4gICAgICAgICAgICBtb2RzID0gdGhpcy5leHRlbmQoe30sIHRoaXMubW9kcygpLCB0aGlzLm11TW9kcygpKVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEVuaXR5KGJfLCBfX2UsIG1vZHMsIG1peCkge1xuICAgICAgICAgICAgdmFyIGVudGl0eSA9IGJfXG5cbiAgICAgICAgICAgIGlmIChfX2UpIHtcbiAgICAgICAgICAgICAgICBlbnRpdHkgKz0gQkguX18gKyBfX2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsc1tlbnRpdHldID0gZW50aXR5XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhtb2RzKS5mb3JFYWNoKGZ1bmN0aW9uKG1vZE5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kVmFsdWUgPSBtb2RzW21vZE5hbWVdXG4gICAgICAgICAgICAgICAgaWYgKCFtb2RWYWx1ZSAmJiBtb2RWYWx1ZSAhPT0gMCkgcmV0dXJuXG4gICAgICAgICAgICAgICAgdmFyIG1vZEVudGl0eSA9IGVudGl0eSArIEJILl8gKyBtb2ROYW1lXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtb2RWYWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIEJILm5vQm9vbE1vZHMgJiYgbW9kVmFsdWUgJiYgKG1vZEVudGl0eSArPSBCSC5fICsgJ3llcycpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kRW50aXR5ICs9IEJILl8gKyBtb2RWYWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbHNbbW9kRW50aXR5XSA9IG1vZEVudGl0eVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGJfICYmIGFkZEVuaXR5KGJfLCBfX2UsIG1vZHMsIGZhbHNlKVxuICAgICAgICB0aGlzLl9fanNvbi5taXggJiYgW10uY29uY2F0KHRoaXMuX19qc29uLm1peCkuZm9yRWFjaChmdW5jdGlvbihtaXgpIHtcbiAgICAgICAgICAgIGlmICghbWl4KSB7IHJldHVybiB9XG4gICAgICAgICAgICBpZiAoIW1peC5ibG9jaykge1xuICAgICAgICAgICAgICAgIGlmICghYl8pIHsgcmV0dXJuIH1cbiAgICAgICAgICAgICAgICBtaXguYmxvY2sgPSBiX1xuICAgICAgICAgICAgICAgIG1peC5lbGVtIHx8IChtaXguZWxlbSA9IF9fZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZEVuaXR5KG1peC5ibG9jaywgbWl4LmVsZW0sIG1peC5tb2RzIHx8IG1peC5lbGVtTW9kcyB8fCB7fSwgdHJ1ZSlcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY2xzKS5qb2luKCcgJylcbiAgICB9LFxuICAgIF9wcm9jZXNzVHJlZTogZnVuY3Rpb24odHJlZSwgcG9zaXRpb24pIHtcbiAgICAgICAgdHJlZSA9IFtdLmNvbmNhdCh0cmVlKVxuICAgICAgICBwb3NpdGlvbiB8fCAocG9zaXRpb24gPSB7dmFsOiAwLCBsYXN0OiAwfSlcbiAgICAgICAgcG9zaXRpb24ubGFzdCArPSAodHJlZS5sZW5ndGggLSAxKVxuICAgICAgICB2YXIgY29udGVudCA9IHRyZWUubWFwKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NUcmVlKG5vZGUsIHBvc2l0aW9uKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFub2RlIHx8ICghbm9kZS5ibG9jayAmJiAhbm9kZS5lbGVtICYmICFub2RlLnRhZyAmJiAhbm9kZS5jb250ZW50ICYmICFub2RlLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IG5vZGUudHlwZS5kaXNwbGF5TmFtZVxuICAgICAgICAgICAgICAgIGlmICghbmFtZSkgeyByZXR1cm4gbm9kZSB9XG4gICAgICAgICAgICAgICAgdmFyIGRlY2wgPSBCSC5fZ2V0RGVjbChuYW1lKVxuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLnByb3BzIHx8IHt9XG4gICAgICAgICAgICAgICAgbm9kZS5ibG9jayA9IGRlY2wuYmxvY2sudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIG5vZGUuZWxlbSA9IGRlY2wuZWxlbVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUuZWxlbSkge1xuICAgICAgICAgICAgICAgIG5vZGUuYmxvY2sgfHwgKG5vZGUuYmxvY2sgPSB0aGlzLl9fanNvbi5ibG9jaylcbiAgICAgICAgICAgICAgICBub2RlLnJlZiA9IG5vZGUuYmxvY2sgKyBCSC5fXyArIG5vZGUuZWxlbSArICd+JyArIHRoaXMuZ2VuZXJhdGVJZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9fanNvbi4kdFBhcmFtICYmIChub2RlLiR0UGFyYW0gPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5fX2pzb24uJHRQYXJhbSkpXG4gICAgICAgICAgICBpZiAodGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1Yk1hdGNoZXJzID0gdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzW25vZGUuYmxvY2tdXG4gICAgICAgICAgICAgICAgc3ViTWF0Y2hlcnMgJiYgKChub2RlLiRzdWJNYXRjaGVycyA9IHt9KVtub2RlLmJsb2NrXSA9IHN1Yk1hdGNoZXJzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zaXRpb24ubGFzdCA9PT0gcG9zaXRpb24udmFsID8gKG5vZGUuJGlzTGFzdCA9IHRydWUpIDogKG5vZGUuJGlzTGFzdCA9IGZhbHNlKVxuICAgICAgICAgICAgbm9kZS4kcG9zaXRpb24gPSArK3Bvc2l0aW9uLnZhbFxuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLmJoLkJFTSwgbm9kZSlcbiAgICAgICAgfSwgdGhpcylcbiAgICAgICAgY29udGVudC5sZW5ndGggPT0gMSAmJiAoY29udGVudCA9IGNvbnRlbnRbMF0pXG4gICAgICAgIHJldHVybiBjb250ZW50XG4gICAgfSxcbiAgICBlbGVtOiBmdW5jdGlvbihlbGVtTmFtZSkge1xuICAgICAgICBpZiAodGhpcy5fX2ZsYWcpIHsgcmV0dXJuIH1cbiAgICAgICAgdmFyIGVsZW1zID0gW10uY29uY2F0KHRoaXMuZWxlbUN0eChlbGVtTmFtZSkpLm1hcChmdW5jdGlvbihlbGVtQ3R4KSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbUN0eC5kb21FbGVtKClcbiAgICAgICAgfSlcbiAgICAgICAgZWxlbXMubGVuZ3RoID09IDEgJiYgKGVsZW1zID0gZWxlbXNbMF0pXG4gICAgICAgIHJldHVybiBlbGVtc1xuICAgIH0sXG4gICAgZWxlbUN0eDogZnVuY3Rpb24oZWxlbU5hbWUpIHtcbiAgICAgICAgdmFyIGVsZW1zID0gW10sXG4gICAgICAgICAgICBlbnRpdHkgPSB0aGlzLl9fanNvbi5ibG9jayArIEJILl9fICsgZWxlbU5hbWUsXG4gICAgICAgICAgICBfZWxlbUN0eCA9IGZ1bmN0aW9uKHJlZnMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhyZWZzKS5mb3JFYWNoKGZ1bmN0aW9uKHJlZktleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gcmVmc1tyZWZLZXldXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVmKSB7IHJldHVybiB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWZLZXkuc3BsaXQoJ34nKVswXSA9PT0gZW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtcy5wdXNoKHJlZilcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lbGVtQ3R4KHJlZi5yZWZzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICBfZWxlbUN0eCh0aGlzLnJlZnMpXG4gICAgICAgIGVsZW1zLmxlbmd0aCA9PSAxICYmIChlbGVtcyA9IGVsZW1zWzBdKVxuICAgICAgICByZXR1cm4gZWxlbXNcbiAgICB9LFxuICAgIF9ldmVudHM6IGZ1bmN0aW9uKGV2ZW50cykge1xuICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHNQcm9wcyB8fCAodGhpcy5fZXZlbnRzUHJvcHMgPSB7fSlcbiAgICAgICAgICAgIHRoaXMuZXh0ZW5kKHRoaXMuX2V2ZW50c1Byb3BzLCBldmVudHMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzUHJvcHNcbiAgICAgICAgfVxuICAgIH0sXG4gICAgd2lsbE1vdW50OiBmdW5jdGlvbihjYikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnICYmICh0aGlzLl9fd2lsbE1vdW50IHx8ICh0aGlzLl9fd2lsbE1vdW50ID0gW10pKS5wdXNoKGNiKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fd2lsbE1vdW50IHx8IFtdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGRpZE1vdW50OiBmdW5jdGlvbihjYikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnICYmICh0aGlzLl9fZGlkTW91bnQgfHwgKHRoaXMuX19kaWRNb3VudCA9IFtdKSkucHVzaChjYilcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2RpZE1vdW50IHx8IFtdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgdGhpcy5fX2ZsYWcgJiYgKHRoaXMuX193aWxsUmVjZWl2ZSB8fCAodGhpcy5fX3dpbGxSZWNlaXZlID0gW10pKS5wdXNoKGNiKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fd2lsbFJlY2VpdmUgfHwgW11cbiAgICAgICAgfVxuICAgIH0sXG4vL1RPRE86IERlbGV0ZSB0aGlzIGZuXG4gICAgYmVmb3JlVXBkYXRlOiBmdW5jdGlvbihjYikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnICYmICh0aGlzLl9fYlVwZGF0ZSB8fCAodGhpcy5fX2JVcGRhdGUgPSBbXSkpLnB1c2goY2IpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19iVXBkYXRlIHx8IFtdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJpbmQ6IGZ1bmN0aW9uKGV2ZW50cykge1xuICAgICAgICBpZiAodGhpcy5fX2ZsYWcpIHtcbiAgICAgICAgICAgIHZhciBhdHRycyA9IHt9XG4gICAgICAgICAgICB0aGlzLl9fZXZlbnRzIHx8ICh0aGlzLl9fZXZlbnRzID0ge30pXG4gICAgICAgICAgICBPYmplY3RcbiAgICAgICAgICAgICAgICAua2V5cyhldmVudHMpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24oZXZlbnROYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNiID0gZXZlbnRzW2V2ZW50TmFtZV1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2V2ZW50c1tldmVudE5hbWVdIHx8ICh0aGlzLl9fZXZlbnRzW2V2ZW50TmFtZV0gPSBbXSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2V2ZW50c1tldmVudE5hbWVdLnB1c2goY2IpXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzW2V2ZW50TmFtZV0gPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmJpbmQodGhpcykoZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH0sIHRoaXMpXG5cbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyhhdHRycylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgZG9tRWxlbTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5maW5kRE9NTm9kZSh0aGlzKVxuICAgIH1cbn1cblxuQkguQkVNX0hhemFyZCA9IEJFTV9IYXphcmRcblxucmV0dXJuIEJIXG59KSgpXG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gQkhcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmgpIHtcbiAgICBiaC5tYXRjaCgnY2hlY2stYnV0dG9uX19jb250cm9sJywgZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLnRhZygnaW5wdXQnKVxuICAgICAgICAgICAgLmF0dHJzKGN0eC50UGFyYW0oJ2NvbnRyb2xBdHRycycpKVxuICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJoKSB7XG4gICAgYmgubWF0Y2goJ2NoZWNrLWJ1dHRvbl9fdGV4dCcsIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICBjdHguYXR0cignaWQnLCBjdHgudFBhcmFtKCdjb250cm9sQXR0cnMnKVsnYXJpYS1sYWJlbGxlZGJ5J10pO1xuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmgpIHtcbiAgICBiaC5tYXRjaCgnY2hlY2stYnV0dG9uX29ubHktaWNvbl95ZXMnLCBmdW5jdGlvbihjdHgpIHtcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBjdHguY29udGVudCgpO1xuICAgICAgICBjdHguYXBwbHlCYXNlKCk7XG4gICAgICAgIGN0eC5jb250ZW50KFtcbiAgICAgICAgICAgIHtlbGVtOiAnY29udHJvbCd9LFxuICAgICAgICAgICAgJyYjMTYwOycsXG4gICAgICAgICAgICBjb250ZW50XG4gICAgICAgIF0sIHRydWUpO1xuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmgpIHtcbiAgICBiaC5tYXRjaCgnY2hlY2stYnV0dG9uJywgZnVuY3Rpb24oY3R4LCBqc29uKSB7XG4gICAgICAgIHZhciBpZCA9IChqc29uLmNvbnRyb2xBdHRycyB8fCB7fSkuaWQgfHwgY3R4LmdlbmVyYXRlSWQoKSxcbiAgICAgICAgICAgIGNvbnRyb2xBdHRycyA9IGN0eC5leHRlbmQoe1xuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbGxlZGJ5JzogJ3RleHQnICsgaWQsXG4gICAgICAgICAgICAgICAgbmFtZToganNvbi5uYW1lLFxuICAgICAgICAgICAgICAgIHRhYmluZGV4OiBqc29uLnRhYmluZGV4LFxuICAgICAgICAgICAgICAgIHZhbHVlOiAoanNvbi52YWx1ZSB8fCBqc29uLmNvbnRlbnQpXG4gICAgICAgICAgICB9LCBqc29uLmNvbnRyb2xBdHRycyk7XG5cbiAgICAgICAgaWYoY3R4Lm1vZCgnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgY29udHJvbEF0dHJzLmRpc2FibGVkID0gJ2Rpc2FibGVkJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGN0eC5tb2QoJ2NoZWNrZWQnKSkge1xuICAgICAgICAgICAgY29udHJvbEF0dHJzLmNoZWNrZWQgPSAnY2hlY2tlZCc7XG4gICAgICAgIH1cblxuICAgICAgICBjdHhcbiAgICAgICAgICAgIC50YWcoJ2xhYmVsJylcbiAgICAgICAgICAgIC5qcyhjdHguZXh0ZW5kKHtsaXZlOiBmYWxzZX0sIGN0eC5qcygpKSlcbiAgICAgICAgICAgIC5tb2QoJ3RoZW1lJywgJ25vcm1hbCcpXG4gICAgICAgICAgICAuYXR0cignZm9yJywgY29udHJvbEF0dHJzLmlkKVxuICAgICAgICAgICAgLnRQYXJhbSgnY29udHJvbEF0dHJzJywgY29udHJvbEF0dHJzKVxuICAgICAgICAgICAgLmNvbnRlbnQoW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbTogJ2NvbnRyb2wnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW06ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgdGFnOiAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGN0eC5jb250ZW50KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLCB0cnVlKTtcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJoKSB7XG4gICAgYmgubWF0Y2goJ2NoZWNrLWJ1dHRvbicsIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICBjdHhcbiAgICAgICAgICAgIC5taXhKcyh7YmxvY2s6ICdjb250cm9sJywgbW9kczogeydwcmVzc2VkJzogdHJ1ZX19KVxuICAgICAgICBjdHhcbiAgICAgICAgICAgIC5tdU1vZHMoe1xuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGN0eC5tb2QoJ2NoZWNrZWQnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5iaW5kKHtcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBjdHgubXVNb2QoJ2NoZWNrZWQnLCBlLnRhcmdldC5jaGVja2VkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgfSlcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmgpIHtcbiAgICBiaC5tYXRjaCgnY29udHJvbF9mb2N1c2VkJywgZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLm11TW9kcyh7XG4gICAgICAgICAgICAgICAgZm9jdXNlZDogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYmluZCh7XG4gICAgICAgICAgICAgICAgb25Gb2N1czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5tb2QoJ2Rpc2FibGVkJykgfHwgY3R4Lm11TW9kKCdmb2N1c2VkJywgdHJ1ZSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQmx1cjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5tdU1vZCgnZm9jdXNlZCcsIGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgfSlcbiAgICBiaC5tYXRjaCgnY29udHJvbF9wcmVzc2VkJywgZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLm11TW9kcyh7XG4gICAgICAgICAgICAgICAgcHJlc3NlZDogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYmluZCh7XG4gICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBiaW5kVG9Eb2MgZGlmZiBmcm9tIG5hdGl2ZSBidG5cbiAgICAgICAgICAgICAgICAgICAgY3R4Lm11TW9kKCdwcmVzc2VkJywgZmFsc2UpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbk1vdXNlRG93bjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5tdU1vZCgncHJlc3NlZCcsIHRydWUpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbk1vdXNlVXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjdHgubXVNb2QoJ3ByZXNzZWQnLCBmYWxzZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgIH0pXG59O1xuIiwidmFyIEJIID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uLmJsb2Nrcy9iZW0vYmVtLmpzJylcblxuQkgubm9Cb29sTW9kcyA9IHRydWVcblxudmFyIGJoID0gbmV3IEJIKClcbnZhciBCRU0gPSBiaC5CRU1cblxubW9kdWxlLmV4cG9ydHMuUmVhY3QgPSBCSC5SZWFjdFxubW9kdWxlLmV4cG9ydHMuYmggPSBiaFxubW9kdWxlLmV4cG9ydHMuQkVNID0gQkVNXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJoKSB7XG4gICAgYmgubWF0Y2goJ2NoZWNrLWJ1dHRvbicsIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICBjdHhcbiAgICAgICAgICAgIC5taXhKcyh7YmxvY2s6ICdjb250cm9sJywgbW9kczogeydmb2N1c2VkJzogdHJ1ZX19KVxuICAgICAgICAgICAgLm1peEpzKHtibG9jazogJ2NvbnRyb2wnLCBtb2RzOiB7J2hvdmVyZWQnOiB0cnVlfX0pXG4gICAgfSlcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmgpIHtcbiAgICBiaC5tYXRjaCgnY29udHJvbF9ob3ZlcmVkJywgZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLm11TW9kcyh7XG4gICAgICAgICAgICAgICAgaG92ZXJlZDogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYmluZCh7XG4gICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm1vZCgnZGlzYWJsZWQnKSB8fCBjdHgubXVNb2QoJ2hvdmVyZWQnLCB0cnVlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm11TW9kKCdob3ZlcmVkJywgZmFsc2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9KVxufVxuIiwiLy9Db3VsZCBiZSBnZW5lcmF0ZWRcbnZhciBCSCA9IHJlcXVpcmUoJy4uLy4uL2Rlc2t0b3AuYmxvY2tzL2JlbS9iZW0uanMnKVxudmFyIGJoID0gQkguYmhcblxucmVxdWlyZSgnLi4vLi4vY29tbW9uLmJsb2Nrcy9jaGVjay1idXR0b24vY2hlY2stYnV0dG9uLmJoLmpzJykoYmgpXG5yZXF1aXJlKCcuLi8uLi9jb21tb24uYmxvY2tzL2NoZWNrLWJ1dHRvbi9fX2NvbnRyb2wvY2hlY2stYnV0dG9uX19jb250cm9sLmJoLmpzJykoYmgpXG5yZXF1aXJlKCcuLi8uLi9jb21tb24uYmxvY2tzL2NoZWNrLWJ1dHRvbi9fX3RleHQvY2hlY2stYnV0dG9uX190ZXh0LmJoLmpzJykoYmgpXG5yZXF1aXJlKCcuLi8uLi9jb21tb24uYmxvY2tzL2NoZWNrLWJ1dHRvbi9fb25seS1pY29uL2NoZWNrLWJ1dHRvbl9vbmx5LWljb25feWVzLmJoLmpzJykoYmgpXG5cbnJlcXVpcmUoJy4uLy4uL2NvbW1vbi5ibG9ja3MvY29udHJvbC9jb250cm9sLmJoei5qcycpKGJoKVxucmVxdWlyZSgnLi4vLi4vZGVza3RvcC5ibG9ja3MvY29udHJvbC9jb250cm9sLmJoei5qcycpKGJoKVxuXG5yZXF1aXJlKCcuLi8uLi9jb21tb24uYmxvY2tzL2NoZWNrLWJ1dHRvbi9jaGVjay1idXR0b24uYmh6LmpzJykoYmgpXG5yZXF1aXJlKCcuLi8uLi9kZXNrdG9wLmJsb2Nrcy9jaGVjay1idXR0b24vY2hlY2stYnV0dG9uLmJoei5qcycpKGJoKVxuXG52YXIgQ2hlY2tCdXR0b24gPSBCSC5SZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdjaGVja2J1dHRvbicsXG4gICAgX19ibG9jazogJ2NoZWNrLWJ1dHRvbicsXG4gICAgX19tYXRjaGVyczogYmguX19tYXRjaGVycyxcbiAgICBtaXhpbnM6IFtCSC5CRU1fSGF6YXJkXSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX25vZGUoKVxuICAgIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tCdXR0b25cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBibG9jazogJ2V4YW1wbGUnLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgJ9Cd0LDQudGC0LggJyxcbiAgICAgICAge1xuICAgICAgICAgICAgYmxvY2s6ICdjaGVjay1idXR0b24nLFxuICAgICAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAgICAgdmFsdWU6ICcxJyxcbiAgICAgICAgICAgIG1vZHM6IHtzaXplOiAncyd9LFxuICAgICAgICAgICAgbWl4OiBbe2Jsb2NrOiAnZXhhbXBsZScsIGVsZW06ICdpdGVtJ31dLFxuICAgICAgICAgICAgY29udGVudDogJzEnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJsb2NrOiAnY2hlY2stYnV0dG9uJyxcbiAgICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICAgIG1vZHM6IHtzaXplOiAncyd9LFxuICAgICAgICAgICAgbWl4OiBbe2Jsb2NrOiAnZXhhbXBsZScsIGVsZW06ICdpdGVtJ31dLFxuICAgICAgICAgICAgY29udGVudDogJzInXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJsb2NrOiAnY2hlY2stYnV0dG9uJyxcbiAgICAgICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgICAgIHZhbHVlOiAnMycsXG4gICAgICAgICAgICBtb2RzOiB7c2l6ZTogJ3MnfSxcbiAgICAgICAgICAgIG1peDogW3tibG9jazogJ2V4YW1wbGUnLCBlbGVtOiAnaXRlbSd9XSxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICczJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBibG9jazogJ2NoZWNrLWJ1dHRvbicsXG4gICAgICAgICAgICBuYW1lOiAndGVzdCcsXG4gICAgICAgICAgICB2YWx1ZTogJzRwbHVzJyxcbiAgICAgICAgICAgIG1vZHM6IHtzaXplOiAncycsIGNoZWNrZWQ6ICd5ZXMnfSxcbiAgICAgICAgICAgIG1peDogW3tibG9jazogJ2V4YW1wbGUnLCBlbGVtOiAnaXRlbSd9XSxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICc0KydcbiAgICAgICAgfSxcbiAgICAgICAgJ9C60L7QvNC90LDRgtC90YPRjiDQutCy0LDRgNGC0LjRgNGDJ1xuICAgIF1cbn1cbiIsInZhciBCSCA9IHJlcXVpcmUoJy4uL2Rlc2t0b3AuYmxvY2tzL2JlbS9iZW0uanMnKVxudmFyIEJFTSA9IEJILkJFTVxuXG5yZXF1aXJlKCcuLi9kZXNrdG9wLmJ1bmRsZS9jaGVjay1idXR0b24vY2hlY2stYnV0dG9uLmpzJylcblxudmFyIGJlbUpzb24gPSByZXF1aXJlKCcuL2NoZWNrLWJ1dHRvbi5iZW0uanNvbicpXG5cbnZhciBFeGFtcGxlID0gQkguUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QkVNPlxuICAgICAgICAgICAgICAgIHtiZW1Kc29ufVxuICAgICAgICAgICAgPC9CRU0+XG4gICAgICAgIClcbiAgICB9XG59KVxuXG5SZWFjdC5yZW5kZXIoXG4gICAgPEV4YW1wbGUgLz4sXG4gICAgZG9jdW1lbnQuYm9keVxuKVxuIixudWxsLCIndXNlIHN0cmljdCc7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIFRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBvd25FbnVtZXJhYmxlS2V5cyhvYmopIHtcblx0dmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xuXG5cdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0a2V5cyA9IGtleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKSk7XG5cdH1cblxuXHRyZXR1cm4ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuXHRcdHJldHVybiBwcm9wSXNFbnVtZXJhYmxlLmNhbGwob2JqLCBrZXkpO1xuXHR9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIGtleXM7XG5cdHZhciB0byA9IFRvT2JqZWN0KHRhcmdldCk7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gYXJndW1lbnRzW3NdO1xuXHRcdGtleXMgPSBvd25FbnVtZXJhYmxlS2V5cyhPYmplY3QoZnJvbSkpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0b1trZXlzW2ldXSA9IGZyb21ba2V5c1tpXV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiJdfQ==
