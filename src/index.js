const React = require('react')
const ReactDOM = require('react-dom')
const axios = require('axios')

//import Raindrop from "./components/raindropCanvas.js"
import LoginForm from "./components/loginForm.js"
import Board from "./components/board.js"

class App extends React.Component {
    constructor (props) {
        super(props)

        this.state = {canvasActive: false, loginStatus: "", user: null, err: []}
        this.LoginInfo = React.createRef()
        this.boardInfo = React.createRef()

        this.handleLogin = this.handleLogin.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.resLogin = this.handleLogin.bind(this)
    }

    toggleCanvas = () => {
        this.setState({canvasActive: !this.state.canvasActive})
    }

    handleLogin () {
        const form = this.LoginInfo.current
        this.setState({err: []})

        axios.post("/api/login", {user: form.state.user, pw: form.state.pw}).then(res => {
            if (res.data.error) {
                var err = this.state.err;
                err.push(res.data.error);
                this.setState({err})
            } else {
                this.setState({user: res.data._id})
            }
        })
    }

    handleCreate () {
        const form = this.LoginInfo.current
        this.setState({err: []})

        axios.post("/api/createUser", {user: form.state.user, pw: form.state.pw}).then(res => {
            if (res.data.error) {
                var err = this.state.err;
                err.push(res.data.err)
                this.setState({err})
            } else {
                this.setState({user: res.data._id})
            }
        })
    }

    resLogin (res) {
        this.setState({username: res.username})
    }
  
    render() {
        const {count} = this.state

        var login;
        var userInfo;
        var errors;
        var board;

        if(this.state.loginStatus == "login") {
            login = (
                <div>
                    <LoginForm handleSubmit={this.handleLogin} ref={this.LoginInfo}/>
                    <button type="button" onClick={() => {this.setState({loginStatus: "", err: []})}}>Cancel</button>
                </div>
            )
        } else if (this.state.loginStatus == "create"){
            login = (
                <div>
                    <LoginForm handleSubmit={this.handleCreate} ref={this.LoginInfo}/>
                    <button type="button" onClick={() => {this.setState({loginStatus: "", err: []})}}>Cancel</button>
                </div>
            )
        } else {
            login = (
                <div>
                    <button type="button" onClick={() => {this.setState({loginStatus: "login", err: []})}}>Login</button>
                    <button type="button" onClick={() => {this.setState({loginStatus: "create", err: []})}}>Create User</button>
                </div>
            )
        }

        if(this.state.user) {
            userInfo = (
                <div>
                    <p>Welcome, {this.state.user}</p>
                    <button type="button" onClick={() => {this.setState({loginStatus: "", user: null})}}>Log Out</button>
                </div>
            )

            board = (
                <div>
                    <Board user={this.state.user} ref={this.boardInfo}/>
                </div>
            )
        } else {
            userInfo = login
            board = (
                <div>
                    <p>To access the board please login or create an account.</p>
                </div>
            )
        }

        var errors_comp = []
        this.state.err.forEach(function(error) {
            errors_comp.push(<p>{error}</p>)
        })

        errors = (
            <div>
                {errors_comp}
            </div>
        )

        var page = (
            <div>
                <h1>Lotus Forum</h1>
                {errors}
                {userInfo}
                {board}
            </div>
        )
    
        return page
    }
}

ReactDOM.render(<App />, document.getElementById('main'))