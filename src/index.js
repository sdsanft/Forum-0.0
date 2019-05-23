const React = require('react')
const ReactDOM = require('react-dom')
const axios = require('axios')

import Raindrop from "./components/raindropCanvas.js"
import LoginForm from "./components/loginForm.js"

class App extends React.Component {
    constructor (props) {
        super(props)

        this.state = {canvasActive: false, loginStatus: "", user: null, err: []}
        this.LoginInfo = React.createRef()

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

        axios.post("/login", {user: form.state.user, pw: form.state.pw}).then(res => {
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

        axios.post("/createUser", {user: form.state.user, pw: form.state.pw}).then(res => {
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

        var divCanvas;
        var login;
        var userInfo;
        var errors;

        if(this.state.canvasActive) {
            divCanvas = (
                <div>
                    <Raindrop parent={this}/>
                    <button type='button' onClick={this.toggleCanvas}>Close</button>
                </div>
            )
        } else {
            divCanvas = (
                <div>
                    <p>Welcome to the rainy day simulator</p>
                    <button type='button' onClick={this.toggleCanvas}>Open the window!</button>
                </div>
            )
        }

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
        } else {
            userInfo = login
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
                <h1>Raindrop Window</h1>
                {divCanvas}
                {errors}
                {userInfo}
            </div>
        )
    
        return page
    }
}

ReactDOM.render(<App />, document.getElementById('main'))