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

},{"object-assign":7,"react":6}],2:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('image', function(ctx, json) {
        ctx
            .tag('img')
            .attrs({
                src: json.url || '//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif',
                alt: json.alt || '',
                width: json.width,
                height: json.height
            });
    });
};

},{}],3:[function(require,module,exports){
var BH = require('../../common.blocks/bem/bem.js')

BH.noBoolMods = true

var bh = new BH()
var BEM = bh.BEM

module.exports.React = BH.React
module.exports.bh = bh
module.exports.BEM = BEM

},{"../../common.blocks/bem/bem.js":1}],4:[function(require,module,exports){
//Could be generated
var BH = require('../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../common.blocks/image/image.bh.js')(bh)

var Image = BH.React.createClass({
    displayName: 'image',
    __block: 'image',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    }
})

module.exports = Image

},{"../../common.blocks/image/image.bh.js":2,"../../desktop.blocks/bem/bem.js":3}],5:[function(require,module,exports){
var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

var Image = require('../desktop.bundle/image/image.js')

var Example = BH.React.createClass({
    render: function() {
        return (
            React.createElement(BEM, {attrs: {style:{margin: 20}}}, 
                React.createElement(Image, {url: "//yastatic.net/lego/_/Kx6F6RQnQFitm0qRxX7vpvfP0K0.png", alt: "Иконка Серпа"})
            )
        )
    }
})

React.render(
    React.createElement(Example, null),
    document.body
)

},{"../desktop.blocks/bem/bem.js":3,"../desktop.bundle/image/image.js":4}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){
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

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvYmVtL2JlbS5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9pbWFnZS9pbWFnZS5iaC5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvZGVza3RvcC5ibG9ja3MvYmVtL2JlbS5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvZGVza3RvcC5idW5kbGUvaW1hZ2UvaW1hZ2UuanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2pzL2ltYWdlLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxLQUFLLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLEtBQUssTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sT0FBTyxLQUFLLFdBQVcsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ25ILElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLE9BQU8sS0FBSyxXQUFXLEtBQUssT0FBTyxDQUFDLGVBQWUsQ0FBQzs7QUFFMUYsSUFBSSxFQUFFLEdBQUcsQ0FBQyxXQUFXO0FBQ3JCLElBQUksV0FBVyxHQUFHLENBQUM7O0FBRW5CLElBQUksRUFBRSxHQUFHLFdBQVc7O0lBRWhCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUNwQixVQUFVLENBQUMsRUFBRSxHQUFHLElBQUk7SUFDcEIsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRTtJQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVU7SUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQ3pCLFdBQVcsRUFBRSxFQUFFO1FBQ2YsT0FBTyxFQUFFLEVBQUU7UUFDWCxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDcEIsTUFBTSxFQUFFLFdBQVc7WUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUU7U0FDdkI7S0FDSixDQUFDO0FBQ04sQ0FBQzs7QUFFRCxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUc7QUFDVixFQUFFLENBQUMsRUFBRSxHQUFHLElBQUk7QUFDWixFQUFFLENBQUMsS0FBSyxHQUFHLEtBQUs7QUFDaEIsRUFBRSxDQUFDLFFBQVEsSUFBSSxTQUFTLFFBQVEsRUFBRTtJQUM5QixJQUFJLElBQUksR0FBRyxFQUFFO1FBQ1QsS0FBSztRQUNMLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNyQyxNQUFNO1FBQ0YsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNyQyxRQUFRLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRXBDLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFOztJQUUxQixJQUFJLE1BQU0sRUFBRTtRQUNSLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ2pDLEtBQUs7O0lBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFO0lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRTtJQUMzQixPQUFPLElBQUk7QUFDZixDQUFDOztBQUVELEVBQUUsQ0FBQyxTQUFTLEdBQUc7SUFDWCxVQUFVLEVBQUUsS0FBSztJQUNqQixLQUFLLEVBQUUsU0FBUyxPQUFPLEVBQUU7UUFDckIsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUU7UUFDdkIsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQztRQUMvQyxPQUFPLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUM7S0FDeEM7SUFDRCxLQUFLLEVBQUUsU0FBUyxRQUFRLEVBQUUsT0FBTyxFQUFFO1FBQy9CLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxJQUFJO1FBQ3RDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJO0tBQ2Q7QUFDTCxJQUFJLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRTtBQUMzQjs7UUFFUSxPQUFPLENBQUM7S0FDWDtJQUNELFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBRTtRQUNwQixPQUFPLENBQUM7S0FDWDtJQUNELFlBQVksRUFBRSxTQUFTLENBQUMsRUFBRTtRQUN0QixPQUFPLENBQUM7S0FDWDtBQUNMLElBQUksMkJBQTJCLEVBQUUsV0FBVzs7S0FFdkM7QUFDTCxDQUFDOztBQUVELElBQUksVUFBVSxHQUFHO0lBQ2IsRUFBRSxFQUFFLFdBQVcsQ0FBQyxPQUFPLElBQUksQ0FBQztJQUM1QixHQUFHLEVBQUUsV0FBVyxDQUFDLE9BQU8sSUFBSSxDQUFDO0lBQzdCLE1BQU0sRUFBRSxNQUFNO0lBQ2QsUUFBUSxFQUFFLFNBQVMsR0FBRyxFQUFFO1FBQ3BCLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxLQUFLLElBQUksRUFBRSxPQUFPLElBQUk7UUFDckMsSUFBSSxDQUFDLEdBQUcsT0FBTyxHQUFHO1FBQ2xCLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssUUFBUTtLQUMxQztJQUNELFVBQVUsRUFBRSxXQUFXO1FBQ25CLE9BQU8sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztLQUN0RDtJQUNELEtBQUssRUFBRSxTQUFTLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO1FBQy9CLElBQUksR0FBRyxFQUFFO1lBQ0wsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUM7WUFDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzVELE9BQU8sSUFBSTtTQUNkLE1BQU07WUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzVCO0tBQ0o7SUFDRCxNQUFNLEVBQUUsU0FBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtRQUM5QixJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3hFLE9BQU8sSUFBSTtTQUNkLE1BQU07WUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztTQUN6RDtLQUNKO0lBQ0QsR0FBRyxFQUFFLFNBQVMsR0FBRyxFQUFFLEtBQUssRUFBRTtRQUN0QixJQUFJLEdBQUcsRUFBRTtZQUNMLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDO1lBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxLQUFLLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ3RELE9BQU8sSUFBSTtTQUNkLE1BQU07WUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRztTQUN6QjtLQUNKO0lBQ0QsY0FBYyxFQUFFLElBQUk7SUFDcEIsZUFBZSxFQUFFO1FBQ2IsYUFBYSxFQUFFLGVBQWU7UUFDOUIsU0FBUyxFQUFFLFdBQVc7UUFDdEIsZUFBZSxFQUFFLGlCQUFpQjtRQUNsQyxpQkFBaUIsRUFBRSxtQkFBbUI7UUFDdEMsWUFBWSxFQUFFLGNBQWM7UUFDNUIsU0FBUyxFQUFFLFdBQVc7UUFDdEIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsV0FBVyxFQUFFLGFBQWE7UUFDMUIsV0FBVyxFQUFFLGFBQWE7UUFDMUIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsU0FBUyxFQUFFLFdBQVc7UUFDdEIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsZUFBZSxFQUFFLGlCQUFpQjtRQUNsQyxXQUFXLEVBQUUsYUFBYTtRQUMxQixXQUFXLEVBQUUsYUFBYTtRQUMxQixRQUFRLEVBQUUsVUFBVTtRQUNwQixPQUFPLEVBQUUsU0FBUztRQUNsQixVQUFVLEVBQUUsWUFBWTtRQUN4QixXQUFXLEVBQUUsYUFBYTtRQUMxQixVQUFVLEVBQUUsWUFBWTtRQUN4QixjQUFjLEVBQUUsZ0JBQWdCO1FBQ2hDLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFdBQVcsRUFBRSxhQUFhO1FBQzFCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxTQUFTO1FBQ2hCLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFlBQVksRUFBRSxjQUFjO1FBQzVCLFdBQVcsRUFBRSxhQUFhO1FBQzFCLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLE1BQU0sRUFBRSxRQUFRO0tBQ25CO0lBQ0QsS0FBSyxFQUFFLFNBQVMsTUFBTSxFQUFFLEtBQUssRUFBRTtRQUMzQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ25DLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN0QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO1lBQ25GLE9BQU8sSUFBSTtTQUNkLE1BQU07WUFDSCxPQUFPLEtBQUs7U0FDZjtLQUNKO0lBQ0QsSUFBSSxFQUFFLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7UUFDNUIsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN0QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0JBQ2IsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUNuRixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHO1lBQ3ZDLE9BQU8sSUFBSTtTQUNkLE1BQU07WUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNyRDtBQUNULEtBQUs7QUFDTDs7SUFFSSxHQUFHLEVBQUUsU0FBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtRQUMzQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ3RCLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUM7WUFDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDekQsT0FBTyxJQUFJO1NBQ2QsTUFBTTtZQUNILElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUN6QixNQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDakMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ25CO1NBQ0o7S0FDSjtJQUNELElBQUksRUFBRSxTQUFTLE1BQU0sRUFBRSxLQUFLLEVBQUU7UUFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLE1BQU07UUFDbEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDN0IsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztZQUNsRixPQUFPLElBQUk7U0FDZCxNQUFNO1lBQ0gsT0FBTyxJQUFJO1NBQ2Q7S0FDSjtJQUNELFFBQVEsRUFBRSxTQUFTLE1BQU0sRUFBRTtRQUN2QixJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDYixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDO2FBQzdEO1lBQ0QsT0FBTyxJQUFJO1NBQ2QsTUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFO1NBQy9CO0tBQ0o7SUFDRCxNQUFNLEVBQUUsU0FBUyxJQUFJLEVBQUU7UUFDbkIsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQzthQUN2RDtZQUNELE9BQU8sSUFBSTtTQUNkLE1BQU07WUFDSCxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRTtTQUM3QjtLQUNKO0lBQ0QsT0FBTyxFQUFFLFNBQVMsS0FBSyxFQUFFLEdBQUcsRUFBRTtRQUMxQixJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNkLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQzNCLElBQUksUUFBUSxHQUFHLEVBQUU7b0JBQ2pCLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHO29CQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztpQkFDMUI7YUFDSjtZQUNELENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLEdBQUc7WUFDeEQsT0FBTyxJQUFJO1NBQ2QsTUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQztTQUNoQztLQUNKO0lBQ0QsS0FBSyxFQUFFLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRTtRQUN0QixJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNkLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQ3pCLElBQUksUUFBUSxHQUFHLEVBQUU7b0JBQ2pCLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHO29CQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztpQkFDMUI7YUFDSjtZQUNELENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUc7WUFDbEQsT0FBTyxJQUFJO1NBQ2QsTUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUM1QjtLQUNKO0FBQ0wsSUFBSSxXQUFXLEdBQUcsU0FBUyxPQUFPLEVBQUU7O1FBRTVCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUk7S0FDZDtJQUNELEdBQUcsRUFBRSxTQUFTLEdBQUcsRUFBRSxLQUFLLEVBQUU7UUFDdEIsSUFBSSxHQUFHLEVBQUU7WUFDTCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQztZQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUN0RCxPQUFPLElBQUk7U0FDZCxNQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7U0FDekI7QUFDVCxLQUFLOztJQUVELEtBQUssRUFBRSxTQUFTLFFBQVEsRUFBRSxPQUFPLEVBQUU7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxJQUFJO1FBQzdCLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxJQUFJO1FBQ3RDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuRixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFELE9BQU8sSUFBSTtBQUNuQixLQUFLOztJQUVELEtBQUssRUFBRSxTQUFTLEdBQUcsRUFBRTtRQUNqQixJQUFJLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUM5QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQzVDLElBQUksUUFBUSxFQUFFO2dCQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJO2dCQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLO2dCQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFFO0FBQzFDLGdCQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxRQUFROztnQkFFakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJO2dCQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUk7Z0JBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSzthQUN2QjtTQUNKO1FBQ0QsT0FBTyxJQUFJO0tBQ2Q7SUFDRCxHQUFHLEVBQUUsU0FBUyxHQUFHLEVBQUUsS0FBSyxFQUFFO1FBQ3RCLElBQUksR0FBRyxFQUFFO1lBQ0wsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLEtBQUs7Z0JBQ3hDLEdBQUc7Z0JBQ0gsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDdEYsT0FBTyxJQUFJO1NBQ2QsTUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO1NBQ3pCO0tBQ0o7SUFDRCxPQUFPLEVBQUUsU0FBUyxPQUFPLEVBQUUsS0FBSyxFQUFFO1FBQzlCLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUM7Z0JBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxLQUFLLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3RFLE9BQU8sSUFBSTtTQUNkLE1BQU07WUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztTQUM3QjtLQUNKO0lBQ0QsUUFBUSxFQUFFLFdBQVc7UUFDakIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7S0FDL0I7SUFDRCxPQUFPLEVBQUUsV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO0tBQy9CO0lBQ0QsTUFBTSxFQUFFLFdBQVc7UUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztLQUM3QjtJQUNELElBQUksRUFBRSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTTtLQUNyQjtJQUNELElBQUksRUFBRSxXQUFXO1FBQ2IsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSTtRQUN6QixPQUFPLElBQUk7S0FDZDtJQUNELFNBQVMsRUFBRSxXQUFXO1FBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUU7UUFDckIsT0FBTyxJQUFJO0tBQ2Q7SUFDRCxjQUFjLEVBQUUsV0FBVztRQUN2QixJQUFJLE1BQU07WUFDTixHQUFHLEdBQUcsSUFBSTtZQUNWLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTTtZQUNsQixFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUs7WUFDZixHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUk7WUFDZixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNsQixRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVU7WUFDMUIsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUN2QixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVM7WUFDeEIsU0FBUyxHQUFHLFNBQVMsSUFBSSxFQUFFO2dCQUN2QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2QsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTt3QkFDbkcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2YsTUFBTSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO3FCQUN6QjtpQkFDSixNQUFNO29CQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNmLE1BQU0sR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztpQkFDekI7YUFDSjtRQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDOUIsZ0JBQWdCLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQztZQUNyQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFO2dCQUNsQixDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDekMsTUFBTTtnQkFDSCxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQ2xCO1NBQ0o7UUFDRCxJQUFJLE1BQU0sR0FBRztZQUNULE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLE1BQU0sRUFBRTtnQkFDNUMsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNqRSxvQkFBb0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7O29CQUVyRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU07b0JBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUs7b0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLFFBQVE7aUJBQ3BDLE1BQU07b0JBQ0gsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTTtvQkFDM0IsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUztvQkFDakMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVTtvQkFDbkMsTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTTtpQkFDdkI7Z0JBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDckIsT0FBTyxJQUFJLENBQUMsTUFBTTthQUNyQixFQUFFLElBQUksQ0FBQztZQUNSLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNO1NBQ3ZCO0tBQ0o7SUFDRCxPQUFPLEVBQUUsV0FBVztRQUNoQixJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDdkIsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRTtBQUMxRixZQUFZLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDOztRQUVqRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUU7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsUUFBUTtRQUNqQyxJQUFJLENBQUMsY0FBYyxFQUFFO0FBQzdCLEtBQUs7O0lBRUQsa0JBQWtCLEVBQUUsV0FBVztRQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsU0FBUyxFQUFFO1lBQ3pDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDMUMsRUFBRSxJQUFJLENBQUM7S0FDWDtJQUNELGlCQUFpQixFQUFFLFdBQVc7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLFFBQVEsRUFBRTtZQUN2QyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3pDLEVBQUUsSUFBSSxDQUFDO0tBQ1g7SUFDRCx5QkFBeUIsRUFBRSxTQUFTLEtBQUssRUFBRTtRQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxPQUFPLEVBQUU7WUFDOUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1NBQ2xDLEVBQUUsSUFBSSxDQUFDO1FBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxPQUFPLEVBQUU7WUFDMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN4QyxFQUFFLElBQUksQ0FBQztLQUNYO0lBQ0QsbUJBQW1CLEVBQUUsV0FBVztRQUM1QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVM7U0FDM0IsTUFBTTtZQUNILElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNuQztLQUNKO0lBQ0QsTUFBTSxFQUFFLFdBQVc7UUFDZixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUs7U0FDdEIsTUFBTTtZQUNILElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDMUIsU0FBUzs7UUFFRCxJQUFJLFdBQVcsR0FBRyxTQUFTLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDckMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDdEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNyQixXQUFXLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztpQkFDNUIsTUFBTTtvQkFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUk7b0JBQ2xCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7d0JBQ25FLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDM0MsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ3BCLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQy9DLHdCQUF3QixLQUFLLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDOztvQkFFL0IsSUFBSSxDQUFDLGNBQWMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsRUFBRTt3QkFDNUQsSUFBSSxJQUFJO3dCQUNSLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRTs0QkFDM0IsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDOzRCQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQzs0QkFDeEIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDO3lCQUNwQjtBQUN6QixxQkFBcUIsRUFBRSxJQUFJLENBQUM7O29CQUVSLEdBQUcsS0FBSyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztvQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQzNGO2dCQUNELE9BQU8sTUFBTTthQUNoQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksRUFBRSxDQUFDO0FBQ3ZDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztRQUVaLElBQUksSUFBSTtBQUNoQixZQUFZLEtBQUssR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBRS9DLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDbkIsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDbEIsTUFBTTtZQUNILElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN4RDtRQUNELE9BQU8sSUFBSTtBQUNuQixLQUFLOztBQUVMLElBQUksZUFBZSxFQUFFLFNBQVMsRUFBRSxFQUFFOztRQUUxQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQzNELE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJO1NBQ2pFLEVBQUUsRUFBRSxDQUFDO1FBQ04sSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2xELElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMvQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzVFLE1BQU07WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7U0FDOUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQzthQUNqRSxNQUFNO2dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ3pEO1NBQ0o7S0FDSjtJQUNELGVBQWUsRUFBRSxXQUFXO1FBQ3hCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztZQUN0QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJO1lBQ3RCLEdBQUcsR0FBRyxFQUFFO0FBQ3BCLFlBQVksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7O1FBRXRELFNBQVMsUUFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtBQUM5QyxZQUFZLElBQUksTUFBTSxHQUFHLEVBQUU7O1lBRWYsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsTUFBTSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRzthQUN4QjtZQUNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsT0FBTyxFQUFFO2dCQUN4QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUM1QixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsS0FBSyxDQUFDLEVBQUUsTUFBTTtnQkFDdkMsSUFBSSxTQUFTLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsT0FBTztnQkFDdkMsSUFBSSxPQUFPLFFBQVEsS0FBSyxTQUFTLEVBQUU7b0JBQy9CLEVBQUUsQ0FBQyxVQUFVLElBQUksUUFBUSxLQUFLLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDM0QsTUFBTTtvQkFDSCxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxRQUFRO2lCQUMvQjtnQkFDRCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsU0FBUzthQUM3QixDQUFDO0FBQ2QsU0FBUzs7UUFFRCxFQUFFLElBQUksUUFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxFQUFFO1lBQ2hFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUM7WUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQztnQkFDbkIsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUNkLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7YUFDL0I7WUFDRCxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDO0FBQy9FLFNBQVMsQ0FBQzs7UUFFRixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUNwQztJQUNELFlBQVksRUFBRSxTQUFTLElBQUksRUFBRSxRQUFRLEVBQUU7UUFDbkMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3RCLFFBQVEsS0FBSyxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLEVBQUU7WUFDbEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNyQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQzthQUMzQztZQUNELElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsRixPQUFPLElBQUk7YUFDZDtZQUNELElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDWCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDO2dCQUMxQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtnQkFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSTthQUN4QjtZQUNELElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDWCxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUU7YUFDdEU7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDMUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdEQsV0FBVyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLFdBQVcsQ0FBQzthQUN0RTtZQUNELFFBQVEsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUMzRixZQUFZLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRzs7WUFFL0IsT0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztTQUNoRCxFQUFFLElBQUksQ0FBQztRQUNSLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsT0FBTyxPQUFPO0tBQ2pCO0lBQ0QsSUFBSSxFQUFFLFNBQVMsUUFBUSxFQUFFO1FBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sQ0FBQztRQUMzQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxPQUFPLEVBQUU7WUFDaEUsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFO1NBQzNCLENBQUM7UUFDRixLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sS0FBSztLQUNmO0lBQ0QsT0FBTyxFQUFFLFNBQVMsUUFBUSxFQUFFO1FBQ3hCLElBQUksS0FBSyxHQUFHLEVBQUU7WUFDVixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxRQUFRO1lBQzdDLFFBQVEsR0FBRyxTQUFTLElBQUksRUFBRTtnQkFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxNQUFNLEVBQUU7b0JBQ3ZDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUM7b0JBQ3BCLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUU7d0JBQ2pDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO3FCQUNsQixNQUFNO3dCQUNILFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO3FCQUNyQjtpQkFDSixDQUFDO0FBQ2xCLGFBQWE7O1FBRUwsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkIsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxPQUFPLEtBQUs7S0FDZjtJQUNELE9BQU8sRUFBRSxTQUFTLE1BQU0sRUFBRTtRQUN0QixJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQztTQUN6QyxNQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUMsWUFBWTtTQUMzQjtLQUNKO0lBQ0QsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFO1FBQ3BCLElBQUksRUFBRSxFQUFFO1lBQ0osSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3JFLE9BQU8sSUFBSTtTQUNkLE1BQU07WUFDSCxPQUFPLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRTtTQUNoQztLQUNKO0lBQ0QsUUFBUSxFQUFFLFNBQVMsRUFBRSxFQUFFO1FBQ25CLElBQUksRUFBRSxFQUFFO1lBQ0osSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ25FLE9BQU8sSUFBSTtTQUNkLE1BQU07WUFDSCxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRTtTQUMvQjtLQUNKO0lBQ0QsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLEVBQUU7UUFDM0IsSUFBSSxFQUFFLEVBQUU7WUFDSixJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDekUsT0FBTyxJQUFJO1NBQ2QsTUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxFQUFFO1NBQ2xDO0FBQ1QsS0FBSzs7SUFFRCxZQUFZLEVBQUUsU0FBUyxFQUFFLEVBQUU7UUFDdkIsSUFBSSxFQUFFLEVBQUU7WUFDSixJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDakUsT0FBTyxJQUFJO1NBQ2QsTUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFO1NBQzlCO0tBQ0o7SUFDRCxJQUFJLEVBQUUsU0FBUyxNQUFNLEVBQUU7UUFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxLQUFLLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDckMsTUFBTTtpQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNaLE9BQU8sQ0FBQyxTQUFTLFNBQVMsQ0FBQztvQkFDeEIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUNqQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsU0FBUyxDQUFDLEVBQUU7d0JBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFOzRCQUMxQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDbkIsRUFBRSxJQUFJLENBQUM7cUJBQ1gsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ2hDLGlCQUFpQixFQUFFLElBQUksQ0FBQzs7WUFFWixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUN0QjtRQUNELE9BQU8sSUFBSTtLQUNkO0lBQ0QsT0FBTyxFQUFFLFdBQVc7UUFDaEIsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztLQUNqQztBQUNMLENBQUM7O0FBRUQsRUFBRSxDQUFDLFVBQVUsR0FBRyxVQUFVOztBQUUxQixPQUFPLEVBQUU7QUFDVCxDQUFDLEdBQUc7O0FBRUosSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7SUFDL0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFO0NBQ3RCOzs7QUM3cUJELE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxFQUFFLEVBQUU7SUFDMUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxHQUFHLEVBQUUsSUFBSSxFQUFFO1FBQ2xDLEdBQUc7YUFDRSxHQUFHLENBQUMsS0FBSyxDQUFDO2FBQ1YsS0FBSyxDQUFDO2dCQUNILEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLHVEQUF1RDtnQkFDeEUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRTtnQkFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDdEIsQ0FBQyxDQUFDO0tBQ1YsQ0FBQyxDQUFDO0NBQ04sQ0FBQzs7O0FDWEYsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDOztBQUVsRCxFQUFFLENBQUMsVUFBVSxHQUFHLElBQUk7O0FBRXBCLElBQUksRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFO0FBQ2pCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHOztBQUVoQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSztBQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFO0FBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUc7OztBQ1R4QixvQkFBb0I7QUFDcEIsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDO0FBQ25ELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFOztBQUVkLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7QUFFcEQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFDN0IsV0FBVyxFQUFFLE9BQU87SUFDcEIsT0FBTyxFQUFFLE9BQU87SUFDaEIsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVO0lBQ3pCLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7SUFDdkIsTUFBTSxFQUFFLFdBQVc7UUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUU7S0FDdkI7QUFDTCxDQUFDLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLOzs7QUNoQnRCLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztBQUNoRCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRzs7QUFFaEIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDOztBQUV2RCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztJQUMvQixNQUFNLEVBQUUsV0FBVztRQUNmO1lBQ0ksb0JBQUMsR0FBRyxFQUFBLENBQUEsQ0FBQyxLQUFBLEVBQUssQ0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBRyxDQUFBLEVBQUE7Z0JBQzlCLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsR0FBQSxFQUFHLENBQUMsdURBQUEsRUFBdUQsQ0FBQyxHQUFBLEVBQUcsQ0FBQyxjQUFjLENBQUEsQ0FBRyxDQUFBO1lBQ3RGLENBQUE7U0FDVDtLQUNKO0FBQ0wsQ0FBQyxDQUFDOztBQUVGLEtBQUssQ0FBQyxNQUFNO0lBQ1Isb0JBQUMsT0FBTyxFQUFBLElBQUEsQ0FBRyxDQUFBO0lBQ1gsUUFBUSxDQUFDLElBQUk7Q0FDaEI7OztBQ2xCRDs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpICYmIHdpbmRvdy5SZWFjdCB8fCAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKSAmJiByZXF1aXJlKCdyZWFjdCcpXG52YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKSAmJiByZXF1aXJlKCdvYmplY3QtYXNzaWduJylcblxudmFyIEJIID0gKGZ1bmN0aW9uKCkge1xudmFyIF9fbGFzdEdlbklkID0gMFxuXG52YXIgQkggPSBmdW5jdGlvbigpIHtcbiAgICAvL1RPRE86IG1ha2UgaXQgYmV0dGVyXG4gICAgdGhpcy5fX21hdGNoZXJzID0ge31cbiAgICBCRU1fSGF6YXJkLmJoID0gdGhpc1xuICAgIEJFTV9IYXphcmQuX19leHBhbmRvSWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgIHRoaXMudXRpbHMgPSBCRU1fSGF6YXJkXG4gICAgdGhpcy5CRU0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiAnJyxcbiAgICAgICAgX19ibG9jazogJycsXG4gICAgICAgIG1peGluczogW0JFTV9IYXphcmRdLFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19ub2RlKClcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbkJILl8gPSAnXydcbkJILl9fID0gJ19fJ1xuQkguUmVhY3QgPSBSZWFjdFxuQkguX2dldERlY2wgPSAgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICB2YXIgZGVjbCA9IHt9LFxuICAgICAgICBkZWNscyxcbiAgICAgICAgaXNFbGVtID0gfnNlbGVjdG9yLmluZGV4T2YoQkguX18pXG4gICAgaXNFbGVtID9cbiAgICAgICAgZGVjbHMgPSBzZWxlY3Rvci5zcGxpdChCSC5fXykgOlxuICAgICAgICBkZWNscyA9IHNlbGVjdG9yLnNwbGl0KEJILl8pXG5cbiAgICBkZWNsLmJsb2NrID0gZGVjbHMuc2hpZnQoKVxuXG4gICAgaWYgKGlzRWxlbSkge1xuICAgICAgICBkZWNscyA9IGRlY2xzWzBdLnNwbGl0KEJILl8pXG4gICAgICAgIGRlY2wuZWxlbSA9IGRlY2xzLnNoaWZ0KClcbiAgICB9XG5cbiAgICBkZWNsLm1vZE5hbWUgPSBkZWNscy5zaGlmdCgpXG4gICAgZGVjbC5tb2RWYWwgPSBkZWNscy5zaGlmdCgpXG4gICAgcmV0dXJuIGRlY2xcbn1cblxuQkgucHJvdG90eXBlID0ge1xuICAgIG5vQm9vbE1vZHM6IGZhbHNlLCAvL0ZvciBMRUdPIHNldCB0cnVlXG4gICAgYXBwbHk6IGZ1bmN0aW9uKGJlbUpzb24pIHtcbiAgICAgICAgaWYgKCFiZW1Kc29uKSByZXR1cm4gJydcbiAgICAgICAgdmFyIGVsID0gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLkJFTSwgYmVtSnNvbilcbiAgICAgICAgcmV0dXJuIFJlYWN0LnJlbmRlclRvU3RhdGljTWFya3VwKGVsKVxuICAgIH0sXG4gICAgbWF0Y2g6IGZ1bmN0aW9uKHNlbGVjdG9yLCBtYXRjaGVyKSB7XG4gICAgICAgIGlmICghc2VsZWN0b3IgfHwgIW1hdGNoZXIpIHJldHVybiB0aGlzXG4gICAgICAgIHZhciBkZWNsID0gQkguX2dldERlY2woc2VsZWN0b3IpXG4gICAgICAgIHRoaXMuX19tYXRjaGVyc1tkZWNsLmJsb2NrXSB8fCAodGhpcy5fX21hdGNoZXJzW2RlY2wuYmxvY2tdID0gW10pXG4gICAgICAgIHRoaXMuX19tYXRjaGVyc1tkZWNsLmJsb2NrXS5wdXNoKFtkZWNsLCBtYXRjaGVyXSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIHhtbEVzY2FwZTogZnVuY3Rpb24oeCkge1xuICAgICAgICAvL0JlY2F1c2UgUmVhY3Qgd2lsbCBkbyBpdCBmb3IgdXNcbiAgICAgICAgLy9UT0RPOiBvciBkbyB3ZSBuZWVkIHRoaXM/XG4gICAgICAgIHJldHVybiB4XG4gICAgfSxcbiAgICBhdHRyRXNjYXBlOiBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiB4XG4gICAgfSxcbiAgICBqc0F0dHJFc2NhcGU6IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuIHhcbiAgICB9LFxuICAgIGVuYWJsZUluZmluaXRlTG9vcERldGVjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vVjggd2lsbCBkbyBpdCBmb3IgdXNcbiAgICB9XG59XG5cbnZhciBCRU1fSGF6YXJkID0ge1xuICAgIGpzOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpc30sXG4gICAgYmVtOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpc30sXG4gICAgZXh0ZW5kOiBhc3NpZ24sXG4gICAgaXNTaW1wbGU6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBpZiAoIW9iaiB8fCBvYmogPT09IHRydWUpIHJldHVybiB0cnVlXG4gICAgICAgIHZhciB0ID0gdHlwZW9mIG9ialxuICAgICAgICByZXR1cm4gdCA9PT0gJ3N0cmluZycgfHwgdCA9PT0gJ251bWJlcidcbiAgICB9LFxuICAgIGdlbmVyYXRlSWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJ3VuaXEnICsgdGhpcy5fX2V4cGFuZG9JZCArICgrK19fbGFzdEdlbklkKTtcbiAgICB9LFxuICAgIHBhcmFtOiBmdW5jdGlvbihwYXJhbSwgdmFsLCBmb3JjZSkge1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAoIXRoaXMuX19qc29uW3BhcmFtXSB8fCBmb3JjZSkgJiYgKHRoaXMuX19qc29uW3BhcmFtXSA9IHZhbClcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb25bcGFyYW1dXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRQYXJhbTogZnVuY3Rpb24oa2V5LCB2YWwsIGZvcmNlKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc01peCkge3JldHVybiB0aGlzfVxuICAgICAgICAgICAgdGhpcy5fX2pzb24uJHRQYXJhbSB8fCAodGhpcy5fX2pzb24uJHRQYXJhbSA9IHt9KVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9fanNvbi4kdFBhcmFtW2tleV0gfHwgZm9yY2UpIHt0aGlzLl9fanNvbi4kdFBhcmFtW2tleV0gPSB2YWx9XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLiR0UGFyYW0gJiYgdGhpcy5fX2pzb24uJHRQYXJhbVtrZXldXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNsczogZnVuY3Rpb24oY2xzLCBmb3JjZSkge1xuICAgICAgICBpZiAoY2xzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAoIXRoaXMuX19qc29uLmNscyB8fCBmb3JjZSkgJiYgKHRoaXMuX19qc29uLmNscyA9IGNscylcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uY2xzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG5lZWRDYXBpdGFsaXplOiB0cnVlLFxuICAgIGF0dHJDYXBpdGFsaXplZDoge1xuICAgICAgICBhY2NlcHRjaGFyc2V0OiAnYWNjZXB0Q2hhcnNldCcsXG4gICAgICAgIGFjY2Vzc2tleTogJ2FjY2Vzc0tleScsXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbjogJ2FsbG93RnVsbFNjcmVlbicsXG4gICAgICAgIGFsbG93dHJhbnNwYXJlbmN5OiAnYWxsb3dUcmFuc3BhcmVuY3knLFxuICAgICAgICBhdXRvY29tcGxldGU6ICdhdXRvQ29tcGxldGUnLFxuICAgICAgICBhdXRvZm9jdXM6ICdhdXRvRm9jdXMnLFxuICAgICAgICBhdXRvcGxheTogJ2F1dG9QbGF5JyxcbiAgICAgICAgY2VsbHBhZGRpbmc6ICdjZWxsUGFkZGluZycsXG4gICAgICAgIGNlbGxzcGFjaW5nOiAnY2VsbFNwYWNpbmcnLFxuICAgICAgICBjaGFyc2V0OiAnY2hhclNldCcsXG4gICAgICAgIGNsYXNzaWQ6ICdjbGFzc0lEJyxcbiAgICAgICAgJ2NsYXNzJzogJ2NsYXNzTmFtZScsXG4gICAgICAgIGNsYXNzbmFtZTogJ2NsYXNzTmFtZScsXG4gICAgICAgIGNvbHNwYW46ICdjb2xTcGFuJyxcbiAgICAgICAgY29udGVudGVkaXRhYmxlOiAnY29udGVudEVkaXRhYmxlJyxcbiAgICAgICAgY29udGV4dG1lbnU6ICdjb250ZXh0TWVudScsXG4gICAgICAgIGNyb3Nzb3JpZ2luOiAnY3Jvc3NPcmlnaW4nLFxuICAgICAgICBkYXRldGltZTogJ2RhdGVUaW1lJyxcbiAgICAgICAgZW5jdHlwZTogJ2VuY1R5cGUnLFxuICAgICAgICBmb3JtYWN0aW9uOiAnZm9ybUFjdGlvbicsXG4gICAgICAgIGZvcm1lbmN0eXBlOiAnZm9ybUVuY1R5cGUnLFxuICAgICAgICBmb3JtbWV0aG9kOiAnZm9ybU1ldGhvZCcsXG4gICAgICAgIGZvcm1ub3ZhbGlkYXRlOiAnZm9ybU5vVmFsaWRhdGUnLFxuICAgICAgICBmb3JtdGFyZ2V0OiAnZm9ybVRhcmdldCcsXG4gICAgICAgIGZyYW1lYm9yZGVyOiAnZnJhbWVCb3JkZXInLFxuICAgICAgICBodG1sZm9yOiAnaHRtbEZvcicsXG4gICAgICAgICdmb3InOiAnaHRtbEZvcicsXG4gICAgICAgIGh0dHBlcXVpdjogJ2h0dHBFcXVpdicsXG4gICAgICAgIG1hcmdpbmhlaWdodDogJ21hcmdpbkhlaWdodCcsXG4gICAgICAgIG1hcmdpbndpZHRoOiAnbWFyZ2luV2lkdGgnLFxuICAgICAgICBtYXhsZW5ndGg6ICdtYXhMZW5ndGgnLFxuICAgICAgICBtZWRpYWdyb3VwOiAnbWVkaWFHcm91cCcsXG4gICAgICAgIG5vdmFsaWRhdGU6ICdub1ZhbGlkYXRlJyxcbiAgICAgICAgcmFkaW9ncm91cDogJ3JhZGlvR3JvdXAnLFxuICAgICAgICByZWFkb25seTogJ3JlYWRPbmx5JyxcbiAgICAgICAgcm93c3BhbjogJ3Jvd1NwYW4nLFxuICAgICAgICBzcGVsbGNoZWNrOiAnc3BlbGxDaGVjaycsXG4gICAgICAgIHNyY2RvYzogJ3NyY0RvYycsXG4gICAgICAgIHNyY3NldDogJ3NyY1NldCcsXG4gICAgICAgIHRhYmluZGV4OiAndGFiSW5kZXgnLFxuICAgICAgICB1c2VtYXA6ICd1c2VNYXAnXG4gICAgfSxcbiAgICBhdHRyczogZnVuY3Rpb24odmFsdWVzLCBmb3JjZSkge1xuICAgICAgICB2YXIgYXR0cnMgPSB0aGlzLl9fanNvbi5hdHRycyB8fCB7fVxuICAgICAgICBpZiAodmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uLmF0dHJzID0gZm9yY2UgPyB0aGlzLmV4dGVuZChhdHRycywgdmFsdWVzKSA6IHRoaXMuZXh0ZW5kKHZhbHVlcywgYXR0cnMpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGF0dHJzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGF0dHI6IGZ1bmN0aW9uKGtleSwgdmFsLCBmb3JjZSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uLmF0dHJzID9cbiAgICAgICAgICAgICAgICAoIXRoaXMuX19qc29uLmF0dHJzLmhhc093blByb3BlcnR5KGtleSkgfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbi5hdHRyc1trZXldID0gdmFsKSA6XG4gICAgICAgICAgICAgICAgKHRoaXMuX19qc29uLmF0dHJzID0ge30pW2tleV0gPSB2YWxcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uYXR0cnMgJiYgdGhpcy5fX2pzb24uYXR0cnNba2V5XVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvL1RPRE86IFJlZmFjdG9yIG1vZCwgbW9kcywgbXVNb2QsIG11TW9kc1xuICAgIC8vVGhpbmsgYWJvdXQgZGVjbE11bW9kcyA/IHNldE11TW9kIGRlbE11TW9kIGdldE11TW9kXG4gICAgbW9kOiBmdW5jdGlvbihtb2QsIHZhbCwgZm9yY2UpIHtcbiAgICAgICAgdmFyIG1vZHMgPSB0aGlzLm1vZHMoKVxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgICghbW9kcy5oYXNPd25Qcm9wZXJ0eShtb2QpIHx8IGZvcmNlKSAmJiAobW9kc1ttb2RdID0gdmFsKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm11TW9kcygpLmhhc093blByb3BlcnR5KG1vZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tdU1vZChtb2QpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vZHMuaGFzT3duUHJvcGVydHkobW9kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb2RzW21vZF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbW9kczogZnVuY3Rpb24odmFsdWVzLCBmb3JjZSkge1xuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLl9fanNvbi5lbGVtID8gJ2VsZW1Nb2RzJyA6ICdtb2RzJ1xuICAgICAgICB2YXIgbW9kcyA9IHRoaXMuX19qc29uW2ZpZWxkXVxuICAgICAgICBpZiAodmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uW2ZpZWxkXSA9IGZvcmNlID8gdGhpcy5leHRlbmQobW9kcywgdmFsdWVzKSA6IHRoaXMuZXh0ZW5kKHZhbHVlcywgbW9kcylcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kc1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtdVN0YXRlczogZnVuY3Rpb24oc3RhdGVzKSB7XG4gICAgICAgIGlmIChzdGF0ZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19tdVN0YXRlcyA9IHRoaXMuZXh0ZW5kKHt9LCB0aGlzLl9fbXVTdGF0ZXMsIHN0YXRlcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX211U3RhdGVzIHx8IHt9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG11TW9kczogZnVuY3Rpb24obW9kcykge1xuICAgICAgICBpZiAobW9kcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19mbGFnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX211TW9kcyA9IHRoaXMuZXh0ZW5kKHt9LCB0aGlzLl9fbXVNb2RzLCBtb2RzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fbXVNb2RzIHx8IHt9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG11U3RhdGU6IGZ1bmN0aW9uKHN0YXRlLCB2YWwpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX19mbGFnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVbc3RhdGVdICE9PSB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1N0YXRlID0ge31cbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGVbc3RhdGVdID0gdmFsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKHRoaXMuX19tdVN0YXRlcyB8fCAodGhpcy5fX211U3RhdGVzID0ge30pKVtzdGF0ZV0gPSB2YWxcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tdVN0YXRlcygpW3N0YXRlXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtdU1vZDogZnVuY3Rpb24obW9kLCB2YWwpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX19mbGFnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVbbW9kXSAhPT0gdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdTdGF0ZSA9IHt9XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlW21vZF0gPSB2YWxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAodGhpcy5fX211TW9kcyB8fCAodGhpcy5fX211TW9kcyA9IHt9KSlbbW9kXSA9IHZhbFxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm11TW9kcygpW21vZF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgdG9nZ2xlTXVNb2QgOiBmdW5jdGlvbihtb2ROYW1lKSB7XG4gICAgICAgIC8vVE9ETzogUmVmYWN0b3IgbWVcbiAgICAgICAgdGhpcy5tdU1vZChtb2ROYW1lLCAhdGhpcy5tdU1vZChtb2ROYW1lKSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIHRhZzogZnVuY3Rpb24odGFnLCBmb3JjZSkge1xuICAgICAgICBpZiAodGFnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAoIXRoaXMuX19qc29uLnRhZyB8fCBmb3JjZSkgJiYgKHRoaXMuX19qc29uLnRhZyA9IHRhZylcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24udGFnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIG1hdGNoOiBmdW5jdGlvbihzZWxlY3RvciwgbWF0Y2hlcikge1xuICAgICAgICBpZiAoIXRoaXMuX19mbGFnKSByZXR1cm4gdGhpc1xuICAgICAgICBpZiAoIXNlbGVjdG9yIHx8ICFtYXRjaGVyKSByZXR1cm4gdGhpc1xuICAgICAgICB2YXIgZGVjbCA9IEJILl9nZXREZWNsKHNlbGVjdG9yKVxuICAgICAgICB0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnMgfHwgKHRoaXMuX19qc29uLiRzdWJNYXRjaGVycyA9IHt9KVxuICAgICAgICB0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnNbZGVjbC5ibG9ja10gfHwgKHRoaXMuX19qc29uLiRzdWJNYXRjaGVyc1tkZWNsLmJsb2NrXSA9IFtdKVxuICAgICAgICB0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnNbZGVjbC5ibG9ja10ucHVzaChbZGVjbCwgbWF0Y2hlcl0pXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIG1peEpzOiBmdW5jdGlvbihtaXgpIHtcbiAgICAgICAgaWYgKG1peC5ibG9jayAmJiBtaXguYmxvY2sgIT09IHRoaXMuX19qc29uLmJsb2NrKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hlcnMgPSB0aGlzLmJoLl9fbWF0Y2hlcnNbbWl4LmJsb2NrXVxuICAgICAgICAgICAgaWYgKG1hdGNoZXJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGpzb24gPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5fX2pzb24pXG4gICAgICAgICAgICAgICAgdGhpcy5leHRlbmQodGhpcy5fX2pzb24sIG1peClcbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5lbGVtID0gbWl4LmVsZW1cbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX3N0b3AgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fbWF0Y2hlZCA9IFtdXG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24uX19tYXRjaGVycyA9IG1hdGNoZXJzXG5cbiAgICAgICAgICAgICAgICB0aGlzLl9faXNNaXggPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5fX3Byb2Nlc3NNYXRjaCgpXG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24gPSBqc29uXG4gICAgICAgICAgICAgICAgdGhpcy5fX2lzTWl4ID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgbWl4OiBmdW5jdGlvbihtaXgsIGZvcmNlKSB7XG4gICAgICAgIGlmIChtaXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uLm1peCA9ICghdGhpcy5fX2pzb24ubWl4IHx8IGZvcmNlKSA/XG4gICAgICAgICAgICAgICAgbWl4IDpcbiAgICAgICAgICAgICAgICAoQXJyYXkuaXNBcnJheSh0aGlzLl9fanNvbi5taXgpID8gdGhpcy5fX2pzb24ubWl4IDogW3RoaXMuX19qc29uLm1peF0pLmNvbmNhdChtaXgpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLm1peFxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb250ZW50OiBmdW5jdGlvbihjb250ZW50LCBmb3JjZSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgICAgICAoIXRoaXMuX19qc29uLmNvbnRlbnQgfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbi5jb250ZW50ID0gY29udGVudClcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uY29udGVudFxuICAgICAgICB9XG4gICAgfSxcbiAgICBwb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fanNvbi4kcG9zaXRpb25cbiAgICB9LFxuICAgIGlzRmlyc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbigpID09PSAxXG4gICAgfSxcbiAgICBpc0xhc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uJGlzTGFzdFxuICAgIH0sXG4gICAganNvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fanNvblxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgdGhpcy5fX2pzb24uX19zdG9wID0gdHJ1ZVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgYXBwbHlCYXNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fX3Byb2Nlc3NNYXRjaCgpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICBfX3Byb2Nlc3NNYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXRWYWwsXG4gICAgICAgICAgICBjdHggPSB0aGlzLFxuICAgICAgICAgICAganNvbiA9IHRoaXMuX19qc29uLFxuICAgICAgICAgICAgYl8gPSBqc29uLmJsb2NrLFxuICAgICAgICAgICAgX19lID0ganNvbi5lbGVtLFxuICAgICAgICAgICAgbW9kcyA9IHRoaXMubW9kcygpLFxuICAgICAgICAgICAgbWF0Y2hlcnMgPSBqc29uLl9fbWF0Y2hlcnMsXG4gICAgICAgICAgICBpID0gbWF0Y2hlcnMubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgIG1hdGNoZWQgPSBqc29uLl9fbWF0Y2hlZCxcbiAgICAgICAgICAgIG1hdGNoTW9kcyA9IGZ1bmN0aW9uKGRlY2wpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVjbC5tb2ROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RzICYmIG1vZHNbZGVjbC5tb2ROYW1lXSAmJiAobW9kc1tkZWNsLm1vZE5hbWVdID09PSBkZWNsLm1vZFZhbCB8fCBtb2RzW2RlY2wubW9kTmFtZV0gPT09IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goaSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldFZhbCA9IGNiKGN0eCwganNvbilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZWQucHVzaChpKVxuICAgICAgICAgICAgICAgICAgICByZXRWYWwgPSBjYihjdHgsIGpzb24pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBmb3IgKDsgaSA+PSAwICYmICFyZXRWYWwgJiYgIWpzb24uX19zdG9wOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciBydWxlID0gbWF0Y2hlcnNbaV0sXG4gICAgICAgICAgICAgICAgZGVjbCA9IHJ1bGVbMF0sXG4gICAgICAgICAgICAgICAgY2IgPSBydWxlWzFdXG5cbiAgICAgICAgICAgIGlmICh+bWF0Y2hlZC5pbmRleE9mKGkpKSB7IGNvbnRpbnVlIH1cbiAgICAgICAgICAgIGlmIChkZWNsLmVsZW0gfHwgX19lKSB7XG4gICAgICAgICAgICAgICAgKGRlY2wuZWxlbSA9PT0gX19lKSAmJiBtYXRjaE1vZHMoZGVjbClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hNb2RzKGRlY2wpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldFZhbCkgIHtcbiAgICAgICAgICAgIHJldFZhbCA9IFtdLmNvbmNhdChyZXRWYWwpLm1hcChmdW5jdGlvbihyZXRWYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAocmV0VmFsLmJsb2NrICYmIHJldFZhbC5ibG9jayAhPT0ganNvbi5ibG9jaykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlcnMgPSB0aGlzLmJoLl9fbWF0Y2hlcnNbcmV0VmFsLmJsb2NrXSB8fCBbXVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uID0gcmV0VmFsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fc3RvcCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fbWF0Y2hlZCA9IFtdXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fbWF0Y2hlcnMgPSBtYXRjaGVyc1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFZhbC5fX3N0b3AgPSBqc29uLl9fc3RvcFxuICAgICAgICAgICAgICAgICAgICByZXRWYWwuX19tYXRjaGVkID0ganNvbi5fX21hdGNoZWRcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsLl9fbWF0Y2hlcnMgPSBqc29uLl9fbWF0Y2hlcnNcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsLmVsZW0gJiYgKHJldFZhbC5ibG9jayA9IGpzb24uYmxvY2spXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uID0gcmV0VmFsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX19wcm9jZXNzTWF0Y2goKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fanNvblxuICAgICAgICAgICAgfSwgdGhpcylcbiAgICAgICAgICAgIHJldFZhbC5sZW5ndGggPT0gMSAmJiAocmV0VmFsID0gcmV0VmFsWzBdKVxuICAgICAgICAgICAgdGhpcy5fX2pzb24gPSByZXRWYWxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX19tYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBiXyA9ICB0aGlzLl9fanNvbi5ibG9jayxcbiAgICAgICAgICAgIHN1Yk1hdGNoZXJzID0gKHRoaXMuX19qc29uLiRzdWJNYXRjaGVycyAmJiB0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnNbYl9dKSB8fCBbXSxcbiAgICAgICAgICAgIG1hdGNoZXJzID0gKHRoaXMuYmguX19tYXRjaGVyc1tiX10gfHwgW10pLmNvbmNhdChzdWJNYXRjaGVycylcblxuICAgICAgICB0aGlzLl9fanNvbi5fX3N0b3AgPSBmYWxzZVxuICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZWQgPSBbXVxuICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZXJzID0gbWF0Y2hlcnNcbiAgICAgICAgdGhpcy5fX3Byb2Nlc3NNYXRjaCgpXG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvc2VDdXJOb2RlKHRoaXMucHJvcHMpXG4gICAgICAgIHRoaXMuX19mbGFnID0gdHJ1ZVxuICAgICAgICB0aGlzLnN0YXRpY3MgfHwgKHRoaXMuc3RhdGljcyA9IHt9KVxuICAgICAgICB0aGlzLl9fc2VsZiA9IHRoaXMuc3RhdGljcztcbiAgICAgICAgdGhpcy5fX21hdGNoKClcbiAgICAgICAgdGhpcy53aWxsTW91bnQoKS5mb3JFYWNoKGZ1bmN0aW9uKHdpbGxNb3VudCkge1xuICAgICAgICAgICAgd2lsbE1vdW50LmJpbmQodGhpcykodGhpcywgdGhpcy5fX2pzb24pXG4gICAgICAgIH0sIHRoaXMpXG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5zdGF0ZSwgdGhpcy5tdVN0YXRlcygpLCB0aGlzLm11TW9kcygpKVxuICAgICAgICB0aGlzLmRpZE1vdW50KCkuZm9yRWFjaChmdW5jdGlvbihkaWRNb3VudCkge1xuICAgICAgICAgICAgZGlkTW91bnQuYmluZCh0aGlzKSh0aGlzLCB0aGlzLl9fanNvbilcbiAgICAgICAgfSwgdGhpcylcbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKHByb3BzKSB7XG4gICAgICAgIHRoaXMud2lsbFJlY2VpdmVQcm9wcygpLmZvckVhY2goZnVuY3Rpb24oYlVwZGF0ZSkge1xuICAgICAgICAgICAgYlVwZGF0ZS5iaW5kKHRoaXMpKHRoaXMsIHByb3BzKVxuICAgICAgICB9LCB0aGlzKVxuICAgICAgICB0aGlzLl9fcHJvcHMgPSBwcm9wc1xuICAgICAgICB0aGlzLl9jb21wb3NlQ3VyTm9kZShwcm9wcylcbiAgICAgICAgdGhpcy5iZWZvcmVVcGRhdGUoKS5mb3JFYWNoKGZ1bmN0aW9uKGJVcGRhdGUpIHtcbiAgICAgICAgICAgIGJVcGRhdGUuYmluZCh0aGlzKSh0aGlzLCB0aGlzLl9fanNvbilcbiAgICAgICAgfSwgdGhpcylcbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fX3Byb3BzKSB7XG4gICAgICAgICAgICB0aGlzLl9fcHJvcHMgPSB1bmRlZmluZWRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvc2VDdXJOb2RlKHRoaXMucHJvcHMpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9fbm9kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgdGhpcy5fX2ZsYWcgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fX21hdGNoKClcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZW5kZXJOb2RlcyA9IGZ1bmN0aW9uKGpzb24sIHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGpzb24ucmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwganNvbikge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGpzb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck5vZGVzKGpzb24sIHJlc3VsdClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbiA9IGpzb25cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNscyA9IHRoaXMuX2J1aWxkQ2xhc3NOYW1lKCkgKyAodGhpcy5jbHMoKSA/ICcgJyArIHRoaXMuY2xzKCkgOiAnJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5fcHJvY2Vzc1RyZWUodGhpcy5jb250ZW50KCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnMgPSB0aGlzLmF0dHJzKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHMgPSB0aGlzLl9ldmVudHMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzID0ge2NoaWxkcmVuOiBjb250ZW50fVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZENhcGl0YWxpemUgJiYgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2tleVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXR0ckNhcGl0YWxpemVkW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfa2V5ID0gdGhpcy5hdHRyQ2FwaXRhbGl6ZWRba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzW19rZXldID0gYXR0cnNba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRyc1trZXldXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpXG5cbiAgICAgICAgICAgICAgICAgICAgY2xzICYmIChwcm9wcy5jbGFzc05hbWUgPSBjbHMpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy50YWcoKSB8fCAnZGl2JywgdGhpcy5leHRlbmQocHJvcHMsIGF0dHJzLCBldmVudHMpKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCByZXN1bHQgfHwgW10pXG4gICAgICAgIH0uYmluZCh0aGlzKVxuXG4gICAgICAgIHZhciBub2RlLFxuICAgICAgICAgICAgbm9kZXMgPSByZW5kZXJOb2RlcyhbXS5jb25jYXQodGhpcy5fX2pzb24pKVxuXG4gICAgICAgIGlmIChub2Rlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbm9kZSA9IG5vZGVzWzBdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlID0gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHtjaGlsZHJlbjogbm9kZXN9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgfSxcblxuICAgIF9jb21wb3NlQ3VyTm9kZTogZnVuY3Rpb24ocHApIHtcbiAgICAgICAgLy9UT0RPOiBUaGluayBhYm91dCBjYWNoaW5nL2RpZmZpbmcgYmVtSnNvblRyZWUvY29udGVudFxuICAgICAgICB0aGlzLl9fanNvbiA9IHRoaXMuZXh0ZW5kKHt9LCBwcCwge2NvbnRlbnQ6IHBwLmNoaWxkcmVuIHx8IHBwLmNvbnRlbnR9KVxuICAgICAgICB2YXIgbW9kcyA9IE9iamVjdC5rZXlzKHRoaXMuX19qc29uKS5yZWR1Y2UoZnVuY3Rpb24obW9kcywga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5WzBdID09PSBCSC5fICYmIChtb2RzW2tleS5zbGljZSgxKV0gPSBwcFtrZXldKSwgbW9kc1xuICAgICAgICB9LCB7fSlcbiAgICAgICAgdGhpcy5fX2Jsb2NrICYmICh0aGlzLl9fanNvbi5ibG9jayA9IHRoaXMuX19ibG9jaylcbiAgICAgICAgdGhpcy5fX2VsZW0gJiYgKHRoaXMuX19qc29uLmVsZW0gPSB0aGlzLl9fZWxlbSlcbiAgICAgICAgaWYgKHRoaXMuX19qc29uLmVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX19qc29uLmVsZW1Nb2RzIHx8ICh0aGlzLl9fanNvbi5lbGVtTW9kcyA9ICh0aGlzLl9fanNvbi5tb2RzIHx8IHt9KSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX19qc29uLm1vZHMgfHwgKHRoaXMuX19qc29uLm1vZHMgPSB7fSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoT2JqZWN0LmtleXMobW9kcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19qc29uLmVsZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5lbGVtTW9kcyA9IHRoaXMuZXh0ZW5kKHRoaXMuX19qc29uLmVsZW1Nb2RzLCBtb2RzKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5tb2RzID0gdGhpcy5leHRlbmQodGhpcy5fX2pzb24ubW9kcywgbW9kcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2J1aWxkQ2xhc3NOYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJfID0gdGhpcy5fX2pzb24uYmxvY2ssXG4gICAgICAgICAgICBfX2UgPSB0aGlzLl9fanNvbi5lbGVtLFxuICAgICAgICAgICAgY2xzID0ge30sXG4gICAgICAgICAgICBtb2RzID0gdGhpcy5leHRlbmQoe30sIHRoaXMubW9kcygpLCB0aGlzLm11TW9kcygpKVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEVuaXR5KGJfLCBfX2UsIG1vZHMsIG1peCkge1xuICAgICAgICAgICAgdmFyIGVudGl0eSA9IGJfXG5cbiAgICAgICAgICAgIGlmIChfX2UpIHtcbiAgICAgICAgICAgICAgICBlbnRpdHkgKz0gQkguX18gKyBfX2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsc1tlbnRpdHldID0gZW50aXR5XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhtb2RzKS5mb3JFYWNoKGZ1bmN0aW9uKG1vZE5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kVmFsdWUgPSBtb2RzW21vZE5hbWVdXG4gICAgICAgICAgICAgICAgaWYgKCFtb2RWYWx1ZSAmJiBtb2RWYWx1ZSAhPT0gMCkgcmV0dXJuXG4gICAgICAgICAgICAgICAgdmFyIG1vZEVudGl0eSA9IGVudGl0eSArIEJILl8gKyBtb2ROYW1lXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtb2RWYWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIEJILm5vQm9vbE1vZHMgJiYgbW9kVmFsdWUgJiYgKG1vZEVudGl0eSArPSBCSC5fICsgJ3llcycpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kRW50aXR5ICs9IEJILl8gKyBtb2RWYWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbHNbbW9kRW50aXR5XSA9IG1vZEVudGl0eVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGJfICYmIGFkZEVuaXR5KGJfLCBfX2UsIG1vZHMsIGZhbHNlKVxuICAgICAgICB0aGlzLl9fanNvbi5taXggJiYgW10uY29uY2F0KHRoaXMuX19qc29uLm1peCkuZm9yRWFjaChmdW5jdGlvbihtaXgpIHtcbiAgICAgICAgICAgIGlmICghbWl4KSB7IHJldHVybiB9XG4gICAgICAgICAgICBpZiAoIW1peC5ibG9jaykge1xuICAgICAgICAgICAgICAgIGlmICghYl8pIHsgcmV0dXJuIH1cbiAgICAgICAgICAgICAgICBtaXguYmxvY2sgPSBiX1xuICAgICAgICAgICAgICAgIG1peC5lbGVtIHx8IChtaXguZWxlbSA9IF9fZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZEVuaXR5KG1peC5ibG9jaywgbWl4LmVsZW0sIG1peC5tb2RzIHx8IG1peC5lbGVtTW9kcyB8fCB7fSwgdHJ1ZSlcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY2xzKS5qb2luKCcgJylcbiAgICB9LFxuICAgIF9wcm9jZXNzVHJlZTogZnVuY3Rpb24odHJlZSwgcG9zaXRpb24pIHtcbiAgICAgICAgdHJlZSA9IFtdLmNvbmNhdCh0cmVlKVxuICAgICAgICBwb3NpdGlvbiB8fCAocG9zaXRpb24gPSB7dmFsOiAwLCBsYXN0OiAwfSlcbiAgICAgICAgcG9zaXRpb24ubGFzdCArPSAodHJlZS5sZW5ndGggLSAxKVxuICAgICAgICB2YXIgY29udGVudCA9IHRyZWUubWFwKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NUcmVlKG5vZGUsIHBvc2l0aW9uKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFub2RlIHx8ICghbm9kZS5ibG9jayAmJiAhbm9kZS5lbGVtICYmICFub2RlLnRhZyAmJiAhbm9kZS5jb250ZW50ICYmICFub2RlLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IG5vZGUudHlwZS5kaXNwbGF5TmFtZVxuICAgICAgICAgICAgICAgIGlmICghbmFtZSkgeyByZXR1cm4gbm9kZSB9XG4gICAgICAgICAgICAgICAgdmFyIGRlY2wgPSBCSC5fZ2V0RGVjbChuYW1lKVxuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLnByb3BzIHx8IHt9XG4gICAgICAgICAgICAgICAgbm9kZS5ibG9jayA9IGRlY2wuYmxvY2sudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIG5vZGUuZWxlbSA9IGRlY2wuZWxlbVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUuZWxlbSkge1xuICAgICAgICAgICAgICAgIG5vZGUuYmxvY2sgfHwgKG5vZGUuYmxvY2sgPSB0aGlzLl9fanNvbi5ibG9jaylcbiAgICAgICAgICAgICAgICBub2RlLnJlZiA9IG5vZGUuYmxvY2sgKyBCSC5fXyArIG5vZGUuZWxlbSArICd+JyArIHRoaXMuZ2VuZXJhdGVJZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9fanNvbi4kdFBhcmFtICYmIChub2RlLiR0UGFyYW0gPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5fX2pzb24uJHRQYXJhbSkpXG4gICAgICAgICAgICBpZiAodGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1Yk1hdGNoZXJzID0gdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzW25vZGUuYmxvY2tdXG4gICAgICAgICAgICAgICAgc3ViTWF0Y2hlcnMgJiYgKChub2RlLiRzdWJNYXRjaGVycyA9IHt9KVtub2RlLmJsb2NrXSA9IHN1Yk1hdGNoZXJzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zaXRpb24ubGFzdCA9PT0gcG9zaXRpb24udmFsID8gKG5vZGUuJGlzTGFzdCA9IHRydWUpIDogKG5vZGUuJGlzTGFzdCA9IGZhbHNlKVxuICAgICAgICAgICAgbm9kZS4kcG9zaXRpb24gPSArK3Bvc2l0aW9uLnZhbFxuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLmJoLkJFTSwgbm9kZSlcbiAgICAgICAgfSwgdGhpcylcbiAgICAgICAgY29udGVudC5sZW5ndGggPT0gMSAmJiAoY29udGVudCA9IGNvbnRlbnRbMF0pXG4gICAgICAgIHJldHVybiBjb250ZW50XG4gICAgfSxcbiAgICBlbGVtOiBmdW5jdGlvbihlbGVtTmFtZSkge1xuICAgICAgICBpZiAodGhpcy5fX2ZsYWcpIHsgcmV0dXJuIH1cbiAgICAgICAgdmFyIGVsZW1zID0gW10uY29uY2F0KHRoaXMuZWxlbUN0eChlbGVtTmFtZSkpLm1hcChmdW5jdGlvbihlbGVtQ3R4KSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbUN0eC5kb21FbGVtKClcbiAgICAgICAgfSlcbiAgICAgICAgZWxlbXMubGVuZ3RoID09IDEgJiYgKGVsZW1zID0gZWxlbXNbMF0pXG4gICAgICAgIHJldHVybiBlbGVtc1xuICAgIH0sXG4gICAgZWxlbUN0eDogZnVuY3Rpb24oZWxlbU5hbWUpIHtcbiAgICAgICAgdmFyIGVsZW1zID0gW10sXG4gICAgICAgICAgICBlbnRpdHkgPSB0aGlzLl9fanNvbi5ibG9jayArIEJILl9fICsgZWxlbU5hbWUsXG4gICAgICAgICAgICBfZWxlbUN0eCA9IGZ1bmN0aW9uKHJlZnMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhyZWZzKS5mb3JFYWNoKGZ1bmN0aW9uKHJlZktleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gcmVmc1tyZWZLZXldXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVmKSB7IHJldHVybiB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWZLZXkuc3BsaXQoJ34nKVswXSA9PT0gZW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtcy5wdXNoKHJlZilcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lbGVtQ3R4KHJlZi5yZWZzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICBfZWxlbUN0eCh0aGlzLnJlZnMpXG4gICAgICAgIGVsZW1zLmxlbmd0aCA9PSAxICYmIChlbGVtcyA9IGVsZW1zWzBdKVxuICAgICAgICByZXR1cm4gZWxlbXNcbiAgICB9LFxuICAgIF9ldmVudHM6IGZ1bmN0aW9uKGV2ZW50cykge1xuICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHNQcm9wcyB8fCAodGhpcy5fZXZlbnRzUHJvcHMgPSB7fSlcbiAgICAgICAgICAgIHRoaXMuZXh0ZW5kKHRoaXMuX2V2ZW50c1Byb3BzLCBldmVudHMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzUHJvcHNcbiAgICAgICAgfVxuICAgIH0sXG4gICAgd2lsbE1vdW50OiBmdW5jdGlvbihjYikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnICYmICh0aGlzLl9fd2lsbE1vdW50IHx8ICh0aGlzLl9fd2lsbE1vdW50ID0gW10pKS5wdXNoKGNiKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fd2lsbE1vdW50IHx8IFtdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGRpZE1vdW50OiBmdW5jdGlvbihjYikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnICYmICh0aGlzLl9fZGlkTW91bnQgfHwgKHRoaXMuX19kaWRNb3VudCA9IFtdKSkucHVzaChjYilcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2RpZE1vdW50IHx8IFtdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgdGhpcy5fX2ZsYWcgJiYgKHRoaXMuX193aWxsUmVjZWl2ZSB8fCAodGhpcy5fX3dpbGxSZWNlaXZlID0gW10pKS5wdXNoKGNiKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fd2lsbFJlY2VpdmUgfHwgW11cbiAgICAgICAgfVxuICAgIH0sXG4vL1RPRE86IERlbGV0ZSB0aGlzIGZuXG4gICAgYmVmb3JlVXBkYXRlOiBmdW5jdGlvbihjYikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnICYmICh0aGlzLl9fYlVwZGF0ZSB8fCAodGhpcy5fX2JVcGRhdGUgPSBbXSkpLnB1c2goY2IpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19iVXBkYXRlIHx8IFtdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJpbmQ6IGZ1bmN0aW9uKGV2ZW50cykge1xuICAgICAgICBpZiAodGhpcy5fX2ZsYWcpIHtcbiAgICAgICAgICAgIHZhciBhdHRycyA9IHt9XG4gICAgICAgICAgICB0aGlzLl9fZXZlbnRzIHx8ICh0aGlzLl9fZXZlbnRzID0ge30pXG4gICAgICAgICAgICBPYmplY3RcbiAgICAgICAgICAgICAgICAua2V5cyhldmVudHMpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24oZXZlbnROYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNiID0gZXZlbnRzW2V2ZW50TmFtZV1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2V2ZW50c1tldmVudE5hbWVdIHx8ICh0aGlzLl9fZXZlbnRzW2V2ZW50TmFtZV0gPSBbXSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2V2ZW50c1tldmVudE5hbWVdLnB1c2goY2IpXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzW2V2ZW50TmFtZV0gPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmJpbmQodGhpcykoZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH0sIHRoaXMpXG5cbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyhhdHRycylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgZG9tRWxlbTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5maW5kRE9NTm9kZSh0aGlzKVxuICAgIH1cbn1cblxuQkguQkVNX0hhemFyZCA9IEJFTV9IYXphcmRcblxucmV0dXJuIEJIXG59KSgpXG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gQkhcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmgpIHtcbiAgICBiaC5tYXRjaCgnaW1hZ2UnLCBmdW5jdGlvbihjdHgsIGpzb24pIHtcbiAgICAgICAgY3R4XG4gICAgICAgICAgICAudGFnKCdpbWcnKVxuICAgICAgICAgICAgLmF0dHJzKHtcbiAgICAgICAgICAgICAgICBzcmM6IGpzb24udXJsIHx8ICcvL3lhc3RhdGljLm5ldC9sZWdvL18vTGE2cWkxOFo4THdnblpkc0FyMXF5MUd3Q3dvLmdpZicsXG4gICAgICAgICAgICAgICAgYWx0OiBqc29uLmFsdCB8fCAnJyxcbiAgICAgICAgICAgICAgICB3aWR0aDoganNvbi53aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGpzb24uaGVpZ2h0XG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcbn07XG4iLCJ2YXIgQkggPSByZXF1aXJlKCcuLi8uLi9jb21tb24uYmxvY2tzL2JlbS9iZW0uanMnKVxuXG5CSC5ub0Jvb2xNb2RzID0gdHJ1ZVxuXG52YXIgYmggPSBuZXcgQkgoKVxudmFyIEJFTSA9IGJoLkJFTVxuXG5tb2R1bGUuZXhwb3J0cy5SZWFjdCA9IEJILlJlYWN0XG5tb2R1bGUuZXhwb3J0cy5iaCA9IGJoXG5tb2R1bGUuZXhwb3J0cy5CRU0gPSBCRU1cbiIsIi8vQ291bGQgYmUgZ2VuZXJhdGVkXG52YXIgQkggPSByZXF1aXJlKCcuLi8uLi9kZXNrdG9wLmJsb2Nrcy9iZW0vYmVtLmpzJylcbnZhciBiaCA9IEJILmJoXG5cbnJlcXVpcmUoJy4uLy4uL2NvbW1vbi5ibG9ja3MvaW1hZ2UvaW1hZ2UuYmguanMnKShiaClcblxudmFyIEltYWdlID0gQkguUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnaW1hZ2UnLFxuICAgIF9fYmxvY2s6ICdpbWFnZScsXG4gICAgX19tYXRjaGVyczogYmguX19tYXRjaGVycyxcbiAgICBtaXhpbnM6IFtCSC5CRU1fSGF6YXJkXSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX25vZGUoKVxuICAgIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gSW1hZ2VcbiIsInZhciBCSCA9IHJlcXVpcmUoJy4uL2Rlc2t0b3AuYmxvY2tzL2JlbS9iZW0uanMnKVxudmFyIEJFTSA9IEJILkJFTVxuXG52YXIgSW1hZ2UgPSByZXF1aXJlKCcuLi9kZXNrdG9wLmJ1bmRsZS9pbWFnZS9pbWFnZS5qcycpXG5cbnZhciBFeGFtcGxlID0gQkguUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QkVNIGF0dHJzPXt7c3R5bGU6e21hcmdpbjogMjB9fX0+XG4gICAgICAgICAgICAgICAgPEltYWdlIHVybD0nLy95YXN0YXRpYy5uZXQvbGVnby9fL0t4NkY2UlFuUUZpdG0wcVJ4WDd2cHZmUDBLMC5wbmcnIGFsdD0n0JjQutC+0L3QutCwINCh0LXRgNC/0LAnIC8+XG4gICAgICAgICAgICA8L0JFTT5cbiAgICAgICAgKVxuICAgIH1cbn0pXG5cblJlYWN0LnJlbmRlcihcbiAgICA8RXhhbXBsZSAvPixcbiAgICBkb2N1bWVudC5ib2R5XG4pXG4iLG51bGwsIid1c2Ugc3RyaWN0JztcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gVG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIG93bkVudW1lcmFibGVLZXlzKG9iaikge1xuXHR2YXIga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XG5cblx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRrZXlzID0ga2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopKTtcblx0fVxuXG5cdHJldHVybiBrZXlzLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG5cdFx0cmV0dXJuIHByb3BJc0VudW1lcmFibGUuY2FsbChvYmosIGtleSk7XG5cdH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIga2V5cztcblx0dmFyIHRvID0gVG9PYmplY3QodGFyZ2V0KTtcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBhcmd1bWVudHNbc107XG5cdFx0a2V5cyA9IG93bkVudW1lcmFibGVLZXlzKE9iamVjdChmcm9tKSk7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRvW2tleXNbaV1dID0gZnJvbVtrZXlzW2ldXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIl19
