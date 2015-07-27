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

},{"object-assign":13,"react":12}],2:[function(require,module,exports){
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
module.exports = function(bh) {
    bh.match('popup2_visible_yes', function(ctx, json) {
debugger
        if (ctx.__flag) { return }

        json.mainOffset = 0
        json.secondaryOffset = 0
        json.viewportOffset = 0

//TODO: reWrite this
        var p = ctx.domElem()
        p.classList.add('popup2_outside_yes')
        p.classList.add('popup2_visible_yes')

        ctx
        //    .bindToWin('scroll resize', this._onWinScollAndResize)
            // Перед перерисовкой выносим попап за viewport и ставим display: block, чтобы правильно
            // снимались его размеры
         ////   .setMod('outside', 'yes')
            //.mod('outside', 'yes')
            .redraw()
           // .delMod('outside');
            //.mod('outside', undefined);
        p.classList.remove('popup2_outside_yes')
    })

    bh.match('popup2_visible_no', function(ctx, json) {
        if (ctx.__flag) { return }

        //this.unbindFromWin('scroll resize');
    })
    bh.match('popup_target', function(ctx, json) {
        debugger
        ctx
            .didMount(function(ctx) {
                debugger

                this.__self.VIEWPORT_ACCURACY_FACTOR = 0.99

                this.__self.AVAILABLE_DIRECTIONS = [
                    'bottom-left', 'bottom-center', 'bottom-right',
                    'top-left', 'top-center', 'top-right',
                    'right-top', 'right-center', 'right-bottom',
                    'left-top', 'left-center', 'left-bottom'
                ]

                
                            //directions: this.__self.AVAILABLE_DIRECTIONS

/* ***
                onSetMod: {
                    'js': {
                        'inited': function() {
    *** */
                var AVAILABLE_DIRECTIONS = this.__self.AVAILABLE_DIRECTIONS;

                //TODO: this.getParam, this.params from ctx.js()
                //this.params.directions.forEach(function(direction) {
                json.directions.forEach(function(direction) {
                    if(AVAILABLE_DIRECTIONS.indexOf(direction) === -1) {
                        throw new Error('Can\'t init popup with "' + direction + '" direction. Available directions: ' +
                        AVAILABLE_DIRECTIONS.join(', '));
                    }
                });

                this._lastDrawingCss = {
                    left: undefined,
                    top: undefined,
                    zIndex: undefined,
                    display: undefined
                };



                this.redraw = function() {
                    debugger
                    json.mainOffset = 0
                    json.secondaryOffset = 0
                    json.viewportOffset = 0
                    //if(!this.hasMod('visible', 'yes') && !this.hasMod('outside', 'yes')) {
                    //    return this;
                    //}
                    if(ctx.mod('visible') !== 'yes') {
                        return this
                    }

                    var bestDrawingParams = this._calcBestDrawingParams();

                    //this.setMod('direction', bestDrawingParams.direction);
                    ctx.mod('direction', bestDrawingParams.direction)

                    var lastDrawingCss = this._lastDrawingCss,
                        needUpdateCss = false;

                    //$.each(
                    //    this._calcDrawingCss(bestDrawingParams),
                    //    function(name, val) {
                    //        if(lastDrawingCss[name] !== val) {
                    //            lastDrawingCss[name] = val;
                    //            needUpdateCss = true;
                    //        }
                    //    });
                    var css = this._calcDrawingCss(bestDrawingParams)
                    Object.keys(css).forEach(function(name, val) {
                        val = css[name]
                        if(lastDrawingCss[name] !== val) {
                            lastDrawingCss[name] = val;
                            needUpdateCss = true;
                        }
                    })

                    if(needUpdateCss) {
                        //this.domElem.css(lastDrawingCss);
debugger
                        this.attr('style', lastDrawingCss)
                    }

                    return this;
                }

                /**
                 * @private
                 */
                this._calcDrawingCss = function(drawingParams) {
                    return {
                        left: drawingParams.left,
                        top: drawingParams.top
                    };
                }

                /**
                 * Возвращает массив возможных параметров раскрытия с максимально доступной площадью.
                 * Каждый элемент массива описывает прямоугольную область, в которой может находиться попап. Формат элемента:
                 *
                 * ```js
                 * {
                 *     direction: 'bottom-left', // направление
                 *     height: 540,              // доступная высота области
                 *     width: 1000,              // доступная ширина области
                 *     left: 10,                 // левая координата области
                 *     top: 30                   // верхняя координата области
                 * }
                 * ```
                 *
                 * Не стоит путать параметры `top`/`left` с позицией попапа. Тут эти параметры указывают на позицию доступной
                 * области, а не попапа.
                 *
                 * @public
                 * @returns {Object[]}
                 */
                this.calcPossibleDrawingParams = function() {
                    var target = this._calcTargetDimensions(),
                        viewport = this._calcViewportDimensions(),
                        //params = this.params,
                        params = json,
                        mainOffset = params.mainOffset,
                        secondaryOffset = params.secondaryOffset,
                        viewportOffset = params.viewportOffset;

                    //return this.params.directions.map(function(direction) {
                    return params.directions.map(function(direction) {
                        var res = {
                            direction: direction,
                            width: 0,
                            height: 0,
                            left: 0,
                            top: 0
                        };

                        if(this._checkMainDirection(direction, 'bottom')) {
                            res.top = target.top + target.height + mainOffset;
                            res.height = viewport.bottom - res.top - viewportOffset;
                        } else if(this._checkMainDirection(direction, 'top')) {
                            res.height = target.top - viewport.top - mainOffset - viewportOffset;
                            res.top = target.top - res.height - mainOffset;
                        } else {
                            if(this._checkSecondaryDirection(direction, 'center')) {
                                res.height = viewport.bottom - viewport.top - 2 * viewportOffset;
                                res.top = target.top + (target.height - res.height) / 2;
                            } else if(this._checkSecondaryDirection(direction, 'bottom')) {
                                res.height = target.top + target.height - viewport.top - secondaryOffset - viewportOffset;
                                res.top = target.top + target.height - res.height - secondaryOffset;
                            } else if(this._checkSecondaryDirection(direction, 'top')) {
                                res.top = target.top + secondaryOffset;
                                res.height = viewport.bottom - res.top - viewportOffset;
                            }

                            if(this._checkMainDirection(direction, 'left')) {
                                res.width = target.left - viewport.left - mainOffset - viewportOffset;
                                res.left = target.left - res.width - mainOffset;
                            } else {
                                res.left = target.left + target.width + mainOffset;
                                res.width = viewport.right - res.left - viewportOffset;
                            }
                        }

                        if(this._checkSecondaryDirection(direction, 'right')) {
                            res.width = target.left + target.width - viewport.left - secondaryOffset - viewportOffset;
                            res.left = target.left + target.width - res.width - secondaryOffset;
                        } else if(this._checkSecondaryDirection(direction, 'left')) {
                            res.left = target.left + secondaryOffset;
                            res.width = viewport.right - res.left - viewportOffset;
                        } else if(this._checkSecondaryDirection(direction, 'center')) {
                            if(this._checkMainDirection(direction, 'top', 'bottom')) {
                                res.width = viewport.right - viewport.left - 2 * viewportOffset;
                                res.left = target.left + target.width / 2 - res.width / 2;
                            }
                        }

                        return res;
                    }, this);
                }

                /**
                 * Вычисляет лучшие параметры отображения. Под лучшими параметрами понимаются параметры для первого подходящего
                 * направления из directions, которое может обеспечить размещение 99% (VIEWPORT_ACCURACY_FACTOR) площади попапа.
                 * Если подходящего направления не найдено, то предпочтение отдается направлению, в котором попап открывался
                 * последний раз, или первому направлению из списка.
                 *
                 * @private
                 */
                this._calcBestDrawingParams = function() {
                    var popup = this._calcPopupDimensions(),
                        target = this._calcTargetDimensions(),
                        viewport = this._calcViewportDimensions(),
                        //directions = this.params.directions,
                        directions = json.directions,
                        directionsLength = directions.length,
                        direction,
                        pos,
                        viewportFactor,
                        bestDirection,
                        bestPos,
                        bestViewportFactor;

                    for(var i = 0; i < directionsLength; i++) {
                        direction = directions[i];
                        pos = this._calcPos(direction, target, popup);
                        viewportFactor = this._calcViewportFactor(pos, viewport, popup);

                        if(i === 0 ||
                            viewportFactor > bestViewportFactor ||
                            (!bestViewportFactor && this.hasMod('direction', direction))) {

                            bestDirection = direction;
                            bestViewportFactor = viewportFactor;
                            bestPos = pos;
                        }

                        if(bestViewportFactor > this.__self.VIEWPORT_ACCURACY_FACTOR) {
                            break;
                        }
                    }

                    return {
                        direction: bestDirection,
                        left: bestPos.left,
                        top: bestPos.top
                    };
                }

                /**
                 * @private
                 */
                this._calcPopupDimensions = function() {
                    //var popupWidth = this.domElem.outerWidth(),
                    //    popupHeight = this.domElem.outerHeight();

                    var dom = this.domElem(),
                        popupWidth = dom.offsetWidth,
                        popupHeight = dom.offsetHeight


                    return {
                        width: popupWidth,
                        height: popupHeight,
                        area: popupWidth * popupHeight
                    };
                }

                /**
                 * @abstract
                 * @private
                 */
                this._calcTargetDimensions = function() {}

                /**
                 * @private
                 */
                this._calcViewportDimensions = function() {
                    //var win = BEM.DOM.win,
                    var win = window,
                        //winTop = win.scrollTop(),
                        winTop = win.pageYOffset,
                        //winLeft = win.scrollLeft(),
                        winLeft = win.pageXOffset,
                        //winWidth = win.width(),
                        winWidth = win.innerWidth,
                        //winHeight = win.height();
                        winHeight = win.innerHeight

                    return {
                        top: winTop,
                        left: winLeft,
                        bottom: winTop + winHeight,
                        right: winLeft + winWidth
                    };
                }

                /**
                 * Вычисляет координаты попапа для заданного направления
                 *
                 * @private
                 * @param {String} direction Строка типа bottom-left
                 * @param {Object} target    Размеры target-a: top, left, width, height
                 * @param {Object} popup     Размеры попапа: width, height, area
                 * @returns {Object}         Координаты попапа: left, top
                 */
                this._calcPos = function(direction, target, popup) {
                    var res = {},
                        //mainOffset = this.params.mainOffset,
                        mainOffset = json.mainOffset,
                        secondaryOffset = json.secondaryOffset;

                    if(this._checkMainDirection(direction, 'bottom')) {
                        res.top = target.top + target.height + mainOffset;
                    } else if(this._checkMainDirection(direction, 'top')) {
                        res.top = target.top - popup.height - mainOffset;
                    } else if(this._checkMainDirection(direction, 'left')) {
                        res.left = target.left - popup.width - mainOffset;
                    } else if(this._checkMainDirection(direction, 'right')) {
                        res.left = target.left + target.width + mainOffset;
                    }

                    if(this._checkSecondaryDirection(direction, 'right')) {
                        res.left = target.left + target.width - popup.width - secondaryOffset;
                    } else if(this._checkSecondaryDirection(direction, 'left')) {
                        res.left = target.left + secondaryOffset;
                    } else if(this._checkSecondaryDirection(direction, 'bottom')) {
                        res.top = target.top + target.height - popup.height - secondaryOffset;
                    } else if(this._checkSecondaryDirection(direction, 'top')) {
                        res.top = target.top + secondaryOffset;
                    } else if(this._checkSecondaryDirection(direction, 'center')) {
                        if(this._checkMainDirection(direction, 'top', 'bottom')) {
                            res.left = target.left + target.width / 2 - popup.width / 2;
                        } else if(this._checkMainDirection(direction, 'left', 'right')) {
                            res.top = target.top + target.height / 2 - popup.height / 2;
                        }
                    }

                    return res;
                }

                /**
                 * Вычисляет коэффициент (factor) пересечения доступной площади для открытия попапа и собственной площади попапа.
                 * @private
                 */
                this._calcViewportFactor = function(pos, viewport, popup) {
                    //var viewportOffset = this.params.viewportOffset,
                    var viewportOffset = json.viewportOffset,
                        intersectionLeft = Math.max(pos.left, viewport.left + viewportOffset),
                        intersectionRight = Math.min(pos.left + popup.width, viewport.right - viewportOffset),
                        intersectionTop = Math.max(pos.top, viewport.top + viewportOffset),
                        intersectionBottom = Math.min(pos.top + popup.height, viewport.bottom - viewportOffset);

                    if(intersectionLeft < intersectionRight && intersectionTop < intersectionBottom) {
                        // есть пересечение
                        return (intersectionRight - intersectionLeft) * (intersectionBottom - intersectionTop) / popup.area;
                    } else {
                        return 0;
                    }
                }

                /**
                 * @private
                 */
                this._checkMainDirection = function(direction, mainDirection1, mainDirection2) {
                    return direction.indexOf(mainDirection1) === 0 || (mainDirection2 && direction.indexOf(mainDirection2) === 0);
                }

                /**
                 * @private
                 */
                this._checkSecondaryDirection = function(direction, secondaryDirection) {
                    return direction.indexOf('-' + secondaryDirection) > 0;
                }

                /**
                 * @private
                 */
                this._checkDirection = function(direction, directionPart) {
                    return direction.indexOf(directionPart) >= 0;
                }

                /**
                 * @private
                 */
                this._onWinScollAndResize = function(e) {
                    this.redraw();
                }

                /**
                 * @protected
                 */
                this.getDefaultParams = function() {
                    return $.extend(
                        this.__base.apply(this, arguments),
                        {
                            mainOffset: 0,
                            secondaryOffset: 0,
                            viewportOffset: 0,
                            directions: this.__self.AVAILABLE_DIRECTIONS
                        });
                }


        })
    })
}

},{}],4:[function(require,module,exports){
module.exports = function(bh) {

    bh.match('popup2_visible_yes', function(ctx, json) {
debugger
        if (ctx.__flag) { return }

        json.mainOffset = 0
        json.secondaryOffset = 0
        json.viewportOffset = 0

        if(!ctx._anchor) {
            throw new Error('Can\'t show popup without anchor');
        }

        //ctx._anchorParents = this._anchor.parents();
        //ctx._bindToAnchorParents();
    })

    bh.match('popup2_visible_no', function(ctx, json) {
        if (ctx.__flag) { return }

        //this._unbindFromAnchorParents();
        this._anchorParents = null;
        this._isAnchorVisible = undefined;
    })

    bh.match('popup2_target_anchor', function(ctx, json) {
        debugger
        ctx.mixJs({block: 'popup', mods: {'target': true}})
        ctx
            .didMount(function(ctx) {
                debugger
                this._anchor = null;
                this._anchorParents = null;
                this._destructor = null;
                this._isAnchorVisible = undefined;
                //this._updateIsAnchorVisible = $.throttle(
                //    this._updateIsAnchorVisible,
                //    this.__self.UPDATE_TARGET_VISIBILITY_THROTTLING_INTERVAL,
                //    this);







                /**
                 * Устанавливает цель, относительно которой нужно открываться.
                 *
                 * @param {jQuery|BEM.DOM} anchor
                 * @returns {BEM.DOM.popup2} this
                 */
                this.setAnchor = function(anchor) {
debugger
                    this
                        ._unbindFromAnchorParents()
                        ._unbindFromParentPopup()
                        ._unbindFromDestructor();

                    //this._anchor = anchor instanceof BEM.DOM ?
                    //    anchor.domElem :
                    //    anchor;
                    this._anchor = anchor

                    //this._destructor = beminize(this._anchor, '_' + this.__self.getName() + '-destructor');
                    this._isAnchorVisible = undefined;

                    //this._bindToDestructor();

                    //if(this.hasMod('visible', 'yes')) {
                    if(this.mod('visible') === 'yes') {
                        this._anchorParents = this._anchor.parents();
                        this
                            ._recaptureZIndex()
                            ._bindToAnchorParents()
                            ._bindToParentPopup()
                            .redraw();
                    } else {
                        this._anchorParents = null;
                        this._zIndexGroupLevel = null;
                    }

                    return this;
                }

                /**
                 * @override
                 * @private
                 */
                this._calcTargetDimensions = function() {
                    var anchor = this._anchor,
                        anchorPos = this._getOffsetOf(anchor);

                    return {
                        left: anchorPos.left,
                        top: anchorPos.top,
                        //width: anchor.outerWidth(),
                        //height: anchor.outerHeight()
                        width: anchor.offsetWidth,
                        height: anchor.offsetHeight
                    };
                }

                /**
                 * Возвращает позицию элемента относительно начала страницы с учетом ошибок IE на Windows Phone.
                 * @see https://st.yandex-team.ru/ISLCOMPONENTS-1627
                 *
                 * @private
                 * @param {jQuery} elem
                 * @returns {Object}
                 */
                this._getOffsetOf = function(elem) {
                    //var offset = elem.offset();
                    var rect = elem.getBoundingClientRect()
                    var offset = {
                        top: rect.top + document.body.scrollTop,
                        left: rect.left + document.body.scrollLeft
                    }

                    if('pageYOffset' in window) {
                        // Обычно эти разности равны 0, так что не IE и не заметит.
                        offset.top -= (window.pageYOffset - (document.documentElement.scrollTop || document.body.scrollTop));
                        offset.left -= (window.pageXOffset - (document.documentElement.scrollLeft || document.body.scrollLeft));
                    }

                    return offset;
                }

                /**
                 * @override
                 * @private
                 */
                    var __calcDrawingCss = function(drawingParams) {
                        return {
                            left: drawingParams.left,
                            top: drawingParams.top
                        };
                    }
                this._calcDrawingCss = function(drawingParams) {
                    if(typeof this._isAnchorVisible === 'undefined') {
                        this._isAnchorVisible = this._calcIsAnchorVisible();
                    }

                    return this.extend(
                        __calcDrawingCss(drawingParams),
                        {display: this._isAnchorVisible ? '' : 'none'});
                }

                /**
                 * Вычисляет, видим ли сейчас anchor попапа.
                 * @private
                 * @returns {Boolean}
                 */
                this._calcIsAnchorVisible = function() {
                    var anchor = this._anchor,
                        anchorOffset = this._getOffsetOf(anchor),
                        anchorLeft = anchorOffset.left,
                        anchorTop = anchorOffset.top,
                        //anchorRight = anchorLeft + anchor.outerWidth(),
                        //anchorBottom = anchorTop + anchor.outerHeight(),
                        anchorRight = anchorLeft + anchor.offsetWidth,
                        anchorBottom = anchorTop + anchor.offsetHeight,
                        //direction = this.getMod('direction'),
                        direction = this.mod('direction'),
                        vertBorder = Math.floor(this._checkDirection(direction, 'top') ? anchorTop : anchorBottom),
                        horizBorder = Math.floor(this._checkDirection(direction, 'left') ? anchorLeft : anchorRight),
                        res = true;

                    this._anchorParents && this._anchorParents.each(function(idx, parent) {
                        if(parent.tagName === 'BODY') {
                            return false;
                        }

                        parent = $(parent);

                        var re = /scroll|hidden|auto/,
                            hasOverflowY = re.test(parent.css('overflow-y')),
                            hasOverflowX = re.test(parent.css('overflow-x'));

                        if(hasOverflowY || hasOverflowX) {
                            var parentOffset = this._getOffsetOf(parent);

                            if(hasOverflowY) {
                                var parentTopOffset = Math.floor(parentOffset.top);
                                if(vertBorder < parentTopOffset || parentTopOffset + parent.outerHeight() < vertBorder) {
                                    res = false;
                                    return res;
                                }
                            }

                            if(hasOverflowX) {
                                var parentLeftOffset = Math.floor(parentOffset.left);
                                res = horizBorder >= parentLeftOffset && parentLeftOffset + parent.outerWidth() >= horizBorder;
                                return res;
                            }
                        }
                    }.bind(this));

                    return res;
                }

                /**
                 * @private
                 */
                this._calcZIndexGroupLevel = function() {
                    var res = this.__base.apply(this, arguments);

                    return this._destructor.findBlocksOutside('z-index-group').reduce(
                        function(res, zIndexGroup) {
                            return res + Number(zIndexGroup.getMod('level'));
                        },
                        res);
                }

                /**
                 * @private
                 */
                this._bindToAnchorParents = function() {
                    return this.bindTo(
                        this._anchorParents,
                        'scroll',
                        this._onAnchorParentsScroll);
                }

                /**
                 * @private
                 */
                this._unbindFromAnchorParents = function() {
                    this._anchorParents && this.unbindFrom(
                        this._anchorParents,
                        'scroll');
                    return this;
                }

                /**
                 * @private
                 */
                this._onAnchorParentsScroll = function() {
                    this
                        .redraw()
                        ._updateIsAnchorVisible();
                }

                /**
                 * @override
                 * @private
                 */
                this._onWinScollAndResize = function() {
                    this.__base.apply(this, arguments);
                    this._updateIsAnchorVisible();
                }

                /**
                 * Скрывает попап, если anchor не видим (ушел за полосы прокрутки) и наоборот.
                 * @private
                 */
                this._updateIsAnchorVisible = function() {
                    if(!this.domElem || !this.hasMod('visible')) {
                        return;
                    }

                    var isAnchorVisible = this._calcIsAnchorVisible();
                    if(isAnchorVisible !== this._isAnchorVisible) {
                        this._isAnchorVisible = isAnchorVisible;
                        this.redraw();
                    }
                }

                /**
                 * @private
                 */
                this._bindToDestructor = function() {
                    this._destructor.on('destruct', this._onPopupAnchorDestruct, this);
                    return this;
                }

                /**
                 * @private
                 */
                this._unbindFromDestructor = function() {
                    this._destructor && this._destructor.un('destruct', this._onPopupAnchorDestruct, this);
                    return this;
                }

                /**
                 * @private
                 */
                this._onPopupAnchorDestruct = function() {
                    this.domElem && BEM.DOM.destruct(this.domElem);
                }

                /**
                 * @private
                 */
                this._getParentPopup = function() {
                    if(this._parentPopup === undefined) {
                        this._parentPopup = this.findBlockOutside(this._anchor, this.__self.getName());
                    }

                    return this._parentPopup;
                }
                


            })
    })
}

},{}],5:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('popup2_target_position', function(ctx, json) {
    })
}

},{}],6:[function(require,module,exports){
module.exports = function(bh) {

/* ***
        'visible': {
            'yes': function() {
*** */
    bh.match('popup2_visible_yes', function(ctx, json) {
debugger
        if (ctx.__flag) { return }

        ctx
            ._captureZIndex()
    })

    bh.match('popup2_visible_no', function(ctx, json) {
        if (ctx.__flag) { return }

        ctx
            ._releaseZIndex()
    })

    bh.match('popup2', function(ctx, json) {
        ctx
            .willReceiveProps(function(ctx, json) {
                //to persist zIndex style attr
                json.attrs = ctx.attrs()
            })
            .willMount(function(ctx, json) {
                debugger
                ctx.mod('js', 'inited')
            })
            .didMount(function(ctx, json) {

                    document.body.appendChild(ctx.domElem())
/* ***
                onSetMod: {
                    'js': {
                        'inited': function() {
    *** */

                    ctx._parentPopup = undefined; // Тут важен undefined. Означает, что попап еще не искали.
                    ctx._zIndex = null;
                    ctx._zIndexGroupLevel = null;
                    ctx._isAttachedToScope = false;
    /* ***
                    getDefaultParams: function() {
                        return {
                            zIndexGroupLevel: 0
                        };
                    }
    *** */
                    this.params = {
                        zIndexGroupLevel: 0
                    }

                    /**
                     * Хранит стеки всех z-index для открытых попапов. Имеет такую структуру:
                     * {
                     *    0: [1000, 1001, 1002], // ключ - это уровень, значения в массиве - это занятые z-index-ы
                     *    9: [10000, 10001]
                     *    // ..
                     * }
                     *
                     * @private
                     */
                    this.__self._visiblePopupsZIndexes = {}

                    /**
                     * @private
                     */
                    this.__self.ZINDEX_FACTOR = 1000



            /**
             * @private
             */
            ctx._calcZIndexGroupLevel = function() {
                var res = this.params.zIndexGroupLevel,
                    parentPopup = this._getParentPopup();

                if(parentPopup) {
                    res += parentPopup._zIndexGroupLevel;
                }

                return res;
            }

            /**
             * Выставляет себе и всем родительским попапам флаг для предотвращения закрытия по клику.
             * @private
             */
            ctx._setPreventHideByClick = function() {
                var curPopup = this;
                do {
                    curPopup._preventHideByClick = true;
                    curPopup = curPopup._getParentPopup();
                } while(curPopup);
            }

            /**
             * @private
             */
            ctx._bindToParentPopup = function() {
                var parentPopup = this._getParentPopup();
                parentPopup && parentPopup.on('beforeClose', this._onParentPopupClose, this);

                return this;
            }

            /**
             * @private
             */
            ctx._unbindFromParentPopup = function() {
                this._parentPopup && this._parentPopup.un('beforeClose', this._onParentPopupClose, this);
                this._parentPopup = undefined;

                return this;
            }

            /**
             * @private
             */
            ctx._onParentPopupClose = function() {
                this.delMod('visible');
            },

            /**
             * @private
             */
            ctx._getParentPopup = function() {
                return this._parentPopup;
            }

            /**
             * Занимает наименьший свободный z-index в стеке для своего уровня. Выставляет его DOM-элементу.
             * @private
             */
            ctx._captureZIndex = function() {
                if(this._zIndexGroupLevel === null) {
                    this._zIndexGroupLevel = this._calcZIndexGroupLevel();
                }

                var visiblePopupsZIndexes = this.__self._visiblePopupsZIndexes,
                    level = this._zIndexGroupLevel,
                    zIndexes = visiblePopupsZIndexes[level],
                    prevZIndex = this._zIndex;

                if(!zIndexes) {
                    zIndexes = visiblePopupsZIndexes[level] = [(level + 1) * this.__self.ZINDEX_FACTOR];
                }

                this._zIndex = zIndexes[zIndexes.length - 1] + 1;
                zIndexes.push(this._zIndex);

                if(this._zIndex !== prevZIndex) {
debugger
                    var style = this.attr('style')
                    this.attr('style', this.extend(style, {'zIndex': this._zIndex}), true)
                    //this.domElem().style['z-index'] = this._zIndex
                }

                return this;
            }

            /**
             * Освобождает z-index в стеке.
             * @private
             */
            ctx._releaseZIndex = function() {
                var zIndexes = this.__self._visiblePopupsZIndexes[this._zIndexGroupLevel];
                zIndexes.splice(zIndexes.indexOf(this._zIndex), 1);

                return this;
            },

            /**
             * Освобождает z-index в стеке, пересчитывает заново свой уровень (нужно, если попап переместили к другому anchor)
             * и занимает z-index заново.
             * @private
             */
            ctx._recaptureZIndex = function() {
                this._releaseZIndex();
                this._zIndexGroupLevel = null;

                return this._captureZIndex();
            }
        })
            
    })
}

},{}],7:[function(require,module,exports){
var BH = require('../../common.blocks/bem/bem.js')

BH.noBoolMods = true

var bh = new BH()
var BEM = bh.BEM

module.exports.React = BH.React
module.exports.bh = bh
module.exports.BEM = BEM

},{"../../common.blocks/bem/bem.js":1}],8:[function(require,module,exports){
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

},{"../../common.blocks/link/link.bh.js":2,"../../desktop.blocks/bem/bem.js":7}],9:[function(require,module,exports){
//Could be generated
var BH = require('../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../common.blocks/popup2/popup2.bhz.js')(bh)
require('../../common.blocks/popup2/_target/popup2_target.js')(bh)
require('../../common.blocks/popup2/_target/popup2_target_anchor.js')(bh)
require('../../common.blocks/popup2/_target/popup2_target_position.js')(bh)

module.exports = BH.React.createClass({
    displayName: 'popup',
    __block: 'popup',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    }
})

},{"../../common.blocks/popup2/_target/popup2_target.js":3,"../../common.blocks/popup2/_target/popup2_target_anchor.js":4,"../../common.blocks/popup2/_target/popup2_target_position.js":5,"../../common.blocks/popup2/popup2.bhz.js":6,"../../desktop.blocks/bem/bem.js":7}],10:[function(require,module,exports){
module.exports=    [
        // directions table
        (function() {
            var test = function(direction) {
                return {
                    block: 'test', js: true, content: [
                        {block: 'link', mods: {pseudo: 'yes'}, content: direction},
                        {
                            block: 'popup2',
                            mix: {block: 'test', elem: 'popup'},
                            mods: {target: 'anchor', autoclosable: 'yes', theme: 'normal'},
                            directions: [direction],
                            content: 'the popup'
                        }
                    ]
                };
            };

            var positioned = {block: 'test', js: {position: [50, 50]}, content: [
                {
                    block: 'link',
                    mods: {pseudo: 'yes'},
                    content: 'popup at 50x50'
                },
                {
                    block: 'popup2',
                    mix: {block: 'test', elem: 'popup'},
                    mods: {target: 'position', theme: 'normal'},
                    content: 'the popup'
                }
            ]};

            return {
                block: 'directions',
                content: [
                    {elem: 'row', content: [
                        {elem: 'cell'},
                        {elem: 'cell', mods: {align: 'left'}, content: test('top-left')},
                        {elem: 'cell', mods: {align: 'center'}, content: test('top-center')},
                        {elem: 'cell', mods: {align: 'right'}, content: test('top-right')},
                        {elem: 'cell'}
                    ]},
                    {elem: 'row', content: [
                        {elem: 'cell', mods: {align: 'right'}, content: test('left-top')},
                        {elem: 'cell', mods: {align: 'center', border: 'yes'}, attrs: {colspan: 3, rowspan: 3},
                            content: ''},
                        {elem: 'cell', mods: {align: 'left'}, content: test('right-top')}
                    ]},
                    {elem: 'row', content: [
                        {elem: 'cell', mods: {align: 'right'}, content: test('left-center')},
                        {elem: 'cell', mods: {align: 'left'}, content: test('right-center')}
                    ]},
                    {elem: 'row', content: [
                        {elem: 'cell', mods: {align: 'right'}, content: test('left-bottom')},
                        {elem: 'cell', mods: {align: 'left'}, content: test('right-bottom')}
                    ]},
                    {elem: 'row', content: [
                        {elem: 'cell'},
                        {elem: 'cell', mods: {align: 'left'}, content: test('bottom-left')},
                        {elem: 'cell', mods: {align: 'center'}, content: test('bottom-center')},
                        {elem: 'cell', mods: {align: 'right'}, content: test('bottom-right')},
                        {elem: 'cell'}
                    ]}
                ]
            };
        })(),
    ]

},{}],11:[function(require,module,exports){
var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

BH.bh
    .match('popup2_visible_yes', function(ctx, json) {})
BH.bh
    .match('popup2_visible_yes', function(ctx, json) {
debugger
        var style = ctx.attr('style') || {},
            zIndex = style.zIndex
        zIndex && ctx.attr('data-z-index', zIndex)
    })

var Link = require('../desktop.bundle/link/link.js')
var Popup = require('../desktop.bundle/popup2/popup2.js')

var bemJson = require('./popup.bem.json')

BH.bh
    .match('directions', function(ctx) {
        ctx.tag('table')
    })
    .match('directions__row', function(ctx) {
        ctx.tag('tr')
    })
    .match('directions__cell', function(ctx) {
        ctx.tag('td')
    })


    .match('test', function(ctx) {
        ctx
            .muStates({
                'popup-opened': false
            })

            .match('link', function(ctxL) {
                ctxL.bind({
                    onClick: function(e) {
                        ctx._anchor = e.target
                        ctx.muState('popup-opened', !ctx.muState('popup-opened'))
                    }
                })
            })

            .match('popup2', function(ctxP) {
                ctx._anchor && (ctxP._anchor || ctxP.setAnchor(ctx._anchor))
                ctxP.mod('visible', ctx.muState('popup-opened') ? 'yes' : 'no', true)
            })
    })

var Example = BH.React.createClass({
    render: function() {
        return (
            React.createElement(BEM, {attrs: {style:{margin: 20}}}, 
                bemJson
            )
        )
    }
})

React.render(
    React.createElement(Example, null),
    document.body
)

},{"../desktop.blocks/bem/bem.js":7,"../desktop.bundle/link/link.js":8,"../desktop.bundle/popup2/popup2.js":9,"./popup.bem.json":10}],12:[function(require,module,exports){

},{}],13:[function(require,module,exports){
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

},{}]},{},[11])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvYmVtL2JlbS5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9saW5rL2xpbmsuYmguanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvcG9wdXAyL190YXJnZXQvcG9wdXAyX3RhcmdldC5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9wb3B1cDIvX3RhcmdldC9wb3B1cDJfdGFyZ2V0X2FuY2hvci5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9wb3B1cDIvX3RhcmdldC9wb3B1cDJfdGFyZ2V0X3Bvc2l0aW9uLmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9jb21tb24uYmxvY2tzL3BvcHVwMi9wb3B1cDIuYmh6LmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9kZXNrdG9wLmJsb2Nrcy9iZW0vYmVtLmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9kZXNrdG9wLmJ1bmRsZS9saW5rL2xpbmsuanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2Rlc2t0b3AuYnVuZGxlL3BvcHVwMi9wb3B1cDIuanMiLCJqcy9wb3B1cC5iZW0uanNvbiIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvanMvcG9wdXAuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiXSwi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QUMvQixNQUFNLEVBQUUsV0FBVztRQUNmO1lBQ0ksb0JBQUMsR0FBRyxFQUFBLENBQUEsQ0FBQyxLQUFBLEVBQUssQ0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBRyxDQUFBLEVBQUE7Z0JBQzdCLE9BQVE7WUFDUCxDQUFBO1NBQ1Q7S0FDSjtBQUNMLENBQUMsQ0FBQzs7QUFFRixLQUFLLENBQUMsTUFBTTtJQUNSLG9CQUFDLE9BQU8sRUFBQSxJQUFBLENBQUcsQ0FBQTtJQUNYLFFBQVEsQ0FBQyxJQUFJO0NBQ2hCOzs7QUNoRUQ7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSAmJiB3aW5kb3cuUmVhY3QgfHwgKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJykgJiYgcmVxdWlyZSgncmVhY3QnKVxudmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJykgJiYgcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpXG5cbnZhciBCSCA9IChmdW5jdGlvbigpIHtcbnZhciBfX2xhc3RHZW5JZCA9IDBcblxudmFyIEJIID0gZnVuY3Rpb24oKSB7XG4gICAgLy9UT0RPOiBtYWtlIGl0IGJldHRlclxuICAgIHRoaXMuX19tYXRjaGVycyA9IHt9XG4gICAgQkVNX0hhemFyZC5iaCA9IHRoaXNcbiAgICBCRU1fSGF6YXJkLl9fZXhwYW5kb0lkID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICB0aGlzLnV0aWxzID0gQkVNX0hhemFyZFxuICAgIHRoaXMuQkVNID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAgICBkaXNwbGF5TmFtZTogJycsXG4gICAgICAgIF9fYmxvY2s6ICcnLFxuICAgICAgICBtaXhpbnM6IFtCRU1fSGF6YXJkXSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fbm9kZSgpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5CSC5fID0gJ18nXG5CSC5fXyA9ICdfXydcbkJILlJlYWN0ID0gUmVhY3RcbkJILl9nZXREZWNsID0gIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgdmFyIGRlY2wgPSB7fSxcbiAgICAgICAgZGVjbHMsXG4gICAgICAgIGlzRWxlbSA9IH5zZWxlY3Rvci5pbmRleE9mKEJILl9fKVxuICAgIGlzRWxlbSA/XG4gICAgICAgIGRlY2xzID0gc2VsZWN0b3Iuc3BsaXQoQkguX18pIDpcbiAgICAgICAgZGVjbHMgPSBzZWxlY3Rvci5zcGxpdChCSC5fKVxuXG4gICAgZGVjbC5ibG9jayA9IGRlY2xzLnNoaWZ0KClcblxuICAgIGlmIChpc0VsZW0pIHtcbiAgICAgICAgZGVjbHMgPSBkZWNsc1swXS5zcGxpdChCSC5fKVxuICAgICAgICBkZWNsLmVsZW0gPSBkZWNscy5zaGlmdCgpXG4gICAgfVxuXG4gICAgZGVjbC5tb2ROYW1lID0gZGVjbHMuc2hpZnQoKVxuICAgIGRlY2wubW9kVmFsID0gZGVjbHMuc2hpZnQoKVxuICAgIHJldHVybiBkZWNsXG59XG5cbkJILnByb3RvdHlwZSA9IHtcbiAgICBub0Jvb2xNb2RzOiBmYWxzZSwgLy9Gb3IgTEVHTyBzZXQgdHJ1ZVxuICAgIGFwcGx5OiBmdW5jdGlvbihiZW1Kc29uKSB7XG4gICAgICAgIGlmICghYmVtSnNvbikgcmV0dXJuICcnXG4gICAgICAgIHZhciBlbCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5CRU0sIGJlbUpzb24pXG4gICAgICAgIHJldHVybiBSZWFjdC5yZW5kZXJUb1N0YXRpY01hcmt1cChlbClcbiAgICB9LFxuICAgIG1hdGNoOiBmdW5jdGlvbihzZWxlY3RvciwgbWF0Y2hlcikge1xuICAgICAgICBpZiAoIXNlbGVjdG9yIHx8ICFtYXRjaGVyKSByZXR1cm4gdGhpc1xuICAgICAgICB2YXIgZGVjbCA9IEJILl9nZXREZWNsKHNlbGVjdG9yKVxuICAgICAgICB0aGlzLl9fbWF0Y2hlcnNbZGVjbC5ibG9ja10gfHwgKHRoaXMuX19tYXRjaGVyc1tkZWNsLmJsb2NrXSA9IFtdKVxuICAgICAgICB0aGlzLl9fbWF0Y2hlcnNbZGVjbC5ibG9ja10ucHVzaChbZGVjbCwgbWF0Y2hlcl0pXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICB4bWxFc2NhcGU6IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgLy9CZWNhdXNlIFJlYWN0IHdpbGwgZG8gaXQgZm9yIHVzXG4gICAgICAgIC8vVE9ETzogb3IgZG8gd2UgbmVlZCB0aGlzP1xuICAgICAgICByZXR1cm4geFxuICAgIH0sXG4gICAgYXR0ckVzY2FwZTogZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4geFxuICAgIH0sXG4gICAganNBdHRyRXNjYXBlOiBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiB4XG4gICAgfSxcbiAgICBlbmFibGVJbmZpbml0ZUxvb3BEZXRlY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL1Y4IHdpbGwgZG8gaXQgZm9yIHVzXG4gICAgfVxufVxuXG52YXIgQkVNX0hhemFyZCA9IHtcbiAgICBqczogZnVuY3Rpb24oKSB7cmV0dXJuIHRoaXN9LFxuICAgIGJlbTogZnVuY3Rpb24oKSB7cmV0dXJuIHRoaXN9LFxuICAgIGV4dGVuZDogYXNzaWduLFxuICAgIGlzU2ltcGxlOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgaWYgKCFvYmogfHwgb2JqID09PSB0cnVlKSByZXR1cm4gdHJ1ZVxuICAgICAgICB2YXIgdCA9IHR5cGVvZiBvYmpcbiAgICAgICAgcmV0dXJuIHQgPT09ICdzdHJpbmcnIHx8IHQgPT09ICdudW1iZXInXG4gICAgfSxcbiAgICBnZW5lcmF0ZUlkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICd1bmlxJyArIHRoaXMuX19leHBhbmRvSWQgKyAoKytfX2xhc3RHZW5JZCk7XG4gICAgfSxcbiAgICBwYXJhbTogZnVuY3Rpb24ocGFyYW0sIHZhbCwgZm9yY2UpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc01peCkge3JldHVybiB0aGlzfVxuICAgICAgICAgICAgKCF0aGlzLl9fanNvbltwYXJhbV0gfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbltwYXJhbV0gPSB2YWwpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uW3BhcmFtXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB0UGFyYW06IGZ1bmN0aW9uKGtleSwgdmFsLCBmb3JjZSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uLiR0UGFyYW0gfHwgKHRoaXMuX19qc29uLiR0UGFyYW0gPSB7fSlcbiAgICAgICAgICAgIGlmICghdGhpcy5fX2pzb24uJHRQYXJhbVtrZXldIHx8IGZvcmNlKSB7dGhpcy5fX2pzb24uJHRQYXJhbVtrZXldID0gdmFsfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fanNvbi4kdFBhcmFtICYmIHRoaXMuX19qc29uLiR0UGFyYW1ba2V5XVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjbHM6IGZ1bmN0aW9uKGNscywgZm9yY2UpIHtcbiAgICAgICAgaWYgKGNscykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc01peCkge3JldHVybiB0aGlzfVxuICAgICAgICAgICAgKCF0aGlzLl9fanNvbi5jbHMgfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbi5jbHMgPSBjbHMpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLmNsc1xuICAgICAgICB9XG4gICAgfSxcbiAgICBuZWVkQ2FwaXRhbGl6ZTogdHJ1ZSxcbiAgICBhdHRyQ2FwaXRhbGl6ZWQ6IHtcbiAgICAgICAgYWNjZXB0Y2hhcnNldDogJ2FjY2VwdENoYXJzZXQnLFxuICAgICAgICBhY2Nlc3NrZXk6ICdhY2Nlc3NLZXknLFxuICAgICAgICBhbGxvd2Z1bGxzY3JlZW46ICdhbGxvd0Z1bGxTY3JlZW4nLFxuICAgICAgICBhbGxvd3RyYW5zcGFyZW5jeTogJ2FsbG93VHJhbnNwYXJlbmN5JyxcbiAgICAgICAgYXV0b2NvbXBsZXRlOiAnYXV0b0NvbXBsZXRlJyxcbiAgICAgICAgYXV0b2ZvY3VzOiAnYXV0b0ZvY3VzJyxcbiAgICAgICAgYXV0b3BsYXk6ICdhdXRvUGxheScsXG4gICAgICAgIGNlbGxwYWRkaW5nOiAnY2VsbFBhZGRpbmcnLFxuICAgICAgICBjZWxsc3BhY2luZzogJ2NlbGxTcGFjaW5nJyxcbiAgICAgICAgY2hhcnNldDogJ2NoYXJTZXQnLFxuICAgICAgICBjbGFzc2lkOiAnY2xhc3NJRCcsXG4gICAgICAgICdjbGFzcyc6ICdjbGFzc05hbWUnLFxuICAgICAgICBjbGFzc25hbWU6ICdjbGFzc05hbWUnLFxuICAgICAgICBjb2xzcGFuOiAnY29sU3BhbicsXG4gICAgICAgIGNvbnRlbnRlZGl0YWJsZTogJ2NvbnRlbnRFZGl0YWJsZScsXG4gICAgICAgIGNvbnRleHRtZW51OiAnY29udGV4dE1lbnUnLFxuICAgICAgICBjcm9zc29yaWdpbjogJ2Nyb3NzT3JpZ2luJyxcbiAgICAgICAgZGF0ZXRpbWU6ICdkYXRlVGltZScsXG4gICAgICAgIGVuY3R5cGU6ICdlbmNUeXBlJyxcbiAgICAgICAgZm9ybWFjdGlvbjogJ2Zvcm1BY3Rpb24nLFxuICAgICAgICBmb3JtZW5jdHlwZTogJ2Zvcm1FbmNUeXBlJyxcbiAgICAgICAgZm9ybW1ldGhvZDogJ2Zvcm1NZXRob2QnLFxuICAgICAgICBmb3Jtbm92YWxpZGF0ZTogJ2Zvcm1Ob1ZhbGlkYXRlJyxcbiAgICAgICAgZm9ybXRhcmdldDogJ2Zvcm1UYXJnZXQnLFxuICAgICAgICBmcmFtZWJvcmRlcjogJ2ZyYW1lQm9yZGVyJyxcbiAgICAgICAgaHRtbGZvcjogJ2h0bWxGb3InLFxuICAgICAgICAnZm9yJzogJ2h0bWxGb3InLFxuICAgICAgICBodHRwZXF1aXY6ICdodHRwRXF1aXYnLFxuICAgICAgICBtYXJnaW5oZWlnaHQ6ICdtYXJnaW5IZWlnaHQnLFxuICAgICAgICBtYXJnaW53aWR0aDogJ21hcmdpbldpZHRoJyxcbiAgICAgICAgbWF4bGVuZ3RoOiAnbWF4TGVuZ3RoJyxcbiAgICAgICAgbWVkaWFncm91cDogJ21lZGlhR3JvdXAnLFxuICAgICAgICBub3ZhbGlkYXRlOiAnbm9WYWxpZGF0ZScsXG4gICAgICAgIHJhZGlvZ3JvdXA6ICdyYWRpb0dyb3VwJyxcbiAgICAgICAgcmVhZG9ubHk6ICdyZWFkT25seScsXG4gICAgICAgIHJvd3NwYW46ICdyb3dTcGFuJyxcbiAgICAgICAgc3BlbGxjaGVjazogJ3NwZWxsQ2hlY2snLFxuICAgICAgICBzcmNkb2M6ICdzcmNEb2MnLFxuICAgICAgICBzcmNzZXQ6ICdzcmNTZXQnLFxuICAgICAgICB0YWJpbmRleDogJ3RhYkluZGV4JyxcbiAgICAgICAgdXNlbWFwOiAndXNlTWFwJ1xuICAgIH0sXG4gICAgYXR0cnM6IGZ1bmN0aW9uKHZhbHVlcywgZm9yY2UpIHtcbiAgICAgICAgdmFyIGF0dHJzID0gdGhpcy5fX2pzb24uYXR0cnMgfHwge31cbiAgICAgICAgaWYgKHZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5hdHRycyA9IGZvcmNlID8gdGhpcy5leHRlbmQoYXR0cnMsIHZhbHVlcykgOiB0aGlzLmV4dGVuZCh2YWx1ZXMsIGF0dHJzKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhdHRyc1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhdHRyOiBmdW5jdGlvbihrZXksIHZhbCwgZm9yY2UpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5hdHRycyA/XG4gICAgICAgICAgICAgICAgKCF0aGlzLl9fanNvbi5hdHRycy5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8IGZvcmNlKSAmJiAodGhpcy5fX2pzb24uYXR0cnNba2V5XSA9IHZhbCkgOlxuICAgICAgICAgICAgICAgICh0aGlzLl9fanNvbi5hdHRycyA9IHt9KVtrZXldID0gdmFsXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLmF0dHJzICYmIHRoaXMuX19qc29uLmF0dHJzW2tleV1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy9UT0RPOiBSZWZhY3RvciBtb2QsIG1vZHMsIG11TW9kLCBtdU1vZHNcbiAgICAvL1RoaW5rIGFib3V0IGRlY2xNdW1vZHMgPyBzZXRNdU1vZCBkZWxNdU1vZCBnZXRNdU1vZFxuICAgIG1vZDogZnVuY3Rpb24obW9kLCB2YWwsIGZvcmNlKSB7XG4gICAgICAgIHZhciBtb2RzID0gdGhpcy5tb2RzKClcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAoIW1vZHMuaGFzT3duUHJvcGVydHkobW9kKSB8fCBmb3JjZSkgJiYgKG1vZHNbbW9kXSA9IHZhbClcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tdU1vZHMoKS5oYXNPd25Qcm9wZXJ0eShtb2QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVNb2QobW9kKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtb2RzLmhhc093blByb3BlcnR5KG1vZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kc1ttb2RdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1vZHM6IGZ1bmN0aW9uKHZhbHVlcywgZm9yY2UpIHtcbiAgICAgICAgdmFyIGZpZWxkID0gdGhpcy5fX2pzb24uZWxlbSA/ICdlbGVtTW9kcycgOiAnbW9kcydcbiAgICAgICAgdmFyIG1vZHMgPSB0aGlzLl9fanNvbltmaWVsZF1cbiAgICAgICAgaWYgKHZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICB0aGlzLl9fanNvbltmaWVsZF0gPSBmb3JjZSA/IHRoaXMuZXh0ZW5kKG1vZHMsIHZhbHVlcykgOiB0aGlzLmV4dGVuZCh2YWx1ZXMsIG1vZHMpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1vZHNcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbXVTdGF0ZXM6IGZ1bmN0aW9uKHN0YXRlcykge1xuICAgICAgICBpZiAoc3RhdGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2ZsYWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fbXVTdGF0ZXMgPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5fX211U3RhdGVzLCBzdGF0ZXMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19tdVN0YXRlcyB8fCB7fVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtdU1vZHM6IGZ1bmN0aW9uKG1vZHMpIHtcbiAgICAgICAgaWYgKG1vZHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19tdU1vZHMgPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5fX211TW9kcywgbW9kcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX211TW9kcyB8fCB7fVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtdVN0YXRlOiBmdW5jdGlvbihzdGF0ZSwgdmFsKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlW3N0YXRlXSAhPT0gdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdTdGF0ZSA9IHt9XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlW3N0YXRlXSA9IHZhbFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICh0aGlzLl9fbXVTdGF0ZXMgfHwgKHRoaXMuX19tdVN0YXRlcyA9IHt9KSlbc3RhdGVdID0gdmFsXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVTdGF0ZXMoKVtzdGF0ZV1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbXVNb2Q6IGZ1bmN0aW9uKG1vZCwgdmFsKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlW21vZF0gIT09IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3U3RhdGUgPSB7fVxuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZVttb2RdID0gdmFsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKHRoaXMuX19tdU1vZHMgfHwgKHRoaXMuX19tdU1vZHMgPSB7fSkpW21vZF0gPSB2YWxcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tdU1vZHMoKVttb2RdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRvZ2dsZU11TW9kIDogZnVuY3Rpb24obW9kTmFtZSkge1xuICAgICAgICAvL1RPRE86IFJlZmFjdG9yIG1lXG4gICAgICAgIHRoaXMubXVNb2QobW9kTmFtZSwgIXRoaXMubXVNb2QobW9kTmFtZSkpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICB0YWc6IGZ1bmN0aW9uKHRhZywgZm9yY2UpIHtcbiAgICAgICAgaWYgKHRhZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc01peCkge3JldHVybiB0aGlzfVxuICAgICAgICAgICAgKCF0aGlzLl9fanNvbi50YWcgfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbi50YWcgPSB0YWcpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLnRhZ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBtYXRjaDogZnVuY3Rpb24oc2VsZWN0b3IsIG1hdGNoZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9fZmxhZykgcmV0dXJuIHRoaXNcbiAgICAgICAgaWYgKCFzZWxlY3RvciB8fCAhbWF0Y2hlcikgcmV0dXJuIHRoaXNcbiAgICAgICAgdmFyIGRlY2wgPSBCSC5fZ2V0RGVjbChzZWxlY3RvcilcbiAgICAgICAgdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzIHx8ICh0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnMgPSB7fSlcbiAgICAgICAgdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzW2RlY2wuYmxvY2tdIHx8ICh0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnNbZGVjbC5ibG9ja10gPSBbXSlcbiAgICAgICAgdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzW2RlY2wuYmxvY2tdLnB1c2goW2RlY2wsIG1hdGNoZXJdKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBtaXhKczogZnVuY3Rpb24obWl4KSB7XG4gICAgICAgIGlmIChtaXguYmxvY2sgJiYgbWl4LmJsb2NrICE9PSB0aGlzLl9fanNvbi5ibG9jaykge1xuICAgICAgICAgICAgdmFyIG1hdGNoZXJzID0gdGhpcy5iaC5fX21hdGNoZXJzW21peC5ibG9ja11cbiAgICAgICAgICAgIGlmIChtYXRjaGVycykge1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gdGhpcy5leHRlbmQoe30sIHRoaXMuX19qc29uKVxuICAgICAgICAgICAgICAgIHRoaXMuZXh0ZW5kKHRoaXMuX19qc29uLCBtaXgpXG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24uZWxlbSA9IG1peC5lbGVtXG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24uX19zdG9wID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZWQgPSBbXVxuICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fbWF0Y2hlcnMgPSBtYXRjaGVyc1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fX2lzTWl4ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMuX19wcm9jZXNzTWF0Y2goKVxuICAgICAgICAgICAgICAgIHRoaXMuX19qc29uID0ganNvblxuICAgICAgICAgICAgICAgIHRoaXMuX19pc01peCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIG1peDogZnVuY3Rpb24obWl4LCBmb3JjZSkge1xuICAgICAgICBpZiAobWl4KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5taXggPSAoIXRoaXMuX19qc29uLm1peCB8fCBmb3JjZSkgP1xuICAgICAgICAgICAgICAgIG1peCA6XG4gICAgICAgICAgICAgICAgKEFycmF5LmlzQXJyYXkodGhpcy5fX2pzb24ubWl4KSA/IHRoaXMuX19qc29uLm1peCA6IFt0aGlzLl9fanNvbi5taXhdKS5jb25jYXQobWl4KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fanNvbi5taXhcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudDogZnVuY3Rpb24oY29udGVudCwgZm9yY2UpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAgICAgKCF0aGlzLl9fanNvbi5jb250ZW50IHx8IGZvcmNlKSAmJiAodGhpcy5fX2pzb24uY29udGVudCA9IGNvbnRlbnQpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLmNvbnRlbnRcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcG9zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uJHBvc2l0aW9uXG4gICAgfSxcbiAgICBpc0ZpcnN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24oKSA9PT0gMVxuICAgIH0sXG4gICAgaXNMYXN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLiRpc0xhc3RcbiAgICB9LFxuICAgIGpzb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2pzb25cbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgIHRoaXMuX19qc29uLl9fc3RvcCA9IHRydWVcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGFwcGx5QmFzZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX19wcm9jZXNzTWF0Y2goKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgX19wcm9jZXNzTWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmV0VmFsLFxuICAgICAgICAgICAgY3R4ID0gdGhpcyxcbiAgICAgICAgICAgIGpzb24gPSB0aGlzLl9fanNvbixcbiAgICAgICAgICAgIGJfID0ganNvbi5ibG9jayxcbiAgICAgICAgICAgIF9fZSA9IGpzb24uZWxlbSxcbiAgICAgICAgICAgIG1vZHMgPSB0aGlzLm1vZHMoKSxcbiAgICAgICAgICAgIG1hdGNoZXJzID0ganNvbi5fX21hdGNoZXJzLFxuICAgICAgICAgICAgaSA9IG1hdGNoZXJzLmxlbmd0aCAtIDEsXG4gICAgICAgICAgICBtYXRjaGVkID0ganNvbi5fX21hdGNoZWQsXG4gICAgICAgICAgICBtYXRjaE1vZHMgPSBmdW5jdGlvbihkZWNsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlY2wubW9kTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kcyAmJiBtb2RzW2RlY2wubW9kTmFtZV0gJiYgKG1vZHNbZGVjbC5tb2ROYW1lXSA9PT0gZGVjbC5tb2RWYWwgfHwgbW9kc1tkZWNsLm1vZE5hbWVdID09PSB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZC5wdXNoKGkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRWYWwgPSBjYihjdHgsIGpzb24pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goaSlcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsID0gY2IoY3R4LCBqc29uKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgZm9yICg7IGkgPj0gMCAmJiAhcmV0VmFsICYmICFqc29uLl9fc3RvcDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgcnVsZSA9IG1hdGNoZXJzW2ldLFxuICAgICAgICAgICAgICAgIGRlY2wgPSBydWxlWzBdLFxuICAgICAgICAgICAgICAgIGNiID0gcnVsZVsxXVxuXG4gICAgICAgICAgICBpZiAofm1hdGNoZWQuaW5kZXhPZihpKSkgeyBjb250aW51ZSB9XG4gICAgICAgICAgICBpZiAoZGVjbC5lbGVtIHx8IF9fZSkge1xuICAgICAgICAgICAgICAgIChkZWNsLmVsZW0gPT09IF9fZSkgJiYgbWF0Y2hNb2RzKGRlY2wpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hdGNoTW9kcyhkZWNsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXRWYWwpICB7XG4gICAgICAgICAgICByZXRWYWwgPSBbXS5jb25jYXQocmV0VmFsKS5tYXAoZnVuY3Rpb24ocmV0VmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJldFZhbC5ibG9jayAmJiByZXRWYWwuYmxvY2sgIT09IGpzb24uYmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoZXJzID0gdGhpcy5iaC5fX21hdGNoZXJzW3JldFZhbC5ibG9ja10gfHwgW11cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbiA9IHJldFZhbFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX3N0b3AgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZWQgPSBbXVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZXJzID0gbWF0Y2hlcnNcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXRWYWwuX19zdG9wID0ganNvbi5fX3N0b3BcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsLl9fbWF0Y2hlZCA9IGpzb24uX19tYXRjaGVkXG4gICAgICAgICAgICAgICAgICAgIHJldFZhbC5fX21hdGNoZXJzID0ganNvbi5fX21hdGNoZXJzXG4gICAgICAgICAgICAgICAgICAgIHJldFZhbC5lbGVtICYmIChyZXRWYWwuYmxvY2sgPSBqc29uLmJsb2NrKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbiA9IHJldFZhbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9fcHJvY2Vzc01hdGNoKClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb25cbiAgICAgICAgICAgIH0sIHRoaXMpXG4gICAgICAgICAgICByZXRWYWwubGVuZ3RoID09IDEgJiYgKHJldFZhbCA9IHJldFZhbFswXSlcbiAgICAgICAgICAgIHRoaXMuX19qc29uID0gcmV0VmFsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9fbWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYl8gPSAgdGhpcy5fX2pzb24uYmxvY2ssXG4gICAgICAgICAgICBzdWJNYXRjaGVycyA9ICh0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnMgJiYgdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzW2JfXSkgfHwgW10sXG4gICAgICAgICAgICBtYXRjaGVycyA9ICh0aGlzLmJoLl9fbWF0Y2hlcnNbYl9dIHx8IFtdKS5jb25jYXQoc3ViTWF0Y2hlcnMpXG5cbiAgICAgICAgdGhpcy5fX2pzb24uX19zdG9wID0gZmFsc2VcbiAgICAgICAgdGhpcy5fX2pzb24uX19tYXRjaGVkID0gW11cbiAgICAgICAgdGhpcy5fX2pzb24uX19tYXRjaGVycyA9IG1hdGNoZXJzXG4gICAgICAgIHRoaXMuX19wcm9jZXNzTWF0Y2goKVxuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9jb21wb3NlQ3VyTm9kZSh0aGlzLnByb3BzKVxuICAgICAgICB0aGlzLl9fZmxhZyA9IHRydWVcbiAgICAgICAgdGhpcy5zdGF0aWNzIHx8ICh0aGlzLnN0YXRpY3MgPSB7fSlcbiAgICAgICAgdGhpcy5fX3NlbGYgPSB0aGlzLnN0YXRpY3M7XG4gICAgICAgIHRoaXMuX19tYXRjaCgpXG4gICAgICAgIHRoaXMud2lsbE1vdW50KCkuZm9yRWFjaChmdW5jdGlvbih3aWxsTW91bnQpIHtcbiAgICAgICAgICAgIHdpbGxNb3VudC5iaW5kKHRoaXMpKHRoaXMsIHRoaXMuX19qc29uKVxuICAgICAgICB9LCB0aGlzKVxuICAgIH0sXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5leHRlbmQoe30sIHRoaXMuc3RhdGUsIHRoaXMubXVTdGF0ZXMoKSwgdGhpcy5tdU1vZHMoKSlcbiAgICAgICAgdGhpcy5kaWRNb3VudCgpLmZvckVhY2goZnVuY3Rpb24oZGlkTW91bnQpIHtcbiAgICAgICAgICAgIGRpZE1vdW50LmJpbmQodGhpcykodGhpcywgdGhpcy5fX2pzb24pXG4gICAgICAgIH0sIHRoaXMpXG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihwcm9wcykge1xuICAgICAgICB0aGlzLndpbGxSZWNlaXZlUHJvcHMoKS5mb3JFYWNoKGZ1bmN0aW9uKGJVcGRhdGUpIHtcbiAgICAgICAgICAgIGJVcGRhdGUuYmluZCh0aGlzKSh0aGlzLCBwcm9wcylcbiAgICAgICAgfSwgdGhpcylcbiAgICAgICAgdGhpcy5fX3Byb3BzID0gcHJvcHNcbiAgICAgICAgdGhpcy5fY29tcG9zZUN1ck5vZGUocHJvcHMpXG4gICAgICAgIHRoaXMuYmVmb3JlVXBkYXRlKCkuZm9yRWFjaChmdW5jdGlvbihiVXBkYXRlKSB7XG4gICAgICAgICAgICBiVXBkYXRlLmJpbmQodGhpcykodGhpcywgdGhpcy5fX2pzb24pXG4gICAgICAgIH0sIHRoaXMpXG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsVXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX19wcm9wcykge1xuICAgICAgICAgICAgdGhpcy5fX3Byb3BzID0gdW5kZWZpbmVkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb3NlQ3VyTm9kZSh0aGlzLnByb3BzKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBfX25vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fX2ZsYWcpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX19tYXRjaCgpXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVuZGVyTm9kZXMgPSBmdW5jdGlvbihqc29uLCByZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBqc29uLnJlZHVjZShmdW5jdGlvbihyZXN1bHQsIGpzb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShqc29uKSkge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJOb2Rlcyhqc29uLCByZXN1bHQpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2pzb24gPSBqc29uXG4gICAgICAgICAgICAgICAgICAgIHZhciBjbHMgPSB0aGlzLl9idWlsZENsYXNzTmFtZSgpICsgKHRoaXMuY2xzKCkgPyAnICcgKyB0aGlzLmNscygpIDogJycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IHRoaXMuX3Byb2Nlc3NUcmVlKHRoaXMuY29udGVudCgpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzID0gdGhpcy5hdHRycygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcyA9IHtjaGlsZHJlbjogY29udGVudH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRDYXBpdGFsaXplICYmIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9rZXlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmF0dHJDYXBpdGFsaXplZFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2tleSA9IHRoaXMuYXR0ckNhcGl0YWxpemVkW2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyc1tfa2V5XSA9IGF0dHJzW2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cnNba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKVxuXG4gICAgICAgICAgICAgICAgICAgIGNscyAmJiAocHJvcHMuY2xhc3NOYW1lID0gY2xzKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMudGFnKCkgfHwgJ2RpdicsIHRoaXMuZXh0ZW5kKHByb3BzLCBhdHRycywgZXZlbnRzKSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgcmVzdWx0IHx8IFtdKVxuICAgICAgICB9LmJpbmQodGhpcylcblxuICAgICAgICB2YXIgbm9kZSxcbiAgICAgICAgICAgIG5vZGVzID0gcmVuZGVyTm9kZXMoW10uY29uY2F0KHRoaXMuX19qc29uKSlcblxuICAgICAgICBpZiAobm9kZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2Rlc1swXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7Y2hpbGRyZW46IG5vZGVzfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgIH0sXG5cbiAgICBfY29tcG9zZUN1ck5vZGU6IGZ1bmN0aW9uKHBwKSB7XG4gICAgICAgIC8vVE9ETzogVGhpbmsgYWJvdXQgY2FjaGluZy9kaWZmaW5nIGJlbUpzb25UcmVlL2NvbnRlbnRcbiAgICAgICAgdGhpcy5fX2pzb24gPSB0aGlzLmV4dGVuZCh7fSwgcHAsIHtjb250ZW50OiBwcC5jaGlsZHJlbiB8fCBwcC5jb250ZW50fSlcbiAgICAgICAgdmFyIG1vZHMgPSBPYmplY3Qua2V5cyh0aGlzLl9fanNvbikucmVkdWNlKGZ1bmN0aW9uKG1vZHMsIGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleVswXSA9PT0gQkguXyAmJiAobW9kc1trZXkuc2xpY2UoMSldID0gcHBba2V5XSksIG1vZHNcbiAgICAgICAgfSwge30pXG4gICAgICAgIHRoaXMuX19ibG9jayAmJiAodGhpcy5fX2pzb24uYmxvY2sgPSB0aGlzLl9fYmxvY2spXG4gICAgICAgIHRoaXMuX19lbGVtICYmICh0aGlzLl9fanNvbi5lbGVtID0gdGhpcy5fX2VsZW0pXG4gICAgICAgIGlmICh0aGlzLl9fanNvbi5lbGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5lbGVtTW9kcyB8fCAodGhpcy5fX2pzb24uZWxlbU1vZHMgPSAodGhpcy5fX2pzb24ubW9kcyB8fCB7fSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5tb2RzIHx8ICh0aGlzLl9fanNvbi5tb2RzID0ge30pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKG1vZHMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fanNvbi5lbGVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24uZWxlbU1vZHMgPSB0aGlzLmV4dGVuZCh0aGlzLl9fanNvbi5lbGVtTW9kcywgbW9kcylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24ubW9kcyA9IHRoaXMuZXh0ZW5kKHRoaXMuX19qc29uLm1vZHMsIG1vZHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9idWlsZENsYXNzTmFtZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBiXyA9IHRoaXMuX19qc29uLmJsb2NrLFxuICAgICAgICAgICAgX19lID0gdGhpcy5fX2pzb24uZWxlbSxcbiAgICAgICAgICAgIGNscyA9IHt9LFxuICAgICAgICAgICAgbW9kcyA9IHRoaXMuZXh0ZW5kKHt9LCB0aGlzLm1vZHMoKSwgdGhpcy5tdU1vZHMoKSlcblxuICAgICAgICBmdW5jdGlvbiBhZGRFbml0eShiXywgX19lLCBtb2RzLCBtaXgpIHtcbiAgICAgICAgICAgIHZhciBlbnRpdHkgPSBiX1xuXG4gICAgICAgICAgICBpZiAoX19lKSB7XG4gICAgICAgICAgICAgICAgZW50aXR5ICs9IEJILl9fICsgX19lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbHNbZW50aXR5XSA9IGVudGl0eVxuICAgICAgICAgICAgT2JqZWN0LmtleXMobW9kcykuZm9yRWFjaChmdW5jdGlvbihtb2ROYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZFZhbHVlID0gbW9kc1ttb2ROYW1lXVxuICAgICAgICAgICAgICAgIGlmICghbW9kVmFsdWUgJiYgbW9kVmFsdWUgIT09IDApIHJldHVyblxuICAgICAgICAgICAgICAgIHZhciBtb2RFbnRpdHkgPSBlbnRpdHkgKyBCSC5fICsgbW9kTmFtZVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbW9kVmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICBCSC5ub0Jvb2xNb2RzICYmIG1vZFZhbHVlICYmIChtb2RFbnRpdHkgKz0gQkguXyArICd5ZXMnKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZEVudGl0eSArPSBCSC5fICsgbW9kVmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xzW21vZEVudGl0eV0gPSBtb2RFbnRpdHlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBiXyAmJiBhZGRFbml0eShiXywgX19lLCBtb2RzLCBmYWxzZSlcbiAgICAgICAgdGhpcy5fX2pzb24ubWl4ICYmIFtdLmNvbmNhdCh0aGlzLl9fanNvbi5taXgpLmZvckVhY2goZnVuY3Rpb24obWl4KSB7XG4gICAgICAgICAgICBpZiAoIW1peCkgeyByZXR1cm4gfVxuICAgICAgICAgICAgaWYgKCFtaXguYmxvY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoIWJfKSB7IHJldHVybiB9XG4gICAgICAgICAgICAgICAgbWl4LmJsb2NrID0gYl9cbiAgICAgICAgICAgICAgICBtaXguZWxlbSB8fCAobWl4LmVsZW0gPSBfX2UpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRFbml0eShtaXguYmxvY2ssIG1peC5lbGVtLCBtaXgubW9kcyB8fCBtaXguZWxlbU1vZHMgfHwge30sIHRydWUpXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGNscykuam9pbignICcpXG4gICAgfSxcbiAgICBfcHJvY2Vzc1RyZWU6IGZ1bmN0aW9uKHRyZWUsIHBvc2l0aW9uKSB7XG4gICAgICAgIHRyZWUgPSBbXS5jb25jYXQodHJlZSlcbiAgICAgICAgcG9zaXRpb24gfHwgKHBvc2l0aW9uID0ge3ZhbDogMCwgbGFzdDogMH0pXG4gICAgICAgIHBvc2l0aW9uLmxhc3QgKz0gKHRyZWUubGVuZ3RoIC0gMSlcbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0cmVlLm1hcChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzVHJlZShub2RlLCBwb3NpdGlvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbm9kZSB8fCAoIW5vZGUuYmxvY2sgJiYgIW5vZGUuZWxlbSAmJiAhbm9kZS50YWcgJiYgIW5vZGUuY29udGVudCAmJiAhbm9kZS50eXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBub2RlLnR5cGUuZGlzcGxheU5hbWVcbiAgICAgICAgICAgICAgICBpZiAoIW5hbWUpIHsgcmV0dXJuIG5vZGUgfVxuICAgICAgICAgICAgICAgIHZhciBkZWNsID0gQkguX2dldERlY2wobmFtZSlcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wcm9wcyB8fCB7fVxuICAgICAgICAgICAgICAgIG5vZGUuYmxvY2sgPSBkZWNsLmJsb2NrLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICBub2RlLmVsZW0gPSBkZWNsLmVsZW1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLmVsZW0pIHtcbiAgICAgICAgICAgICAgICBub2RlLmJsb2NrIHx8IChub2RlLmJsb2NrID0gdGhpcy5fX2pzb24uYmxvY2spXG4gICAgICAgICAgICAgICAgbm9kZS5yZWYgPSBub2RlLmJsb2NrICsgQkguX18gKyBub2RlLmVsZW0gKyAnficgKyB0aGlzLmdlbmVyYXRlSWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fX2pzb24uJHRQYXJhbSAmJiAobm9kZS4kdFBhcmFtID0gdGhpcy5leHRlbmQoe30sIHRoaXMuX19qc29uLiR0UGFyYW0pKVxuICAgICAgICAgICAgaWYgKHRoaXMuX19qc29uLiRzdWJNYXRjaGVycykge1xuICAgICAgICAgICAgICAgIHZhciBzdWJNYXRjaGVycyA9IHRoaXMuX19qc29uLiRzdWJNYXRjaGVyc1tub2RlLmJsb2NrXVxuICAgICAgICAgICAgICAgIHN1Yk1hdGNoZXJzICYmICgobm9kZS4kc3ViTWF0Y2hlcnMgPSB7fSlbbm9kZS5ibG9ja10gPSBzdWJNYXRjaGVycylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvc2l0aW9uLmxhc3QgPT09IHBvc2l0aW9uLnZhbCA/IChub2RlLiRpc0xhc3QgPSB0cnVlKSA6IChub2RlLiRpc0xhc3QgPSBmYWxzZSlcbiAgICAgICAgICAgIG5vZGUuJHBvc2l0aW9uID0gKytwb3NpdGlvbi52YWxcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5iaC5CRU0sIG5vZGUpXG4gICAgICAgIH0sIHRoaXMpXG4gICAgICAgIGNvbnRlbnQubGVuZ3RoID09IDEgJiYgKGNvbnRlbnQgPSBjb250ZW50WzBdKVxuICAgICAgICByZXR1cm4gY29udGVudFxuICAgIH0sXG4gICAgZWxlbTogZnVuY3Rpb24oZWxlbU5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX19mbGFnKSB7IHJldHVybiB9XG4gICAgICAgIHZhciBlbGVtcyA9IFtdLmNvbmNhdCh0aGlzLmVsZW1DdHgoZWxlbU5hbWUpKS5tYXAoZnVuY3Rpb24oZWxlbUN0eCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1DdHguZG9tRWxlbSgpXG4gICAgICAgIH0pXG4gICAgICAgIGVsZW1zLmxlbmd0aCA9PSAxICYmIChlbGVtcyA9IGVsZW1zWzBdKVxuICAgICAgICByZXR1cm4gZWxlbXNcbiAgICB9LFxuICAgIGVsZW1DdHg6IGZ1bmN0aW9uKGVsZW1OYW1lKSB7XG4gICAgICAgIHZhciBlbGVtcyA9IFtdLFxuICAgICAgICAgICAgZW50aXR5ID0gdGhpcy5fX2pzb24uYmxvY2sgKyBCSC5fXyArIGVsZW1OYW1lLFxuICAgICAgICAgICAgX2VsZW1DdHggPSBmdW5jdGlvbihyZWZzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocmVmcykuZm9yRWFjaChmdW5jdGlvbihyZWZLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiA9IHJlZnNbcmVmS2V5XVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlZikgeyByZXR1cm4gfVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVmS2V5LnNwbGl0KCd+JylbMF0gPT09IGVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbXMucHVzaChyZWYpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZWxlbUN0eChyZWYucmVmcylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgX2VsZW1DdHgodGhpcy5yZWZzKVxuICAgICAgICBlbGVtcy5sZW5ndGggPT0gMSAmJiAoZWxlbXMgPSBlbGVtc1swXSlcbiAgICAgICAgcmV0dXJuIGVsZW1zXG4gICAgfSxcbiAgICBfZXZlbnRzOiBmdW5jdGlvbihldmVudHMpIHtcbiAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzUHJvcHMgfHwgKHRoaXMuX2V2ZW50c1Byb3BzID0ge30pXG4gICAgICAgICAgICB0aGlzLmV4dGVuZCh0aGlzLl9ldmVudHNQcm9wcywgZXZlbnRzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50c1Byb3BzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHdpbGxNb3VudDogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICB0aGlzLl9fZmxhZyAmJiAodGhpcy5fX3dpbGxNb3VudCB8fCAodGhpcy5fX3dpbGxNb3VudCA9IFtdKSkucHVzaChjYilcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3dpbGxNb3VudCB8fCBbXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBkaWRNb3VudDogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICB0aGlzLl9fZmxhZyAmJiAodGhpcy5fX2RpZE1vdW50IHx8ICh0aGlzLl9fZGlkTW91bnQgPSBbXSkpLnB1c2goY2IpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19kaWRNb3VudCB8fCBbXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB3aWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihjYikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnICYmICh0aGlzLl9fd2lsbFJlY2VpdmUgfHwgKHRoaXMuX193aWxsUmVjZWl2ZSA9IFtdKSkucHVzaChjYilcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3dpbGxSZWNlaXZlIHx8IFtdXG4gICAgICAgIH1cbiAgICB9LFxuLy9UT0RPOiBEZWxldGUgdGhpcyBmblxuICAgIGJlZm9yZVVwZGF0ZTogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICB0aGlzLl9fZmxhZyAmJiAodGhpcy5fX2JVcGRhdGUgfHwgKHRoaXMuX19iVXBkYXRlID0gW10pKS5wdXNoKGNiKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fYlVwZGF0ZSB8fCBbXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBiaW5kOiBmdW5jdGlvbihldmVudHMpIHtcbiAgICAgICAgaWYgKHRoaXMuX19mbGFnKSB7XG4gICAgICAgICAgICB2YXIgYXR0cnMgPSB7fVxuICAgICAgICAgICAgdGhpcy5fX2V2ZW50cyB8fCAodGhpcy5fX2V2ZW50cyA9IHt9KVxuICAgICAgICAgICAgT2JqZWN0XG4gICAgICAgICAgICAgICAgLmtleXMoZXZlbnRzKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50TmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjYiA9IGV2ZW50c1tldmVudE5hbWVdXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19ldmVudHNbZXZlbnROYW1lXSB8fCAodGhpcy5fX2V2ZW50c1tldmVudE5hbWVdID0gW10pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19ldmVudHNbZXZlbnROYW1lXS5wdXNoKGNiKVxuICAgICAgICAgICAgICAgICAgICBhdHRyc1tldmVudE5hbWVdID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2V2ZW50c1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5iaW5kKHRoaXMpKGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKVxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9LCB0aGlzKVxuXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMoYXR0cnMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGRvbUVsZW06IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuZmluZERPTU5vZGUodGhpcylcbiAgICB9XG59XG5cbkJILkJFTV9IYXphcmQgPSBCRU1fSGF6YXJkXG5cbnJldHVybiBCSFxufSkoKVxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEJIXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJoKSB7XG4gICAgYmgubWF0Y2goJ2xpbmsnLCBmdW5jdGlvbihjdHgsIGpzb24pIHtcbiAgICAgICAgdmFyIGF0dHJzID0ge30sXG4gICAgICAgICAgICB1cmwgPSBqc29uLnVybCxcbiAgICAgICAgICAgIHRhYmluZGV4ID0ganNvbi50YWJpbmRleDtcblxuICAgICAgICBbJ3RpdGxlJywgJ3RhcmdldCcsICdpZCcsICd0YWJpbmRleCddLmZvckVhY2goZnVuY3Rpb24ocGFyYW0pIHtcbiAgICAgICAgICAgIGpzb25bcGFyYW1dICYmIChhdHRyc1twYXJhbV0gPSBqc29uW3BhcmFtXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHRhYmluZGV4KSB7XG4gICAgICAgICAgICBjdHguanMoe29yaWdUYWJpbmRleDogdGFiaW5kZXh9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHVybCkge1xuICAgICAgICAgICAgY3R4LnRhZygnYScpO1xuICAgICAgICAgICAgYXR0cnMuaHJlZiA9IGN0eC5pc1NpbXBsZSh1cmwpID8gdXJsIDogYmguYXBwbHkodXJsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN0eC50YWcoJ3NwYW4nKTtcbiAgICAgICAgICAgIGF0dHJzLnJvbGUgPSAnYnV0dG9uJztcbiAgICAgICAgICAgIGF0dHJzLnRhYmluZGV4IHx8IChhdHRycy50YWJpbmRleCA9IDApO1xuICAgICAgICB9XG5cbiAgICAgICAgY3R4LmF0dHJzKGF0dHJzKTtcbiAgICB9KTtcblxuICAgIGJoLm1hdGNoKCdsaW5rX19pbm5lcicsIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICBjdHgudGFnKCdzcGFuJyk7XG4gICAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaCkge1xuICAgIGJoLm1hdGNoKCdwb3B1cDJfdmlzaWJsZV95ZXMnLCBmdW5jdGlvbihjdHgsIGpzb24pIHtcbmRlYnVnZ2VyXG4gICAgICAgIGlmIChjdHguX19mbGFnKSB7IHJldHVybiB9XG5cbiAgICAgICAganNvbi5tYWluT2Zmc2V0ID0gMFxuICAgICAgICBqc29uLnNlY29uZGFyeU9mZnNldCA9IDBcbiAgICAgICAganNvbi52aWV3cG9ydE9mZnNldCA9IDBcblxuLy9UT0RPOiByZVdyaXRlIHRoaXNcbiAgICAgICAgdmFyIHAgPSBjdHguZG9tRWxlbSgpXG4gICAgICAgIHAuY2xhc3NMaXN0LmFkZCgncG9wdXAyX291dHNpZGVfeWVzJylcbiAgICAgICAgcC5jbGFzc0xpc3QuYWRkKCdwb3B1cDJfdmlzaWJsZV95ZXMnKVxuXG4gICAgICAgIGN0eFxuICAgICAgICAvLyAgICAuYmluZFRvV2luKCdzY3JvbGwgcmVzaXplJywgdGhpcy5fb25XaW5TY29sbEFuZFJlc2l6ZSlcbiAgICAgICAgICAgIC8vINCf0LXRgNC10LQg0L/QtdGA0LXRgNC40YHQvtCy0LrQvtC5INCy0YvQvdC+0YHQuNC8INC/0L7Qv9Cw0L8g0LfQsCB2aWV3cG9ydCDQuCDRgdGC0LDQstC40LwgZGlzcGxheTogYmxvY2ssINGH0YLQvtCx0Ysg0L/RgNCw0LLQuNC70YzQvdC+XG4gICAgICAgICAgICAvLyDRgdC90LjQvNCw0LvQuNGB0Ywg0LXQs9C+INGA0LDQt9C80LXRgNGLXG4gICAgICAgICAvLy8vICAgLnNldE1vZCgnb3V0c2lkZScsICd5ZXMnKVxuICAgICAgICAgICAgLy8ubW9kKCdvdXRzaWRlJywgJ3llcycpXG4gICAgICAgICAgICAucmVkcmF3KClcbiAgICAgICAgICAgLy8gLmRlbE1vZCgnb3V0c2lkZScpO1xuICAgICAgICAgICAgLy8ubW9kKCdvdXRzaWRlJywgdW5kZWZpbmVkKTtcbiAgICAgICAgcC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cDJfb3V0c2lkZV95ZXMnKVxuICAgIH0pXG5cbiAgICBiaC5tYXRjaCgncG9wdXAyX3Zpc2libGVfbm8nLCBmdW5jdGlvbihjdHgsIGpzb24pIHtcbiAgICAgICAgaWYgKGN0eC5fX2ZsYWcpIHsgcmV0dXJuIH1cblxuICAgICAgICAvL3RoaXMudW5iaW5kRnJvbVdpbignc2Nyb2xsIHJlc2l6ZScpO1xuICAgIH0pXG4gICAgYmgubWF0Y2goJ3BvcHVwX3RhcmdldCcsIGZ1bmN0aW9uKGN0eCwganNvbikge1xuICAgICAgICBkZWJ1Z2dlclxuICAgICAgICBjdHhcbiAgICAgICAgICAgIC5kaWRNb3VudChmdW5jdGlvbihjdHgpIHtcbiAgICAgICAgICAgICAgICBkZWJ1Z2dlclxuXG4gICAgICAgICAgICAgICAgdGhpcy5fX3NlbGYuVklFV1BPUlRfQUNDVVJBQ1lfRkFDVE9SID0gMC45OVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fX3NlbGYuQVZBSUxBQkxFX0RJUkVDVElPTlMgPSBbXG4gICAgICAgICAgICAgICAgICAgICdib3R0b20tbGVmdCcsICdib3R0b20tY2VudGVyJywgJ2JvdHRvbS1yaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICd0b3AtbGVmdCcsICd0b3AtY2VudGVyJywgJ3RvcC1yaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICdyaWdodC10b3AnLCAncmlnaHQtY2VudGVyJywgJ3JpZ2h0LWJvdHRvbScsXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0LXRvcCcsICdsZWZ0LWNlbnRlcicsICdsZWZ0LWJvdHRvbSdcbiAgICAgICAgICAgICAgICBdXG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RpcmVjdGlvbnM6IHRoaXMuX19zZWxmLkFWQUlMQUJMRV9ESVJFQ1RJT05TXG5cbi8qICoqKlxuICAgICAgICAgICAgICAgIG9uU2V0TW9kOiB7XG4gICAgICAgICAgICAgICAgICAgICdqcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbml0ZWQnOiBmdW5jdGlvbigpIHtcbiAgICAqKiogKi9cbiAgICAgICAgICAgICAgICB2YXIgQVZBSUxBQkxFX0RJUkVDVElPTlMgPSB0aGlzLl9fc2VsZi5BVkFJTEFCTEVfRElSRUNUSU9OUztcblxuICAgICAgICAgICAgICAgIC8vVE9ETzogdGhpcy5nZXRQYXJhbSwgdGhpcy5wYXJhbXMgZnJvbSBjdHguanMoKVxuICAgICAgICAgICAgICAgIC8vdGhpcy5wYXJhbXMuZGlyZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIGpzb24uZGlyZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZihBVkFJTEFCTEVfRElSRUNUSU9OUy5pbmRleE9mKGRpcmVjdGlvbikgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3QgaW5pdCBwb3B1cCB3aXRoIFwiJyArIGRpcmVjdGlvbiArICdcIiBkaXJlY3Rpb24uIEF2YWlsYWJsZSBkaXJlY3Rpb25zOiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFWQUlMQUJMRV9ESVJFQ1RJT05TLmpvaW4oJywgJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0RHJhd2luZ0NzcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH07XG5cblxuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICAgICAgICAgICAganNvbi5tYWluT2Zmc2V0ID0gMFxuICAgICAgICAgICAgICAgICAgICBqc29uLnNlY29uZGFyeU9mZnNldCA9IDBcbiAgICAgICAgICAgICAgICAgICAganNvbi52aWV3cG9ydE9mZnNldCA9IDBcbiAgICAgICAgICAgICAgICAgICAgLy9pZighdGhpcy5oYXNNb2QoJ3Zpc2libGUnLCAneWVzJykgJiYgIXRoaXMuaGFzTW9kKCdvdXRzaWRlJywgJ3llcycpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICAgICAgaWYoY3R4Lm1vZCgndmlzaWJsZScpICE9PSAneWVzJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBiZXN0RHJhd2luZ1BhcmFtcyA9IHRoaXMuX2NhbGNCZXN0RHJhd2luZ1BhcmFtcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zZXRNb2QoJ2RpcmVjdGlvbicsIGJlc3REcmF3aW5nUGFyYW1zLmRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5tb2QoJ2RpcmVjdGlvbicsIGJlc3REcmF3aW5nUGFyYW1zLmRpcmVjdGlvbilcblxuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdERyYXdpbmdDc3MgPSB0aGlzLl9sYXN0RHJhd2luZ0NzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRVcGRhdGVDc3MgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyQuZWFjaChcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5fY2FsY0RyYXdpbmdDc3MoYmVzdERyYXdpbmdQYXJhbXMpLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICBmdW5jdGlvbihuYW1lLCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmKGxhc3REcmF3aW5nQ3NzW25hbWVdICE9PSB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBsYXN0RHJhd2luZ0Nzc1tuYW1lXSA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBuZWVkVXBkYXRlQ3NzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjc3MgPSB0aGlzLl9jYWxjRHJhd2luZ0NzcyhiZXN0RHJhd2luZ1BhcmFtcylcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY3NzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUsIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gY3NzW25hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXN0RHJhd2luZ0Nzc1tuYW1lXSAhPT0gdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERyYXdpbmdDc3NbbmFtZV0gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVlZFVwZGF0ZUNzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgaWYobmVlZFVwZGF0ZUNzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRvbUVsZW0uY3NzKGxhc3REcmF3aW5nQ3NzKTtcbmRlYnVnZ2VyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHIoJ3N0eWxlJywgbGFzdERyYXdpbmdDc3MpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGNEcmF3aW5nQ3NzID0gZnVuY3Rpb24oZHJhd2luZ1BhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZHJhd2luZ1BhcmFtcy5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBkcmF3aW5nUGFyYW1zLnRvcFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC80LDRgdGB0LjQsiDQstC+0LfQvNC+0LbQvdGL0YUg0L/QsNGA0LDQvNC10YLRgNC+0LIg0YDQsNGB0LrRgNGL0YLQuNGPINGBINC80LDQutGB0LjQvNCw0LvRjNC90L4g0LTQvtGB0YLRg9C/0L3QvtC5INC/0LvQvtGJ0LDQtNGM0Y4uXG4gICAgICAgICAgICAgICAgICog0JrQsNC20LTRi9C5INGN0LvQtdC80LXQvdGCINC80LDRgdGB0LjQstCwINC+0L/QuNGB0YvQstCw0LXRgiDQv9GA0Y/QvNC+0YPQs9C+0LvRjNC90YPRjiDQvtCx0LvQsNGB0YLRjCwg0LIg0LrQvtGC0L7RgNC+0Lkg0LzQvtC20LXRgiDQvdCw0YXQvtC00LjRgtGM0YHRjyDQv9C+0L/QsNC/LiDQpNC+0YDQvNCw0YIg0Y3Qu9C10LzQtdC90YLQsDpcbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqIGBgYGpzXG4gICAgICAgICAgICAgICAgICoge1xuICAgICAgICAgICAgICAgICAqICAgICBkaXJlY3Rpb246ICdib3R0b20tbGVmdCcsIC8vINC90LDQv9GA0LDQstC70LXQvdC40LVcbiAgICAgICAgICAgICAgICAgKiAgICAgaGVpZ2h0OiA1NDAsICAgICAgICAgICAgICAvLyDQtNC+0YHRgtGD0L/QvdCw0Y8g0LLRi9GB0L7RgtCwINC+0LHQu9Cw0YHRgtC4XG4gICAgICAgICAgICAgICAgICogICAgIHdpZHRoOiAxMDAwLCAgICAgICAgICAgICAgLy8g0LTQvtGB0YLRg9C/0L3QsNGPINGI0LjRgNC40L3QsCDQvtCx0LvQsNGB0YLQuFxuICAgICAgICAgICAgICAgICAqICAgICBsZWZ0OiAxMCwgICAgICAgICAgICAgICAgIC8vINC70LXQstCw0Y8g0LrQvtC+0YDQtNC40L3QsNGC0LAg0L7QsdC70LDRgdGC0LhcbiAgICAgICAgICAgICAgICAgKiAgICAgdG9wOiAzMCAgICAgICAgICAgICAgICAgICAvLyDQstC10YDRhdC90Y/RjyDQutC+0L7RgNC00LjQvdCw0YLQsCDQvtCx0LvQsNGB0YLQuFxuICAgICAgICAgICAgICAgICAqIH1cbiAgICAgICAgICAgICAgICAgKiBgYGBcbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqINCd0LUg0YHRgtC+0LjRgiDQv9GD0YLQsNGC0Ywg0L/QsNGA0LDQvNC10YLRgNGLIGB0b3BgL2BsZWZ0YCDRgSDQv9C+0LfQuNGG0LjQtdC5INC/0L7Qv9Cw0L/QsC4g0KLRg9GCINGN0YLQuCDQv9Cw0YDQsNC80LXRgtGA0Ysg0YPQutCw0LfRi9Cy0LDRjtGCINC90LAg0L/QvtC30LjRhtC40Y4g0LTQvtGB0YLRg9C/0L3QvtC5XG4gICAgICAgICAgICAgICAgICog0L7QsdC70LDRgdGC0LgsINCwINC90LUg0L/QvtC/0LDQv9CwLlxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmNhbGNQb3NzaWJsZURyYXdpbmdQYXJhbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuX2NhbGNUYXJnZXREaW1lbnNpb25zKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3cG9ydCA9IHRoaXMuX2NhbGNWaWV3cG9ydERpbWVuc2lvbnMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcGFyYW1zID0gdGhpcy5wYXJhbXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMgPSBqc29uLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbk9mZnNldCA9IHBhcmFtcy5tYWluT2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5T2Zmc2V0ID0gcGFyYW1zLnNlY29uZGFyeU9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdwb3J0T2Zmc2V0ID0gcGFyYW1zLnZpZXdwb3J0T2Zmc2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMucGFyYW1zLmRpcmVjdGlvbnMubWFwKGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLmRpcmVjdGlvbnMubWFwKGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX2NoZWNrTWFpbkRpcmVjdGlvbihkaXJlY3Rpb24sICdib3R0b20nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy50b3AgPSB0YXJnZXQudG9wICsgdGFyZ2V0LmhlaWdodCArIG1haW5PZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmhlaWdodCA9IHZpZXdwb3J0LmJvdHRvbSAtIHJlcy50b3AgLSB2aWV3cG9ydE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLl9jaGVja01haW5EaXJlY3Rpb24oZGlyZWN0aW9uLCAndG9wJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuaGVpZ2h0ID0gdGFyZ2V0LnRvcCAtIHZpZXdwb3J0LnRvcCAtIG1haW5PZmZzZXQgLSB2aWV3cG9ydE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMudG9wID0gdGFyZ2V0LnRvcCAtIHJlcy5oZWlnaHQgLSBtYWluT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9jaGVja1NlY29uZGFyeURpcmVjdGlvbihkaXJlY3Rpb24sICdjZW50ZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuaGVpZ2h0ID0gdmlld3BvcnQuYm90dG9tIC0gdmlld3BvcnQudG9wIC0gMiAqIHZpZXdwb3J0T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMudG9wID0gdGFyZ2V0LnRvcCArICh0YXJnZXQuaGVpZ2h0IC0gcmVzLmhlaWdodCkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLl9jaGVja1NlY29uZGFyeURpcmVjdGlvbihkaXJlY3Rpb24sICdib3R0b20nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuaGVpZ2h0ID0gdGFyZ2V0LnRvcCArIHRhcmdldC5oZWlnaHQgLSB2aWV3cG9ydC50b3AgLSBzZWNvbmRhcnlPZmZzZXQgLSB2aWV3cG9ydE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnRvcCA9IHRhcmdldC50b3AgKyB0YXJnZXQuaGVpZ2h0IC0gcmVzLmhlaWdodCAtIHNlY29uZGFyeU9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5fY2hlY2tTZWNvbmRhcnlEaXJlY3Rpb24oZGlyZWN0aW9uLCAndG9wJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnRvcCA9IHRhcmdldC50b3AgKyBzZWNvbmRhcnlPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5oZWlnaHQgPSB2aWV3cG9ydC5ib3R0b20gLSByZXMudG9wIC0gdmlld3BvcnRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fY2hlY2tNYWluRGlyZWN0aW9uKGRpcmVjdGlvbiwgJ2xlZnQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMud2lkdGggPSB0YXJnZXQubGVmdCAtIHZpZXdwb3J0LmxlZnQgLSBtYWluT2Zmc2V0IC0gdmlld3BvcnRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5sZWZ0ID0gdGFyZ2V0LmxlZnQgLSByZXMud2lkdGggLSBtYWluT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5sZWZ0ID0gdGFyZ2V0LmxlZnQgKyB0YXJnZXQud2lkdGggKyBtYWluT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMud2lkdGggPSB2aWV3cG9ydC5yaWdodCAtIHJlcy5sZWZ0IC0gdmlld3BvcnRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9jaGVja1NlY29uZGFyeURpcmVjdGlvbihkaXJlY3Rpb24sICdyaWdodCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLndpZHRoID0gdGFyZ2V0LmxlZnQgKyB0YXJnZXQud2lkdGggLSB2aWV3cG9ydC5sZWZ0IC0gc2Vjb25kYXJ5T2Zmc2V0IC0gdmlld3BvcnRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmxlZnQgPSB0YXJnZXQubGVmdCArIHRhcmdldC53aWR0aCAtIHJlcy53aWR0aCAtIHNlY29uZGFyeU9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLl9jaGVja1NlY29uZGFyeURpcmVjdGlvbihkaXJlY3Rpb24sICdsZWZ0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMubGVmdCA9IHRhcmdldC5sZWZ0ICsgc2Vjb25kYXJ5T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy53aWR0aCA9IHZpZXdwb3J0LnJpZ2h0IC0gcmVzLmxlZnQgLSB2aWV3cG9ydE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLl9jaGVja1NlY29uZGFyeURpcmVjdGlvbihkaXJlY3Rpb24sICdjZW50ZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX2NoZWNrTWFpbkRpcmVjdGlvbihkaXJlY3Rpb24sICd0b3AnLCAnYm90dG9tJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLndpZHRoID0gdmlld3BvcnQucmlnaHQgLSB2aWV3cG9ydC5sZWZ0IC0gMiAqIHZpZXdwb3J0T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMubGVmdCA9IHRhcmdldC5sZWZ0ICsgdGFyZ2V0LndpZHRoIC8gMiAtIHJlcy53aWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiDQktGL0YfQuNGB0LvRj9C10YIg0LvRg9GH0YjQuNC1INC/0LDRgNCw0LzQtdGC0YDRiyDQvtGC0L7QsdGA0LDQttC10L3QuNGPLiDQn9C+0LQg0LvRg9GH0YjQuNC80Lgg0L/QsNGA0LDQvNC10YLRgNCw0LzQuCDQv9C+0L3QuNC80LDRjtGC0YHRjyDQv9Cw0YDQsNC80LXRgtGA0Ysg0LTQu9GPINC/0LXRgNCy0L7Qs9C+INC/0L7QtNGF0L7QtNGP0YnQtdCz0L5cbiAgICAgICAgICAgICAgICAgKiDQvdCw0L/RgNCw0LLQu9C10L3QuNGPINC40LcgZGlyZWN0aW9ucywg0LrQvtGC0L7RgNC+0LUg0LzQvtC20LXRgiDQvtCx0LXRgdC/0LXRh9C40YLRjCDRgNCw0LfQvNC10YnQtdC90LjQtSA5OSUgKFZJRVdQT1JUX0FDQ1VSQUNZX0ZBQ1RPUikg0L/Qu9C+0YnQsNC00Lgg0L/QvtC/0LDQv9CwLlxuICAgICAgICAgICAgICAgICAqINCV0YHQu9C4INC/0L7QtNGF0L7QtNGP0YnQtdCz0L4g0L3QsNC/0YDQsNCy0LvQtdC90LjRjyDQvdC1INC90LDQudC00LXQvdC+LCDRgtC+INC/0YDQtdC00L/QvtGH0YLQtdC90LjQtSDQvtGC0LTQsNC10YLRgdGPINC90LDQv9GA0LDQstC70LXQvdC40Y4sINCyINC60L7RgtC+0YDQvtC8INC/0L7Qv9Cw0L8g0L7RgtC60YDRi9Cy0LDQu9GB0Y9cbiAgICAgICAgICAgICAgICAgKiDQv9C+0YHQu9C10LTQvdC40Lkg0YDQsNC3LCDQuNC70Lgg0L/QtdGA0LLQvtC80YMg0L3QsNC/0YDQsNCy0LvQtdC90LjRjiDQuNC3INGB0L/QuNGB0LrQsC5cbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsY0Jlc3REcmF3aW5nUGFyYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3B1cCA9IHRoaXMuX2NhbGNQb3B1cERpbWVuc2lvbnMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHRoaXMuX2NhbGNUYXJnZXREaW1lbnNpb25zKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3cG9ydCA9IHRoaXMuX2NhbGNWaWV3cG9ydERpbWVuc2lvbnMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGlyZWN0aW9ucyA9IHRoaXMucGFyYW1zLmRpcmVjdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25zID0ganNvbi5kaXJlY3Rpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uc0xlbmd0aCA9IGRpcmVjdGlvbnMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld3BvcnRGYWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0RGlyZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmVzdFBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RWaWV3cG9ydEZhY3RvcjtcblxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZGlyZWN0aW9uc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gdGhpcy5fY2FsY1BvcyhkaXJlY3Rpb24sIHRhcmdldCwgcG9wdXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlld3BvcnRGYWN0b3IgPSB0aGlzLl9jYWxjVmlld3BvcnRGYWN0b3IocG9zLCB2aWV3cG9ydCwgcG9wdXApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpID09PSAwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld3BvcnRGYWN0b3IgPiBiZXN0Vmlld3BvcnRGYWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIWJlc3RWaWV3cG9ydEZhY3RvciAmJiB0aGlzLmhhc01vZCgnZGlyZWN0aW9uJywgZGlyZWN0aW9uKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3REaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdFZpZXdwb3J0RmFjdG9yID0gdmlld3BvcnRGYWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdFBvcyA9IHBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYmVzdFZpZXdwb3J0RmFjdG9yID4gdGhpcy5fX3NlbGYuVklFV1BPUlRfQUNDVVJBQ1lfRkFDVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBiZXN0RGlyZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogYmVzdFBvcy5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBiZXN0UG9zLnRvcFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsY1BvcHVwRGltZW5zaW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvL3ZhciBwb3B1cFdpZHRoID0gdGhpcy5kb21FbGVtLm91dGVyV2lkdGgoKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcG9wdXBIZWlnaHQgPSB0aGlzLmRvbUVsZW0ub3V0ZXJIZWlnaHQoKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZG9tID0gdGhpcy5kb21FbGVtKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3B1cFdpZHRoID0gZG9tLm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBIZWlnaHQgPSBkb20ub2Zmc2V0SGVpZ2h0XG5cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHBvcHVwV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHBvcHVwSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlYTogcG9wdXBXaWR0aCAqIHBvcHVwSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQGFic3RyYWN0XG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxjVGFyZ2V0RGltZW5zaW9ucyA9IGZ1bmN0aW9uKCkge31cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsY1ZpZXdwb3J0RGltZW5zaW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvL3ZhciB3aW4gPSBCRU0uRE9NLndpbixcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdpbiA9IHdpbmRvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2luVG9wID0gd2luLnNjcm9sbFRvcCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luVG9wID0gd2luLnBhZ2VZT2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgLy93aW5MZWZ0ID0gd2luLnNjcm9sbExlZnQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbkxlZnQgPSB3aW4ucGFnZVhPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3dpbldpZHRoID0gd2luLndpZHRoKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5XaWR0aCA9IHdpbi5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy93aW5IZWlnaHQgPSB3aW4uaGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5IZWlnaHQgPSB3aW4uaW5uZXJIZWlnaHRcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB3aW5Ub3AsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB3aW5MZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiB3aW5Ub3AgKyB3aW5IZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogd2luTGVmdCArIHdpbldpZHRoXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICog0JLRi9GH0LjRgdC70Y/QtdGCINC60L7QvtGA0LTQuNC90LDRgtGLINC/0L7Qv9Cw0L/QsCDQtNC70Y8g0LfQsNC00LDQvdC90L7Qs9C+INC90LDQv9GA0LDQstC70LXQvdC40Y9cbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdGlvbiDQodGC0YDQvtC60LAg0YLQuNC/0LAgYm90dG9tLWxlZnRcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0ICAgINCg0LDQt9C80LXRgNGLIHRhcmdldC1hOiB0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHRcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcG9wdXAgICAgINCg0LDQt9C80LXRgNGLINC/0L7Qv9Cw0L/QsDogd2lkdGgsIGhlaWdodCwgYXJlYVxuICAgICAgICAgICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9ICAgICAgICAg0JrQvtC+0YDQtNC40L3QsNGC0Ysg0L/QvtC/0LDQv9CwOiBsZWZ0LCB0b3BcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxjUG9zID0gZnVuY3Rpb24oZGlyZWN0aW9uLCB0YXJnZXQsIHBvcHVwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXMgPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWFpbk9mZnNldCA9IHRoaXMucGFyYW1zLm1haW5PZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluT2Zmc2V0ID0ganNvbi5tYWluT2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5T2Zmc2V0ID0ganNvbi5zZWNvbmRhcnlPZmZzZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fY2hlY2tNYWluRGlyZWN0aW9uKGRpcmVjdGlvbiwgJ2JvdHRvbScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMudG9wID0gdGFyZ2V0LnRvcCArIHRhcmdldC5oZWlnaHQgKyBtYWluT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5fY2hlY2tNYWluRGlyZWN0aW9uKGRpcmVjdGlvbiwgJ3RvcCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMudG9wID0gdGFyZ2V0LnRvcCAtIHBvcHVwLmhlaWdodCAtIG1haW5PZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLl9jaGVja01haW5EaXJlY3Rpb24oZGlyZWN0aW9uLCAnbGVmdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMubGVmdCA9IHRhcmdldC5sZWZ0IC0gcG9wdXAud2lkdGggLSBtYWluT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5fY2hlY2tNYWluRGlyZWN0aW9uKGRpcmVjdGlvbiwgJ3JpZ2h0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5sZWZ0ID0gdGFyZ2V0LmxlZnQgKyB0YXJnZXQud2lkdGggKyBtYWluT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fY2hlY2tTZWNvbmRhcnlEaXJlY3Rpb24oZGlyZWN0aW9uLCAncmlnaHQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmxlZnQgPSB0YXJnZXQubGVmdCArIHRhcmdldC53aWR0aCAtIHBvcHVwLndpZHRoIC0gc2Vjb25kYXJ5T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5fY2hlY2tTZWNvbmRhcnlEaXJlY3Rpb24oZGlyZWN0aW9uLCAnbGVmdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMubGVmdCA9IHRhcmdldC5sZWZ0ICsgc2Vjb25kYXJ5T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5fY2hlY2tTZWNvbmRhcnlEaXJlY3Rpb24oZGlyZWN0aW9uLCAnYm90dG9tJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy50b3AgPSB0YXJnZXQudG9wICsgdGFyZ2V0LmhlaWdodCAtIHBvcHVwLmhlaWdodCAtIHNlY29uZGFyeU9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuX2NoZWNrU2Vjb25kYXJ5RGlyZWN0aW9uKGRpcmVjdGlvbiwgJ3RvcCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMudG9wID0gdGFyZ2V0LnRvcCArIHNlY29uZGFyeU9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuX2NoZWNrU2Vjb25kYXJ5RGlyZWN0aW9uKGRpcmVjdGlvbiwgJ2NlbnRlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9jaGVja01haW5EaXJlY3Rpb24oZGlyZWN0aW9uLCAndG9wJywgJ2JvdHRvbScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmxlZnQgPSB0YXJnZXQubGVmdCArIHRhcmdldC53aWR0aCAvIDIgLSBwb3B1cC53aWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5fY2hlY2tNYWluRGlyZWN0aW9uKGRpcmVjdGlvbiwgJ2xlZnQnLCAncmlnaHQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy50b3AgPSB0YXJnZXQudG9wICsgdGFyZ2V0LmhlaWdodCAvIDIgLSBwb3B1cC5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiDQktGL0YfQuNGB0LvRj9C10YIg0LrQvtGN0YTRhNC40YbQuNC10L3RgiAoZmFjdG9yKSDQv9C10YDQtdGB0LXRh9C10L3QuNGPINC00L7RgdGC0YPQv9C90L7QuSDQv9C70L7RidCw0LTQuCDQtNC70Y8g0L7RgtC60YDRi9GC0LjRjyDQv9C+0L/QsNC/0LAg0Lgg0YHQvtCx0YHRgtCy0LXQvdC90L7QuSDQv9C70L7RidCw0LTQuCDQv9C+0L/QsNC/0LAuXG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxjVmlld3BvcnRGYWN0b3IgPSBmdW5jdGlvbihwb3MsIHZpZXdwb3J0LCBwb3B1cCkge1xuICAgICAgICAgICAgICAgICAgICAvL3ZhciB2aWV3cG9ydE9mZnNldCA9IHRoaXMucGFyYW1zLnZpZXdwb3J0T2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICB2YXIgdmlld3BvcnRPZmZzZXQgPSBqc29uLnZpZXdwb3J0T2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9uTGVmdCA9IE1hdGgubWF4KHBvcy5sZWZ0LCB2aWV3cG9ydC5sZWZ0ICsgdmlld3BvcnRPZmZzZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9uUmlnaHQgPSBNYXRoLm1pbihwb3MubGVmdCArIHBvcHVwLndpZHRoLCB2aWV3cG9ydC5yaWdodCAtIHZpZXdwb3J0T2Zmc2V0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVyc2VjdGlvblRvcCA9IE1hdGgubWF4KHBvcy50b3AsIHZpZXdwb3J0LnRvcCArIHZpZXdwb3J0T2Zmc2V0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVyc2VjdGlvbkJvdHRvbSA9IE1hdGgubWluKHBvcy50b3AgKyBwb3B1cC5oZWlnaHQsIHZpZXdwb3J0LmJvdHRvbSAtIHZpZXdwb3J0T2Zmc2V0KTtcblxuICAgICAgICAgICAgICAgICAgICBpZihpbnRlcnNlY3Rpb25MZWZ0IDwgaW50ZXJzZWN0aW9uUmlnaHQgJiYgaW50ZXJzZWN0aW9uVG9wIDwgaW50ZXJzZWN0aW9uQm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQtdGB0YLRjCDQv9C10YDQtdGB0LXRh9C10L3QuNC1XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGludGVyc2VjdGlvblJpZ2h0IC0gaW50ZXJzZWN0aW9uTGVmdCkgKiAoaW50ZXJzZWN0aW9uQm90dG9tIC0gaW50ZXJzZWN0aW9uVG9wKSAvIHBvcHVwLmFyZWE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tNYWluRGlyZWN0aW9uID0gZnVuY3Rpb24oZGlyZWN0aW9uLCBtYWluRGlyZWN0aW9uMSwgbWFpbkRpcmVjdGlvbjIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGlvbi5pbmRleE9mKG1haW5EaXJlY3Rpb24xKSA9PT0gMCB8fCAobWFpbkRpcmVjdGlvbjIgJiYgZGlyZWN0aW9uLmluZGV4T2YobWFpbkRpcmVjdGlvbjIpID09PSAwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrU2Vjb25kYXJ5RGlyZWN0aW9uID0gZnVuY3Rpb24oZGlyZWN0aW9uLCBzZWNvbmRhcnlEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGlvbi5pbmRleE9mKCctJyArIHNlY29uZGFyeURpcmVjdGlvbikgPiAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tEaXJlY3Rpb24gPSBmdW5jdGlvbihkaXJlY3Rpb24sIGRpcmVjdGlvblBhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGlvbi5pbmRleE9mKGRpcmVjdGlvblBhcnQpID49IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl9vbldpblNjb2xsQW5kUmVzaXplID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmdldERlZmF1bHRQYXJhbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2Jhc2UuYXBwbHkodGhpcywgYXJndW1lbnRzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeU9mZnNldDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3cG9ydE9mZnNldDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25zOiB0aGlzLl9fc2VsZi5BVkFJTEFCTEVfRElSRUNUSU9OU1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSlcbiAgICB9KVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaCkge1xuXG4gICAgYmgubWF0Y2goJ3BvcHVwMl92aXNpYmxlX3llcycsIGZ1bmN0aW9uKGN0eCwganNvbikge1xuZGVidWdnZXJcbiAgICAgICAgaWYgKGN0eC5fX2ZsYWcpIHsgcmV0dXJuIH1cblxuICAgICAgICBqc29uLm1haW5PZmZzZXQgPSAwXG4gICAgICAgIGpzb24uc2Vjb25kYXJ5T2Zmc2V0ID0gMFxuICAgICAgICBqc29uLnZpZXdwb3J0T2Zmc2V0ID0gMFxuXG4gICAgICAgIGlmKCFjdHguX2FuY2hvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5cXCd0IHNob3cgcG9wdXAgd2l0aG91dCBhbmNob3InKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY3R4Ll9hbmNob3JQYXJlbnRzID0gdGhpcy5fYW5jaG9yLnBhcmVudHMoKTtcbiAgICAgICAgLy9jdHguX2JpbmRUb0FuY2hvclBhcmVudHMoKTtcbiAgICB9KVxuXG4gICAgYmgubWF0Y2goJ3BvcHVwMl92aXNpYmxlX25vJywgZnVuY3Rpb24oY3R4LCBqc29uKSB7XG4gICAgICAgIGlmIChjdHguX19mbGFnKSB7IHJldHVybiB9XG5cbiAgICAgICAgLy90aGlzLl91bmJpbmRGcm9tQW5jaG9yUGFyZW50cygpO1xuICAgICAgICB0aGlzLl9hbmNob3JQYXJlbnRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5faXNBbmNob3JWaXNpYmxlID0gdW5kZWZpbmVkO1xuICAgIH0pXG5cbiAgICBiaC5tYXRjaCgncG9wdXAyX3RhcmdldF9hbmNob3InLCBmdW5jdGlvbihjdHgsIGpzb24pIHtcbiAgICAgICAgZGVidWdnZXJcbiAgICAgICAgY3R4Lm1peEpzKHtibG9jazogJ3BvcHVwJywgbW9kczogeyd0YXJnZXQnOiB0cnVlfX0pXG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLmRpZE1vdW50KGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICAgICAgdGhpcy5fYW5jaG9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmNob3JQYXJlbnRzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cnVjdG9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0FuY2hvclZpc2libGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgLy90aGlzLl91cGRhdGVJc0FuY2hvclZpc2libGUgPSAkLnRocm90dGxlKFxuICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuX3VwZGF0ZUlzQW5jaG9yVmlzaWJsZSxcbiAgICAgICAgICAgICAgICAvLyAgICB0aGlzLl9fc2VsZi5VUERBVEVfVEFSR0VUX1ZJU0lCSUxJVFlfVEhST1RUTElOR19JTlRFUlZBTCxcbiAgICAgICAgICAgICAgICAvLyAgICB0aGlzKTtcblxuXG5cblxuXG5cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINGG0LXQu9GMLCDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L4g0LrQvtGC0L7RgNC+0Lkg0L3Rg9C20L3QviDQvtGC0LrRgNGL0LLQsNGC0YzRgdGPLlxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtqUXVlcnl8QkVNLkRPTX0gYW5jaG9yXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge0JFTS5ET00ucG9wdXAyfSB0aGlzXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBbmNob3IgPSBmdW5jdGlvbihhbmNob3IpIHtcbmRlYnVnZ2VyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5fdW5iaW5kRnJvbUFuY2hvclBhcmVudHMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLl91bmJpbmRGcm9tUGFyZW50UG9wdXAoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLl91bmJpbmRGcm9tRGVzdHJ1Y3RvcigpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5fYW5jaG9yID0gYW5jaG9yIGluc3RhbmNlb2YgQkVNLkRPTSA/XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGFuY2hvci5kb21FbGVtIDpcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgYW5jaG9yO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmNob3IgPSBhbmNob3JcblxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuX2Rlc3RydWN0b3IgPSBiZW1pbml6ZSh0aGlzLl9hbmNob3IsICdfJyArIHRoaXMuX19zZWxmLmdldE5hbWUoKSArICctZGVzdHJ1Y3RvcicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0FuY2hvclZpc2libGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLl9iaW5kVG9EZXN0cnVjdG9yKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9pZih0aGlzLmhhc01vZCgndmlzaWJsZScsICd5ZXMnKSkge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLm1vZCgndmlzaWJsZScpID09PSAneWVzJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5jaG9yUGFyZW50cyA9IHRoaXMuX2FuY2hvci5wYXJlbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLl9yZWNhcHR1cmVaSW5kZXgoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5fYmluZFRvQW5jaG9yUGFyZW50cygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLl9iaW5kVG9QYXJlbnRQb3B1cCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlZHJhdygpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5jaG9yUGFyZW50cyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl96SW5kZXhHcm91cExldmVsID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBvdmVycmlkZVxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsY1RhcmdldERpbWVuc2lvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuY2hvciA9IHRoaXMuX2FuY2hvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvclBvcyA9IHRoaXMuX2dldE9mZnNldE9mKGFuY2hvcik7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGFuY2hvclBvcy5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBhbmNob3JQb3MudG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy93aWR0aDogYW5jaG9yLm91dGVyV2lkdGgoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaGVpZ2h0OiBhbmNob3Iub3V0ZXJIZWlnaHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGFuY2hvci5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogYW5jaG9yLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC/0L7Qt9C40YbQuNGOINGN0LvQtdC80LXQvdGC0LAg0L7RgtC90L7RgdC40YLQtdC70YzQvdC+INC90LDRh9Cw0LvQsCDRgdGC0YDQsNC90LjRhtGLINGBINGD0YfQtdGC0L7QvCDQvtGI0LjQsdC+0LogSUUg0L3QsCBXaW5kb3dzIFBob25lLlxuICAgICAgICAgICAgICAgICAqIEBzZWUgaHR0cHM6Ly9zdC55YW5kZXgtdGVhbS5ydS9JU0xDT01QT05FTlRTLTE2MjdcbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1cbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX2dldE9mZnNldE9mID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAvL3ZhciBvZmZzZXQgPSBlbGVtLm9mZnNldCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoJ3BhZ2VZT2Zmc2V0JyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINCe0LHRi9GH0L3QviDRjdGC0Lgg0YDQsNC30L3QvtGB0YLQuCDRgNCw0LLQvdGLIDAsINGC0LDQuiDRh9GC0L4g0L3QtSBJRSDQuCDQvdC1INC30LDQvNC10YLQuNGCLlxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0LnRvcCAtPSAod2luZG93LnBhZ2VZT2Zmc2V0IC0gKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldC5sZWZ0IC09ICh3aW5kb3cucGFnZVhPZmZzZXQgLSAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2Zmc2V0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBvdmVycmlkZVxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciBfX2NhbGNEcmF3aW5nQ3NzID0gZnVuY3Rpb24oZHJhd2luZ1BhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBkcmF3aW5nUGFyYW1zLmxlZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBkcmF3aW5nUGFyYW1zLnRvcFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGNEcmF3aW5nQ3NzID0gZnVuY3Rpb24oZHJhd2luZ1BhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5faXNBbmNob3JWaXNpYmxlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNBbmNob3JWaXNpYmxlID0gdGhpcy5fY2FsY0lzQW5jaG9yVmlzaWJsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXh0ZW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgX19jYWxjRHJhd2luZ0NzcyhkcmF3aW5nUGFyYW1zKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkaXNwbGF5OiB0aGlzLl9pc0FuY2hvclZpc2libGUgPyAnJyA6ICdub25lJ30pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqINCS0YvRh9C40YHQu9GP0LXRgiwg0LLQuNC00LjQvCDQu9C4INGB0LXQudGH0LDRgSBhbmNob3Ig0L/QvtC/0LDQv9CwLlxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsY0lzQW5jaG9yVmlzaWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYW5jaG9yID0gdGhpcy5fYW5jaG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yT2Zmc2V0ID0gdGhpcy5fZ2V0T2Zmc2V0T2YoYW5jaG9yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvckxlZnQgPSBhbmNob3JPZmZzZXQubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvclRvcCA9IGFuY2hvck9mZnNldC50b3AsXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FuY2hvclJpZ2h0ID0gYW5jaG9yTGVmdCArIGFuY2hvci5vdXRlcldpZHRoKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FuY2hvckJvdHRvbSA9IGFuY2hvclRvcCArIGFuY2hvci5vdXRlckhlaWdodCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yUmlnaHQgPSBhbmNob3JMZWZ0ICsgYW5jaG9yLm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yQm90dG9tID0gYW5jaG9yVG9wICsgYW5jaG9yLm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGlyZWN0aW9uID0gdGhpcy5nZXRNb2QoJ2RpcmVjdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gdGhpcy5tb2QoJ2RpcmVjdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVydEJvcmRlciA9IE1hdGguZmxvb3IodGhpcy5fY2hlY2tEaXJlY3Rpb24oZGlyZWN0aW9uLCAndG9wJykgPyBhbmNob3JUb3AgOiBhbmNob3JCb3R0b20pLFxuICAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpCb3JkZXIgPSBNYXRoLmZsb29yKHRoaXMuX2NoZWNrRGlyZWN0aW9uKGRpcmVjdGlvbiwgJ2xlZnQnKSA/IGFuY2hvckxlZnQgOiBhbmNob3JSaWdodCksXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuY2hvclBhcmVudHMgJiYgdGhpcy5fYW5jaG9yUGFyZW50cy5lYWNoKGZ1bmN0aW9uKGlkeCwgcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwYXJlbnQudGFnTmFtZSA9PT0gJ0JPRFknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSAkKHBhcmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZSA9IC9zY3JvbGx8aGlkZGVufGF1dG8vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc092ZXJmbG93WSA9IHJlLnRlc3QocGFyZW50LmNzcygnb3ZlcmZsb3cteScpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNPdmVyZmxvd1ggPSByZS50ZXN0KHBhcmVudC5jc3MoJ292ZXJmbG93LXgnKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhhc092ZXJmbG93WSB8fCBoYXNPdmVyZmxvd1gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50T2Zmc2V0ID0gdGhpcy5fZ2V0T2Zmc2V0T2YocGFyZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhhc092ZXJmbG93WSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50VG9wT2Zmc2V0ID0gTWF0aC5mbG9vcihwYXJlbnRPZmZzZXQudG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodmVydEJvcmRlciA8IHBhcmVudFRvcE9mZnNldCB8fCBwYXJlbnRUb3BPZmZzZXQgKyBwYXJlbnQub3V0ZXJIZWlnaHQoKSA8IHZlcnRCb3JkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhhc092ZXJmbG93WCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50TGVmdE9mZnNldCA9IE1hdGguZmxvb3IocGFyZW50T2Zmc2V0LmxlZnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBob3JpekJvcmRlciA+PSBwYXJlbnRMZWZ0T2Zmc2V0ICYmIHBhcmVudExlZnRPZmZzZXQgKyBwYXJlbnQub3V0ZXJXaWR0aCgpID49IGhvcml6Qm9yZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsY1pJbmRleEdyb3VwTGV2ZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcyA9IHRoaXMuX19iYXNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc3RydWN0b3IuZmluZEJsb2Nrc091dHNpZGUoJ3otaW5kZXgtZ3JvdXAnKS5yZWR1Y2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXMsIHpJbmRleEdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcyArIE51bWJlcih6SW5kZXhHcm91cC5nZXRNb2QoJ2xldmVsJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl9iaW5kVG9BbmNob3JQYXJlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJpbmRUbyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuY2hvclBhcmVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2Nyb2xsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29uQW5jaG9yUGFyZW50c1Njcm9sbCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl91bmJpbmRGcm9tQW5jaG9yUGFyZW50cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmNob3JQYXJlbnRzICYmIHRoaXMudW5iaW5kRnJvbShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuY2hvclBhcmVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2Nyb2xsJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5fb25BbmNob3JQYXJlbnRzU2Nyb2xsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZWRyYXcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLl91cGRhdGVJc0FuY2hvclZpc2libGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAb3ZlcnJpZGVcbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX29uV2luU2NvbGxBbmRSZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2Jhc2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSXNBbmNob3JWaXNpYmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICog0KHQutGA0YvQstCw0LXRgiDQv9C+0L/QsNC/LCDQtdGB0LvQuCBhbmNob3Ig0L3QtSDQstC40LTQuNC8ICjRg9GI0LXQuyDQt9CwINC/0L7Qu9C+0YHRiyDQv9GA0L7QutGA0YPRgtC60LgpINC4INC90LDQvtCx0L7RgNC+0YIuXG4gICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVJc0FuY2hvclZpc2libGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuZG9tRWxlbSB8fCAhdGhpcy5oYXNNb2QoJ3Zpc2libGUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzQW5jaG9yVmlzaWJsZSA9IHRoaXMuX2NhbGNJc0FuY2hvclZpc2libGUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNBbmNob3JWaXNpYmxlICE9PSB0aGlzLl9pc0FuY2hvclZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzQW5jaG9yVmlzaWJsZSA9IGlzQW5jaG9yVmlzaWJsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX2JpbmRUb0Rlc3RydWN0b3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVzdHJ1Y3Rvci5vbignZGVzdHJ1Y3QnLCB0aGlzLl9vblBvcHVwQW5jaG9yRGVzdHJ1Y3QsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX3VuYmluZEZyb21EZXN0cnVjdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3RydWN0b3IgJiYgdGhpcy5fZGVzdHJ1Y3Rvci51bignZGVzdHJ1Y3QnLCB0aGlzLl9vblBvcHVwQW5jaG9yRGVzdHJ1Y3QsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX29uUG9wdXBBbmNob3JEZXN0cnVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW0gJiYgQkVNLkRPTS5kZXN0cnVjdCh0aGlzLmRvbUVsZW0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0UGFyZW50UG9wdXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fcGFyZW50UG9wdXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50UG9wdXAgPSB0aGlzLmZpbmRCbG9ja091dHNpZGUodGhpcy5fYW5jaG9yLCB0aGlzLl9fc2VsZi5nZXROYW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudFBvcHVwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcblxuXG4gICAgICAgICAgICB9KVxuICAgIH0pXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJoKSB7XG4gICAgYmgubWF0Y2goJ3BvcHVwMl90YXJnZXRfcG9zaXRpb24nLCBmdW5jdGlvbihjdHgsIGpzb24pIHtcbiAgICB9KVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaCkge1xuXG4vKiAqKipcbiAgICAgICAgJ3Zpc2libGUnOiB7XG4gICAgICAgICAgICAneWVzJzogZnVuY3Rpb24oKSB7XG4qKiogKi9cbiAgICBiaC5tYXRjaCgncG9wdXAyX3Zpc2libGVfeWVzJywgZnVuY3Rpb24oY3R4LCBqc29uKSB7XG5kZWJ1Z2dlclxuICAgICAgICBpZiAoY3R4Ll9fZmxhZykgeyByZXR1cm4gfVxuXG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLl9jYXB0dXJlWkluZGV4KClcbiAgICB9KVxuXG4gICAgYmgubWF0Y2goJ3BvcHVwMl92aXNpYmxlX25vJywgZnVuY3Rpb24oY3R4LCBqc29uKSB7XG4gICAgICAgIGlmIChjdHguX19mbGFnKSB7IHJldHVybiB9XG5cbiAgICAgICAgY3R4XG4gICAgICAgICAgICAuX3JlbGVhc2VaSW5kZXgoKVxuICAgIH0pXG5cbiAgICBiaC5tYXRjaCgncG9wdXAyJywgZnVuY3Rpb24oY3R4LCBqc29uKSB7XG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLndpbGxSZWNlaXZlUHJvcHMoZnVuY3Rpb24oY3R4LCBqc29uKSB7XG4gICAgICAgICAgICAgICAgLy90byBwZXJzaXN0IHpJbmRleCBzdHlsZSBhdHRyXG4gICAgICAgICAgICAgICAganNvbi5hdHRycyA9IGN0eC5hdHRycygpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLndpbGxNb3VudChmdW5jdGlvbihjdHgsIGpzb24pIHtcbiAgICAgICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgICAgIGN0eC5tb2QoJ2pzJywgJ2luaXRlZCcpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRpZE1vdW50KGZ1bmN0aW9uKGN0eCwganNvbikge1xuXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3R4LmRvbUVsZW0oKSlcbi8qICoqKlxuICAgICAgICAgICAgICAgIG9uU2V0TW9kOiB7XG4gICAgICAgICAgICAgICAgICAgICdqcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbml0ZWQnOiBmdW5jdGlvbigpIHtcbiAgICAqKiogKi9cblxuICAgICAgICAgICAgICAgICAgICBjdHguX3BhcmVudFBvcHVwID0gdW5kZWZpbmVkOyAvLyDQotGD0YIg0LLQsNC20LXQvSB1bmRlZmluZWQuINCe0LfQvdCw0YfQsNC10YIsINGH0YLQviDQv9C+0L/QsNC/INC10YnQtSDQvdC1INC40YHQutCw0LvQuC5cbiAgICAgICAgICAgICAgICAgICAgY3R4Ll96SW5kZXggPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBjdHguX3pJbmRleEdyb3VwTGV2ZWwgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBjdHguX2lzQXR0YWNoZWRUb1Njb3BlID0gZmFsc2U7XG4gICAgLyogKioqXG4gICAgICAgICAgICAgICAgICAgIGdldERlZmF1bHRQYXJhbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXhHcm91cExldmVsOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgKioqICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4R3JvdXBMZXZlbDogMFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqINCl0YDQsNC90LjRgiDRgdGC0LXQutC4INCy0YHQtdGFIHotaW5kZXgg0LTQu9GPINC+0YLQutGA0YvRgtGL0YUg0L/QvtC/0LDQv9C+0LIuINCY0LzQtdC10YIg0YLQsNC60YPRjiDRgdGC0YDRg9C60YLRg9GA0YM6XG4gICAgICAgICAgICAgICAgICAgICAqIHtcbiAgICAgICAgICAgICAgICAgICAgICogICAgMDogWzEwMDAsIDEwMDEsIDEwMDJdLCAvLyDQutC70Y7RhyAtINGN0YLQviDRg9GA0L7QstC10L3RjCwg0LfQvdCw0YfQtdC90LjRjyDQsiDQvNCw0YHRgdC40LLQtSAtINGN0YLQviDQt9Cw0L3Rj9GC0YvQtSB6LWluZGV4LdGLXG4gICAgICAgICAgICAgICAgICAgICAqICAgIDk6IFsxMDAwMCwgMTAwMDFdXG4gICAgICAgICAgICAgICAgICAgICAqICAgIC8vIC4uXG4gICAgICAgICAgICAgICAgICAgICAqIH1cbiAgICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zZWxmLl92aXNpYmxlUG9wdXBzWkluZGV4ZXMgPSB7fVxuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NlbGYuWklOREVYX0ZBQ1RPUiA9IDEwMDBcblxuXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY3R4Ll9jYWxjWkluZGV4R3JvdXBMZXZlbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXMgPSB0aGlzLnBhcmFtcy56SW5kZXhHcm91cExldmVsLFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRQb3B1cCA9IHRoaXMuX2dldFBhcmVudFBvcHVwKCk7XG5cbiAgICAgICAgICAgICAgICBpZihwYXJlbnRQb3B1cCkge1xuICAgICAgICAgICAgICAgICAgICByZXMgKz0gcGFyZW50UG9wdXAuX3pJbmRleEdyb3VwTGV2ZWw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiDQktGL0YHRgtCw0LLQu9GP0LXRgiDRgdC10LHQtSDQuCDQstGB0LXQvCDRgNC+0LTQuNGC0LXQu9GM0YHQutC40Lwg0L/QvtC/0LDQv9Cw0Lwg0YTQu9Cw0LMg0LTQu9GPINC/0YDQtdC00L7RgtCy0YDQsNGJ0LXQvdC40Y8g0LfQsNC60YDRi9GC0LjRjyDQv9C+INC60LvQuNC60YMuXG4gICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjdHguX3NldFByZXZlbnRIaWRlQnlDbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjdXJQb3B1cCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBjdXJQb3B1cC5fcHJldmVudEhpZGVCeUNsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY3VyUG9wdXAgPSBjdXJQb3B1cC5fZ2V0UGFyZW50UG9wdXAoKTtcbiAgICAgICAgICAgICAgICB9IHdoaWxlKGN1clBvcHVwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjdHguX2JpbmRUb1BhcmVudFBvcHVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudFBvcHVwID0gdGhpcy5fZ2V0UGFyZW50UG9wdXAoKTtcbiAgICAgICAgICAgICAgICBwYXJlbnRQb3B1cCAmJiBwYXJlbnRQb3B1cC5vbignYmVmb3JlQ2xvc2UnLCB0aGlzLl9vblBhcmVudFBvcHVwQ2xvc2UsIHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY3R4Ll91bmJpbmRGcm9tUGFyZW50UG9wdXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnRQb3B1cCAmJiB0aGlzLl9wYXJlbnRQb3B1cC51bignYmVmb3JlQ2xvc2UnLCB0aGlzLl9vblBhcmVudFBvcHVwQ2xvc2UsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudFBvcHVwID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY3R4Ll9vblBhcmVudFBvcHVwQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbE1vZCgndmlzaWJsZScpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjdHguX2dldFBhcmVudFBvcHVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudFBvcHVwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqINCX0LDQvdC40LzQsNC10YIg0L3QsNC40LzQtdC90YzRiNC40Lkg0YHQstC+0LHQvtC00L3Ri9C5IHotaW5kZXgg0LIg0YHRgtC10LrQtSDQtNC70Y8g0YHQstC+0LXQs9C+INGD0YDQvtCy0L3Rjy4g0JLRi9GB0YLQsNCy0LvRj9C10YIg0LXQs9C+IERPTS3RjdC70LXQvNC10L3RgtGDLlxuICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY3R4Ll9jYXB0dXJlWkluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5fekluZGV4R3JvdXBMZXZlbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl96SW5kZXhHcm91cExldmVsID0gdGhpcy5fY2FsY1pJbmRleEdyb3VwTGV2ZWwoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgdmlzaWJsZVBvcHVwc1pJbmRleGVzID0gdGhpcy5fX3NlbGYuX3Zpc2libGVQb3B1cHNaSW5kZXhlcyxcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWwgPSB0aGlzLl96SW5kZXhHcm91cExldmVsLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXhlcyA9IHZpc2libGVQb3B1cHNaSW5kZXhlc1tsZXZlbF0sXG4gICAgICAgICAgICAgICAgICAgIHByZXZaSW5kZXggPSB0aGlzLl96SW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpZighekluZGV4ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgekluZGV4ZXMgPSB2aXNpYmxlUG9wdXBzWkluZGV4ZXNbbGV2ZWxdID0gWyhsZXZlbCArIDEpICogdGhpcy5fX3NlbGYuWklOREVYX0ZBQ1RPUl07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fekluZGV4ID0gekluZGV4ZXNbekluZGV4ZXMubGVuZ3RoIC0gMV0gKyAxO1xuICAgICAgICAgICAgICAgIHpJbmRleGVzLnB1c2godGhpcy5fekluZGV4KTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX3pJbmRleCAhPT0gcHJldlpJbmRleCkge1xuZGVidWdnZXJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gdGhpcy5hdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cignc3R5bGUnLCB0aGlzLmV4dGVuZChzdHlsZSwgeyd6SW5kZXgnOiB0aGlzLl96SW5kZXh9KSwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRvbUVsZW0oKS5zdHlsZVsnei1pbmRleCddID0gdGhpcy5fekluZGV4XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICog0J7RgdCy0L7QsdC+0LbQtNCw0LXRgiB6LWluZGV4INCyINGB0YLQtdC60LUuXG4gICAgICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjdHguX3JlbGVhc2VaSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgekluZGV4ZXMgPSB0aGlzLl9fc2VsZi5fdmlzaWJsZVBvcHVwc1pJbmRleGVzW3RoaXMuX3pJbmRleEdyb3VwTGV2ZWxdO1xuICAgICAgICAgICAgICAgIHpJbmRleGVzLnNwbGljZSh6SW5kZXhlcy5pbmRleE9mKHRoaXMuX3pJbmRleCksIDEpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqINCe0YHQstC+0LHQvtC20LTQsNC10YIgei1pbmRleCDQsiDRgdGC0LXQutC1LCDQv9C10YDQtdGB0YfQuNGC0YvQstCw0LXRgiDQt9Cw0L3QvtCy0L4g0YHQstC+0Lkg0YPRgNC+0LLQtdC90YwgKNC90YPQttC90L4sINC10YHQu9C4INC/0L7Qv9Cw0L8g0L/QtdGA0LXQvNC10YHRgtC40LvQuCDQuiDQtNGA0YPQs9C+0LzRgyBhbmNob3IpXG4gICAgICAgICAgICAgKiDQuCDQt9Cw0L3QuNC80LDQtdGCIHotaW5kZXgg0LfQsNC90L7QstC+LlxuICAgICAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY3R4Ll9yZWNhcHR1cmVaSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWxlYXNlWkluZGV4KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fekluZGV4R3JvdXBMZXZlbCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FwdHVyZVpJbmRleCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgfSlcbn1cbiIsInZhciBCSCA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi5ibG9ja3MvYmVtL2JlbS5qcycpXG5cbkJILm5vQm9vbE1vZHMgPSB0cnVlXG5cbnZhciBiaCA9IG5ldyBCSCgpXG52YXIgQkVNID0gYmguQkVNXG5cbm1vZHVsZS5leHBvcnRzLlJlYWN0ID0gQkguUmVhY3Rcbm1vZHVsZS5leHBvcnRzLmJoID0gYmhcbm1vZHVsZS5leHBvcnRzLkJFTSA9IEJFTVxuIiwiLy9Db3VsZCBiZSBnZW5lcmF0ZWRcbnZhciBCSCA9IHJlcXVpcmUoJy4uLy4uL2Rlc2t0b3AuYmxvY2tzL2JlbS9iZW0uanMnKVxudmFyIGJoID0gQkguYmhcblxucmVxdWlyZSgnLi4vLi4vY29tbW9uLmJsb2Nrcy9saW5rL2xpbmsuYmguanMnKShiaClcblxudmFyIExpbmsgPSBCSC5SZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdsaW5rJyxcbiAgICBfX2Jsb2NrOiAnbGluaycsXG4gICAgX19tYXRjaGVyczogYmguX19tYXRjaGVycyxcbiAgICBtaXhpbnM6IFtCSC5CRU1fSGF6YXJkXSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX25vZGUoKVxuICAgIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gTGlua1xuIiwiLy9Db3VsZCBiZSBnZW5lcmF0ZWRcbnZhciBCSCA9IHJlcXVpcmUoJy4uLy4uL2Rlc2t0b3AuYmxvY2tzL2JlbS9iZW0uanMnKVxudmFyIGJoID0gQkguYmhcblxucmVxdWlyZSgnLi4vLi4vY29tbW9uLmJsb2Nrcy9wb3B1cDIvcG9wdXAyLmJoei5qcycpKGJoKVxucmVxdWlyZSgnLi4vLi4vY29tbW9uLmJsb2Nrcy9wb3B1cDIvX3RhcmdldC9wb3B1cDJfdGFyZ2V0LmpzJykoYmgpXG5yZXF1aXJlKCcuLi8uLi9jb21tb24uYmxvY2tzL3BvcHVwMi9fdGFyZ2V0L3BvcHVwMl90YXJnZXRfYW5jaG9yLmpzJykoYmgpXG5yZXF1aXJlKCcuLi8uLi9jb21tb24uYmxvY2tzL3BvcHVwMi9fdGFyZ2V0L3BvcHVwMl90YXJnZXRfcG9zaXRpb24uanMnKShiaClcblxubW9kdWxlLmV4cG9ydHMgPSBCSC5SZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdwb3B1cCcsXG4gICAgX19ibG9jazogJ3BvcHVwJyxcbiAgICBfX21hdGNoZXJzOiBiaC5fX21hdGNoZXJzLFxuICAgIG1peGluczogW0JILkJFTV9IYXphcmRdLFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fbm9kZSgpXG4gICAgfVxufSlcbiIsIm1vZHVsZS5leHBvcnRzPSAgICBbXG4gICAgICAgIC8vIGRpcmVjdGlvbnMgdGFibGVcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHRlc3QgPSBmdW5jdGlvbihkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBibG9jazogJ3Rlc3QnLCBqczogdHJ1ZSwgY29udGVudDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge2Jsb2NrOiAnbGluaycsIG1vZHM6IHtwc2V1ZG86ICd5ZXMnfSwgY29udGVudDogZGlyZWN0aW9ufSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9jazogJ3BvcHVwMicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWl4OiB7YmxvY2s6ICd0ZXN0JywgZWxlbTogJ3BvcHVwJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kczoge3RhcmdldDogJ2FuY2hvcicsIGF1dG9jbG9zYWJsZTogJ3llcycsIHRoZW1lOiAnbm9ybWFsJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uczogW2RpcmVjdGlvbl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ3RoZSBwb3B1cCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgcG9zaXRpb25lZCA9IHtibG9jazogJ3Rlc3QnLCBqczoge3Bvc2l0aW9uOiBbNTAsIDUwXX0sIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrOiAnbGluaycsXG4gICAgICAgICAgICAgICAgICAgIG1vZHM6IHtwc2V1ZG86ICd5ZXMnfSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ3BvcHVwIGF0IDUweDUwJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBibG9jazogJ3BvcHVwMicsXG4gICAgICAgICAgICAgICAgICAgIG1peDoge2Jsb2NrOiAndGVzdCcsIGVsZW06ICdwb3B1cCd9LFxuICAgICAgICAgICAgICAgICAgICBtb2RzOiB7dGFyZ2V0OiAncG9zaXRpb24nLCB0aGVtZTogJ25vcm1hbCd9LFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAndGhlIHBvcHVwJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF19O1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGJsb2NrOiAnZGlyZWN0aW9ucycsXG4gICAgICAgICAgICAgICAgY29udGVudDogW1xuICAgICAgICAgICAgICAgICAgICB7ZWxlbTogJ3JvdycsIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbGVtOiAnY2VsbCd9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2VsZW06ICdjZWxsJywgbW9kczoge2FsaWduOiAnbGVmdCd9LCBjb250ZW50OiB0ZXN0KCd0b3AtbGVmdCcpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbGVtOiAnY2VsbCcsIG1vZHM6IHthbGlnbjogJ2NlbnRlcid9LCBjb250ZW50OiB0ZXN0KCd0b3AtY2VudGVyJyl9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2VsZW06ICdjZWxsJywgbW9kczoge2FsaWduOiAncmlnaHQnfSwgY29udGVudDogdGVzdCgndG9wLXJpZ2h0Jyl9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2VsZW06ICdjZWxsJ31cbiAgICAgICAgICAgICAgICAgICAgXX0sXG4gICAgICAgICAgICAgICAgICAgIHtlbGVtOiAncm93JywgY29udGVudDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge2VsZW06ICdjZWxsJywgbW9kczoge2FsaWduOiAncmlnaHQnfSwgY29udGVudDogdGVzdCgnbGVmdC10b3AnKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZWxlbTogJ2NlbGwnLCBtb2RzOiB7YWxpZ246ICdjZW50ZXInLCBib3JkZXI6ICd5ZXMnfSwgYXR0cnM6IHtjb2xzcGFuOiAzLCByb3dzcGFuOiAzfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZWxlbTogJ2NlbGwnLCBtb2RzOiB7YWxpZ246ICdsZWZ0J30sIGNvbnRlbnQ6IHRlc3QoJ3JpZ2h0LXRvcCcpfVxuICAgICAgICAgICAgICAgICAgICBdfSxcbiAgICAgICAgICAgICAgICAgICAge2VsZW06ICdyb3cnLCBjb250ZW50OiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZWxlbTogJ2NlbGwnLCBtb2RzOiB7YWxpZ246ICdyaWdodCd9LCBjb250ZW50OiB0ZXN0KCdsZWZ0LWNlbnRlcicpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbGVtOiAnY2VsbCcsIG1vZHM6IHthbGlnbjogJ2xlZnQnfSwgY29udGVudDogdGVzdCgncmlnaHQtY2VudGVyJyl9XG4gICAgICAgICAgICAgICAgICAgIF19LFxuICAgICAgICAgICAgICAgICAgICB7ZWxlbTogJ3JvdycsIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbGVtOiAnY2VsbCcsIG1vZHM6IHthbGlnbjogJ3JpZ2h0J30sIGNvbnRlbnQ6IHRlc3QoJ2xlZnQtYm90dG9tJyl9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2VsZW06ICdjZWxsJywgbW9kczoge2FsaWduOiAnbGVmdCd9LCBjb250ZW50OiB0ZXN0KCdyaWdodC1ib3R0b20nKX1cbiAgICAgICAgICAgICAgICAgICAgXX0sXG4gICAgICAgICAgICAgICAgICAgIHtlbGVtOiAncm93JywgY29udGVudDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge2VsZW06ICdjZWxsJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZWxlbTogJ2NlbGwnLCBtb2RzOiB7YWxpZ246ICdsZWZ0J30sIGNvbnRlbnQ6IHRlc3QoJ2JvdHRvbS1sZWZ0Jyl9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2VsZW06ICdjZWxsJywgbW9kczoge2FsaWduOiAnY2VudGVyJ30sIGNvbnRlbnQ6IHRlc3QoJ2JvdHRvbS1jZW50ZXInKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZWxlbTogJ2NlbGwnLCBtb2RzOiB7YWxpZ246ICdyaWdodCd9LCBjb250ZW50OiB0ZXN0KCdib3R0b20tcmlnaHQnKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZWxlbTogJ2NlbGwnfVxuICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKCksXG4gICAgXVxuIiwidmFyIEJIID0gcmVxdWlyZSgnLi4vZGVza3RvcC5ibG9ja3MvYmVtL2JlbS5qcycpXG52YXIgQkVNID0gQkguQkVNXG5cbkJILmJoXG4gICAgLm1hdGNoKCdwb3B1cDJfdmlzaWJsZV95ZXMnLCBmdW5jdGlvbihjdHgsIGpzb24pIHt9KVxuQkguYmhcbiAgICAubWF0Y2goJ3BvcHVwMl92aXNpYmxlX3llcycsIGZ1bmN0aW9uKGN0eCwganNvbikge1xuZGVidWdnZXJcbiAgICAgICAgdmFyIHN0eWxlID0gY3R4LmF0dHIoJ3N0eWxlJykgfHwge30sXG4gICAgICAgICAgICB6SW5kZXggPSBzdHlsZS56SW5kZXhcbiAgICAgICAgekluZGV4ICYmIGN0eC5hdHRyKCdkYXRhLXotaW5kZXgnLCB6SW5kZXgpXG4gICAgfSlcblxudmFyIExpbmsgPSByZXF1aXJlKCcuLi9kZXNrdG9wLmJ1bmRsZS9saW5rL2xpbmsuanMnKVxudmFyIFBvcHVwID0gcmVxdWlyZSgnLi4vZGVza3RvcC5idW5kbGUvcG9wdXAyL3BvcHVwMi5qcycpXG5cbnZhciBiZW1Kc29uID0gcmVxdWlyZSgnLi9wb3B1cC5iZW0uanNvbicpXG5cbkJILmJoXG4gICAgLm1hdGNoKCdkaXJlY3Rpb25zJywgZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIGN0eC50YWcoJ3RhYmxlJylcbiAgICB9KVxuICAgIC5tYXRjaCgnZGlyZWN0aW9uc19fcm93JywgZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIGN0eC50YWcoJ3RyJylcbiAgICB9KVxuICAgIC5tYXRjaCgnZGlyZWN0aW9uc19fY2VsbCcsIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICBjdHgudGFnKCd0ZCcpXG4gICAgfSlcblxuXG4gICAgLm1hdGNoKCd0ZXN0JywgZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLm11U3RhdGVzKHtcbiAgICAgICAgICAgICAgICAncG9wdXAtb3BlbmVkJzogZmFsc2VcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC5tYXRjaCgnbGluaycsIGZ1bmN0aW9uKGN0eEwpIHtcbiAgICAgICAgICAgICAgICBjdHhMLmJpbmQoe1xuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguX2FuY2hvciA9IGUudGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgubXVTdGF0ZSgncG9wdXAtb3BlbmVkJywgIWN0eC5tdVN0YXRlKCdwb3B1cC1vcGVuZWQnKSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAubWF0Y2goJ3BvcHVwMicsIGZ1bmN0aW9uKGN0eFApIHtcbiAgICAgICAgICAgICAgICBjdHguX2FuY2hvciAmJiAoY3R4UC5fYW5jaG9yIHx8IGN0eFAuc2V0QW5jaG9yKGN0eC5fYW5jaG9yKSlcbiAgICAgICAgICAgICAgICBjdHhQLm1vZCgndmlzaWJsZScsIGN0eC5tdVN0YXRlKCdwb3B1cC1vcGVuZWQnKSA/ICd5ZXMnIDogJ25vJywgdHJ1ZSlcbiAgICAgICAgICAgIH0pXG4gICAgfSlcblxudmFyIEV4YW1wbGUgPSBCSC5SZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxCRU0gYXR0cnM9e3tzdHlsZTp7bWFyZ2luOiAyMH19fT5cbiAgICAgICAgICAgICAgICB7YmVtSnNvbn1cbiAgICAgICAgICAgIDwvQkVNPlxuICAgICAgICApXG4gICAgfVxufSlcblxuUmVhY3QucmVuZGVyKFxuICAgIDxFeGFtcGxlIC8+LFxuICAgIGRvY3VtZW50LmJvZHlcbilcbiIsbnVsbCwiJ3VzZSBzdHJpY3QnO1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiBUb09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gb3duRW51bWVyYWJsZUtleXMob2JqKSB7XG5cdHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcblxuXHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdGtleXMgPSBrZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaikpO1xuXHR9XG5cblx0cmV0dXJuIGtleXMuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRyZXR1cm4gcHJvcElzRW51bWVyYWJsZS5jYWxsKG9iaiwga2V5KTtcblx0fSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciBrZXlzO1xuXHR2YXIgdG8gPSBUb09iamVjdCh0YXJnZXQpO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IGFyZ3VtZW50c1tzXTtcblx0XHRrZXlzID0gb3duRW51bWVyYWJsZUtleXMoT2JqZWN0KGZyb20pKTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dG9ba2V5c1tpXV0gPSBmcm9tW2tleXNbaV1dO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iXX0=
