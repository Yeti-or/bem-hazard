var CommentBox = React.createClass({
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
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        )
    }
})

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment key={comment.id} author={comment.author}>
                    {comment.text}
                </Comment>
            )
        })
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        )
    }
})

var Comment = React.createClass({
    render: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitze: true})
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        )
    }
})

