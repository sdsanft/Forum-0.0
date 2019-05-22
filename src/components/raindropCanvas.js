const React = require('react')
const ReactDOM = require('react-dom')

class Raindrops extends React.Component {
    canvas;
    ctx;

    speed = 30;

    drops = [];

    componentDidMount() {
        this.canvas = this.refs.canvas
        this.ctx = this.canvas.getContext("2d")
        var ctx = this.ctx;

        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, 400, 10)
        ctx.fillRect(0, 0, 10, 400)
        ctx.fillRect(390, 0, 10, 400)
        ctx.fillRect(0, 390, 400, 10)

        for(var i = 25; i < 375; i += 10) {
            this.drops.push([i, 320 * Math.random() + 40, 5 * Math.random() + 2.5])
        }

        ctx.fillStyle = "#0044AA";

        return setInterval(this.draw, this.speed, this.drops, this.ctx)
    }

    draw(drops, ctx) {

        ctx.clearRect(10, 10, 380, 380);

        drops.forEach(function(drop) {
            if(drop[1] >= 380) {
                drop[1] -= 360;
                drop[2] = 5 * Math.random() + 2.5;
            }

            ctx.beginPath();
            ctx.moveTo(drop[0], drop[1] - 6)
            ctx.quadraticCurveTo(drop[0] + 4, drop[1] + 2, drop[0], drop[1] + 3);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(drop[0], drop[1] - 6)
            ctx.quadraticCurveTo(drop[0] - 4, drop[1] + 2, drop[0], drop[1] + 3);
            ctx.fill();

            drop[1] += drop[2];
        })
    }

    render() {
        return(
            <div>
                <canvas ref="canvas" width="400" height="400" />
            </div>
        )
    }
  }
  export default Raindrops