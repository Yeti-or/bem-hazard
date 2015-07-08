var log = {
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
        //console.log('componentWillUpdate')
        console.log(this.state)
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

