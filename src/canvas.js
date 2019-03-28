import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

let gravity = 1
let friction = 0.9

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[ Math.floor(Math.random() * colors.length) ];
}

// Objects
function Ball(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dy = dy
    this.dx = dx
    this.radius = radius
    this.color = color
}

Ball.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
}

Ball.prototype.update = function() {
    if ( this.y + this.radius + this.dy > canvas.height ) {
        this.dy = -this.dy * friction;
    } else {
        this.dy += gravity;
    }

    if ( this.x + this.radius + this.dx > canvas.width || this.x - this.radius < 0 ) {
        this.dx = -this.dx
    }

    this.y += this.dy;
    this.x += this.dx;
    this.draw();
}

// Implementation
let ball
let objects
let ballArray = []
function init() {
    ballArray = []
    for ( let i = 0; i < 300; i++ ) {
        let color = randomColor(colors)
        let dx = randomIntFromRange(-2, 2)
        let dy = randomIntFromRange(-2, 2)
        let radius = randomIntFromRange(20, 40)
        let x = randomIntFromRange(radius, canvas.width - radius)
        let y = randomIntFromRange(radius, canvas.height - radius)
        ballArray.push(new Ball(x, y, dx, dy, radius, color))
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    ballArray.forEach(ball => ball.update())
}

init()
animate()

canvas.addEventListener('click', init)
