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
    match: function(decl, cb) {

        if (decl.modName && decl.modVal) {
            if (this.props['_' + decl.modName] === decl.modVal) {
                cb.bind(this)(this, this.props)
            }
        } else if (decl.block) {
            cb.bind(this)(this, this.props)
        }
    },
    componentWillMount: function() {
        debugger
        for (var i = this.__matchers.length - 1; i >= 0; i--) {
            var rule = this.__matchers[i]
            debugger
            this.match(rule[0], rule[1])
        }
    },
    attrs: function(attrs) {
        if (attrs) {
            this.__attrs =  {...this.__attrs, ...attrs}
            return this
        } else {
            return this.__attrs
        }
    },
    attr: function(key, val, force) {
        if (arguments.length > 1) {
            this.__attrs ?
                (!this.__attrs[key] || force) && (this.__attrs[key] = val) :
                (this.__attrs = {key: val});
            return this
        } else {
            return this.__attrs[key]
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
    componentDidMount: function() {
        var props = this.props,
            attrs = this.muAttrs().reduce(function(prev, fn) {
                return {...prev, ...fn.bind(this)(props)}
            }.bind(this), {})

        this.attrs(attrs)
    },

    content: function(content) {
        if (content) {
            this.__content || (this.__content = content)
            return this
        } else {
            return this.__content
        }
    },
    tag: function(tag, force) {
        if (tag) {
            (!this.__tag || force) && (this.__tag = tag)
            return this
        } else {
            return this.__tag
        }
    },
    __node: function() {
        var b_ = this.__block,
            props = this.props,

            mods = Object.keys(props).reduce(function(mods, key) {
                return key[0] === '_' && (mods[key.slice(1)] = props[key]), mods
            }, {}),

            attrs = this.muAttrs().reduce(function(prev, fn) {
                return {...prev, ...fn.bind(this)(props)}
            }.bind(this), {}),

            cls = b_ +
                Object
                    .keys(mods).reduce(function(prev, modName) {
                        var modValue = mods[modName]
                        return prev + (modValue ? ' ' + b_ + '_' + modName + '_' +
                                (typeof modValue === 'boolean' ? 'yes' : modValue )
                            : '')
                    }, '')

        this.attrs(attrs)

        return React.createElement(this.tag(), {className:cls, ...this.attrs()}, this.content())
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
