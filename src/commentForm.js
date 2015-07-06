
var CommentForm = React.createClass({
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
    componentDidMount: function() {
        var btn = this.refs.but
        //btn.state.hover = true;
    },
    handleClick: function(e) {
        console.log('^_^')
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" autoFocus placeholder="Your name" ref="author"/>
                <input type="text" placeholder="Say something.." ref="text"/>
               <Button type="submit" theme="normal" size="s" ref="but" onClick={this.handleClick}>Post</Button>
            </form>
        )
    }
})

