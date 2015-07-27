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

},{"object-assign":19,"react":18}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
(function() {

if(!window.addEventListener) {
    return;
}

var ROOT_ELEM = document.documentElement,
    isPointer = false;

function setPointerFlag() {
    isPointer = true;

    // Программную установку фокуса иногда заворачивают в afterCurrentEvent.
    // Чтобы корректно обрабатывать такие случаи, сбрасываем флаг во _втором_ тике.
    // NOTE: В качестве контекста указывается window, иначе в IE9 будет ошибка "Invalid calling object".
    setTimeout(setTimeout.bind(window, resetPointerFlag));
}

function resetPointerFlag() {
    isPointer = false;
}

function toggleClass() {
    ROOT_ELEM.classList.toggle('pointerfocus', isPointer);
}

// Для надежности вешаем события на window на фазу захвата.
// Из-за фазы захвата не используем jQuery.

// Обычно, фокус выставляется сразу после mousedown.
// На touch устройствах mousedown также работает.
addEventListener('mousedown', setPointerFlag, true);

// FF Mac и Safari не ставят фокус большинству элементов управления по событиям мыши.
// И не позволяют выставить фокус программно в обработчике mousedown.
// Подробности: http://jsfiddle.net/mishaberezin/892yppts/2/.
// Из-за этого фокус нередко выставляют по событию mouseup, поэтому его тоже слушаем.
addEventListener('mouseup', setPointerFlag, true);

// HTMLLabelElement выставляет фокус связанному элементу по событию click.
// Также возможна программная установка фокуса по событию click.
addEventListener('click', setPointerFlag, true);

// FF не поддерживает focusin, зато умеет захват у события focus.
// Остальные браузеры умеют и то и то, но вот в IE событие
// focus ведет себя ненадежно. Например, при перемещении стрелками
// по радиогруппе, события на элементе интерфейса наступают в такой последовательности:
// keydown → focusin → click (синтетический) → focus.
// Подробности:
// * https://bugzilla.mozilla.org/687787
// * http://jsfiddle.net/mishaberezin/8gz4ryhy/10/
//
// Итого: FF (focus), IE (focusin), Остальные (не имеет значения).
// Используем проверку на window.onfocusin.
addEventListener('onfocusin' in window ? 'focusin' : 'focus', toggleClass, true);
})();

},{}],4:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('radio-button__control', function(ctx) {

        var controlAttrs = ctx.tParam('_controlAttrs');

        if(controlAttrs.disabled) {
            controlAttrs.disabled = 'disabled';
            controlAttrs.tabIndex = '-1';
        } else {
            delete controlAttrs.disabled;
        }

        if(controlAttrs.checked) {
            controlAttrs.checked = 'checked';
        } else {
            delete controlAttrs.checked;
        }

        controlAttrs.type = 'radio';
        controlAttrs.name = ctx.tParam('_radioButton').name; // Прокидываем поле name из блока.

        ctx
            .tag('input')
            .attrs(controlAttrs);
    });
};

},{}],5:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('radio-button__radio_only-icon_yes', function(ctx) {
        ctx.content([
            {elem: 'control'},
            '&#160;', // &nbsp;
            ctx.content()
        ], true);
    });
};

},{}],6:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('radio-button__radio', function(ctx, json) {

        var elemMods = ctx.mods(),
            radioButton = ctx.tParam('_radioButton'),

            // Если на всём блоке _disabled_yes.
            makeDisabled = radioButton.disabled,

            // По историческим причинам controlAttrs копируется, а не используется as is.
            controlAttrs = ctx.extend({}, json.controlAttrs || {}),

            // value блока совпало с value контрола.
            valuesMatched = controlAttrs.value !== undefined && controlAttrs.value === radioButton.value;

        // value блока совпало с value в controlAttrs элемента radio.
        if(valuesMatched) {
            elemMods.checked = 'yes';
        }

        if(makeDisabled) {
            elemMods.disabled = 'yes';
        }

        if(!elemMods.side) {
            // `isFirst * 2 + isLast` приводит комбинации isFirst/isLast к индексу от 0 до 3.
            elemMods.side = ['', 'right', 'left', 'both'][ctx.isFirst() * 2 + ctx.isLast()];
        }

        controlAttrs.checked = Boolean(elemMods.checked);
        controlAttrs.disabled = Boolean(elemMods.disabled);

        if(!controlAttrs.id) {
            controlAttrs.id = ctx.generateId();
        }

        ctx
            .tag('label')
            .attrs({
                'htmlFor': controlAttrs.id
            })
            .tParam('_controlAttrs', controlAttrs)
            .content([
                {elem: 'control'},
                {
                    elem: 'text',
                    tag: 'span',
                    content: ctx.content()
                }
            ], true);
    });
};

},{}],7:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('radio-button__radio', function(ctx, json) {
        //XXX: this is because we reRender only radiobutton__radio not full radio so we have controlAttrs already
        //we can change in radiobutton__radio.bh.js => tParam('_controlAttrs', controlAttrs, true)
        if (ctx.tParam('_controlAttrs')) {
            ctx.tParam('_controlAttrs', undefined, true)
        }

        ctx
            .mixJs({block: 'radiobox', elem: 'radio'})
            .mixJs({block: 'control', mods: {'pressed': true}})
    })
}

},{}],8:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('radio-button__text', function(ctx) {
        ctx.tag('span');
    });
};

},{}],9:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('radio-button', function(ctx, json) {
        ctx
            .tag('span')
            .js(ctx.extend({live: false}, ctx.js()))
            .mod('theme', 'normal')
            .tParam('_radioButton', {
                name: json.name,
                value: json.value,
                disabled: Boolean(ctx.mod('disabled')),
                nextForPressed: false
            })
            .content((function() {
                var content = ctx.content(),
                    isSimple = ctx.isSimple;
                return Array.isArray(content)
                    ? content.filter(function(e) {
                        return !isSimple(e);
                    })
                    : content;
            })(), true);
    });
};

},{}],10:[function(require,module,exports){
module.exports = function(bh) {
    bh.match('radio-button', function(ctx, json) {
        ctx
            .muStates({
                value: json.value
            })
            .bind({
                onChange: function(e) {
                    ctx.muState('value', e.target.value)
                }
            })
            .param('value', ctx.muState('value'), true)
    })
}

},{}],11:[function(require,module,exports){
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

        ctx
            .mixJs({block: 'control', mods: {'focused': true}})
            .mixJs({block: 'control', mods: {'hovered': true}})
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

},{}],12:[function(require,module,exports){
var BH = require('../../common.blocks/bem/bem.js')

BH.noBoolMods = true

var bh = new BH()
var BEM = bh.BEM

module.exports.React = BH.React
module.exports.bh = bh
module.exports.BEM = BEM

},{"../../common.blocks/bem/bem.js":1}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
//Could be generated
var BH = require('../../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../../common.blocks/pointerfocus/pointerfocus.js')

require('../../../common.blocks/control/control.bhz.js')(bh)
require('../../../desktop.blocks/control/control.bhz.js')(bh)

require('../../../common.blocks/radiobox/__radio/radiobox__radio.bh.js')(bh)

require('../../../common.blocks/radio-button/__radio/radio-button__radio.bh.js')(bh)
require('../../../common.blocks/radio-button/__radio/radio-button__radio.bhz.js')(bh)
require('../../../common.blocks/radio-button/__radio/_only-icon/radio-button__radio_only-icon_yes.bh.js')(bh)

require('../../../common.blocks/radio-button/__control/radio-button__control.bh.js')(bh)
require('../../../common.blocks/radio-button/__text/radio-button__text.bh.js')(bh)

var RadioButton__radio = BH.React.createClass({
    displayName: 'radiobutton__radio',
    __block: 'radio-button',
    __elem: 'radio',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    },
})

