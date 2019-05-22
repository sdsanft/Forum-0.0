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
                <h1>Raindrop Window</h1>
                {this.state.canvasActive ? (
                    <div>
                        <Raindrop />
                        <button type='button' onClick={this.toggleCanvas}>Close</button>
                    </div>
                ) : (
                    <div>
                        <p>Welcome to the rainy day simulator</p>
                        <button type='button' onClick={this.toggleCanvas}>Open the window!</button>
                    </div>
                )}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('main'))