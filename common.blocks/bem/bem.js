var bh = {
    match: function(decl, matcher) {
        this.__matchers.push([decl, matcher])
    },
    __matchers: [],
    clearMatchers: function() {
        this.__matchers = []
    }
}

var BEM = {
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
        var props = this.props
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
        if (val) {
            if (this.__flag) {
                (this.__muMods || (this.__muMods = {}))[mod] = val
            }
            return this
        } else {
            return this.muMods()[mod]
        }
    },
    mod: function(mod, val) {
        return this.props['_' + mod] || this.muMod(mod)
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
            this.__content || (this.__content = content)
            return this
        } else {
            return this.__content
        }
    },
    __match: function(decl, cb) {
        //TODO: write cache here
        for (var i = this.__matchers.length - 1; i >= 0; i--) {
            var rule = this.__matchers[i],
                decl = rule[0],
                cb = rule[1]
            if (decl.modName && decl.modVal) {
                if (this.props['_' + decl.modName] === decl.modVal) {
                    cb.bind(this)(this, this.props)
                }
            } else if (decl.block) {
                cb.bind(this)(this, this.props)
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
    __node: function() {

        this.__flag = false
        this.__attrs = {} //mutable
        this.__match()

        var b_ = this.__block,
            mods = {...this.mods(), ...this.muMods()},
            cls = b_ +
                Object
                    .keys(mods).reduce(function(prev, modName) {
                        var modValue = mods[modName]
                        return prev + (modValue ? ' ' + b_ + '_' + modName + '_' +
                                (typeof modValue === 'boolean' ? 'yes' : modValue )
                            : '')
                    }, '')

        return React.createElement(this.tag(), {className:cls, ...this._events(), ...this.attrs() }, this.content())
    },
    _events: function(events) {
        if (events) {
            this._eventsProps = events
        } else {
            return this._eventsProps
        }
    },
    bind: function(events) {
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
        return this
    }
}
