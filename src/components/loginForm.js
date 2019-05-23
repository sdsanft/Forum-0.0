const React = require('react')
const ReactDOM = require('react-dom')
const axios = require('axios')

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "", 
            pw: ""
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }
  
    render() {
        var page = (
            <div>
                <form>
                    Username <input name="user" type="text" value={this.state.user} onChange={this.handleInputChange} /> <br />
                    Password <input name="pw" type="password" value={this.state.pw} onChange={this.handleInputChange} /> <br />
                </form>
                <button onClick={this.props.handleSubmit}>Submit</button>
            </div>
        )
        return page
    }
  }

export default LoginForm