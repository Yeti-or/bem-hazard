
var CommentForm = React.createClass({displayName: "CommentForm",
    handleSubmit: function(e) {
        e.preventDefault();
        var author = React.findDOMNode(this.refs.author).value.trim()
        var text = React.findDOMNode(this.refs.text).value.trim()
        if (!text || !author) {
            return
        }
        this.props.onCommentSubmit({author: author, text: text})
        React.findDOMNode(this.refs.author).value = ''
        React.findDOMNode(this.refs.text).value = ''
    },
    render: function() {
        return (
            React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
                React.createElement("input", {type: "text", autoFocus: true, placeholder: "Your name", ref: "author"}), 
                React.createElement("input", {type: "text", placeholder: "Say something..", ref: "text"}), 
                React.createElement("input", {type: "submit", value: "Post"})
            )
        )
    }
})

