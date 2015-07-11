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
            (this.__attrs || (this.__attrs = {}))
            this.__attrs =  force ? {...this.__attrs, ...attrs} : {...attrs, ...this.__attrs}
            return this
        } else {
            return this.__attrs
        }
    },
    attr: function(key, val, force) {
        if (arguments.length > 1) {
            this.__attrs ?
                (!this.__attrs.hasOwnProperty(key) || force) && (this.__attrs[key] = val) :
                (this.__attrs = {})[key] = val
            return this
        } else {
            return this.__attrs && this.__attrs[key]
        }
    },
    muAttrs: function(attrsFn) {
        if (attrsFn) {
            this.__attrsFn || (this.__attrsFn = [])
            this.__attrsFn.push(attrsFn)
            return this
        } else {
            return this.__attrsFn || []
        }
    },
    muMods: function(mods) {
        if (mods) {
            this.__muMods || (this.__muMods = [])
            this.__muMods.push(mods)
            return this
        } else {
            return this.__muMods
        }
    },
    mod: function(mod, val) {
        //merge with this.mods
        return this.props[mod] || this.state[mod] || this.props['_' + mod]
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
        debugger
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
        //var props = this.props,
        //    attrs = this.muAttrs().reduce(function(prev, fn) {
        //        return {...prev, ...fn.bind(this)(props)}
        //    }.bind(this), {})

        //this.attrs(attrs)
    },
    __node: function() {

        this.__flag = false
        this.__attrs = {} //mutable
        this.__match()

        var b_ = this.__block,
            props = this.props,

            mods = Object.keys(props).reduce(function(mods, key) {
                return key[0] === '_' && (mods[key.slice(1)] = props[key]), mods
            }, {}),

            //attrs = this.muAttrs().reduce(function(prev, fn) {
            //    return {...prev, ...fn.bind(this)(props)}
            //}.bind(this), {}),

            cls = b_ +
                Object
                    .keys(mods).reduce(function(prev, modName) {
                        var modValue = mods[modName]
                        return prev + (modValue ? ' ' + b_ + '_' + modName + '_' +
                                (typeof modValue === 'boolean' ? 'yes' : modValue )
                            : '')
                    }, '')

        //this.attrs(attrs)

        return React.createElement(this.tag(), {className:cls, ...props, ...this.attrs() }, this.content())
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

        this.attrs(attrs)
        return this
    }
}
