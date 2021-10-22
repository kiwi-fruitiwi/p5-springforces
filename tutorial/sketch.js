/*
@author Kiwi
@date 2021-10-18

https://youtu.be/Rr-5HiXquhw
Daniel Shiffman's Coding Train: Coding Challenge #160: Spring Forces

let's simulate a the oscillating motion of a spring using vectors and forces!

coding plan
	create bob, anchor, line connecting, show
	    are these just circles?
	spring back and forth with hardcoded values
		set bob and anchor positions with mouseX, mouseY
	recreate initial example with classes
		particle class ➜ constructor, show, update, apply_force
			pos, vel, acc
		spring class ➜ constructor, update, show
			a, b, k, rest_length
.   multiple spring and particle arrays
.   locked boolean for head to fix its position
.   gravity
	use curvedVertex, noFill
	mouse sets position of tail

🐞 new objects need to be initialized in setup
🐞 applied opposite forces to one end of the spring, cancelling out


 */
let font

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

let particles = []
let springs = []
let gravity = new p5.Vector(0, 0.0098)
let k = 0.1

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)

    let SPACING = 2
    for (let i=0; i<100; i++) {
        particles.push(new Particle(100+i*SPACING*2, 100, 2))
        if (i!==0) {
            let a = particles[i]
            let b = particles[i-1]
            springs.push(new Spring(k, SPACING, a, b))
        }
    }

    // springs.push(new Spring(k, SPACING,
    //     particles[0], particles[particles.length-1]))
    particles[particles.length-1].pos.set(540, 100)
}

function draw() {
    background(234, 34, 24)

    particles.forEach(p => {
        p.apply_force(gravity)
        p.update()
        p.show()
    })

    springs.forEach(s => {
        s.update()
        s.show()
    })

    let head = particles[0]
    head.locked = true

    let tail = particles[particles.length-1]
    tail.locked = true

    let midpoint = particles[particles.length >> 1]

    if (mouseIsPressed) {
        midpoint.pos.set(mouseX, mouseY)
        midpoint.vel.set(0, 0)
    }
}