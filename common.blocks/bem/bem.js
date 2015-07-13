var bh = {
    _ :'_',
    __ : '__',
    match: function(selector, matcher) {
        var decl = {},
            decls,
            isElem = ~selector.indexOf(bh.__)
        isElem ?
            decls = selector.split(bh.__) :
            decls = selector.split(bh._)

        decl.block = decls.shift()

        if (isElem) {
            decls = decls[0].split(bh._)
            decl.elem = decls.shift()
        }

        decl.modName = decls.shift()
        decl.modVal = decls.shift()

        this.__matchers[decl.block] || (this.__matchers[decl.block] = [])
        this.__matchers[decl.block].push([decl, matcher])
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
    extend: Object.assign,
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
    tParam: function() {return this},
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
            this.__attrs ?
                (!this.__attrs.hasOwnProperty(key) || force) && (this.__attrs[key] = val) :
                (this.__attrs = {})[key] = val
            return this
        } else {
            return this.attrs()[key]
        }
    },
    //TODO: merge mod, _mod, muMod
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
        return (this.__elem || this.__json.elem) ? this.__json.elemMods : this.__json.mods
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
        this.muMod(modName, !this.muMod(modName))
        return this
    },
    tag: function(tag, force) {
        if (tag) {
            this.__flag && (!this.__json.tag || force) && (this.__json.tag = tag)
            return this
        } else {
            return this.__json.tag
        }
    },
    content: function(content, force) {
        if (arguments.length > 0) {
            if (this.__flag) {
                (!this.__json.content || force) && (this.__json.content = content)
            }
            return this
        } else {
            return this.__json.content
        }
    },
    __match: function() {
        var b_ = this.__block || this.__json.block,
            __e = this.__elem || this.__json.elem,
            mods = this.mods(),
            json = this.__json,
            matchers = bh.__matchers[b_]

        for (var i = matchers.length - 1; i >= 0; i--) {
            var rule = matchers[i],
                decl = rule[0],
                cb = rule[1]

            if (decl.modName && decl.modVal) {
                if (mods && (mods[decl.modName] === decl.modVal)) {
                    cb(this, json)
                }
            } else {
                if (decl.elem || __e) {
                    if (decl.elem === __e) {
                        cb(this, json)
                    }
                } else {
                    cb(this, json)
                }
            }
        }
    },
    _composeCurNode: function(pp) {
        var mods = Object.keys(pp).reduce(function(mods, key) {
            return key[0] === bh._ && (mods[key.slice(1)] = pp[key]), mods
        }, {})
        this.__json || (this.__json = this.extend({}, pp, {content: pp.children || pp.content}))
        if (Object.keys(mods).length > 0) {
            if (this.__elem || pp.elem) {
                this.__json.elemMods = this.extend({}, pp.elemMods, mods)
            } else {
                this.__json.mods = this.extend({}, pp.mods, mods)
            }
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
        this.__attrs = {}
        this.__props = props
        this.beforeUpdate().forEach(function(bUpdate) {
            this._composeCurNode(props)
            bUpdate.bind(this)(this.__json)
        }, this)
    },
    componentWillUpdate: function() {
        if (this.__props) {
            this.__props = undefined
        } else {
            this.__attrs = {}
        }
    },
    _buildClassName: function() {
        var b_ = this.__block || this.__json.block,
            __e = this.__elem || this.__json.elem

        if (!b_) return

        function modsToStr(entity, mods) {
            return Object.keys(mods).reduce(function(str, modName) {
                var modValue = mods[modName]
                return str + (modValue ? ' ' + entity + bh._ + modName + bh._ +
                        (typeof modValue === 'boolean' ? 'yes' : modValue )
                    : '')
            }, '')
        }

        var cls = b_,
            ent = b_,
            mods = this.extend({}, this.mods(), this.muMods())

        if (__e) {
            ent += bh.__ + __e
            cls += ' ' + ent
        }
        cls += modsToStr(ent, mods)
        return cls
    },
    _processTree: function() {
        return [].concat(this.content()).map(function(node) {
            if (!node || (!node.block && !node.elem && !node.tag && !node.content)) {
                return node
            }
            var __e = node.elem,
                b = node.block || (__e && this.__json.block || this.__Block),
                entity = b + (__e ? bh.__ + __e : ''),
                component = window[entity] || BEM

            b && (node.block = b.toLowerCase())

            return React.createElement(component, node)
        }, this)
    },
    __node: function() {
        this.__flag = false
        this.__match()

        var cls = this._buildClassName(),
            content = this._processTree(),
            attrs = this.attrs(),
            events = this._events()

        return React.createElement(this.tag() || 'div', this.extend(attrs, events, {className:cls,  children: content}))
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

var BEM = React.createClass({
    __block: '',
    __matchers: bh.__matchers,
    mixins: [BEM_Hazard],
    render: function() {
        return this.__node()
    },
})
