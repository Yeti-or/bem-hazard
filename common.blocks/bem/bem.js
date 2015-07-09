var BEM = {
    match: function(decl, cb) {
        var emptyFn = function() {return this}.bind(this)
            empty = {
                attrs: emptyFn,
                attr: emptyFn,
                muAttrs: emptyFn,
                content: emptyFn,
                tag: emptyFn,
                mods: emptyFn,
                bind: emptyFn
            }

        if (decl.modName && decl.modVal) {
            if (this.props[decl.modName] === decl.modVal) {
                return cb.bind(this)(this)
            }
        }
        cb.bind(this)(empty)
    },
    attrs: function(attrs) {
        if (attrs) {
            this.__attrs =  {...this.__attrs, ...attrs}
            return this
        } else {
            return this.__attrs
        }
    },
    attr: function(key, val) {
        if (arguments.length > 1) {
            this.__attrs[key] = val
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

    componentWillMount: function() {
        Object.keys(this.state).forEach(function(key){
            this.props[key] && (this.state[key] = this.props[key])
        }, this)
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
    tag: function(tag) {
        if (tag) {
            (this.__tag = tag)
            return this
        } else {
            return this.__tag
        }
    },
    node: function() {
        var b_ = this.block,
            props = this.props,
            mods = this.mods().reduce(function(prev, fn) {
                return {...prev, ...fn.bind(this)()}
            }.bind(this), {}),

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
    },
    mods: function(mods) {
        if (mods) {
            this.__mods || (this.__mods = [])
            this.__mods.push(mods)
            return this
        } else {
            return this.__mods
        }
    }
}

var Logger = {
    componentWillMount: function() {
        console.log('componentWillMount')
        //console.log(this.state)
    },
    componentDidMount: function() {
        console.log('componentWillMount')
        //console.log(this.state)
    },
    componentWillReceiveProps: function() {
        console.log('componentWillReceiveProps')
        //console.log(this.state)
    },
    shouldComponentUpdate: function() {
        console.log('shouldComponentUpdate')
        //console.log(this.state)
        return true
    },
    componentWillUpdate: function() {
        console.log('componentWillUpdate')
        //console.log(this.state)
    },
    componentDidUpdate: function() {
        console.log('componentDidUpdate')
        //console.log(this.state)
    },
    componentWillUnmount: function() {
        console.log('componentWillUnmount')
        //console.log(this.state)
    }
}

