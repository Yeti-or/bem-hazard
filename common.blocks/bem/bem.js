var bh = {
    match: function(decl, matcher) {
        this.__matchers.push([decl, matcher])
    },
    __matchers: [],
    clearMatchers: function() {
        this.__matchers = []
    },
    xmlEscape: function(x) {
        //because React will do it for us
        return x
    }
}

var BEM = {
    param: function(param, val, force) {
        if (val) {
            (!this.__json[param] || force) && (this.__json[param] = val)
            return this
        } else {
            return this.__json[param]
        }
    },
    extend: Object.assign,
    isSimple: function(obj) {
        if (!obj || obj === true) return true
        var t = typeof obj
        return t === 'string' || t === 'number'
    },
    tParam: function() {return this},
    js: function() {return this},
    attrs: function(attrs, force) {
        if (attrs) {
            this.__attrs =  force ? {...this.__attrs, ...attrs} : {...attrs, ...this.__attrs}
            return this
        } else {
            return this.__attrs || {}
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
    mods: function(mods) {
        var props = this.__props || this.props
        return Object.keys(props).reduce(function(mods, key) {
            return key[0] === '_' && (mods[key.slice(1)] = props[key]), mods
        }, {})
    },
    muMods: function(mods) {
        if (mods) {
            if (this.__flag) {
                this.__muMods = {...this.__muMods, ...mods}
            }
            return this
        } else {
            if (this.__flag) {
                return this.__muMods || {}
            } else {
                return {...this.__muMods, ...this.state}
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
    //TODO: merge mod, _mod, muMod
    //Think about declMumods ? setMuMod delMuMod getMuMod
    mod: function(mod) {
        var _mod = '_' + mod,
            props = this.__props || this.props
        if(props.hasOwnProperty(_mod)) {
            return props[_mod]
        } else {
            return this.muMod(mod)
        }
    },
    tag: function(tag, force) {
        if (tag) {
            this.__flag && (!this.__tag || force) && (this.__tag = tag)
            return this
        } else {
            return this.__tag
        }
    },
    content: function(content) {
        if (content) {
            if (this.__flag) {
                this.__content || (this.__content = content)
            }
            return this
        } else {
            return this.__content || this.__json.content
        }
    },
    __match: function() {
        //TODO: write cache here
        for (var i = this.__matchers.length - 1; i >= 0; i--) {
            var rule = this.__matchers[i],
                decl = rule[0],
                cb = rule[1],
                json = this.__json || (this.__json = {...this.props, content: this.props.children})

            if (this.__elem || decl.elem) {
                if (decl.elem === this.__elem) {
                    cb.bind(this)(this, json)
                }
            } else {
                if (decl.modName && decl.modVal) {
                    if (this.props['_' + decl.modName] === decl.modVal) {
                        cb.bind(this)(this, json)
                    }
                } else if (decl.block === this.__block) {
                    cb.bind(this)(this, json)
                }
            }
        }
    },
    componentWillMount: function() {
        this.__flag = true
        this.__match()
    },
    componentDidMount: function() {
        this.state = {...this.state, ...this.muMods()}
    },
    componentWillReceiveProps: function(props) {
        this.__attrs = {}
        this.__props = props;
        this.beforeUpdate().forEach(function(bUpdate) {
            this.__json = {...props, content: props.children}
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
    __node: function() {

        this.__flag = false
        this.__match()

        var b_ = this.__block,
            __e = this.__elem,
            mods = {...this.mods(), ...this.muMods()},
            cls = b_ +
                Object
                    .keys(mods).reduce(function(prev, modName) {
                        var modValue = mods[modName]
                        return prev + (modValue ? ' ' + b_ + '_' + modName + '_' +
                                (typeof modValue === 'boolean' ? 'yes' : modValue )
                            : '')
                    }, '')

        __e && (cls += ' ' + b_ + '__' + __e)

        var content = [].concat(this.content()).map(function(node) {
            var props = {},
                b = node.block,
                e = node.elem,
                mods = node.mods,
                elemMods = node.elemMods,
                mix = node.mix,
                tag = node.tag,
                attrs = node.attrs,
                cls = node.cls,
                content = node.content

            mods && mods.map(function(mod) {
                return '_' + mod
            })

            if (node.elem) {
                elemMods && elemMods.map(function(mod) {
                    return '_' + mod
                })
                b || (b = this.__Block)
                tagName += 
                props  = {...mods, ...elemMods, mix: mix, tag: tag, ...attrs, cls: cls}
    //TODO: In Progress
                return React.createElement(window[b + '__' + e;, props, content)
            } else if (node.block) {
                props  = {...mods, mix: mix, tag: tag, ...attrs, cls: cls}
                return React.createElement(b, props, content)
            } else {
                return node
            }
        }, this)

        return React.createElement(this.tag(), {className:cls, ...this._events(), ...this.attrs() }, content)
    },
    _events: function(events) {
        if (events) {
            this._eventsProps = {...this._eventsProps, ...events}
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
