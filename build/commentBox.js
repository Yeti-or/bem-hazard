var CommentBox = React.createClass({displayName: "CommentBox",
    error: function(err) {
        console.error(err)
    },
    loadCommentsFromServer: function() {
        $.ajax(this.props.url, {
            dataType: 'json',
            context: this,
            cache: false
        })
        .done(this.done)
        .fail(this.fail)
    },
    handleCommentSubmit: function(comment) {
        this.setState({data: this.state.data.concat([comment])});
        $.ajax(this.props.url, {
              dataType: 'json',
              type: 'POST',
              data: comment,
              context: this
        })
        .done(this.done)
        .fail(this.fail)
    },
    done: function(data) {
        this.setState({data: data})
    },
    getInitialState: function() {
        return {data:[]}
    },
    componentDidMount: function() {
        this.loadCommentsFromServer()
        setInterval(this.loadCommentsFromServer, this.props.pollInterval)
    },
    render: function() {
        return (
            React.createElement("div", {className: "commentBox"}, 
                React.createElement("h1", null, "Comments"), 
                React.createElement(CommentList, {data: this.state.data}), 
                React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
            )
        )
    }
})

var CommentList = React.createClass({displayName: "CommentList",
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                React.createElement(Comment, {key: comment.id, author: comment.author}, 
                    comment.text
                )
            )
        })
        return (
            React.createElement("div", {className: "commentList"}, 
                commentNodes
            )
        )
    }
})

var Comment = React.createClass({displayName: "Comment",
    render: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitze: true})
        return (
            React.createElement("div", {className: "comment"}, 
                React.createElement("h2", {className: "commentAuthor"}, 
                    this.props.author
                ), 
                React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
            )
        )
    }
})

