
var BEM = {
    attr: function(attrs) {
        if (attrs) {
            this.__attrs =  {...this.__attrs, ...attrs}
        } else {
            return this.__attrs
        }
    },
    content: function(content) {
        if (content) {
            this.__content || (this.__content = content)
        } else {
            return this.__content
        }
    },
    tag: function(tag) {
        if (tag) {
            (this.__tag = tag)
        } else {
            return this.__tag
        }
    },
    node: function() {
        return React.createElement(this.tag(), this.attr(), this.content())
    },
    events: {},
    bind: function(events) {
        var attrs = {}
        Object
            .keys(events)
            .forEach(function(eventName){
                var cb = events[eventName]
                this.events[eventName] || (this.events[eventName] = [])
                this.events[eventName].push(cb)
                attrs[eventName] = function(e) {
                    this.events[eventName].forEach(function(fn) {
                        fn.bind(this)(e)
                    }, this)
                }.bind(this)
            }, this)

        this.attr(attrs)
    }
}

