
var data = [
    {author: "Pete Hunt", text: "This is one comment", id: 0},
    {author: "Jordan Walke", text: "This is *another* comment", id: 1}
]

React.render(
    <CommentBox url="comments.json" pollInterval="2000"/>,
    document.getElementById('content')
)
