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
    bh.match('link', function(ctx, json) {
        var attrs = {},
            url = json.url,
            tabindex = json.tabindex;

        ['title', 'target', 'id', 'tabindex'].forEach(function(param) {
            json[param] && (attrs[param] = json[param]);
        });

        if(tabindex) {
            ctx.js({origTabindex: tabindex});
        }

        if(url) {
            ctx.tag('a');
            attrs.href = ctx.isSimple(url) ? url : bh.apply(url);
        } else {
            ctx.tag('span');
            attrs.role = 'button';
            attrs.tabindex || (attrs.tabindex = 0);
        }

        ctx.attrs(attrs);
    });

    bh.match('link__inner', function(ctx) {
        ctx.tag('span');
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

require('../../common.blocks/link/link.bh.js')(bh)

var Link = BH.React.createClass({
    displayName: 'link',
    __block: 'link',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    }
})

module.exports = Link

},{"../../common.blocks/link/link.bh.js":2,"../../desktop.blocks/bem/bem.js":3}],5:[function(require,module,exports){
var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

var Link = require('../desktop.bundle/link/link.js')

var Example = BH.React.createClass({
    render: function() {
        return (
            React.createElement(BEM, {attrs: {style:{margin: 20}}}, 
                React.createElement(Link, {url: "http://ya.ru"}, 
                    "Самая посещаемая страница Рунета"
                )
            )
        )
    }
})

React.render(
    React.createElement(Example, null),
    document.body
)

},{"../desktop.blocks/bem/bem.js":3,"../desktop.bundle/link/link.js":4}],6:[function(require,module,exports){

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvYmVtL2JlbS5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9saW5rL2xpbmsuYmguanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2Rlc2t0b3AuYmxvY2tzL2JlbS9iZW0uanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2Rlc2t0b3AuYnVuZGxlL2xpbmsvbGluay5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvanMvbGluay5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L2xpYi9fZW1wdHkuanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksS0FBSyxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxLQUFLLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLE9BQU8sS0FBSyxXQUFXLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUNuSCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxLQUFLLE9BQU8sQ0FBQyxlQUFlLENBQUM7O0FBRTFGLElBQUksRUFBRSxHQUFHLENBQUMsV0FBVztBQUNyQixJQUFJLFdBQVcsR0FBRyxDQUFDOztBQUVuQixJQUFJLEVBQUUsR0FBRyxXQUFXOztJQUVoQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDcEIsVUFBVSxDQUFDLEVBQUUsR0FBRyxJQUFJO0lBQ3BCLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUs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RyxPQUFPLENBQUMsOEJBQThCLENBQUM7QUFDaEQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUc7O0FBRWhCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQzs7QUFFcEQsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFDL0IsTUFBTSxFQUFFLFdBQVc7UUFDZjtZQUNJLG9CQUFDLEdBQUcsRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUcsQ0FBQSxFQUFBO2dCQUM5QixvQkFBQyxJQUFJLEVBQUEsQ0FBQSxDQUFDLEdBQUEsRUFBRyxDQUFDLGNBQWUsQ0FBQSxFQUFBO0FBQUEsb0JBQUEsa0NBQUE7QUFBQSxnQkFFbEIsQ0FBQTtZQUNMLENBQUE7U0FDVDtLQUNKO0FBQ0wsQ0FBQyxDQUFDOztBQUVGLEtBQUssQ0FBQyxNQUFNO0lBQ1Isb0JBQUMsT0FBTyxFQUFBLElBQUEsQ0FBRyxDQUFBO0lBQ1gsUUFBUSxDQUFDLElBQUk7Q0FDaEI7OztBQ3BCRDs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpICYmIHdpbmRvdy5SZWFjdCB8fCAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKSAmJiByZXF1aXJlKCdyZWFjdCcpXG52YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKSAmJiByZXF1aXJlKCdvYmplY3QtYXNzaWduJylcblxudmFyIEJIID0gKGZ1bmN0aW9uKCkge1xudmFyIF9fbGFzdEdlbklkID0gMFxuXG52YXIgQkggPSBmdW5jdGlvbigpIHtcbiAgICAvL1RPRE86IG1ha2UgaXQgYmV0dGVyXG4gICAgdGhpcy5fX21hdGNoZXJzID0ge31cbiAgICBCRU1fSGF6YXJkLmJoID0gdGhpc1xuICAgIEJFTV9IYXphcmQuX19leHBhbmRvSWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgIHRoaXMudXRpbHMgPSBCRU1fSGF6YXJkXG4gICAgdGhpcy5CRU0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiAnJyxcbiAgICAgICAgX19ibG9jazogJycsXG4gICAgICAgIG1peGluczogW0JFTV9IYXphcmRdLFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19ub2RlKClcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbkJILl8gPSAnXydcbkJILl9fID0gJ19fJ1xuQkguUmVhY3QgPSBSZWFjdFxuQkguX2dldERlY2wgPSAgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICB2YXIgZGVjbCA9IHt9LFxuICAgICAgICBkZWNscyxcbiAgICAgICAgaXNFbGVtID0gfnNlbGVjdG9yLmluZGV4T2YoQkguX18pXG4gICAgaXNFbGVtID9cbiAgICAgICAgZGVjbHMgPSBzZWxlY3Rvci5zcGxpdChCSC5fXykgOlxuICAgICAgICBkZWNscyA9IHNlbGVjdG9yLnNwbGl0KEJILl8pXG5cbiAgICBkZWNsLmJsb2NrID0gZGVjbHMuc2hpZnQoKVxuXG4gICAgaWYgKGlzRWxlbSkge1xuICAgICAgICBkZWNscyA9IGRlY2xzWzBdLnNwbGl0KEJILl8pXG4gICAgICAgIGRlY2wuZWxlbSA9IGRlY2xzLnNoaWZ0KClcbiAgICB9XG5cbiAgICBkZWNsLm1vZE5hbWUgPSBkZWNscy5zaGlmdCgpXG4gICAgZGVjbC5tb2RWYWwgPSBkZWNscy5zaGlmdCgpXG4gICAgcmV0dXJuIGRlY2xcbn1cblxuQkgucHJvdG90eXBlID0ge1xuICAgIG5vQm9vbE1vZHM6IGZhbHNlLCAvL0ZvciBMRUdPIHNldCB0cnVlXG4gICAgYXBwbHk6IGZ1bmN0aW9uKGJlbUpzb24pIHtcbiAgICAgICAgaWYgKCFiZW1Kc29uKSByZXR1cm4gJydcbiAgICAgICAgdmFyIGVsID0gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLkJFTSwgYmVtSnNvbilcbiAgICAgICAgcmV0dXJuIFJlYWN0LnJlbmRlclRvU3RhdGljTWFya3VwKGVsKVxuICAgIH0sXG4gICAgbWF0Y2g6IGZ1bmN0aW9uKHNlbGVjdG9yLCBtYXRjaGVyKSB7XG4gICAgICAgIGlmICghc2VsZWN0b3IgfHwgIW1hdGNoZXIpIHJldHVybiB0aGlzXG4gICAgICAgIHZhciBkZWNsID0gQkguX2dldERlY2woc2VsZWN0b3IpXG4gICAgICAgIHRoaXMuX19tYXRjaGVyc1tkZWNsLmJsb2NrXSB8fCAodGhpcy5fX21hdGNoZXJzW2RlY2wuYmxvY2tdID0gW10pXG4gICAgICAgIHRoaXMuX19tYXRjaGVyc1tkZWNsLmJsb2NrXS5wdXNoKFtkZWNsLCBtYXRjaGVyXSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIHhtbEVzY2FwZTogZnVuY3Rpb24oeCkge1xuICAgICAgICAvL0JlY2F1c2UgUmVhY3Qgd2lsbCBkbyBpdCBmb3IgdXNcbiAgICAgICAgLy9UT0RPOiBvciBkbyB3ZSBuZWVkIHRoaXM/XG4gICAgICAgIHJldHVybiB4XG4gICAgfSxcbiAgICBhdHRyRXNjYXBlOiBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiB4XG4gICAgfSxcbiAgICBqc0F0dHJFc2NhcGU6IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuIHhcbiAgICB9LFxuICAgIGVuYWJsZUluZmluaXRlTG9vcERldGVjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vVjggd2lsbCBkbyBpdCBmb3IgdXNcbiAgICB9XG59XG5cbnZhciBCRU1fSGF6YXJkID0ge1xuICAgIGpzOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpc30sXG4gICAgYmVtOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpc30sXG4gICAgZXh0ZW5kOiBhc3NpZ24sXG4gICAgaXNTaW1wbGU6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBpZiAoIW9iaiB8fCBvYmogPT09IHRydWUpIHJldHVybiB0cnVlXG4gICAgICAgIHZhciB0ID0gdHlwZW9mIG9ialxuICAgICAgICByZXR1cm4gdCA9PT0gJ3N0cmluZycgfHwgdCA9PT0gJ251bWJlcidcbiAgICB9LFxuICAgIGdlbmVyYXRlSWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJ3VuaXEnICsgdGhpcy5fX2V4cGFuZG9JZCArICgrK19fbGFzdEdlbklkKTtcbiAgICB9LFxuICAgIHBhcmFtOiBmdW5jdGlvbihwYXJhbSwgdmFsLCBmb3JjZSkge1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAoIXRoaXMuX19qc29uW3BhcmFtXSB8fCBmb3JjZSkgJiYgKHRoaXMuX19qc29uW3BhcmFtXSA9IHZhbClcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb25bcGFyYW1dXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRQYXJhbTogZnVuY3Rpb24oa2V5LCB2YWwsIGZvcmNlKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc01peCkge3JldHVybiB0aGlzfVxuICAgICAgICAgICAgdGhpcy5fX2pzb24uJHRQYXJhbSB8fCAodGhpcy5fX2pzb24uJHRQYXJhbSA9IHt9KVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9fanNvbi4kdFBhcmFtW2tleV0gfHwgZm9yY2UpIHt0aGlzLl9fanNvbi4kdFBhcmFtW2tleV0gPSB2YWx9XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLiR0UGFyYW0gJiYgdGhpcy5fX2pzb24uJHRQYXJhbVtrZXldXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNsczogZnVuY3Rpb24oY2xzLCBmb3JjZSkge1xuICAgICAgICBpZiAoY2xzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAoIXRoaXMuX19qc29uLmNscyB8fCBmb3JjZSkgJiYgKHRoaXMuX19qc29uLmNscyA9IGNscylcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uY2xzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG5lZWRDYXBpdGFsaXplOiB0cnVlLFxuICAgIGF0dHJDYXBpdGFsaXplZDoge1xuICAgICAgICBhY2NlcHRjaGFyc2V0OiAnYWNjZXB0Q2hhcnNldCcsXG4gICAgICAgIGFjY2Vzc2tleTogJ2FjY2Vzc0tleScsXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbjogJ2FsbG93RnVsbFNjcmVlbicsXG4gICAgICAgIGFsbG93dHJhbnNwYXJlbmN5OiAnYWxsb3dUcmFuc3BhcmVuY3knLFxuICAgICAgICBhdXRvY29tcGxldGU6ICdhdXRvQ29tcGxldGUnLFxuICAgICAgICBhdXRvZm9jdXM6ICdhdXRvRm9jdXMnLFxuICAgICAgICBhdXRvcGxheTogJ2F1dG9QbGF5JyxcbiAgICAgICAgY2VsbHBhZGRpbmc6ICdjZWxsUGFkZGluZycsXG4gICAgICAgIGNlbGxzcGFjaW5nOiAnY2VsbFNwYWNpbmcnLFxuICAgICAgICBjaGFyc2V0OiAnY2hhclNldCcsXG4gICAgICAgIGNsYXNzaWQ6ICdjbGFzc0lEJyxcbiAgICAgICAgJ2NsYXNzJzogJ2NsYXNzTmFtZScsXG4gICAgICAgIGNsYXNzbmFtZTogJ2NsYXNzTmFtZScsXG4gICAgICAgIGNvbHNwYW46ICdjb2xTcGFuJyxcbiAgICAgICAgY29udGVudGVkaXRhYmxlOiAnY29udGVudEVkaXRhYmxlJyxcbiAgICAgICAgY29udGV4dG1lbnU6ICdjb250ZXh0TWVudScsXG4gICAgICAgIGNyb3Nzb3JpZ2luOiAnY3Jvc3NPcmlnaW4nLFxuICAgICAgICBkYXRldGltZTogJ2RhdGVUaW1lJyxcbiAgICAgICAgZW5jdHlwZTogJ2VuY1R5cGUnLFxuICAgICAgICBmb3JtYWN0aW9uOiAnZm9ybUFjdGlvbicsXG4gICAgICAgIGZvcm1lbmN0eXBlOiAnZm9ybUVuY1R5cGUnLFxuICAgICAgICBmb3JtbWV0aG9kOiAnZm9ybU1ldGhvZCcsXG4gICAgICAgIGZvcm1ub3ZhbGlkYXRlOiAnZm9ybU5vVmFsaWRhdGUnLFxuICAgICAgICBmb3JtdGFyZ2V0OiAnZm9ybVRhcmdldCcsXG4gICAgICAgIGZyYW1lYm9yZGVyOiAnZnJhbWVCb3JkZXInLFxuICAgICAgICBodG1sZm9yOiAnaHRtbEZvcicsXG4gICAgICAgICdmb3InOiAnaHRtbEZvcicsXG4gICAgICAgIGh0dHBlcXVpdjogJ2h0dHBFcXVpdicsXG4gICAgICAgIG1hcmdpbmhlaWdodDogJ21hcmdpbkhlaWdodCcsXG4gICAgICAgIG1hcmdpbndpZHRoOiAnbWFyZ2luV2lkdGgnLFxuICAgICAgICBtYXhsZW5ndGg6ICdtYXhMZW5ndGgnLFxuICAgICAgICBtZWRpYWdyb3VwOiAnbWVkaWFHcm91cCcsXG4gICAgICAgIG5vdmFsaWRhdGU6ICdub1ZhbGlkYXRlJyxcbiAgICAgICAgcmFkaW9ncm91cDogJ3JhZGlvR3JvdXAnLFxuICAgICAgICByZWFkb25seTogJ3JlYWRPbmx5JyxcbiAgICAgICAgcm93c3BhbjogJ3Jvd1NwYW4nLFxuICAgICAgICBzcGVsbGNoZWNrOiAnc3BlbGxDaGVjaycsXG4gICAgICAgIHNyY2RvYzogJ3NyY0RvYycsXG4gICAgICAgIHNyY3NldDogJ3NyY1NldCcsXG4gICAgICAgIHRhYmluZGV4OiAndGFiSW5kZXgnLFxuICAgICAgICB1c2VtYXA6ICd1c2VNYXAnXG4gICAgfSxcbiAgICBhdHRyczogZnVuY3Rpb24odmFsdWVzLCBmb3JjZSkge1xuICAgICAgICB2YXIgYXR0cnMgPSB0aGlzLl9fanNvbi5hdHRycyB8fCB7fVxuICAgICAgICBpZiAodmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uLmF0dHJzID0gZm9yY2UgPyB0aGlzLmV4dGVuZChhdHRycywgdmFsdWVzKSA6IHRoaXMuZXh0ZW5kKHZhbHVlcywgYXR0cnMpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGF0dHJzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGF0dHI6IGZ1bmN0aW9uKGtleSwgdmFsLCBmb3JjZSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uLmF0dHJzID9cbiAgICAgICAgICAgICAgICAoIXRoaXMuX19qc29uLmF0dHJzLmhhc093blByb3BlcnR5KGtleSkgfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbi5hdHRyc1trZXldID0gdmFsKSA6XG4gICAgICAgICAgICAgICAgKHRoaXMuX19qc29uLmF0dHJzID0ge30pW2tleV0gPSB2YWxcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uYXR0cnMgJiYgdGhpcy5fX2pzb24uYXR0cnNba2V5XVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvL1RPRE86IFJlZmFjdG9yIG1vZCwgbW9kcywgbXVNb2QsIG11TW9kc1xuICAgIC8vVGhpbmsgYWJvdXQgZGVjbE11bW9kcyA/IHNldE11TW9kIGRlbE11TW9kIGdldE11TW9kXG4gICAgbW9kOiBmdW5jdGlvbihtb2QsIHZhbCwgZm9yY2UpIHtcbiAgICAgICAgdmFyIG1vZHMgPSB0aGlzLm1vZHMoKVxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgICghbW9kcy5oYXNPd25Qcm9wZXJ0eShtb2QpIHx8IGZvcmNlKSAmJiAobW9kc1ttb2RdID0gdmFsKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm11TW9kcygpLmhhc093blByb3BlcnR5KG1vZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tdU1vZChtb2QpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vZHMuaGFzT3duUHJvcGVydHkobW9kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb2RzW21vZF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbW9kczogZnVuY3Rpb24odmFsdWVzLCBmb3JjZSkge1xuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLl9fanNvbi5lbGVtID8gJ2VsZW1Nb2RzJyA6ICdtb2RzJ1xuICAgICAgICB2YXIgbW9kcyA9IHRoaXMuX19qc29uW2ZpZWxkXVxuICAgICAgICBpZiAodmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uW2ZpZWxkXSA9IGZvcmNlID8gdGhpcy5leHRlbmQobW9kcywgdmFsdWVzKSA6IHRoaXMuZXh0ZW5kKHZhbHVlcywgbW9kcylcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kc1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtdVN0YXRlczogZnVuY3Rpb24oc3RhdGVzKSB7XG4gICAgICAgIGlmIChzdGF0ZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19tdVN0YXRlcyA9IHRoaXMuZXh0ZW5kKHt9LCB0aGlzLl9fbXVTdGF0ZXMsIHN0YXRlcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX211U3RhdGVzIHx8IHt9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG11TW9kczogZnVuY3Rpb24obW9kcykge1xuICAgICAgICBpZiAobW9kcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19mbGFnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX211TW9kcyA9IHRoaXMuZXh0ZW5kKHt9LCB0aGlzLl9fbXVNb2RzLCBtb2RzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fbXVNb2RzIHx8IHt9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG11U3RhdGU6IGZ1bmN0aW9uKHN0YXRlLCB2YWwpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX19mbGFnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVbc3RhdGVdICE9PSB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1N0YXRlID0ge31cbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGVbc3RhdGVdID0gdmFsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKHRoaXMuX19tdVN0YXRlcyB8fCAodGhpcy5fX211U3RhdGVzID0ge30pKVtzdGF0ZV0gPSB2YWxcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tdVN0YXRlcygpW3N0YXRlXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtdU1vZDogZnVuY3Rpb24obW9kLCB2YWwpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX19mbGFnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVbbW9kXSAhPT0gdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdTdGF0ZSA9IHt9XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlW21vZF0gPSB2YWxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAodGhpcy5fX211TW9kcyB8fCAodGhpcy5fX211TW9kcyA9IHt9KSlbbW9kXSA9IHZhbFxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm11TW9kcygpW21vZF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgdG9nZ2xlTXVNb2QgOiBmdW5jdGlvbihtb2ROYW1lKSB7XG4gICAgICAgIC8vVE9ETzogUmVmYWN0b3IgbWVcbiAgICAgICAgdGhpcy5tdU1vZChtb2ROYW1lLCAhdGhpcy5tdU1vZChtb2ROYW1lKSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIHRhZzogZnVuY3Rpb24odGFnLCBmb3JjZSkge1xuICAgICAgICBpZiAodGFnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAoIXRoaXMuX19qc29uLnRhZyB8fCBmb3JjZSkgJiYgKHRoaXMuX19qc29uLnRhZyA9IHRhZylcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24udGFnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIG1hdGNoOiBmdW5jdGlvbihzZWxlY3RvciwgbWF0Y2hlcikge1xuICAgICAgICBpZiAoIXRoaXMuX19mbGFnKSByZXR1cm4gdGhpc1xuICAgICAgICBpZiAoIXNlbGVjdG9yIHx8ICFtYXRjaGVyKSByZXR1cm4gdGhpc1xuICAgICAgICB2YXIgZGVjbCA9IEJILl9nZXREZWNsKHNlbGVjdG9yKVxuICAgICAgICB0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnMgfHwgKHRoaXMuX19qc29uLiRzdWJNYXRjaGVycyA9IHt9KVxuICAgICAgICB0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnNbZGVjbC5ibG9ja10gfHwgKHRoaXMuX19qc29uLiRzdWJNYXRjaGVyc1tkZWNsLmJsb2NrXSA9IFtdKVxuICAgICAgICB0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnNbZGVjbC5ibG9ja10ucHVzaChbZGVjbCwgbWF0Y2hlcl0pXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIG1peEpzOiBmdW5jdGlvbihtaXgpIHtcbiAgICAgICAgaWYgKG1peC5ibG9jayAmJiBtaXguYmxvY2sgIT09IHRoaXMuX19qc29uLmJsb2NrKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hlcnMgPSB0aGlzLmJoLl9fbWF0Y2hlcnNbbWl4LmJsb2NrXVxuICAgICAgICAgICAgaWYgKG1hdGNoZXJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGpzb24gPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5fX2pzb24pXG4gICAgICAgICAgICAgICAgdGhpcy5leHRlbmQodGhpcy5fX2pzb24sIG1peClcbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5lbGVtID0gbWl4LmVsZW1cbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX3N0b3AgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fbWF0Y2hlZCA9IFtdXG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24uX19tYXRjaGVycyA9IG1hdGNoZXJzXG5cbiAgICAgICAgICAgICAgICB0aGlzLl9faXNNaXggPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5fX3Byb2Nlc3NNYXRjaCgpXG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24gPSBqc29uXG4gICAgICAgICAgICAgICAgdGhpcy5fX2lzTWl4ID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgbWl4OiBmdW5jdGlvbihtaXgsIGZvcmNlKSB7XG4gICAgICAgIGlmIChtaXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uLm1peCA9ICghdGhpcy5fX2pzb24ubWl4IHx8IGZvcmNlKSA/XG4gICAgICAgICAgICAgICAgbWl4IDpcbiAgICAgICAgICAgICAgICAoQXJyYXkuaXNBcnJheSh0aGlzLl9fanNvbi5taXgpID8gdGhpcy5fX2pzb24ubWl4IDogW3RoaXMuX19qc29uLm1peF0pLmNvbmNhdChtaXgpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLm1peFxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb250ZW50OiBmdW5jdGlvbihjb250ZW50LCBmb3JjZSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgICAgICAoIXRoaXMuX19qc29uLmNvbnRlbnQgfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbi5jb250ZW50ID0gY29udGVudClcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uY29udGVudFxuICAgICAgICB9XG4gICAgfSxcbiAgICBwb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fanNvbi4kcG9zaXRpb25cbiAgICB9LFxuICAgIGlzRmlyc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbigpID09PSAxXG4gICAgfSxcbiAgICBpc0xhc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uJGlzTGFzdFxuICAgIH0sXG4gICAganNvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fanNvblxuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgdGhpcy5fX2pzb24uX19zdG9wID0gdHJ1ZVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgYXBwbHlCYXNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fX3Byb2Nlc3NNYXRjaCgpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICBfX3Byb2Nlc3NNYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXRWYWwsXG4gICAgICAgICAgICBjdHggPSB0aGlzLFxuICAgICAgICAgICAganNvbiA9IHRoaXMuX19qc29uLFxuICAgICAgICAgICAgYl8gPSBqc29uLmJsb2NrLFxuICAgICAgICAgICAgX19lID0ganNvbi5lbGVtLFxuICAgICAgICAgICAgbW9kcyA9IHRoaXMubW9kcygpLFxuICAgICAgICAgICAgbWF0Y2hlcnMgPSBqc29uLl9fbWF0Y2hlcnMsXG4gICAgICAgICAgICBpID0gbWF0Y2hlcnMubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgIG1hdGNoZWQgPSBqc29uLl9fbWF0Y2hlZCxcbiAgICAgICAgICAgIG1hdGNoTW9kcyA9IGZ1bmN0aW9uKGRlY2wpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVjbC5tb2ROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RzICYmIG1vZHNbZGVjbC5tb2ROYW1lXSAmJiAobW9kc1tkZWNsLm1vZE5hbWVdID09PSBkZWNsLm1vZFZhbCB8fCBtb2RzW2RlY2wubW9kTmFtZV0gPT09IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goaSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldFZhbCA9IGNiKGN0eCwganNvbilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZWQucHVzaChpKVxuICAgICAgICAgICAgICAgICAgICByZXRWYWwgPSBjYihjdHgsIGpzb24pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBmb3IgKDsgaSA+PSAwICYmICFyZXRWYWwgJiYgIWpzb24uX19zdG9wOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciBydWxlID0gbWF0Y2hlcnNbaV0sXG4gICAgICAgICAgICAgICAgZGVjbCA9IHJ1bGVbMF0sXG4gICAgICAgICAgICAgICAgY2IgPSBydWxlWzFdXG5cbiAgICAgICAgICAgIGlmICh+bWF0Y2hlZC5pbmRleE9mKGkpKSB7IGNvbnRpbnVlIH1cbiAgICAgICAgICAgIGlmIChkZWNsLmVsZW0gfHwgX19lKSB7XG4gICAgICAgICAgICAgICAgKGRlY2wuZWxlbSA9PT0gX19lKSAmJiBtYXRjaE1vZHMoZGVjbClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hNb2RzKGRlY2wpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldFZhbCkgIHtcbiAgICAgICAgICAgIHJldFZhbCA9IFtdLmNvbmNhdChyZXRWYWwpLm1hcChmdW5jdGlvbihyZXRWYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAocmV0VmFsLmJsb2NrICYmIHJldFZhbC5ibG9jayAhPT0ganNvbi5ibG9jaykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlcnMgPSB0aGlzLmJoLl9fbWF0Y2hlcnNbcmV0VmFsLmJsb2NrXSB8fCBbXVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uID0gcmV0VmFsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fc3RvcCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fbWF0Y2hlZCA9IFtdXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fbWF0Y2hlcnMgPSBtYXRjaGVyc1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFZhbC5fX3N0b3AgPSBqc29uLl9fc3RvcFxuICAgICAgICAgICAgICAgICAgICByZXRWYWwuX19tYXRjaGVkID0ganNvbi5fX21hdGNoZWRcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsLl9fbWF0Y2hlcnMgPSBqc29uLl9fbWF0Y2hlcnNcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsLmVsZW0gJiYgKHJldFZhbC5ibG9jayA9IGpzb24uYmxvY2spXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19qc29uID0gcmV0VmFsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX19wcm9jZXNzTWF0Y2goKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fanNvblxuICAgICAgICAgICAgfSwgdGhpcylcbiAgICAgICAgICAgIHJldFZhbC5sZW5ndGggPT0gMSAmJiAocmV0VmFsID0gcmV0VmFsWzBdKVxuICAgICAgICAgICAgdGhpcy5fX2pzb24gPSByZXRWYWxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX19tYXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBiXyA9ICB0aGlzLl9fanNvbi5ibG9jayxcbiAgICAgICAgICAgIHN1Yk1hdGNoZXJzID0gKHRoaXMuX19qc29uLiRzdWJNYXRjaGVycyAmJiB0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnNbYl9dKSB8fCBbXSxcbiAgICAgICAgICAgIG1hdGNoZXJzID0gKHRoaXMuYmguX19tYXRjaGVyc1tiX10gfHwgW10pLmNvbmNhdChzdWJNYXRjaGVycylcblxuICAgICAgICB0aGlzLl9fanNvbi5fX3N0b3AgPSBmYWxzZVxuICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZWQgPSBbXVxuICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZXJzID0gbWF0Y2hlcnNcbiAgICAgICAgdGhpcy5fX3Byb2Nlc3NNYXRjaCgpXG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvc2VDdXJOb2RlKHRoaXMucHJvcHMpXG4gICAgICAgIHRoaXMuX19mbGFnID0gdHJ1ZVxuICAgICAgICB0aGlzLnN0YXRpY3MgfHwgKHRoaXMuc3RhdGljcyA9IHt9KVxuICAgICAgICB0aGlzLl9fc2VsZiA9IHRoaXMuc3RhdGljcztcbiAgICAgICAgdGhpcy5fX21hdGNoKClcbiAgICAgICAgdGhpcy53aWxsTW91bnQoKS5mb3JFYWNoKGZ1bmN0aW9uKHdpbGxNb3VudCkge1xuICAgICAgICAgICAgd2lsbE1vdW50LmJpbmQodGhpcykodGhpcywgdGhpcy5fX2pzb24pXG4gICAgICAgIH0sIHRoaXMpXG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5zdGF0ZSwgdGhpcy5tdVN0YXRlcygpLCB0aGlzLm11TW9kcygpKVxuICAgICAgICB0aGlzLmRpZE1vdW50KCkuZm9yRWFjaChmdW5jdGlvbihkaWRNb3VudCkge1xuICAgICAgICAgICAgZGlkTW91bnQuYmluZCh0aGlzKSh0aGlzLCB0aGlzLl9fanNvbilcbiAgICAgICAgfSwgdGhpcylcbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKHByb3BzKSB7XG4gICAgICAgIHRoaXMud2lsbFJlY2VpdmVQcm9wcygpLmZvckVhY2goZnVuY3Rpb24oYlVwZGF0ZSkge1xuICAgICAgICAgICAgYlVwZGF0ZS5iaW5kKHRoaXMpKHRoaXMsIHByb3BzKVxuICAgICAgICB9LCB0aGlzKVxuICAgICAgICB0aGlzLl9fcHJvcHMgPSBwcm9wc1xuICAgICAgICB0aGlzLl9jb21wb3NlQ3VyTm9kZShwcm9wcylcbiAgICAgICAgdGhpcy5iZWZvcmVVcGRhdGUoKS5mb3JFYWNoKGZ1bmN0aW9uKGJVcGRhdGUpIHtcbiAgICAgICAgICAgIGJVcGRhdGUuYmluZCh0aGlzKSh0aGlzLCB0aGlzLl9fanNvbilcbiAgICAgICAgfSwgdGhpcylcbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fX3Byb3BzKSB7XG4gICAgICAgICAgICB0aGlzLl9fcHJvcHMgPSB1bmRlZmluZWRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvc2VDdXJOb2RlKHRoaXMucHJvcHMpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9fbm9kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgdGhpcy5fX2ZsYWcgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fX21hdGNoKClcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZW5kZXJOb2RlcyA9IGZ1bmN0aW9uKGpzb24sIHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGpzb24ucmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwganNvbikge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGpzb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck5vZGVzKGpzb24sIHJlc3VsdClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbiA9IGpzb25cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNscyA9IHRoaXMuX2J1aWxkQ2xhc3NOYW1lKCkgKyAodGhpcy5jbHMoKSA/ICcgJyArIHRoaXMuY2xzKCkgOiAnJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5fcHJvY2Vzc1RyZWUodGhpcy5jb250ZW50KCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnMgPSB0aGlzLmF0dHJzKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHMgPSB0aGlzLl9ldmVudHMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzID0ge2NoaWxkcmVuOiBjb250ZW50fVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZENhcGl0YWxpemUgJiYgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2tleVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXR0ckNhcGl0YWxpemVkW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfa2V5ID0gdGhpcy5hdHRyQ2FwaXRhbGl6ZWRba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzW19rZXldID0gYXR0cnNba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRyc1trZXldXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpXG5cbiAgICAgICAgICAgICAgICAgICAgY2xzICYmIChwcm9wcy5jbGFzc05hbWUgPSBjbHMpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy50YWcoKSB8fCAnZGl2JywgdGhpcy5leHRlbmQocHJvcHMsIGF0dHJzLCBldmVudHMpKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCByZXN1bHQgfHwgW10pXG4gICAgICAgIH0uYmluZCh0aGlzKVxuXG4gICAgICAgIHZhciBub2RlLFxuICAgICAgICAgICAgbm9kZXMgPSByZW5kZXJOb2RlcyhbXS5jb25jYXQodGhpcy5fX2pzb24pKVxuXG4gICAgICAgIGlmIChub2Rlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbm9kZSA9IG5vZGVzWzBdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlID0gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHtjaGlsZHJlbjogbm9kZXN9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgfSxcblxuICAgIF9jb21wb3NlQ3VyTm9kZTogZnVuY3Rpb24ocHApIHtcbiAgICAgICAgLy9UT0RPOiBUaGluayBhYm91dCBjYWNoaW5nL2RpZmZpbmcgYmVtSnNvblRyZWUvY29udGVudFxuICAgICAgICB0aGlzLl9fanNvbiA9IHRoaXMuZXh0ZW5kKHt9LCBwcCwge2NvbnRlbnQ6IHBwLmNoaWxkcmVuIHx8IHBwLmNvbnRlbnR9KVxuICAgICAgICB2YXIgbW9kcyA9IE9iamVjdC5rZXlzKHRoaXMuX19qc29uKS5yZWR1Y2UoZnVuY3Rpb24obW9kcywga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5WzBdID09PSBCSC5fICYmIChtb2RzW2tleS5zbGljZSgxKV0gPSBwcFtrZXldKSwgbW9kc1xuICAgICAgICB9LCB7fSlcbiAgICAgICAgdGhpcy5fX2Jsb2NrICYmICh0aGlzLl9fanNvbi5ibG9jayA9IHRoaXMuX19ibG9jaylcbiAgICAgICAgdGhpcy5fX2VsZW0gJiYgKHRoaXMuX19qc29uLmVsZW0gPSB0aGlzLl9fZWxlbSlcbiAgICAgICAgaWYgKHRoaXMuX19qc29uLmVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX19qc29uLmVsZW1Nb2RzIHx8ICh0aGlzLl9fanNvbi5lbGVtTW9kcyA9ICh0aGlzLl9fanNvbi5tb2RzIHx8IHt9KSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX19qc29uLm1vZHMgfHwgKHRoaXMuX19qc29uLm1vZHMgPSB7fSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoT2JqZWN0LmtleXMobW9kcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19qc29uLmVsZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5lbGVtTW9kcyA9IHRoaXMuZXh0ZW5kKHRoaXMuX19qc29uLmVsZW1Nb2RzLCBtb2RzKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5tb2RzID0gdGhpcy5leHRlbmQodGhpcy5fX2pzb24ubW9kcywgbW9kcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2J1aWxkQ2xhc3NOYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJfID0gdGhpcy5fX2pzb24uYmxvY2ssXG4gICAgICAgICAgICBfX2UgPSB0aGlzLl9fanNvbi5lbGVtLFxuICAgICAgICAgICAgY2xzID0ge30sXG4gICAgICAgICAgICBtb2RzID0gdGhpcy5leHRlbmQoe30sIHRoaXMubW9kcygpLCB0aGlzLm11TW9kcygpKVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEVuaXR5KGJfLCBfX2UsIG1vZHMsIG1peCkge1xuICAgICAgICAgICAgdmFyIGVudGl0eSA9IGJfXG5cbiAgICAgICAgICAgIGlmIChfX2UpIHtcbiAgICAgICAgICAgICAgICBlbnRpdHkgKz0gQkguX18gKyBfX2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsc1tlbnRpdHldID0gZW50aXR5XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhtb2RzKS5mb3JFYWNoKGZ1bmN0aW9uKG1vZE5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kVmFsdWUgPSBtb2RzW21vZE5hbWVdXG4gICAgICAgICAgICAgICAgaWYgKCFtb2RWYWx1ZSAmJiBtb2RWYWx1ZSAhPT0gMCkgcmV0dXJuXG4gICAgICAgICAgICAgICAgdmFyIG1vZEVudGl0eSA9IGVudGl0eSArIEJILl8gKyBtb2ROYW1lXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtb2RWYWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIEJILm5vQm9vbE1vZHMgJiYgbW9kVmFsdWUgJiYgKG1vZEVudGl0eSArPSBCSC5fICsgJ3llcycpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kRW50aXR5ICs9IEJILl8gKyBtb2RWYWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbHNbbW9kRW50aXR5XSA9IG1vZEVudGl0eVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGJfICYmIGFkZEVuaXR5KGJfLCBfX2UsIG1vZHMsIGZhbHNlKVxuICAgICAgICB0aGlzLl9fanNvbi5taXggJiYgW10uY29uY2F0KHRoaXMuX19qc29uLm1peCkuZm9yRWFjaChmdW5jdGlvbihtaXgpIHtcbiAgICAgICAgICAgIGlmICghbWl4KSB7IHJldHVybiB9XG4gICAgICAgICAgICBpZiAoIW1peC5ibG9jaykge1xuICAgICAgICAgICAgICAgIGlmICghYl8pIHsgcmV0dXJuIH1cbiAgICAgICAgICAgICAgICBtaXguYmxvY2sgPSBiX1xuICAgICAgICAgICAgICAgIG1peC5lbGVtIHx8IChtaXguZWxlbSA9IF9fZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZEVuaXR5KG1peC5ibG9jaywgbWl4LmVsZW0sIG1peC5tb2RzIHx8IG1peC5lbGVtTW9kcyB8fCB7fSwgdHJ1ZSlcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY2xzKS5qb2luKCcgJylcbiAgICB9LFxuICAgIF9wcm9jZXNzVHJlZTogZnVuY3Rpb24odHJlZSwgcG9zaXRpb24pIHtcbiAgICAgICAgdHJlZSA9IFtdLmNvbmNhdCh0cmVlKVxuICAgICAgICBwb3NpdGlvbiB8fCAocG9zaXRpb24gPSB7dmFsOiAwLCBsYXN0OiAwfSlcbiAgICAgICAgcG9zaXRpb24ubGFzdCArPSAodHJlZS5sZW5ndGggLSAxKVxuICAgICAgICB2YXIgY29udGVudCA9IHRyZWUubWFwKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NUcmVlKG5vZGUsIHBvc2l0aW9uKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFub2RlIHx8ICghbm9kZS5ibG9jayAmJiAhbm9kZS5lbGVtICYmICFub2RlLnRhZyAmJiAhbm9kZS5jb250ZW50ICYmICFub2RlLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IG5vZGUudHlwZS5kaXNwbGF5TmFtZVxuICAgICAgICAgICAgICAgIGlmICghbmFtZSkgeyByZXR1cm4gbm9kZSB9XG4gICAgICAgICAgICAgICAgdmFyIGRlY2wgPSBCSC5fZ2V0RGVjbChuYW1lKVxuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLnByb3BzIHx8IHt9XG4gICAgICAgICAgICAgICAgbm9kZS5ibG9jayA9IGRlY2wuYmxvY2sudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIG5vZGUuZWxlbSA9IGRlY2wuZWxlbVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUuZWxlbSkge1xuICAgICAgICAgICAgICAgIG5vZGUuYmxvY2sgfHwgKG5vZGUuYmxvY2sgPSB0aGlzLl9fanNvbi5ibG9jaylcbiAgICAgICAgICAgICAgICBub2RlLnJlZiA9IG5vZGUuYmxvY2sgKyBCSC5fXyArIG5vZGUuZWxlbSArICd+JyArIHRoaXMuZ2VuZXJhdGVJZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9fanNvbi4kdFBhcmFtICYmIChub2RlLiR0UGFyYW0gPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5fX2pzb24uJHRQYXJhbSkpXG4gICAgICAgICAgICBpZiAodGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1Yk1hdGNoZXJzID0gdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzW25vZGUuYmxvY2tdXG4gICAgICAgICAgICAgICAgc3ViTWF0Y2hlcnMgJiYgKChub2RlLiRzdWJNYXRjaGVycyA9IHt9KVtub2RlLmJsb2NrXSA9IHN1Yk1hdGNoZXJzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zaXRpb24ubGFzdCA9PT0gcG9zaXRpb24udmFsID8gKG5vZGUuJGlzTGFzdCA9IHRydWUpIDogKG5vZGUuJGlzTGFzdCA9IGZhbHNlKVxuICAgICAgICAgICAgbm9kZS4kcG9zaXRpb24gPSArK3Bvc2l0aW9uLnZhbFxuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLmJoLkJFTSwgbm9kZSlcbiAgICAgICAgfSwgdGhpcylcbiAgICAgICAgY29udGVudC5sZW5ndGggPT0gMSAmJiAoY29udGVudCA9IGNvbnRlbnRbMF0pXG4gICAgICAgIHJldHVybiBjb250ZW50XG4gICAgfSxcbiAgICBlbGVtOiBmdW5jdGlvbihlbGVtTmFtZSkge1xuICAgICAgICBpZiAodGhpcy5fX2ZsYWcpIHsgcmV0dXJuIH1cbiAgICAgICAgdmFyIGVsZW1zID0gW10uY29uY2F0KHRoaXMuZWxlbUN0eChlbGVtTmFtZSkpLm1hcChmdW5jdGlvbihlbGVtQ3R4KSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbUN0eC5kb21FbGVtKClcbiAgICAgICAgfSlcbiAgICAgICAgZWxlbXMubGVuZ3RoID09IDEgJiYgKGVsZW1zID0gZWxlbXNbMF0pXG4gICAgICAgIHJldHVybiBlbGVtc1xuICAgIH0sXG4gICAgZWxlbUN0eDogZnVuY3Rpb24oZWxlbU5hbWUpIHtcbiAgICAgICAgdmFyIGVsZW1zID0gW10sXG4gICAgICAgICAgICBlbnRpdHkgPSB0aGlzLl9fanNvbi5ibG9jayArIEJILl9fICsgZWxlbU5hbWUsXG4gICAgICAgICAgICBfZWxlbUN0eCA9IGZ1bmN0aW9uKHJlZnMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhyZWZzKS5mb3JFYWNoKGZ1bmN0aW9uKHJlZktleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gcmVmc1tyZWZLZXldXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVmKSB7IHJldHVybiB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWZLZXkuc3BsaXQoJ34nKVswXSA9PT0gZW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtcy5wdXNoKHJlZilcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lbGVtQ3R4KHJlZi5yZWZzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICBfZWxlbUN0eCh0aGlzLnJlZnMpXG4gICAgICAgIGVsZW1zLmxlbmd0aCA9PSAxICYmIChlbGVtcyA9IGVsZW1zWzBdKVxuICAgICAgICByZXR1cm4gZWxlbXNcbiAgICB9LFxuICAgIF9ldmVudHM6IGZ1bmN0aW9uKGV2ZW50cykge1xuICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHNQcm9wcyB8fCAodGhpcy5fZXZlbnRzUHJvcHMgPSB7fSlcbiAgICAgICAgICAgIHRoaXMuZXh0ZW5kKHRoaXMuX2V2ZW50c1Byb3BzLCBldmVudHMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzUHJvcHNcbiAgICAgICAgfVxuICAgIH0sXG4gICAgd2lsbE1vdW50OiBmdW5jdGlvbihjYikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnICYmICh0aGlzLl9fd2lsbE1vdW50IHx8ICh0aGlzLl9fd2lsbE1vdW50ID0gW10pKS5wdXNoKGNiKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fd2lsbE1vdW50IHx8IFtdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGRpZE1vdW50OiBmdW5jdGlvbihjYikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnICYmICh0aGlzLl9fZGlkTW91bnQgfHwgKHRoaXMuX19kaWRNb3VudCA9IFtdKSkucHVzaChjYilcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2RpZE1vdW50IHx8IFtdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgdGhpcy5fX2ZsYWcgJiYgKHRoaXMuX193aWxsUmVjZWl2ZSB8fCAodGhpcy5fX3dpbGxSZWNlaXZlID0gW10pKS5wdXNoKGNiKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fd2lsbFJlY2VpdmUgfHwgW11cbiAgICAgICAgfVxuICAgIH0sXG4vL1RPRE86IERlbGV0ZSB0aGlzIGZuXG4gICAgYmVmb3JlVXBkYXRlOiBmdW5jdGlvbihjYikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnICYmICh0aGlzLl9fYlVwZGF0ZSB8fCAodGhpcy5fX2JVcGRhdGUgPSBbXSkpLnB1c2goY2IpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19iVXBkYXRlIHx8IFtdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJpbmQ6IGZ1bmN0aW9uKGV2ZW50cykge1xuICAgICAgICBpZiAodGhpcy5fX2ZsYWcpIHtcbiAgICAgICAgICAgIHZhciBhdHRycyA9IHt9XG4gICAgICAgICAgICB0aGlzLl9fZXZlbnRzIHx8ICh0aGlzLl9fZXZlbnRzID0ge30pXG4gICAgICAgICAgICBPYmplY3RcbiAgICAgICAgICAgICAgICAua2V5cyhldmVudHMpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24oZXZlbnROYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNiID0gZXZlbnRzW2V2ZW50TmFtZV1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2V2ZW50c1tldmVudE5hbWVdIHx8ICh0aGlzLl9fZXZlbnRzW2V2ZW50TmFtZV0gPSBbXSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2V2ZW50c1tldmVudE5hbWVdLnB1c2goY2IpXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzW2V2ZW50TmFtZV0gPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmJpbmQodGhpcykoZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH0sIHRoaXMpXG5cbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyhhdHRycylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgZG9tRWxlbTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5maW5kRE9NTm9kZSh0aGlzKVxuICAgIH1cbn1cblxuQkguQkVNX0hhemFyZCA9IEJFTV9IYXphcmRcblxucmV0dXJuIEJIXG59KSgpXG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gQkhcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmgpIHtcbiAgICBiaC5tYXRjaCgnbGluaycsIGZ1bmN0aW9uKGN0eCwganNvbikge1xuICAgICAgICB2YXIgYXR0cnMgPSB7fSxcbiAgICAgICAgICAgIHVybCA9IGpzb24udXJsLFxuICAgICAgICAgICAgdGFiaW5kZXggPSBqc29uLnRhYmluZGV4O1xuXG4gICAgICAgIFsndGl0bGUnLCAndGFyZ2V0JywgJ2lkJywgJ3RhYmluZGV4J10uZm9yRWFjaChmdW5jdGlvbihwYXJhbSkge1xuICAgICAgICAgICAganNvbltwYXJhbV0gJiYgKGF0dHJzW3BhcmFtXSA9IGpzb25bcGFyYW1dKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYodGFiaW5kZXgpIHtcbiAgICAgICAgICAgIGN0eC5qcyh7b3JpZ1RhYmluZGV4OiB0YWJpbmRleH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodXJsKSB7XG4gICAgICAgICAgICBjdHgudGFnKCdhJyk7XG4gICAgICAgICAgICBhdHRycy5ocmVmID0gY3R4LmlzU2ltcGxlKHVybCkgPyB1cmwgOiBiaC5hcHBseSh1cmwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4LnRhZygnc3BhbicpO1xuICAgICAgICAgICAgYXR0cnMucm9sZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgYXR0cnMudGFiaW5kZXggfHwgKGF0dHJzLnRhYmluZGV4ID0gMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjdHguYXR0cnMoYXR0cnMpO1xuICAgIH0pO1xuXG4gICAgYmgubWF0Y2goJ2xpbmtfX2lubmVyJywgZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIGN0eC50YWcoJ3NwYW4nKTtcbiAgICB9KTtcbn07XG4iLCJ2YXIgQkggPSByZXF1aXJlKCcuLi8uLi9jb21tb24uYmxvY2tzL2JlbS9iZW0uanMnKVxuXG5CSC5ub0Jvb2xNb2RzID0gdHJ1ZVxuXG52YXIgYmggPSBuZXcgQkgoKVxudmFyIEJFTSA9IGJoLkJFTVxuXG5tb2R1bGUuZXhwb3J0cy5SZWFjdCA9IEJILlJlYWN0XG5tb2R1bGUuZXhwb3J0cy5iaCA9IGJoXG5tb2R1bGUuZXhwb3J0cy5CRU0gPSBCRU1cbiIsIi8vQ291bGQgYmUgZ2VuZXJhdGVkXG52YXIgQkggPSByZXF1aXJlKCcuLi8uLi9kZXNrdG9wLmJsb2Nrcy9iZW0vYmVtLmpzJylcbnZhciBiaCA9IEJILmJoXG5cbnJlcXVpcmUoJy4uLy4uL2NvbW1vbi5ibG9ja3MvbGluay9saW5rLmJoLmpzJykoYmgpXG5cbnZhciBMaW5rID0gQkguUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnbGluaycsXG4gICAgX19ibG9jazogJ2xpbmsnLFxuICAgIF9fbWF0Y2hlcnM6IGJoLl9fbWF0Y2hlcnMsXG4gICAgbWl4aW5zOiBbQkguQkVNX0hhemFyZF0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19ub2RlKClcbiAgICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IExpbmtcbiIsInZhciBCSCA9IHJlcXVpcmUoJy4uL2Rlc2t0b3AuYmxvY2tzL2JlbS9iZW0uanMnKVxudmFyIEJFTSA9IEJILkJFTVxuXG52YXIgTGluayA9IHJlcXVpcmUoJy4uL2Rlc2t0b3AuYnVuZGxlL2xpbmsvbGluay5qcycpXG5cbnZhciBFeGFtcGxlID0gQkguUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QkVNIGF0dHJzPXt7c3R5bGU6e21hcmdpbjogMjB9fX0+XG4gICAgICAgICAgICAgICAgPExpbmsgdXJsPSdodHRwOi8veWEucnUnPlxuICAgICAgICAgICAgICAgICAgICDQodCw0LzQsNGPINC/0L7RgdC10YnQsNC10LzQsNGPINGB0YLRgNCw0L3QuNGG0LAg0KDRg9C90LXRgtCwXG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPC9CRU0+XG4gICAgICAgIClcbiAgICB9XG59KVxuXG5SZWFjdC5yZW5kZXIoXG4gICAgPEV4YW1wbGUgLz4sXG4gICAgZG9jdW1lbnQuYm9keVxuKVxuIixudWxsLCIndXNlIHN0cmljdCc7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIFRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBvd25FbnVtZXJhYmxlS2V5cyhvYmopIHtcblx0dmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xuXG5cdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0a2V5cyA9IGtleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKSk7XG5cdH1cblxuXHRyZXR1cm4ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuXHRcdHJldHVybiBwcm9wSXNFbnVtZXJhYmxlLmNhbGwob2JqLCBrZXkpO1xuXHR9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIGtleXM7XG5cdHZhciB0byA9IFRvT2JqZWN0KHRhcmdldCk7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gYXJndW1lbnRzW3NdO1xuXHRcdGtleXMgPSBvd25FbnVtZXJhYmxlS2V5cyhPYmplY3QoZnJvbSkpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0b1trZXlzW2ldXSA9IGZyb21ba2V5c1tpXV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiJdfQ==
