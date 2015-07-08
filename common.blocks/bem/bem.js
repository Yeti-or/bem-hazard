
var BEM = {
    attr: function(attrs) {
        if (attrs) {
            this.__attrs =  {...this.__attrs, ...attrs}
        } else {
            return this.__attrs;
        }
    },
    content: function(content) {
        if (content) {
            this.__content || (this.__content = content)
        } else {
            return this.__content;
        }
    },
    tag: function(tag) {
        if (tag) {
            this.__tag || (this.__tag = tag)
        } else {
            return this.__tag;
        }
    },
    node: function() {
        return React.createElement(this.tag(), this.attr(), this.content())
    }
}

