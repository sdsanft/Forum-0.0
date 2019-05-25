const React = require('react')
const axios = require('axios')

class Board extends React.Component {
    constructor (props) {
        super(props)

        this.state = {openThread: null, newThread: false, newPost: false, threads: [], err: null}

        axios.get('/api/threads').then(res => {
            this.setState({threads: res.data.threads})
        })
    }

    updateThreads = () => {
        axios.get('/api/threads').then(res => {
            this.setState({threads: res.data.threads})
        })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    getThreads = () => {
        if(this.state.threads.length > 0) {
            var arr = []
            var threads = this.state.threads

            threads.forEach((thread, i) => {
                var time = new Date(thread.lastUpdate)
                arr.push(
                    <div>
                        <a href="#" onClick={(e) => {
                            e.preventDefault()
                            this.setState({openThread: i, newThread: false, newPost: false, threadTitle: null, post: null})
                        }}>{thread._id}</a>
                        <p>Creator: {thread.creator}, Last update: {thread.mostRecent}, {time.toLocaleString()}</p>
                    </div>
                )
                //arr.push(<p>{thread._id}, creator: {thread.creator}</p>)
            })

            return arr
        } else {
            return <p>No Threads</p>
        }
    }

    createNewThread = (event) => {
        event.preventDefault()

        this.setState({err: null})

        var time = new Date()
        var thread = {
            _id: this.state.threadTitle, time, creator: this.props.user, lastUpdate: time, mostRecent: this.props.user,
            posts: [{text: this.state.post, author: this.props.user, time}]
        }
        
        axios.post("/api/threads", {thread}).then((res) => {
            if (res.data.err) {
                if (res.data.err.name == "MongoError") {
                    this.setState({err: "That title already exists"})
                } else {
                    alert(JSON.stringify(res.data.err))
                }
            } else {
                this.setState({newThread: false, threadTitle: null, post: null})
                this.updateThreads()
            }
        })
    }

    createNewPost = (event) => {
        event.preventDefault()
        
        var time = new Date()
        var post = {text: this.state.post, author: this.props.user, time}
        var id = this.state.threads[this.state.openThread]._id

        axios.post("/api/threads/" + id, {post}).then((res) => {
            if (res.data.err) {
                alert(JSON.stringify(err))
            } else {
                this.setState({newPost: false, post: null})
                this.updateThreads()
            }
        })
    }

    render () {
        var threads = this.getThreads()
        var newThread
        var openThread

        if(this.state.newThread) {
            var err
            if (this.state.err) {
                err = <p>{this.state.err}</p>
            }

            newThread = (
                <div>
                    <form onSubmit={this.createNewThread}>
                        {err}
                        Title <br />
                        <input name="threadTitle" type="text" value={this.state.threadTitle} onChange={this.handleInputChange} /> <br />
                        First Post <br />
                        <textarea name="post" value={this.state.post} onChange={this.handleInputChange} /> <br />
                        <input type="submit" value="submit" />
                    </form>
                    <button type="button" onClick={() => {this.setState({newThread: false, threadTitle: null, post: null})}}>Cancel</button>
                </div>
            )
        } else {
            newThread = <button type="button" onClick={() => {this.setState({newThread: true})}}>Create new Thread</button>
        }

        if (this.state.openThread != null) {
            openThread = []

            var thread = this.state.threads[this.state.openThread]

            openThread.push(
                <h1>{thread._id}</h1>
            )

            thread.posts.forEach((post) => {
                var time = new Date(post.time)
                var post = (
                    <div>
                        <p style={{whiteSpace: "pre-line"}}>{post.text}</p>
                        <p>{post.author}, {time.toLocaleString()}</p>
                    </div>
                )

                openThread.push(post)
            })

            var newPost;

            if (this.state.newPost) {
                newPost = (
                    <div>
                        <form onSubmit={this.createNewPost}>
                            Post <br />
                            <textarea name="post" value={this.state.post} onChange={this.handleInputChange} /> <br />
                            <input type="submit" value="submit" />
                        </form>
                        <button type="button" onClick={() => {this.setState({newPost: false, post: null})}}>Cancel</button>
                    </div>
                )
            } else {
                newPost = <button type="button" onClick={() => {this.setState({newPost: true})}}>New Post</button>
            }

            openThread.push(newPost)

            openThread.push(
                <button type="button" onClick={() => {this.setState({openThread: null, newPost: false, post:null})}}>Close Thread</button>
            )
        } else {
            openThread = null
        }

        var page = (
            <div>
                <div>
                    <h1>Threads</h1>
                    {threads}
                </div>
                <div>
                    {newThread}
                </div>
                <div>
                    {openThread}
                </div>
            </div>
        )

        return page
    }
}

export default Board