module.exports = RadioButton__radio

},{"../../../common.blocks/control/control.bhz.js":2,"../../../common.blocks/pointerfocus/pointerfocus.js":3,"../../../common.blocks/radio-button/__control/radio-button__control.bh.js":4,"../../../common.blocks/radio-button/__radio/_only-icon/radio-button__radio_only-icon_yes.bh.js":5,"../../../common.blocks/radio-button/__radio/radio-button__radio.bh.js":6,"../../../common.blocks/radio-button/__radio/radio-button__radio.bhz.js":7,"../../../common.blocks/radio-button/__text/radio-button__text.bh.js":8,"../../../common.blocks/radiobox/__radio/radiobox__radio.bh.js":11,"../../../desktop.blocks/bem/bem.js":12,"../../../desktop.blocks/control/control.bhz.js":13}],15:[function(require,module,exports){
//Could be generated
var BH = require('../../desktop.blocks/bem/bem.js')
var bh = BH.bh

require('../../common.blocks/radio-button/radio-button.bh.js')(bh)
require('../../common.blocks/radio-button/radio-button.bhz.js')(bh)

var RadioButton__radio = require('./__radio/radio-button__radio.js')

var RadioButton = BH.React.createClass({
    displayName: 'radiobutton',
    __block: 'radio-button',
    __matchers: bh.__matchers,
    mixins: [BH.BEM_Hazard],
    render: function() {
        return this.__node()
    }
})

RadioButton.Radio = RadioButton__radio

module.exports = RadioButton

},{"../../common.blocks/radio-button/radio-button.bh.js":9,"../../common.blocks/radio-button/radio-button.bhz.js":10,"../../desktop.blocks/bem/bem.js":12,"./__radio/radio-button__radio.js":14}],16:[function(require,module,exports){
module.exports={
    content: {
        block: 'radio-button',
        mods: {size: 'm'},
        name: 'show_to',
        value: 'friends',
        content: [
            {
                elem: 'radio',
                controlAttrs: {value: 'all'},
                elemMods: {disabled: 'yes'},
                content: 'виден всем'
            },
            {
                elem: 'radio',
                controlAttrs: {value: 'friends'},
                content: 'только друзьям'
            },
            {
                elem: 'radio',
                controlAttrs: {value: 'me'},
                elemMods: {disabled: 'yes'},
                content: 'только мне'
            },
            {
                elem: 'radio',
                controlAttrs: {value: 'other'},
                content: 'только не мне'
            }
        ]
    }
}

},{}],17:[function(require,module,exports){
var BH = require('../desktop.blocks/bem/bem.js')
var BEM = BH.BEM

var RadioButton = require('../desktop.bundle/radio-button/radio-button.js')
var RadioButton__radio = require('../desktop.bundle/radio-button/__radio/radio-button__radio.js')

var bemJson = require('./radio-button.bem.json')

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

},{"../desktop.blocks/bem/bem.js":12,"../desktop.bundle/radio-button/__radio/radio-button__radio.js":14,"../desktop.bundle/radio-button/radio-button.js":15,"./radio-button.bem.json":16}],18:[function(require,module,exports){

},{}],19:[function(require,module,exports){
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

},{}]},{},[17])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvYmVtL2JlbS5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9jb250cm9sL2NvbnRyb2wuYmh6LmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9jb21tb24uYmxvY2tzL3BvaW50ZXJmb2N1cy9wb2ludGVyZm9jdXMuanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvcmFkaW8tYnV0dG9uL19fY29udHJvbC9yYWRpby1idXR0b25fX2NvbnRyb2wuYmguanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvcmFkaW8tYnV0dG9uL19fcmFkaW8vX29ubHktaWNvbi9yYWRpby1idXR0b25fX3JhZGlvX29ubHktaWNvbl95ZXMuYmguanMiLCIvVXNlcnMveWV0aS1vci9Qcm9qZWN0cy9iZW0taGF6YXJkL2NvbW1vbi5ibG9ja3MvcmFkaW8tYnV0dG9uL19fcmFkaW8vcmFkaW8tYnV0dG9uX19yYWRpby5iaC5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9yYWRpby1idXR0b24vX19yYWRpby9yYWRpby1idXR0b25fX3JhZGlvLmJoei5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9yYWRpby1idXR0b24vX190ZXh0L3JhZGlvLWJ1dHRvbl9fdGV4dC5iaC5qcyIsIi9Vc2Vycy95ZXRpLW9yL1Byb2plY3RzL2JlbS1oYXphcmQvY29tbW9uLmJsb2Nrcy9yYWRpby1idXR0b24vcmFkaW8tYnV0dG9uLmJoLmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9jb21tb24uYmxvY2tzL3JhZGlvLWJ1dHRvbi9yYWRpby1idXR0b24uYmh6LmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9jb21tb24uYmxvY2tzL3JhZGlvYm94L19fcmFkaW8vcmFkaW9ib3hfX3JhZGlvLmJoLmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9kZXNrdG9wLmJsb2Nrcy9iZW0vYmVtLmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9kZXNrdG9wLmJsb2Nrcy9jb250cm9sL2NvbnRyb2wuYmh6LmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9kZXNrdG9wLmJ1bmRsZS9yYWRpby1idXR0b24vX19yYWRpby9yYWRpby1idXR0b25fX3JhZGlvLmpzIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9kZXNrdG9wLmJ1bmRsZS9yYWRpby1idXR0b24vcmFkaW8tYnV0dG9uLmpzIiwianMvcmFkaW8tYnV0dG9uLmJlbS5qc29uIiwiL1VzZXJzL3lldGktb3IvUHJvamVjdHMvYmVtLWhhemFyZC9qcy9yYWRpby1idXR0b24uanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLEtBQUssR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFDbkgsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sT0FBTyxLQUFLLFdBQVcsS0FBSyxPQUFPLENBQUMsZUFBZSxDQUFDOztBQUUx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R0FBRyxFQUFBLENBQUEsQ0FBQyxLQUFBLEVBQUssQ0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBRyxDQUFBLEVBQUE7Z0JBQzdCLE9BQVE7WUFDUCxDQUFBO1NBQ1Q7S0FDSjtBQUNMLENBQUMsQ0FBQzs7QUFFRixLQUFLLENBQUMsTUFBTTtJQUNSLG9CQUFDLE9BQU8sRUFBQSxJQUFBLENBQUcsQ0FBQTtJQUNYLFFBQVEsQ0FBQyxJQUFJO0NBQ2hCOzs7QUNyQkQ7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSAmJiB3aW5kb3cuUmVhY3QgfHwgKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJykgJiYgcmVxdWlyZSgncmVhY3QnKVxudmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJykgJiYgcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpXG5cbnZhciBCSCA9IChmdW5jdGlvbigpIHtcbnZhciBfX2xhc3RHZW5JZCA9IDBcblxudmFyIEJIID0gZnVuY3Rpb24oKSB7XG4gICAgLy9UT0RPOiBtYWtlIGl0IGJldHRlclxuICAgIHRoaXMuX19tYXRjaGVycyA9IHt9XG4gICAgQkVNX0hhemFyZC5iaCA9IHRoaXNcbiAgICBCRU1fSGF6YXJkLl9fZXhwYW5kb0lkID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICB0aGlzLnV0aWxzID0gQkVNX0hhemFyZFxuICAgIHRoaXMuQkVNID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAgICBkaXNwbGF5TmFtZTogJycsXG4gICAgICAgIF9fYmxvY2s6ICcnLFxuICAgICAgICBtaXhpbnM6IFtCRU1fSGF6YXJkXSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fbm9kZSgpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5CSC5fID0gJ18nXG5CSC5fXyA9ICdfXydcbkJILlJlYWN0ID0gUmVhY3RcbkJILl9nZXREZWNsID0gIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgdmFyIGRlY2wgPSB7fSxcbiAgICAgICAgZGVjbHMsXG4gICAgICAgIGlzRWxlbSA9IH5zZWxlY3Rvci5pbmRleE9mKEJILl9fKVxuICAgIGlzRWxlbSA/XG4gICAgICAgIGRlY2xzID0gc2VsZWN0b3Iuc3BsaXQoQkguX18pIDpcbiAgICAgICAgZGVjbHMgPSBzZWxlY3Rvci5zcGxpdChCSC5fKVxuXG4gICAgZGVjbC5ibG9jayA9IGRlY2xzLnNoaWZ0KClcblxuICAgIGlmIChpc0VsZW0pIHtcbiAgICAgICAgZGVjbHMgPSBkZWNsc1swXS5zcGxpdChCSC5fKVxuICAgICAgICBkZWNsLmVsZW0gPSBkZWNscy5zaGlmdCgpXG4gICAgfVxuXG4gICAgZGVjbC5tb2ROYW1lID0gZGVjbHMuc2hpZnQoKVxuICAgIGRlY2wubW9kVmFsID0gZGVjbHMuc2hpZnQoKVxuICAgIHJldHVybiBkZWNsXG59XG5cbkJILnByb3RvdHlwZSA9IHtcbiAgICBub0Jvb2xNb2RzOiBmYWxzZSwgLy9Gb3IgTEVHTyBzZXQgdHJ1ZVxuICAgIGFwcGx5OiBmdW5jdGlvbihiZW1Kc29uKSB7XG4gICAgICAgIGlmICghYmVtSnNvbikgcmV0dXJuICcnXG4gICAgICAgIHZhciBlbCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5CRU0sIGJlbUpzb24pXG4gICAgICAgIHJldHVybiBSZWFjdC5yZW5kZXJUb1N0YXRpY01hcmt1cChlbClcbiAgICB9LFxuICAgIG1hdGNoOiBmdW5jdGlvbihzZWxlY3RvciwgbWF0Y2hlcikge1xuICAgICAgICBpZiAoIXNlbGVjdG9yIHx8ICFtYXRjaGVyKSByZXR1cm4gdGhpc1xuICAgICAgICB2YXIgZGVjbCA9IEJILl9nZXREZWNsKHNlbGVjdG9yKVxuICAgICAgICB0aGlzLl9fbWF0Y2hlcnNbZGVjbC5ibG9ja10gfHwgKHRoaXMuX19tYXRjaGVyc1tkZWNsLmJsb2NrXSA9IFtdKVxuICAgICAgICB0aGlzLl9fbWF0Y2hlcnNbZGVjbC5ibG9ja10ucHVzaChbZGVjbCwgbWF0Y2hlcl0pXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICB4bWxFc2NhcGU6IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgLy9CZWNhdXNlIFJlYWN0IHdpbGwgZG8gaXQgZm9yIHVzXG4gICAgICAgIC8vVE9ETzogb3IgZG8gd2UgbmVlZCB0aGlzP1xuICAgICAgICByZXR1cm4geFxuICAgIH0sXG4gICAgYXR0ckVzY2FwZTogZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4geFxuICAgIH0sXG4gICAganNBdHRyRXNjYXBlOiBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiB4XG4gICAgfSxcbiAgICBlbmFibGVJbmZpbml0ZUxvb3BEZXRlY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL1Y4IHdpbGwgZG8gaXQgZm9yIHVzXG4gICAgfVxufVxuXG52YXIgQkVNX0hhemFyZCA9IHtcbiAgICBqczogZnVuY3Rpb24oKSB7cmV0dXJuIHRoaXN9LFxuICAgIGJlbTogZnVuY3Rpb24oKSB7cmV0dXJuIHRoaXN9LFxuICAgIGV4dGVuZDogYXNzaWduLFxuICAgIGlzU2ltcGxlOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgaWYgKCFvYmogfHwgb2JqID09PSB0cnVlKSByZXR1cm4gdHJ1ZVxuICAgICAgICB2YXIgdCA9IHR5cGVvZiBvYmpcbiAgICAgICAgcmV0dXJuIHQgPT09ICdzdHJpbmcnIHx8IHQgPT09ICdudW1iZXInXG4gICAgfSxcbiAgICBnZW5lcmF0ZUlkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICd1bmlxJyArIHRoaXMuX19leHBhbmRvSWQgKyAoKytfX2xhc3RHZW5JZCk7XG4gICAgfSxcbiAgICBwYXJhbTogZnVuY3Rpb24ocGFyYW0sIHZhbCwgZm9yY2UpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc01peCkge3JldHVybiB0aGlzfVxuICAgICAgICAgICAgKCF0aGlzLl9fanNvbltwYXJhbV0gfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbltwYXJhbV0gPSB2YWwpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uW3BhcmFtXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB0UGFyYW06IGZ1bmN0aW9uKGtleSwgdmFsLCBmb3JjZSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faXNNaXgpIHtyZXR1cm4gdGhpc31cbiAgICAgICAgICAgIHRoaXMuX19qc29uLiR0UGFyYW0gfHwgKHRoaXMuX19qc29uLiR0UGFyYW0gPSB7fSlcbiAgICAgICAgICAgIGlmICghdGhpcy5fX2pzb24uJHRQYXJhbVtrZXldIHx8IGZvcmNlKSB7dGhpcy5fX2pzb24uJHRQYXJhbVtrZXldID0gdmFsfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fanNvbi4kdFBhcmFtICYmIHRoaXMuX19qc29uLiR0UGFyYW1ba2V5XVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjbHM6IGZ1bmN0aW9uKGNscywgZm9yY2UpIHtcbiAgICAgICAgaWYgKGNscykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc01peCkge3JldHVybiB0aGlzfVxuICAgICAgICAgICAgKCF0aGlzLl9fanNvbi5jbHMgfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbi5jbHMgPSBjbHMpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLmNsc1xuICAgICAgICB9XG4gICAgfSxcbiAgICBuZWVkQ2FwaXRhbGl6ZTogdHJ1ZSxcbiAgICBhdHRyQ2FwaXRhbGl6ZWQ6IHtcbiAgICAgICAgYWNjZXB0Y2hhcnNldDogJ2FjY2VwdENoYXJzZXQnLFxuICAgICAgICBhY2Nlc3NrZXk6ICdhY2Nlc3NLZXknLFxuICAgICAgICBhbGxvd2Z1bGxzY3JlZW46ICdhbGxvd0Z1bGxTY3JlZW4nLFxuICAgICAgICBhbGxvd3RyYW5zcGFyZW5jeTogJ2FsbG93VHJhbnNwYXJlbmN5JyxcbiAgICAgICAgYXV0b2NvbXBsZXRlOiAnYXV0b0NvbXBsZXRlJyxcbiAgICAgICAgYXV0b2ZvY3VzOiAnYXV0b0ZvY3VzJyxcbiAgICAgICAgYXV0b3BsYXk6ICdhdXRvUGxheScsXG4gICAgICAgIGNlbGxwYWRkaW5nOiAnY2VsbFBhZGRpbmcnLFxuICAgICAgICBjZWxsc3BhY2luZzogJ2NlbGxTcGFjaW5nJyxcbiAgICAgICAgY2hhcnNldDogJ2NoYXJTZXQnLFxuICAgICAgICBjbGFzc2lkOiAnY2xhc3NJRCcsXG4gICAgICAgICdjbGFzcyc6ICdjbGFzc05hbWUnLFxuICAgICAgICBjbGFzc25hbWU6ICdjbGFzc05hbWUnLFxuICAgICAgICBjb2xzcGFuOiAnY29sU3BhbicsXG4gICAgICAgIGNvbnRlbnRlZGl0YWJsZTogJ2NvbnRlbnRFZGl0YWJsZScsXG4gICAgICAgIGNvbnRleHRtZW51OiAnY29udGV4dE1lbnUnLFxuICAgICAgICBjcm9zc29yaWdpbjogJ2Nyb3NzT3JpZ2luJyxcbiAgICAgICAgZGF0ZXRpbWU6ICdkYXRlVGltZScsXG4gICAgICAgIGVuY3R5cGU6ICdlbmNUeXBlJyxcbiAgICAgICAgZm9ybWFjdGlvbjogJ2Zvcm1BY3Rpb24nLFxuICAgICAgICBmb3JtZW5jdHlwZTogJ2Zvcm1FbmNUeXBlJyxcbiAgICAgICAgZm9ybW1ldGhvZDogJ2Zvcm1NZXRob2QnLFxuICAgICAgICBmb3Jtbm92YWxpZGF0ZTogJ2Zvcm1Ob1ZhbGlkYXRlJyxcbiAgICAgICAgZm9ybXRhcmdldDogJ2Zvcm1UYXJnZXQnLFxuICAgICAgICBmcmFtZWJvcmRlcjogJ2ZyYW1lQm9yZGVyJyxcbiAgICAgICAgaHRtbGZvcjogJ2h0bWxGb3InLFxuICAgICAgICAnZm9yJzogJ2h0bWxGb3InLFxuICAgICAgICBodHRwZXF1aXY6ICdodHRwRXF1aXYnLFxuICAgICAgICBtYXJnaW5oZWlnaHQ6ICdtYXJnaW5IZWlnaHQnLFxuICAgICAgICBtYXJnaW53aWR0aDogJ21hcmdpbldpZHRoJyxcbiAgICAgICAgbWF4bGVuZ3RoOiAnbWF4TGVuZ3RoJyxcbiAgICAgICAgbWVkaWFncm91cDogJ21lZGlhR3JvdXAnLFxuICAgICAgICBub3ZhbGlkYXRlOiAnbm9WYWxpZGF0ZScsXG4gICAgICAgIHJhZGlvZ3JvdXA6ICdyYWRpb0dyb3VwJyxcbiAgICAgICAgcmVhZG9ubHk6ICdyZWFkT25seScsXG4gICAgICAgIHJvd3NwYW46ICdyb3dTcGFuJyxcbiAgICAgICAgc3BlbGxjaGVjazogJ3NwZWxsQ2hlY2snLFxuICAgICAgICBzcmNkb2M6ICdzcmNEb2MnLFxuICAgICAgICBzcmNzZXQ6ICdzcmNTZXQnLFxuICAgICAgICB0YWJpbmRleDogJ3RhYkluZGV4JyxcbiAgICAgICAgdXNlbWFwOiAndXNlTWFwJ1xuICAgIH0sXG4gICAgYXR0cnM6IGZ1bmN0aW9uKHZhbHVlcywgZm9yY2UpIHtcbiAgICAgICAgdmFyIGF0dHJzID0gdGhpcy5fX2pzb24uYXR0cnMgfHwge31cbiAgICAgICAgaWYgKHZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5hdHRycyA9IGZvcmNlID8gdGhpcy5leHRlbmQoYXR0cnMsIHZhbHVlcykgOiB0aGlzLmV4dGVuZCh2YWx1ZXMsIGF0dHJzKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhdHRyc1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhdHRyOiBmdW5jdGlvbihrZXksIHZhbCwgZm9yY2UpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5hdHRycyA/XG4gICAgICAgICAgICAgICAgKCF0aGlzLl9fanNvbi5hdHRycy5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8IGZvcmNlKSAmJiAodGhpcy5fX2pzb24uYXR0cnNba2V5XSA9IHZhbCkgOlxuICAgICAgICAgICAgICAgICh0aGlzLl9fanNvbi5hdHRycyA9IHt9KVtrZXldID0gdmFsXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLmF0dHJzICYmIHRoaXMuX19qc29uLmF0dHJzW2tleV1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy9UT0RPOiBSZWZhY3RvciBtb2QsIG1vZHMsIG11TW9kLCBtdU1vZHNcbiAgICAvL1RoaW5rIGFib3V0IGRlY2xNdW1vZHMgPyBzZXRNdU1vZCBkZWxNdU1vZCBnZXRNdU1vZFxuICAgIG1vZDogZnVuY3Rpb24obW9kLCB2YWwsIGZvcmNlKSB7XG4gICAgICAgIHZhciBtb2RzID0gdGhpcy5tb2RzKClcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAoIW1vZHMuaGFzT3duUHJvcGVydHkobW9kKSB8fCBmb3JjZSkgJiYgKG1vZHNbbW9kXSA9IHZhbClcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tdU1vZHMoKS5oYXNPd25Qcm9wZXJ0eShtb2QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVNb2QobW9kKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtb2RzLmhhc093blByb3BlcnR5KG1vZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kc1ttb2RdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1vZHM6IGZ1bmN0aW9uKHZhbHVlcywgZm9yY2UpIHtcbiAgICAgICAgdmFyIGZpZWxkID0gdGhpcy5fX2pzb24uZWxlbSA/ICdlbGVtTW9kcycgOiAnbW9kcydcbiAgICAgICAgdmFyIG1vZHMgPSB0aGlzLl9fanNvbltmaWVsZF1cbiAgICAgICAgaWYgKHZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICB0aGlzLl9fanNvbltmaWVsZF0gPSBmb3JjZSA/IHRoaXMuZXh0ZW5kKG1vZHMsIHZhbHVlcykgOiB0aGlzLmV4dGVuZCh2YWx1ZXMsIG1vZHMpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1vZHNcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbXVTdGF0ZXM6IGZ1bmN0aW9uKHN0YXRlcykge1xuICAgICAgICBpZiAoc3RhdGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2ZsYWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fbXVTdGF0ZXMgPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5fX211U3RhdGVzLCBzdGF0ZXMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19tdVN0YXRlcyB8fCB7fVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtdU1vZHM6IGZ1bmN0aW9uKG1vZHMpIHtcbiAgICAgICAgaWYgKG1vZHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19tdU1vZHMgPSB0aGlzLmV4dGVuZCh7fSwgdGhpcy5fX211TW9kcywgbW9kcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX211TW9kcyB8fCB7fVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtdVN0YXRlOiBmdW5jdGlvbihzdGF0ZSwgdmFsKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlW3N0YXRlXSAhPT0gdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdTdGF0ZSA9IHt9XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlW3N0YXRlXSA9IHZhbFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICh0aGlzLl9fbXVTdGF0ZXMgfHwgKHRoaXMuX19tdVN0YXRlcyA9IHt9KSlbc3RhdGVdID0gdmFsXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVTdGF0ZXMoKVtzdGF0ZV1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbXVNb2Q6IGZ1bmN0aW9uKG1vZCwgdmFsKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9fZmxhZykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlW21vZF0gIT09IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3U3RhdGUgPSB7fVxuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZVttb2RdID0gdmFsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKHRoaXMuX19tdU1vZHMgfHwgKHRoaXMuX19tdU1vZHMgPSB7fSkpW21vZF0gPSB2YWxcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tdU1vZHMoKVttb2RdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRvZ2dsZU11TW9kIDogZnVuY3Rpb24obW9kTmFtZSkge1xuICAgICAgICAvL1RPRE86IFJlZmFjdG9yIG1lXG4gICAgICAgIHRoaXMubXVNb2QobW9kTmFtZSwgIXRoaXMubXVNb2QobW9kTmFtZSkpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICB0YWc6IGZ1bmN0aW9uKHRhZywgZm9yY2UpIHtcbiAgICAgICAgaWYgKHRhZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19pc01peCkge3JldHVybiB0aGlzfVxuICAgICAgICAgICAgKCF0aGlzLl9fanNvbi50YWcgfHwgZm9yY2UpICYmICh0aGlzLl9fanNvbi50YWcgPSB0YWcpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLnRhZ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBtYXRjaDogZnVuY3Rpb24oc2VsZWN0b3IsIG1hdGNoZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9fZmxhZykgcmV0dXJuIHRoaXNcbiAgICAgICAgaWYgKCFzZWxlY3RvciB8fCAhbWF0Y2hlcikgcmV0dXJuIHRoaXNcbiAgICAgICAgdmFyIGRlY2wgPSBCSC5fZ2V0RGVjbChzZWxlY3RvcilcbiAgICAgICAgdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzIHx8ICh0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnMgPSB7fSlcbiAgICAgICAgdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzW2RlY2wuYmxvY2tdIHx8ICh0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnNbZGVjbC5ibG9ja10gPSBbXSlcbiAgICAgICAgdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzW2RlY2wuYmxvY2tdLnB1c2goW2RlY2wsIG1hdGNoZXJdKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBtaXhKczogZnVuY3Rpb24obWl4KSB7XG4gICAgICAgIGlmIChtaXguYmxvY2sgJiYgbWl4LmJsb2NrICE9PSB0aGlzLl9fanNvbi5ibG9jaykge1xuICAgICAgICAgICAgdmFyIG1hdGNoZXJzID0gdGhpcy5iaC5fX21hdGNoZXJzW21peC5ibG9ja11cbiAgICAgICAgICAgIGlmIChtYXRjaGVycykge1xuICAgICAgICAgICAgICAgIHZhciBqc29uID0gdGhpcy5leHRlbmQoe30sIHRoaXMuX19qc29uKVxuICAgICAgICAgICAgICAgIHRoaXMuZXh0ZW5kKHRoaXMuX19qc29uLCBtaXgpXG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24uZWxlbSA9IG1peC5lbGVtXG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24uX19zdG9wID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZWQgPSBbXVxuICAgICAgICAgICAgICAgIHRoaXMuX19qc29uLl9fbWF0Y2hlcnMgPSBtYXRjaGVyc1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fX2lzTWl4ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMuX19wcm9jZXNzTWF0Y2goKVxuICAgICAgICAgICAgICAgIHRoaXMuX19qc29uID0ganNvblxuICAgICAgICAgICAgICAgIHRoaXMuX19pc01peCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIG1peDogZnVuY3Rpb24obWl4LCBmb3JjZSkge1xuICAgICAgICBpZiAobWl4KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5taXggPSAoIXRoaXMuX19qc29uLm1peCB8fCBmb3JjZSkgP1xuICAgICAgICAgICAgICAgIG1peCA6XG4gICAgICAgICAgICAgICAgKEFycmF5LmlzQXJyYXkodGhpcy5fX2pzb24ubWl4KSA/IHRoaXMuX19qc29uLm1peCA6IFt0aGlzLl9fanNvbi5taXhdKS5jb25jYXQobWl4KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fanNvbi5taXhcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudDogZnVuY3Rpb24oY29udGVudCwgZm9yY2UpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgICAgICAgICAgKCF0aGlzLl9fanNvbi5jb250ZW50IHx8IGZvcmNlKSAmJiAodGhpcy5fX2pzb24uY29udGVudCA9IGNvbnRlbnQpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLmNvbnRlbnRcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcG9zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2pzb24uJHBvc2l0aW9uXG4gICAgfSxcbiAgICBpc0ZpcnN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24oKSA9PT0gMVxuICAgIH0sXG4gICAgaXNMYXN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19qc29uLiRpc0xhc3RcbiAgICB9LFxuICAgIGpzb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2pzb25cbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fX2lzTWl4KSB7cmV0dXJuIHRoaXN9XG4gICAgICAgIHRoaXMuX19qc29uLl9fc3RvcCA9IHRydWVcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGFwcGx5QmFzZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX19wcm9jZXNzTWF0Y2goKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgX19wcm9jZXNzTWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmV0VmFsLFxuICAgICAgICAgICAgY3R4ID0gdGhpcyxcbiAgICAgICAgICAgIGpzb24gPSB0aGlzLl9fanNvbixcbiAgICAgICAgICAgIGJfID0ganNvbi5ibG9jayxcbiAgICAgICAgICAgIF9fZSA9IGpzb24uZWxlbSxcbiAgICAgICAgICAgIG1vZHMgPSB0aGlzLm1vZHMoKSxcbiAgICAgICAgICAgIG1hdGNoZXJzID0ganNvbi5fX21hdGNoZXJzLFxuICAgICAgICAgICAgaSA9IG1hdGNoZXJzLmxlbmd0aCAtIDEsXG4gICAgICAgICAgICBtYXRjaGVkID0ganNvbi5fX21hdGNoZWQsXG4gICAgICAgICAgICBtYXRjaE1vZHMgPSBmdW5jdGlvbihkZWNsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlY2wubW9kTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kcyAmJiBtb2RzW2RlY2wubW9kTmFtZV0gJiYgKG1vZHNbZGVjbC5tb2ROYW1lXSA9PT0gZGVjbC5tb2RWYWwgfHwgbW9kc1tkZWNsLm1vZE5hbWVdID09PSB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZC5wdXNoKGkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRWYWwgPSBjYihjdHgsIGpzb24pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goaSlcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsID0gY2IoY3R4LCBqc29uKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgZm9yICg7IGkgPj0gMCAmJiAhcmV0VmFsICYmICFqc29uLl9fc3RvcDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgcnVsZSA9IG1hdGNoZXJzW2ldLFxuICAgICAgICAgICAgICAgIGRlY2wgPSBydWxlWzBdLFxuICAgICAgICAgICAgICAgIGNiID0gcnVsZVsxXVxuXG4gICAgICAgICAgICBpZiAofm1hdGNoZWQuaW5kZXhPZihpKSkgeyBjb250aW51ZSB9XG4gICAgICAgICAgICBpZiAoZGVjbC5lbGVtIHx8IF9fZSkge1xuICAgICAgICAgICAgICAgIChkZWNsLmVsZW0gPT09IF9fZSkgJiYgbWF0Y2hNb2RzKGRlY2wpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hdGNoTW9kcyhkZWNsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXRWYWwpICB7XG4gICAgICAgICAgICByZXRWYWwgPSBbXS5jb25jYXQocmV0VmFsKS5tYXAoZnVuY3Rpb24ocmV0VmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJldFZhbC5ibG9jayAmJiByZXRWYWwuYmxvY2sgIT09IGpzb24uYmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoZXJzID0gdGhpcy5iaC5fX21hdGNoZXJzW3JldFZhbC5ibG9ja10gfHwgW11cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbiA9IHJldFZhbFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX3N0b3AgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZWQgPSBbXVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbi5fX21hdGNoZXJzID0gbWF0Y2hlcnNcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXRWYWwuX19zdG9wID0ganNvbi5fX3N0b3BcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsLl9fbWF0Y2hlZCA9IGpzb24uX19tYXRjaGVkXG4gICAgICAgICAgICAgICAgICAgIHJldFZhbC5fX21hdGNoZXJzID0ganNvbi5fX21hdGNoZXJzXG4gICAgICAgICAgICAgICAgICAgIHJldFZhbC5lbGVtICYmIChyZXRWYWwuYmxvY2sgPSBqc29uLmJsb2NrKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fanNvbiA9IHJldFZhbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9fcHJvY2Vzc01hdGNoKClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2pzb25cbiAgICAgICAgICAgIH0sIHRoaXMpXG4gICAgICAgICAgICByZXRWYWwubGVuZ3RoID09IDEgJiYgKHJldFZhbCA9IHJldFZhbFswXSlcbiAgICAgICAgICAgIHRoaXMuX19qc29uID0gcmV0VmFsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9fbWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYl8gPSAgdGhpcy5fX2pzb24uYmxvY2ssXG4gICAgICAgICAgICBzdWJNYXRjaGVycyA9ICh0aGlzLl9fanNvbi4kc3ViTWF0Y2hlcnMgJiYgdGhpcy5fX2pzb24uJHN1Yk1hdGNoZXJzW2JfXSkgfHwgW10sXG4gICAgICAgICAgICBtYXRjaGVycyA9ICh0aGlzLmJoLl9fbWF0Y2hlcnNbYl9dIHx8IFtdKS5jb25jYXQoc3ViTWF0Y2hlcnMpXG5cbiAgICAgICAgdGhpcy5fX2pzb24uX19zdG9wID0gZmFsc2VcbiAgICAgICAgdGhpcy5fX2pzb24uX19tYXRjaGVkID0gW11cbiAgICAgICAgdGhpcy5fX2pzb24uX19tYXRjaGVycyA9IG1hdGNoZXJzXG4gICAgICAgIHRoaXMuX19wcm9jZXNzTWF0Y2goKVxuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9jb21wb3NlQ3VyTm9kZSh0aGlzLnByb3BzKVxuICAgICAgICB0aGlzLl9fZmxhZyA9IHRydWVcbiAgICAgICAgdGhpcy5zdGF0aWNzIHx8ICh0aGlzLnN0YXRpY3MgPSB7fSlcbiAgICAgICAgdGhpcy5fX3NlbGYgPSB0aGlzLnN0YXRpY3M7XG4gICAgICAgIHRoaXMuX19tYXRjaCgpXG4gICAgICAgIHRoaXMud2lsbE1vdW50KCkuZm9yRWFjaChmdW5jdGlvbih3aWxsTW91bnQpIHtcbiAgICAgICAgICAgIHdpbGxNb3VudC5iaW5kKHRoaXMpKHRoaXMsIHRoaXMuX19qc29uKVxuICAgICAgICB9LCB0aGlzKVxuICAgIH0sXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5leHRlbmQoe30sIHRoaXMuc3RhdGUsIHRoaXMubXVTdGF0ZXMoKSwgdGhpcy5tdU1vZHMoKSlcbiAgICAgICAgdGhpcy5kaWRNb3VudCgpLmZvckVhY2goZnVuY3Rpb24oZGlkTW91bnQpIHtcbiAgICAgICAgICAgIGRpZE1vdW50LmJpbmQodGhpcykodGhpcywgdGhpcy5fX2pzb24pXG4gICAgICAgIH0sIHRoaXMpXG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihwcm9wcykge1xuICAgICAgICB0aGlzLndpbGxSZWNlaXZlUHJvcHMoKS5mb3JFYWNoKGZ1bmN0aW9uKGJVcGRhdGUpIHtcbiAgICAgICAgICAgIGJVcGRhdGUuYmluZCh0aGlzKSh0aGlzLCBwcm9wcylcbiAgICAgICAgfSwgdGhpcylcbiAgICAgICAgdGhpcy5fX3Byb3BzID0gcHJvcHNcbiAgICAgICAgdGhpcy5fY29tcG9zZUN1ck5vZGUocHJvcHMpXG4gICAgICAgIHRoaXMuYmVmb3JlVXBkYXRlKCkuZm9yRWFjaChmdW5jdGlvbihiVXBkYXRlKSB7XG4gICAgICAgICAgICBiVXBkYXRlLmJpbmQodGhpcykodGhpcywgdGhpcy5fX2pzb24pXG4gICAgICAgIH0sIHRoaXMpXG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsVXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX19wcm9wcykge1xuICAgICAgICAgICAgdGhpcy5fX3Byb3BzID0gdW5kZWZpbmVkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb3NlQ3VyTm9kZSh0aGlzLnByb3BzKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBfX25vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fX2ZsYWcpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX19tYXRjaCgpXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVuZGVyTm9kZXMgPSBmdW5jdGlvbihqc29uLCByZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBqc29uLnJlZHVjZShmdW5jdGlvbihyZXN1bHQsIGpzb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShqc29uKSkge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJOb2Rlcyhqc29uLCByZXN1bHQpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2pzb24gPSBqc29uXG4gICAgICAgICAgICAgICAgICAgIHZhciBjbHMgPSB0aGlzLl9idWlsZENsYXNzTmFtZSgpICsgKHRoaXMuY2xzKCkgPyAnICcgKyB0aGlzLmNscygpIDogJycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IHRoaXMuX3Byb2Nlc3NUcmVlKHRoaXMuY29udGVudCgpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzID0gdGhpcy5hdHRycygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcyA9IHtjaGlsZHJlbjogY29udGVudH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRDYXBpdGFsaXplICYmIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9rZXlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmF0dHJDYXBpdGFsaXplZFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2tleSA9IHRoaXMuYXR0ckNhcGl0YWxpemVkW2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyc1tfa2V5XSA9IGF0dHJzW2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cnNba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKVxuXG4gICAgICAgICAgICAgICAgICAgIGNscyAmJiAocHJvcHMuY2xhc3NOYW1lID0gY2xzKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMudGFnKCkgfHwgJ2RpdicsIHRoaXMuZXh0ZW5kKHByb3BzLCBhdHRycywgZXZlbnRzKSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgcmVzdWx0IHx8IFtdKVxuICAgICAgICB9LmJpbmQodGhpcylcblxuICAgICAgICB2YXIgbm9kZSxcbiAgICAgICAgICAgIG5vZGVzID0gcmVuZGVyTm9kZXMoW10uY29uY2F0KHRoaXMuX19qc29uKSlcblxuICAgICAgICBpZiAobm9kZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2Rlc1swXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7Y2hpbGRyZW46IG5vZGVzfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgIH0sXG5cbiAgICBfY29tcG9zZUN1ck5vZGU6IGZ1bmN0aW9uKHBwKSB7XG4gICAgICAgIC8vVE9ETzogVGhpbmsgYWJvdXQgY2FjaGluZy9kaWZmaW5nIGJlbUpzb25UcmVlL2NvbnRlbnRcbiAgICAgICAgdGhpcy5fX2pzb24gPSB0aGlzLmV4dGVuZCh7fSwgcHAsIHtjb250ZW50OiBwcC5jaGlsZHJlbiB8fCBwcC5jb250ZW50fSlcbiAgICAgICAgdmFyIG1vZHMgPSBPYmplY3Qua2V5cyh0aGlzLl9fanNvbikucmVkdWNlKGZ1bmN0aW9uKG1vZHMsIGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleVswXSA9PT0gQkguXyAmJiAobW9kc1trZXkuc2xpY2UoMSldID0gcHBba2V5XSksIG1vZHNcbiAgICAgICAgfSwge30pXG4gICAgICAgIHRoaXMuX19ibG9jayAmJiAodGhpcy5fX2pzb24uYmxvY2sgPSB0aGlzLl9fYmxvY2spXG4gICAgICAgIHRoaXMuX19lbGVtICYmICh0aGlzLl9fanNvbi5lbGVtID0gdGhpcy5fX2VsZW0pXG4gICAgICAgIGlmICh0aGlzLl9fanNvbi5lbGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5lbGVtTW9kcyB8fCAodGhpcy5fX2pzb24uZWxlbU1vZHMgPSAodGhpcy5fX2pzb24ubW9kcyB8fCB7fSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9fanNvbi5tb2RzIHx8ICh0aGlzLl9fanNvbi5tb2RzID0ge30pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKG1vZHMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fanNvbi5lbGVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24uZWxlbU1vZHMgPSB0aGlzLmV4dGVuZCh0aGlzLl9fanNvbi5lbGVtTW9kcywgbW9kcylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2pzb24ubW9kcyA9IHRoaXMuZXh0ZW5kKHRoaXMuX19qc29uLm1vZHMsIG1vZHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9idWlsZENsYXNzTmFtZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBiXyA9IHRoaXMuX19qc29uLmJsb2NrLFxuICAgICAgICAgICAgX19lID0gdGhpcy5fX2pzb24uZWxlbSxcbiAgICAgICAgICAgIGNscyA9IHt9LFxuICAgICAgICAgICAgbW9kcyA9IHRoaXMuZXh0ZW5kKHt9LCB0aGlzLm1vZHMoKSwgdGhpcy5tdU1vZHMoKSlcblxuICAgICAgICBmdW5jdGlvbiBhZGRFbml0eShiXywgX19lLCBtb2RzLCBtaXgpIHtcbiAgICAgICAgICAgIHZhciBlbnRpdHkgPSBiX1xuXG4gICAgICAgICAgICBpZiAoX19lKSB7XG4gICAgICAgICAgICAgICAgZW50aXR5ICs9IEJILl9fICsgX19lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbHNbZW50aXR5XSA9IGVudGl0eVxuICAgICAgICAgICAgT2JqZWN0LmtleXMobW9kcykuZm9yRWFjaChmdW5jdGlvbihtb2ROYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZFZhbHVlID0gbW9kc1ttb2ROYW1lXVxuICAgICAgICAgICAgICAgIGlmICghbW9kVmFsdWUgJiYgbW9kVmFsdWUgIT09IDApIHJldHVyblxuICAgICAgICAgICAgICAgIHZhciBtb2RFbnRpdHkgPSBlbnRpdHkgKyBCSC5fICsgbW9kTmFtZVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbW9kVmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICBCSC5ub0Jvb2xNb2RzICYmIG1vZFZhbHVlICYmIChtb2RFbnRpdHkgKz0gQkguXyArICd5ZXMnKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZEVudGl0eSArPSBCSC5fICsgbW9kVmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xzW21vZEVudGl0eV0gPSBtb2RFbnRpdHlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBiXyAmJiBhZGRFbml0eShiXywgX19lLCBtb2RzLCBmYWxzZSlcbiAgICAgICAgdGhpcy5fX2pzb24ubWl4ICYmIFtdLmNvbmNhdCh0aGlzLl9fanNvbi5taXgpLmZvckVhY2goZnVuY3Rpb24obWl4KSB7XG4gICAgICAgICAgICBpZiAoIW1peCkgeyByZXR1cm4gfVxuICAgICAgICAgICAgaWYgKCFtaXguYmxvY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoIWJfKSB7IHJldHVybiB9XG4gICAgICAgICAgICAgICAgbWl4LmJsb2NrID0gYl9cbiAgICAgICAgICAgICAgICBtaXguZWxlbSB8fCAobWl4LmVsZW0gPSBfX2UpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRFbml0eShtaXguYmxvY2ssIG1peC5lbGVtLCBtaXgubW9kcyB8fCBtaXguZWxlbU1vZHMgfHwge30sIHRydWUpXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGNscykuam9pbignICcpXG4gICAgfSxcbiAgICBfcHJvY2Vzc1RyZWU6IGZ1bmN0aW9uKHRyZWUsIHBvc2l0aW9uKSB7XG4gICAgICAgIHRyZWUgPSBbXS5jb25jYXQodHJlZSlcbiAgICAgICAgcG9zaXRpb24gfHwgKHBvc2l0aW9uID0ge3ZhbDogMCwgbGFzdDogMH0pXG4gICAgICAgIHBvc2l0aW9uLmxhc3QgKz0gKHRyZWUubGVuZ3RoIC0gMSlcbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0cmVlLm1hcChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzVHJlZShub2RlLCBwb3NpdGlvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbm9kZSB8fCAoIW5vZGUuYmxvY2sgJiYgIW5vZGUuZWxlbSAmJiAhbm9kZS50YWcgJiYgIW5vZGUuY29udGVudCAmJiAhbm9kZS50eXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBub2RlLnR5cGUuZGlzcGxheU5hbWVcbiAgICAgICAgICAgICAgICBpZiAoIW5hbWUpIHsgcmV0dXJuIG5vZGUgfVxuICAgICAgICAgICAgICAgIHZhciBkZWNsID0gQkguX2dldERlY2wobmFtZSlcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wcm9wcyB8fCB7fVxuICAgICAgICAgICAgICAgIG5vZGUuYmxvY2sgPSBkZWNsLmJsb2NrLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICBub2RlLmVsZW0gPSBkZWNsLmVsZW1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLmVsZW0pIHtcbiAgICAgICAgICAgICAgICBub2RlLmJsb2NrIHx8IChub2RlLmJsb2NrID0gdGhpcy5fX2pzb24uYmxvY2spXG4gICAgICAgICAgICAgICAgbm9kZS5yZWYgPSBub2RlLmJsb2NrICsgQkguX18gKyBub2RlLmVsZW0gKyAnficgKyB0aGlzLmdlbmVyYXRlSWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fX2pzb24uJHRQYXJhbSAmJiAobm9kZS4kdFBhcmFtID0gdGhpcy5leHRlbmQoe30sIHRoaXMuX19qc29uLiR0UGFyYW0pKVxuICAgICAgICAgICAgaWYgKHRoaXMuX19qc29uLiRzdWJNYXRjaGVycykge1xuICAgICAgICAgICAgICAgIHZhciBzdWJNYXRjaGVycyA9IHRoaXMuX19qc29uLiRzdWJNYXRjaGVyc1tub2RlLmJsb2NrXVxuICAgICAgICAgICAgICAgIHN1Yk1hdGNoZXJzICYmICgobm9kZS4kc3ViTWF0Y2hlcnMgPSB7fSlbbm9kZS5ibG9ja10gPSBzdWJNYXRjaGVycylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvc2l0aW9uLmxhc3QgPT09IHBvc2l0aW9uLnZhbCA/IChub2RlLiRpc0xhc3QgPSB0cnVlKSA6IChub2RlLiRpc0xhc3QgPSBmYWxzZSlcbiAgICAgICAgICAgIG5vZGUuJHBvc2l0aW9uID0gKytwb3NpdGlvbi52YWxcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5iaC5CRU0sIG5vZGUpXG4gICAgICAgIH0sIHRoaXMpXG4gICAgICAgIGNvbnRlbnQubGVuZ3RoID09IDEgJiYgKGNvbnRlbnQgPSBjb250ZW50WzBdKVxuICAgICAgICByZXR1cm4gY29udGVudFxuICAgIH0sXG4gICAgZWxlbTogZnVuY3Rpb24oZWxlbU5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX19mbGFnKSB7IHJldHVybiB9XG4gICAgICAgIHZhciBlbGVtcyA9IFtdLmNvbmNhdCh0aGlzLmVsZW1DdHgoZWxlbU5hbWUpKS5tYXAoZnVuY3Rpb24oZWxlbUN0eCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1DdHguZG9tRWxlbSgpXG4gICAgICAgIH0pXG4gICAgICAgIGVsZW1zLmxlbmd0aCA9PSAxICYmIChlbGVtcyA9IGVsZW1zWzBdKVxuICAgICAgICByZXR1cm4gZWxlbXNcbiAgICB9LFxuICAgIGVsZW1DdHg6IGZ1bmN0aW9uKGVsZW1OYW1lKSB7XG4gICAgICAgIHZhciBlbGVtcyA9IFtdLFxuICAgICAgICAgICAgZW50aXR5ID0gdGhpcy5fX2pzb24uYmxvY2sgKyBCSC5fXyArIGVsZW1OYW1lLFxuICAgICAgICAgICAgX2VsZW1DdHggPSBmdW5jdGlvbihyZWZzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocmVmcykuZm9yRWFjaChmdW5jdGlvbihyZWZLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiA9IHJlZnNbcmVmS2V5XVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlZikgeyByZXR1cm4gfVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVmS2V5LnNwbGl0KCd+JylbMF0gPT09IGVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbXMucHVzaChyZWYpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZWxlbUN0eChyZWYucmVmcylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgX2VsZW1DdHgodGhpcy5yZWZzKVxuICAgICAgICBlbGVtcy5sZW5ndGggPT0gMSAmJiAoZWxlbXMgPSBlbGVtc1swXSlcbiAgICAgICAgcmV0dXJuIGVsZW1zXG4gICAgfSxcbiAgICBfZXZlbnRzOiBmdW5jdGlvbihldmVudHMpIHtcbiAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzUHJvcHMgfHwgKHRoaXMuX2V2ZW50c1Byb3BzID0ge30pXG4gICAgICAgICAgICB0aGlzLmV4dGVuZCh0aGlzLl9ldmVudHNQcm9wcywgZXZlbnRzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50c1Byb3BzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHdpbGxNb3VudDogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICB0aGlzLl9fZmxhZyAmJiAodGhpcy5fX3dpbGxNb3VudCB8fCAodGhpcy5fX3dpbGxNb3VudCA9IFtdKSkucHVzaChjYilcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3dpbGxNb3VudCB8fCBbXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBkaWRNb3VudDogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICB0aGlzLl9fZmxhZyAmJiAodGhpcy5fX2RpZE1vdW50IHx8ICh0aGlzLl9fZGlkTW91bnQgPSBbXSkpLnB1c2goY2IpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19kaWRNb3VudCB8fCBbXVxuICAgICAgICB9XG4gICAgfSxcbiAgICB3aWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihjYikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIHRoaXMuX19mbGFnICYmICh0aGlzLl9fd2lsbFJlY2VpdmUgfHwgKHRoaXMuX193aWxsUmVjZWl2ZSA9IFtdKSkucHVzaChjYilcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3dpbGxSZWNlaXZlIHx8IFtdXG4gICAgICAgIH1cbiAgICB9LFxuLy9UT0RPOiBEZWxldGUgdGhpcyBmblxuICAgIGJlZm9yZVVwZGF0ZTogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICB0aGlzLl9fZmxhZyAmJiAodGhpcy5fX2JVcGRhdGUgfHwgKHRoaXMuX19iVXBkYXRlID0gW10pKS5wdXNoKGNiKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fYlVwZGF0ZSB8fCBbXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBiaW5kOiBmdW5jdGlvbihldmVudHMpIHtcbiAgICAgICAgaWYgKHRoaXMuX19mbGFnKSB7XG4gICAgICAgICAgICB2YXIgYXR0cnMgPSB7fVxuICAgICAgICAgICAgdGhpcy5fX2V2ZW50cyB8fCAodGhpcy5fX2V2ZW50cyA9IHt9KVxuICAgICAgICAgICAgT2JqZWN0XG4gICAgICAgICAgICAgICAgLmtleXMoZXZlbnRzKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50TmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjYiA9IGV2ZW50c1tldmVudE5hbWVdXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19ldmVudHNbZXZlbnROYW1lXSB8fCAodGhpcy5fX2V2ZW50c1tldmVudE5hbWVdID0gW10pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19ldmVudHNbZXZlbnROYW1lXS5wdXNoKGNiKVxuICAgICAgICAgICAgICAgICAgICBhdHRyc1tldmVudE5hbWVdID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2V2ZW50c1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5iaW5kKHRoaXMpKGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKVxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9LCB0aGlzKVxuXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMoYXR0cnMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGRvbUVsZW06IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuZmluZERPTU5vZGUodGhpcylcbiAgICB9XG59XG5cbkJILkJFTV9IYXphcmQgPSBCRU1fSGF6YXJkXG5cbnJldHVybiBCSFxufSkoKVxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEJIXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJoKSB7XG4gICAgYmgubWF0Y2goJ2NvbnRyb2xfZm9jdXNlZCcsIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICBjdHhcbiAgICAgICAgICAgIC5tdU1vZHMoe1xuICAgICAgICAgICAgICAgIGZvY3VzZWQ6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmJpbmQoe1xuICAgICAgICAgICAgICAgIG9uRm9jdXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjdHgubW9kKCdkaXNhYmxlZCcpIHx8IGN0eC5tdU1vZCgnZm9jdXNlZCcsIHRydWUpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkJsdXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjdHgubXVNb2QoJ2ZvY3VzZWQnLCBmYWxzZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgIH0pXG4gICAgYmgubWF0Y2goJ2NvbnRyb2xfcHJlc3NlZCcsIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICBjdHhcbiAgICAgICAgICAgIC5tdU1vZHMoe1xuICAgICAgICAgICAgICAgIHByZXNzZWQ6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmJpbmQoe1xuICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogYmluZFRvRG9jIGRpZmYgZnJvbSBuYXRpdmUgYnRuXG4gICAgICAgICAgICAgICAgICAgIGN0eC5tdU1vZCgncHJlc3NlZCcsIGZhbHNlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Nb3VzZURvd246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjdHgubXVNb2QoJ3ByZXNzZWQnLCB0cnVlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Nb3VzZVVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm11TW9kKCdwcmVzc2VkJywgZmFsc2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9KVxufTtcbiIsIihmdW5jdGlvbigpIHtcblxuaWYoIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgcmV0dXJuO1xufVxuXG52YXIgUk9PVF9FTEVNID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgIGlzUG9pbnRlciA9IGZhbHNlO1xuXG5mdW5jdGlvbiBzZXRQb2ludGVyRmxhZygpIHtcbiAgICBpc1BvaW50ZXIgPSB0cnVlO1xuXG4gICAgLy8g0J/RgNC+0LPRgNCw0LzQvNC90YPRjiDRg9GB0YLQsNC90L7QstC60YMg0YTQvtC60YPRgdCwINC40L3QvtCz0LTQsCDQt9Cw0LLQvtGA0LDRh9C40LLQsNGO0YIg0LIgYWZ0ZXJDdXJyZW50RXZlbnQuXG4gICAgLy8g0KfRgtC+0LHRiyDQutC+0YDRgNC10LrRgtC90L4g0L7QsdGA0LDQsdCw0YLRi9Cy0LDRgtGMINGC0LDQutC40LUg0YHQu9GD0YfQsNC4LCDRgdCx0YDQsNGB0YvQstCw0LXQvCDRhNC70LDQsyDQstC+IF/QstGC0L7RgNC+0LxfINGC0LjQutC1LlxuICAgIC8vIE5PVEU6INCSINC60LDRh9C10YHRgtCy0LUg0LrQvtC90YLQtdC60YHRgtCwINGD0LrQsNC30YvQstCw0LXRgtGB0Y8gd2luZG93LCDQuNC90LDRh9C1INCyIElFOSDQsdGD0LTQtdGCINC+0YjQuNCx0LrQsCBcIkludmFsaWQgY2FsbGluZyBvYmplY3RcIi5cbiAgICBzZXRUaW1lb3V0KHNldFRpbWVvdXQuYmluZCh3aW5kb3csIHJlc2V0UG9pbnRlckZsYWcpKTtcbn1cblxuZnVuY3Rpb24gcmVzZXRQb2ludGVyRmxhZygpIHtcbiAgICBpc1BvaW50ZXIgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoKSB7XG4gICAgUk9PVF9FTEVNLmNsYXNzTGlzdC50b2dnbGUoJ3BvaW50ZXJmb2N1cycsIGlzUG9pbnRlcik7XG59XG5cbi8vINCU0LvRjyDQvdCw0LTQtdC20L3QvtGB0YLQuCDQstC10YjQsNC10Lwg0YHQvtCx0YvRgtC40Y8g0L3QsCB3aW5kb3cg0L3QsCDRhNCw0LfRgyDQt9Cw0YXQstCw0YLQsC5cbi8vINCY0Lct0LfQsCDRhNCw0LfRiyDQt9Cw0YXQstCw0YLQsCDQvdC1INC40YHQv9C+0LvRjNC30YPQtdC8IGpRdWVyeS5cblxuLy8g0J7QsdGL0YfQvdC+LCDRhNC+0LrRg9GBINCy0YvRgdGC0LDQstC70Y/QtdGC0YHRjyDRgdGA0LDQt9GDINC/0L7RgdC70LUgbW91c2Vkb3duLlxuLy8g0J3QsCB0b3VjaCDRg9GB0YLRgNC+0LnRgdGC0LLQsNGFIG1vdXNlZG93biDRgtCw0LrQttC1INGA0LDQsdC+0YLQsNC10YIuXG5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBzZXRQb2ludGVyRmxhZywgdHJ1ZSk7XG5cbi8vIEZGIE1hYyDQuCBTYWZhcmkg0L3QtSDRgdGC0LDQstGP0YIg0YTQvtC60YPRgSDQsdC+0LvRjNGI0LjQvdGB0YLQstGDINGN0LvQtdC80LXQvdGC0L7QsiDRg9C/0YDQsNCy0LvQtdC90LjRjyDQv9C+INGB0L7QsdGL0YLQuNGP0Lwg0LzRi9GI0LguXG4vLyDQmCDQvdC1INC/0L7Qt9Cy0L7Qu9GP0Y7RgiDQstGL0YHRgtCw0LLQuNGC0Ywg0YTQvtC60YPRgSDQv9GA0L7Qs9GA0LDQvNC80L3QviDQsiDQvtCx0YDQsNCx0L7RgtGH0LjQutC1IG1vdXNlZG93bi5cbi8vINCf0L7QtNGA0L7QsdC90L7RgdGC0Lg6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvbWlzaGFiZXJlemluLzg5MnlwcHRzLzIvLlxuLy8g0JjQty3Qt9CwINGN0YLQvtCz0L4g0YTQvtC60YPRgSDQvdC10YDQtdC00LrQviDQstGL0YHRgtCw0LLQu9GP0Y7RgiDQv9C+INGB0L7QsdGL0YLQuNGOIG1vdXNldXAsINC/0L7RjdGC0L7QvNGDINC10LPQviDRgtC+0LbQtSDRgdC70YPRiNCw0LXQvC5cbmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzZXRQb2ludGVyRmxhZywgdHJ1ZSk7XG5cbi8vIEhUTUxMYWJlbEVsZW1lbnQg0LLRi9GB0YLQsNCy0LvRj9C10YIg0YTQvtC60YPRgSDRgdCy0Y/Qt9Cw0L3QvdC+0LzRgyDRjdC70LXQvNC10L3RgtGDINC/0L4g0YHQvtCx0YvRgtC40Y4gY2xpY2suXG4vLyDQotCw0LrQttC1INCy0L7Qt9C80L7QttC90LAg0L/RgNC+0LPRgNCw0LzQvNC90LDRjyDRg9GB0YLQsNC90L7QstC60LAg0YTQvtC60YPRgdCwINC/0L4g0YHQvtCx0YvRgtC40Y4gY2xpY2suXG5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNldFBvaW50ZXJGbGFnLCB0cnVlKTtcblxuLy8gRkYg0L3QtSDQv9C+0LTQtNC10YDQttC40LLQsNC10YIgZm9jdXNpbiwg0LfQsNGC0L4g0YPQvNC10LXRgiDQt9Cw0YXQstCw0YIg0YMg0YHQvtCx0YvRgtC40Y8gZm9jdXMuXG4vLyDQntGB0YLQsNC70YzQvdGL0LUg0LHRgNCw0YPQt9C10YDRiyDRg9C80LXRjtGCINC4INGC0L4g0Lgg0YLQviwg0L3QviDQstC+0YIg0LIgSUUg0YHQvtCx0YvRgtC40LVcbi8vIGZvY3VzINCy0LXQtNC10YIg0YHQtdCx0Y8g0L3QtdC90LDQtNC10LbQvdC+LiDQndCw0L/RgNC40LzQtdGALCDQv9GA0Lgg0L/QtdGA0LXQvNC10YnQtdC90LjQuCDRgdGC0YDQtdC70LrQsNC80Lhcbi8vINC/0L4g0YDQsNC00LjQvtCz0YDRg9C/0L/QtSwg0YHQvtCx0YvRgtC40Y8g0L3QsCDRjdC70LXQvNC10L3RgtC1INC40L3RgtC10YDRhNC10LnRgdCwINC90LDRgdGC0YPQv9Cw0Y7RgiDQsiDRgtCw0LrQvtC5INC/0L7RgdC70LXQtNC+0LLQsNGC0LXQu9GM0L3QvtGB0YLQuDpcbi8vIGtleWRvd24g4oaSIGZvY3VzaW4g4oaSIGNsaWNrICjRgdC40L3RgtC10YLQuNGH0LXRgdC60LjQuSkg4oaSIGZvY3VzLlxuLy8g0J/QvtC00YDQvtCx0L3QvtGB0YLQuDpcbi8vICogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy82ODc3ODdcbi8vICogaHR0cDovL2pzZmlkZGxlLm5ldC9taXNoYWJlcmV6aW4vOGd6NHJ5aHkvMTAvXG4vL1xuLy8g0JjRgtC+0LPQvjogRkYgKGZvY3VzKSwgSUUgKGZvY3VzaW4pLCDQntGB0YLQsNC70YzQvdGL0LUgKNC90LUg0LjQvNC10LXRgiDQt9C90LDRh9C10L3QuNGPKS5cbi8vINCY0YHQv9C+0LvRjNC30YPQtdC8INC/0YDQvtCy0LXRgNC60YMg0L3QsCB3aW5kb3cub25mb2N1c2luLlxuYWRkRXZlbnRMaXN0ZW5lcignb25mb2N1c2luJyBpbiB3aW5kb3cgPyAnZm9jdXNpbicgOiAnZm9jdXMnLCB0b2dnbGVDbGFzcywgdHJ1ZSk7XG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaCkge1xuICAgIGJoLm1hdGNoKCdyYWRpby1idXR0b25fX2NvbnRyb2wnLCBmdW5jdGlvbihjdHgpIHtcblxuICAgICAgICB2YXIgY29udHJvbEF0dHJzID0gY3R4LnRQYXJhbSgnX2NvbnRyb2xBdHRycycpO1xuXG4gICAgICAgIGlmKGNvbnRyb2xBdHRycy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgY29udHJvbEF0dHJzLmRpc2FibGVkID0gJ2Rpc2FibGVkJztcbiAgICAgICAgICAgIGNvbnRyb2xBdHRycy50YWJJbmRleCA9ICctMSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgY29udHJvbEF0dHJzLmRpc2FibGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY29udHJvbEF0dHJzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGNvbnRyb2xBdHRycy5jaGVja2VkID0gJ2NoZWNrZWQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGNvbnRyb2xBdHRycy5jaGVja2VkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udHJvbEF0dHJzLnR5cGUgPSAncmFkaW8nO1xuICAgICAgICBjb250cm9sQXR0cnMubmFtZSA9IGN0eC50UGFyYW0oJ19yYWRpb0J1dHRvbicpLm5hbWU7IC8vINCf0YDQvtC60LjQtNGL0LLQsNC10Lwg0L/QvtC70LUgbmFtZSDQuNC3INCx0LvQvtC60LAuXG5cbiAgICAgICAgY3R4XG4gICAgICAgICAgICAudGFnKCdpbnB1dCcpXG4gICAgICAgICAgICAuYXR0cnMoY29udHJvbEF0dHJzKTtcbiAgICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJoKSB7XG4gICAgYmgubWF0Y2goJ3JhZGlvLWJ1dHRvbl9fcmFkaW9fb25seS1pY29uX3llcycsIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICBjdHguY29udGVudChbXG4gICAgICAgICAgICB7ZWxlbTogJ2NvbnRyb2wnfSxcbiAgICAgICAgICAgICcmIzE2MDsnLCAvLyAmbmJzcDtcbiAgICAgICAgICAgIGN0eC5jb250ZW50KClcbiAgICAgICAgXSwgdHJ1ZSk7XG4gICAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaCkge1xuICAgIGJoLm1hdGNoKCdyYWRpby1idXR0b25fX3JhZGlvJywgZnVuY3Rpb24oY3R4LCBqc29uKSB7XG5cbiAgICAgICAgdmFyIGVsZW1Nb2RzID0gY3R4Lm1vZHMoKSxcbiAgICAgICAgICAgIHJhZGlvQnV0dG9uID0gY3R4LnRQYXJhbSgnX3JhZGlvQnV0dG9uJyksXG5cbiAgICAgICAgICAgIC8vINCV0YHQu9C4INC90LAg0LLRgdGR0Lwg0LHQu9C+0LrQtSBfZGlzYWJsZWRfeWVzLlxuICAgICAgICAgICAgbWFrZURpc2FibGVkID0gcmFkaW9CdXR0b24uZGlzYWJsZWQsXG5cbiAgICAgICAgICAgIC8vINCf0L4g0LjRgdGC0L7RgNC40YfQtdGB0LrQuNC8INC/0YDQuNGH0LjQvdCw0LwgY29udHJvbEF0dHJzINC60L7Qv9C40YDRg9C10YLRgdGPLCDQsCDQvdC1INC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyBhcyBpcy5cbiAgICAgICAgICAgIGNvbnRyb2xBdHRycyA9IGN0eC5leHRlbmQoe30sIGpzb24uY29udHJvbEF0dHJzIHx8IHt9KSxcblxuICAgICAgICAgICAgLy8gdmFsdWUg0LHQu9C+0LrQsCDRgdC+0LLQv9Cw0LvQviDRgSB2YWx1ZSDQutC+0L3RgtGA0L7Qu9CwLlxuICAgICAgICAgICAgdmFsdWVzTWF0Y2hlZCA9IGNvbnRyb2xBdHRycy52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIGNvbnRyb2xBdHRycy52YWx1ZSA9PT0gcmFkaW9CdXR0b24udmFsdWU7XG5cbiAgICAgICAgLy8gdmFsdWUg0LHQu9C+0LrQsCDRgdC+0LLQv9Cw0LvQviDRgSB2YWx1ZSDQsiBjb250cm9sQXR0cnMg0Y3Qu9C10LzQtdC90YLQsCByYWRpby5cbiAgICAgICAgaWYodmFsdWVzTWF0Y2hlZCkge1xuICAgICAgICAgICAgZWxlbU1vZHMuY2hlY2tlZCA9ICd5ZXMnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWFrZURpc2FibGVkKSB7XG4gICAgICAgICAgICBlbGVtTW9kcy5kaXNhYmxlZCA9ICd5ZXMnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWVsZW1Nb2RzLnNpZGUpIHtcbiAgICAgICAgICAgIC8vIGBpc0ZpcnN0ICogMiArIGlzTGFzdGAg0L/RgNC40LLQvtC00LjRgiDQutC+0LzQsdC40L3QsNGG0LjQuCBpc0ZpcnN0L2lzTGFzdCDQuiDQuNC90LTQtdC60YHRgyDQvtGCIDAg0LTQviAzLlxuICAgICAgICAgICAgZWxlbU1vZHMuc2lkZSA9IFsnJywgJ3JpZ2h0JywgJ2xlZnQnLCAnYm90aCddW2N0eC5pc0ZpcnN0KCkgKiAyICsgY3R4LmlzTGFzdCgpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRyb2xBdHRycy5jaGVja2VkID0gQm9vbGVhbihlbGVtTW9kcy5jaGVja2VkKTtcbiAgICAgICAgY29udHJvbEF0dHJzLmRpc2FibGVkID0gQm9vbGVhbihlbGVtTW9kcy5kaXNhYmxlZCk7XG5cbiAgICAgICAgaWYoIWNvbnRyb2xBdHRycy5pZCkge1xuICAgICAgICAgICAgY29udHJvbEF0dHJzLmlkID0gY3R4LmdlbmVyYXRlSWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLnRhZygnbGFiZWwnKVxuICAgICAgICAgICAgLmF0dHJzKHtcbiAgICAgICAgICAgICAgICAnaHRtbEZvcic6IGNvbnRyb2xBdHRycy5pZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50UGFyYW0oJ19jb250cm9sQXR0cnMnLCBjb250cm9sQXR0cnMpXG4gICAgICAgICAgICAuY29udGVudChbXG4gICAgICAgICAgICAgICAge2VsZW06ICdjb250cm9sJ30sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBlbGVtOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBjdHguY29udGVudCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSwgdHJ1ZSk7XG4gICAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaCkge1xuICAgIGJoLm1hdGNoKCdyYWRpby1idXR0b25fX3JhZGlvJywgZnVuY3Rpb24oY3R4LCBqc29uKSB7XG4gICAgICAgIC8vWFhYOiB0aGlzIGlzIGJlY2F1c2Ugd2UgcmVSZW5kZXIgb25seSByYWRpb2J1dHRvbl9fcmFkaW8gbm90IGZ1bGwgcmFkaW8gc28gd2UgaGF2ZSBjb250cm9sQXR0cnMgYWxyZWFkeVxuICAgICAgICAvL3dlIGNhbiBjaGFuZ2UgaW4gcmFkaW9idXR0b25fX3JhZGlvLmJoLmpzID0+IHRQYXJhbSgnX2NvbnRyb2xBdHRycycsIGNvbnRyb2xBdHRycywgdHJ1ZSlcbiAgICAgICAgaWYgKGN0eC50UGFyYW0oJ19jb250cm9sQXR0cnMnKSkge1xuICAgICAgICAgICAgY3R4LnRQYXJhbSgnX2NvbnRyb2xBdHRycycsIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLm1peEpzKHtibG9jazogJ3JhZGlvYm94JywgZWxlbTogJ3JhZGlvJ30pXG4gICAgICAgICAgICAubWl4SnMoe2Jsb2NrOiAnY29udHJvbCcsIG1vZHM6IHsncHJlc3NlZCc6IHRydWV9fSlcbiAgICB9KVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaCkge1xuICAgIGJoLm1hdGNoKCdyYWRpby1idXR0b25fX3RleHQnLCBmdW5jdGlvbihjdHgpIHtcbiAgICAgICAgY3R4LnRhZygnc3BhbicpO1xuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmgpIHtcbiAgICBiaC5tYXRjaCgncmFkaW8tYnV0dG9uJywgZnVuY3Rpb24oY3R4LCBqc29uKSB7XG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLnRhZygnc3BhbicpXG4gICAgICAgICAgICAuanMoY3R4LmV4dGVuZCh7bGl2ZTogZmFsc2V9LCBjdHguanMoKSkpXG4gICAgICAgICAgICAubW9kKCd0aGVtZScsICdub3JtYWwnKVxuICAgICAgICAgICAgLnRQYXJhbSgnX3JhZGlvQnV0dG9uJywge1xuICAgICAgICAgICAgICAgIG5hbWU6IGpzb24ubmFtZSxcbiAgICAgICAgICAgICAgICB2YWx1ZToganNvbi52YWx1ZSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogQm9vbGVhbihjdHgubW9kKCdkaXNhYmxlZCcpKSxcbiAgICAgICAgICAgICAgICBuZXh0Rm9yUHJlc3NlZDogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY29udGVudCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBjdHguY29udGVudCgpLFxuICAgICAgICAgICAgICAgICAgICBpc1NpbXBsZSA9IGN0eC5pc1NpbXBsZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShjb250ZW50KVxuICAgICAgICAgICAgICAgICAgICA/IGNvbnRlbnQuZmlsdGVyKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNTaW1wbGUoZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIDogY29udGVudDtcbiAgICAgICAgICAgIH0pKCksIHRydWUpO1xuICAgIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmgpIHtcbiAgICBiaC5tYXRjaCgncmFkaW8tYnV0dG9uJywgZnVuY3Rpb24oY3R4LCBqc29uKSB7XG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLm11U3RhdGVzKHtcbiAgICAgICAgICAgICAgICB2YWx1ZToganNvbi52YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5iaW5kKHtcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBjdHgubXVTdGF0ZSgndmFsdWUnLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBhcmFtKCd2YWx1ZScsIGN0eC5tdVN0YXRlKCd2YWx1ZScpLCB0cnVlKVxuICAgIH0pXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJoKSB7XG4gICAgYmgubWF0Y2goJ3JhZGlvYm94X19yYWRpbycsIGZ1bmN0aW9uKGN0eCwganNvbikge1xuXG4gICAgICAgIHZhciBjb250cm9sQXR0cnMgPSBjdHguZXh0ZW5kKHtcbiAgICAgICAgICAgICAgICBpZDogY3R4LmdlbmVyYXRlSWQoKSxcbiAgICAgICAgICAgICAgICB0eXBlOiAncmFkaW8nLFxuICAgICAgICAgICAgICAgIG5hbWU6IGN0eC50UGFyYW0oJ25hbWUnKVxuICAgICAgICAgICAgfSwganNvbi5jb250cm9sQXR0cnMpLFxuXG4gICAgICAgICAgICAvLyB2YWx1ZSDQsdC70L7QutCwINGB0L7QstC/0LDQu9C+INGBIHZhbHVlINCyIGNvbnRyb2xBdHRycyDRjdC70LXQvNC10L3RgtCwIHJhZGlvXG4gICAgICAgICAgICBpc1ZhbHVlc01hdGNoID0gY29udHJvbEF0dHJzLnZhbHVlICE9PSB1bmRlZmluZWQgJiYgY29udHJvbEF0dHJzLnZhbHVlID09PSBjdHgudFBhcmFtKCd2YWx1ZScpO1xuXG4gICAgICAgIGN0eC5tb2RzKHtcbiAgICAgICAgICAgIGRpc2FibGVkOiBjdHgudFBhcmFtKCdkaXNhYmxlZCcpLFxuICAgICAgICAgICAgY2hlY2tlZDogaXNWYWx1ZXNNYXRjaCA/ICd5ZXMnIDogJydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYoY3R4Lm1vZCgnZGlzYWJsZWQnKSA9PT0gJ3llcycpIHtcbiAgICAgICAgICAgIGNvbnRyb2xBdHRycy5kaXNhYmxlZCA9ICdkaXNhYmxlZCc7XG4gICAgICAgICAgICBjb250cm9sQXR0cnMudGFiSW5kZXggPSAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGN0eC5tb2QoJ2NoZWNrZWQnKSA9PT0gJ3llcycpIHtcbiAgICAgICAgICAgIGNvbnRyb2xBdHRycy5jaGVja2VkID0gJ2NoZWNrZWQnO1xuICAgICAgICB9XG5cbiAgICAgICAgY3R4XG4gICAgICAgICAgICAudGFnKCdsYWJlbCcpXG4gICAgICAgICAgICAuYXR0cignaHRtbEZvcicsIGNvbnRyb2xBdHRycy5pZClcbiAgICAgICAgICAgIC50UGFyYW0oJ2NvbnRyb2xBdHRycycsIGNvbnRyb2xBdHRycylcbiAgICAgICAgICAgIC5jb250ZW50KFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW06ICdib3gnLFxuICAgICAgICAgICAgICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDoge2VsZW06ICdjb250cm9sJ31cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGN0eC5jb250ZW50KClcbiAgICAgICAgICAgIF0sIHRydWUpO1xuICAgIH0pO1xuXG4gICAgLy9iaHouanNcbiAgICBiaC5tYXRjaCgncmFkaW9ib3hfX3JhZGlvJywgZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIHZhciBjb250cm9sQXR0cnMgPSBjdHgudFBhcmFtKCdjb250cm9sQXR0cnMnKVxuICAgICAgICAvL1hYWDogdGhpcyBpcyBiZWNhdXNlIHdlIHJlUmVuZGVyIG9ubHkgcmFkaW9ib3hfX3JhZGlvIG5vdCBmdWxsIHJhZGlvIHNvIHdlIGhhdmUgY29udHJvbEF0dHJzIGFscmVhZHlcbiAgICAgICAgLy93ZSBjYW4gY2hhbmdlIGluIHJhZGlvYm94X19yYWRpby5iaC5qcyA9PiB0UGFyYW0oJ2NvbnRyb2xBdHRycycsIGNvbnRyb2xBdHRycywgdHJ1ZSlcbiAgICAgICAgaWYgKGNvbnRyb2xBdHRycykge1xuICAgICAgICAgICAgY3R4LnRQYXJhbSgnY29udHJvbEF0dHJzJywgdW5kZWZpbmVkLCB0cnVlKVxuICAgICAgICB9XG5cbiAgICAgICAgY3R4XG4gICAgICAgICAgICAubWl4SnMoe2Jsb2NrOiAnY29udHJvbCcsIG1vZHM6IHsnZm9jdXNlZCc6IHRydWV9fSlcbiAgICAgICAgICAgIC5taXhKcyh7YmxvY2s6ICdjb250cm9sJywgbW9kczogeydob3ZlcmVkJzogdHJ1ZX19KVxuICAgICAgICAgICAgLmJpbmQoe1xuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWN0eC5tb2QoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tdU1vZCgnZm9jdXNlZCcsIHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmVsZW0oJ2NvbnRyb2wnKS5mb2N1cygpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgIH0pXG59XG4iLCJ2YXIgQkggPSByZXF1aXJlKCcuLi8uLi9jb21tb24uYmxvY2tzL2JlbS9iZW0uanMnKVxuXG5CSC5ub0Jvb2xNb2RzID0gdHJ1ZVxuXG52YXIgYmggPSBuZXcgQkgoKVxudmFyIEJFTSA9IGJoLkJFTVxuXG5tb2R1bGUuZXhwb3J0cy5SZWFjdCA9IEJILlJlYWN0XG5tb2R1bGUuZXhwb3J0cy5iaCA9IGJoXG5tb2R1bGUuZXhwb3J0cy5CRU0gPSBCRU1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmgpIHtcbiAgICBiaC5tYXRjaCgnY29udHJvbF9ob3ZlcmVkJywgZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIGN0eFxuICAgICAgICAgICAgLm11TW9kcyh7XG4gICAgICAgICAgICAgICAgaG92ZXJlZDogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYmluZCh7XG4gICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm1vZCgnZGlzYWJsZWQnKSB8fCBjdHgubXVNb2QoJ2hvdmVyZWQnLCB0cnVlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm11TW9kKCdob3ZlcmVkJywgZmFsc2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9KVxufVxuIiwiLy9Db3VsZCBiZSBnZW5lcmF0ZWRcbnZhciBCSCA9IHJlcXVpcmUoJy4uLy4uLy4uL2Rlc2t0b3AuYmxvY2tzL2JlbS9iZW0uanMnKVxudmFyIGJoID0gQkguYmhcblxucmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uLmJsb2Nrcy9wb2ludGVyZm9jdXMvcG9pbnRlcmZvY3VzLmpzJylcblxucmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uLmJsb2Nrcy9jb250cm9sL2NvbnRyb2wuYmh6LmpzJykoYmgpXG5yZXF1aXJlKCcuLi8uLi8uLi9kZXNrdG9wLmJsb2Nrcy9jb250cm9sL2NvbnRyb2wuYmh6LmpzJykoYmgpXG5cbnJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi5ibG9ja3MvcmFkaW9ib3gvX19yYWRpby9yYWRpb2JveF9fcmFkaW8uYmguanMnKShiaClcblxucmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uLmJsb2Nrcy9yYWRpby1idXR0b24vX19yYWRpby9yYWRpby1idXR0b25fX3JhZGlvLmJoLmpzJykoYmgpXG5yZXF1aXJlKCcuLi8uLi8uLi9jb21tb24uYmxvY2tzL3JhZGlvLWJ1dHRvbi9fX3JhZGlvL3JhZGlvLWJ1dHRvbl9fcmFkaW8uYmh6LmpzJykoYmgpXG5yZXF1aXJlKCcuLi8uLi8uLi9jb21tb24uYmxvY2tzL3JhZGlvLWJ1dHRvbi9fX3JhZGlvL19vbmx5LWljb24vcmFkaW8tYnV0dG9uX19yYWRpb19vbmx5LWljb25feWVzLmJoLmpzJykoYmgpXG5cbnJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi5ibG9ja3MvcmFkaW8tYnV0dG9uL19fY29udHJvbC9yYWRpby1idXR0b25fX2NvbnRyb2wuYmguanMnKShiaClcbnJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi5ibG9ja3MvcmFkaW8tYnV0dG9uL19fdGV4dC9yYWRpby1idXR0b25fX3RleHQuYmguanMnKShiaClcblxudmFyIFJhZGlvQnV0dG9uX19yYWRpbyA9IEJILlJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ3JhZGlvYnV0dG9uX19yYWRpbycsXG4gICAgX19ibG9jazogJ3JhZGlvLWJ1dHRvbicsXG4gICAgX19lbGVtOiAncmFkaW8nLFxuICAgIF9fbWF0Y2hlcnM6IGJoLl9fbWF0Y2hlcnMsXG4gICAgbWl4aW5zOiBbQkguQkVNX0hhemFyZF0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19ub2RlKClcbiAgICB9LFxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBSYWRpb0J1dHRvbl9fcmFkaW9cbiIsIi8vQ291bGQgYmUgZ2VuZXJhdGVkXG52YXIgQkggPSByZXF1aXJlKCcuLi8uLi9kZXNrdG9wLmJsb2Nrcy9iZW0vYmVtLmpzJylcbnZhciBiaCA9IEJILmJoXG5cbnJlcXVpcmUoJy4uLy4uL2NvbW1vbi5ibG9ja3MvcmFkaW8tYnV0dG9uL3JhZGlvLWJ1dHRvbi5iaC5qcycpKGJoKVxucmVxdWlyZSgnLi4vLi4vY29tbW9uLmJsb2Nrcy9yYWRpby1idXR0b24vcmFkaW8tYnV0dG9uLmJoei5qcycpKGJoKVxuXG52YXIgUmFkaW9CdXR0b25fX3JhZGlvID0gcmVxdWlyZSgnLi9fX3JhZGlvL3JhZGlvLWJ1dHRvbl9fcmFkaW8uanMnKVxuXG52YXIgUmFkaW9CdXR0b24gPSBCSC5SZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdyYWRpb2J1dHRvbicsXG4gICAgX19ibG9jazogJ3JhZGlvLWJ1dHRvbicsXG4gICAgX19tYXRjaGVyczogYmguX19tYXRjaGVycyxcbiAgICBtaXhpbnM6IFtCSC5CRU1fSGF6YXJkXSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX25vZGUoKVxuICAgIH1cbn0pXG5cblJhZGlvQnV0dG9uLlJhZGlvID0gUmFkaW9CdXR0b25fX3JhZGlvXG5cbm1vZHVsZS5leHBvcnRzID0gUmFkaW9CdXR0b25cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgICBjb250ZW50OiB7XG4gICAgICAgIGJsb2NrOiAncmFkaW8tYnV0dG9uJyxcbiAgICAgICAgbW9kczoge3NpemU6ICdtJ30sXG4gICAgICAgIG5hbWU6ICdzaG93X3RvJyxcbiAgICAgICAgdmFsdWU6ICdmcmllbmRzJyxcbiAgICAgICAgY29udGVudDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW06ICdyYWRpbycsXG4gICAgICAgICAgICAgICAgY29udHJvbEF0dHJzOiB7dmFsdWU6ICdhbGwnfSxcbiAgICAgICAgICAgICAgICBlbGVtTW9kczoge2Rpc2FibGVkOiAneWVzJ30sXG4gICAgICAgICAgICAgICAgY29udGVudDogJ9Cy0LjQtNC10L0g0LLRgdC10LwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW06ICdyYWRpbycsXG4gICAgICAgICAgICAgICAgY29udHJvbEF0dHJzOiB7dmFsdWU6ICdmcmllbmRzJ30sXG4gICAgICAgICAgICAgICAgY29udGVudDogJ9GC0L7Qu9GM0LrQviDQtNGA0YPQt9GM0Y/QvCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxlbTogJ3JhZGlvJyxcbiAgICAgICAgICAgICAgICBjb250cm9sQXR0cnM6IHt2YWx1ZTogJ21lJ30sXG4gICAgICAgICAgICAgICAgZWxlbU1vZHM6IHtkaXNhYmxlZDogJ3llcyd9LFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfRgtC+0LvRjNC60L4g0LzQvdC1J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlbGVtOiAncmFkaW8nLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xBdHRyczoge3ZhbHVlOiAnb3RoZXInfSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn0YLQvtC70YzQutC+INC90LUg0LzQvdC1J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfVxufVxuIiwidmFyIEJIID0gcmVxdWlyZSgnLi4vZGVza3RvcC5ibG9ja3MvYmVtL2JlbS5qcycpXG52YXIgQkVNID0gQkguQkVNXG5cbnZhciBSYWRpb0J1dHRvbiA9IHJlcXVpcmUoJy4uL2Rlc2t0b3AuYnVuZGxlL3JhZGlvLWJ1dHRvbi9yYWRpby1idXR0b24uanMnKVxudmFyIFJhZGlvQnV0dG9uX19yYWRpbyA9IHJlcXVpcmUoJy4uL2Rlc2t0b3AuYnVuZGxlL3JhZGlvLWJ1dHRvbi9fX3JhZGlvL3JhZGlvLWJ1dHRvbl9fcmFkaW8uanMnKVxuXG52YXIgYmVtSnNvbiA9IHJlcXVpcmUoJy4vcmFkaW8tYnV0dG9uLmJlbS5qc29uJylcblxudmFyIEV4YW1wbGUgPSBCSC5SZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxCRU0gYXR0cnM9e3tzdHlsZTp7bWFyZ2luOiAyMH19fT5cbiAgICAgICAgICAgICAgICB7YmVtSnNvbn1cbiAgICAgICAgICAgIDwvQkVNPlxuICAgICAgICApXG4gICAgfVxufSlcblxuUmVhY3QucmVuZGVyKFxuICAgIDxFeGFtcGxlIC8+LFxuICAgIGRvY3VtZW50LmJvZHlcbilcbiIsbnVsbCwiJ3VzZSBzdHJpY3QnO1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiBUb09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gb3duRW51bWVyYWJsZUtleXMob2JqKSB7XG5cdHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcblxuXHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdGtleXMgPSBrZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaikpO1xuXHR9XG5cblx0cmV0dXJuIGtleXMuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRyZXR1cm4gcHJvcElzRW51bWVyYWJsZS5jYWxsKG9iaiwga2V5KTtcblx0fSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciBrZXlzO1xuXHR2YXIgdG8gPSBUb09iamVjdCh0YXJnZXQpO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IGFyZ3VtZW50c1tzXTtcblx0XHRrZXlzID0gb3duRW51bWVyYWJsZUtleXMoT2JqZWN0KGZyb20pKTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dG9ba2V5c1tpXV0gPSBmcm9tW2tleXNbaV1dO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iXX0=
