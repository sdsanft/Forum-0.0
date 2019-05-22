const React = require('react')
const ReactDOM = require('react-dom')
import Raindrop from "./components/raindropCanvas.js"

class App extends React.Component {
    state = {canvasActive: false}

    toggleCanvas = () => {
        this.setState({canvasActive: !this.state.canvasActive})
    }
  
    render() {
        const {count} = this.state
    
        return (
            <div>
                <h1>Hello, World</h1>
                {this.state.canvasActive ? (
                    <div>
                        <Raindrop />
                        <button type='button' onClick={this.toggleCanvas}>Close</button>
                    </div>
                ) : (
                    <button type='button' onClick={this.toggleCanvas}>Raindrops!</button>
                )}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('main'))