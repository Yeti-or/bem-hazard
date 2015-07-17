var React = (typeof require !== 'undefined') ? require('react') : window.React
var assign = Object.assign || require && require('object-assign')

var BH = function() {
    //TODO: make it better
    BEM_Hazard.bh = this
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
    apply: function(bemJson) {
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
    __matchers: {},
    xmlEscape: function(x) {
        //Because React will do it for us
        return x
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
    param: function(param, val, force) {
        if (val) {
            (!this.__json[param] || force) && (this.__json[param] = val)
            return this
        } else {
            return this.__json[param]
        }
    },
    tParam: function(key, val, force) {
        if (val) {
            this.__json.$tParam || (this.__json.$tParam = {})
            if (!this.__json.$tParam[key] || force) {this.__json.$tParam[key] = val}
            return this
        } else {
            return this.__json.$tParam && this.__json.$tParam[key]
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
            return this.__json.attrs[key]
        }
    },
    //TODO: Refactor mod, mods, muMod, muMods
    //Think about declMumods ? setMuMod delMuMod getMuMod
    mod: function(mod) {
        var mods = this.mods()
        if (mods.hasOwnProperty(mod)) {
            return mods[mod]
        } else {
            return this.muMod(mod)
        }
    },
    mods: function(mods) {
        return (this.__json.elem) ? this.__json.elemMods : this.__json.mods
    },
    muMods: function(mods) {
        if (mods) {
            if (this.__flag) {
                this.__muMods = this.extend({}, this.__muMods, mods)
            }
            return this
        } else {
            if (this.__flag) {
                return this.__muMods || {}
            } else {
                return this.extend({}, this.__muMods, this.state)
            }
        }
    },
    muMod: function(mod, val) {
        if (arguments.length > 1) {
            if (this.__flag) {
                (this.__muMods || (this.__muMods = {}))[mod] = val
            } else {
                var newState = {}
                newState[mod] = val
                this.setState(newState)
            }
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
            (this.__json.mix || force) ?
                this.__json.mix = [].concat(mix) :
                this.__json.mix.concat(mix)
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
    __match: function() {
        var b_ =  this.__json.block,
            __e = this.__json.elem,
            mods = this.mods(),
            json = this.__json,
            retVal,
            matchers = this.bh.__matchers[b_] || []

        for (var i = matchers.length - 1; i >= 0 && !retVal; i--) {
            var rule = matchers[i],
                decl = rule[0],
                cb = rule[1]

            if (decl.modName && decl.modVal) {
                if (mods && (mods[decl.modName] === decl.modVal)) {
                    retVal = cb(this, json)
                }
            } else {
                if (decl.elem || __e) {
                    if (decl.elem === __e) {
                        retVal = cb(this, json)
                    }
                } else {
                    retVal = cb(this, json)
                }
            }
        }
        if (retVal)  {
            this.__json = retVal
            this.__match()
        }
    },

    componentWillMount: function() {
        this._composeCurNode(this.props)
        this.__flag = true
        this.__match()
    },
    componentDidMount: function() {
        this.state = this.extend({}, this.state, this.muMods())
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

        var cls = this._buildClassName(),
            content = this._processTree(this.content()),
            attrs = this.attrs(),
            events = this._events()

        return React.createElement(this.tag() || 'div', this.extend({className:cls,  children: content}, attrs, events))
    },

    _composeCurNode: function(pp) {
        //TODO: Think about caching/diffing bemJsonTree/content
        this.__json = this.extend({}, pp, {content: pp.children || pp.content})
        var mods = Object.keys(this.__json).reduce(function(mods, key) {
            return key[0] === BH._ && (mods[key.slice(1)] = pp[key]), mods
        }, {})
        this.__block && (this.__json.block = this.__block)
        this.__elem && (this.__json.elem = this.__elem)
        if (Object.keys(mods).length > 0) {
            if (this.__json.elem) {
                this.__json.elemMods = this.extend({}, pp.elemMods, mods)
            } else {
                this.__json.mods = this.extend({}, pp.mods, mods)
            }
        }
    },
    _buildClassName: function() {
        var b_ = this.__json.block,
            __e = this.__json.elem,
            cls = '',
            mods = this.extend({}, this.mods(), this.muMods())

        function declToStr(b_, __e, mods, mix) {
            if (!b_ && !__e) return ''
            if (!b_ && !mix) return ''
            var cls = '',
                entity = b_

            if (__e) {
                entity += BH.__ + __e
            }
            cls += entity
            return cls + Object.keys(mods).reduce(function(str, modName) {
                var modValue = mods[modName]
                return str + (modValue ? ' ' + entity + BH._ + modName + BH._ +
                        (typeof modValue === 'boolean' ? 'yes' : modValue )
                    : '')
            }, '')
        }

        cls += declToStr(b_, __e, mods, false)
        this.__json.mix && [].concat(this.__json.mix).forEach(function(mix) {
            cls += ' ' + declToStr(mix.block, mix.elem, mix.mods || mix.elemMods || {}, true)
        })

        return cls
    },
    _processTree: function(tree) {
        var content = [].concat(tree).map(function(node) {
            if (Array.isArray(node)) { return this._processTree(node) }
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
                //node.ref = node.block + bh.__ + node.elem
            }
            this.__json.$tParam && (node.$tParam = this.__json.$tParam)

            return React.createElement(this.bh.BEM, node)
        }, this)
        content.length == 1 && (content = content[0])
        return content
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

if (typeof module !== 'undefined') {
    module.exports = BH
}
