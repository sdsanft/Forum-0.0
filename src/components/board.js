const React = require('react')
const axios = require('axios')

class Board extends React.Component {
    constructor (props) {
        super(props)

        this.state = {view: "/", newThread: false, threads: [], err: null}

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

            threads.forEach(thread => {
                arr.push(<p>{thread._id}, creator: {thread.creator}</p>)
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
            _id: this.state.threadTitle, time, creator: this.props.user, 
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
                this.setState({newThread: false})
                this.updateThreads()
            }
        })
    }

    render () {
        var threads = this.getThreads()
        var newThread

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
                    <button type="button" onClick={() => {this.setState({newThread: false})}}>Cancel</button>
                </div>
            )
        } else {
            newThread = <button type="button" onClick={() => {this.setState({newThread: true})}}>Create new Thread</button>
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
            </div>
        )

        return page
    }
}

export default Board