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
.   use curvedVertex, noFill
.   mouse sets position of tail
    arrive behavior in horizontal line with balls

🐞 new objects need to be initialized in setup
🐞 applied opposite forces to one end of the spring, cancelling out


 */

let font


function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}


/* string variables */
let particles = []
let springs = []
let gravity = new p5.Vector(0, 0.098)
let string_k = 0.1


function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)

    let SPACING = 1
    for (let i=0; i<25; i++) {
        particles.push(new Particle(width/4, height/4+i*SPACING*3, 2))
        if (i!==0) {
            let a = particles[i]
            let b = particles[i-1]
            springs.push(new Spring(string_k, SPACING, a, b))
        }
    }

    // springs.push(new Spring(k, SPACING,
    //     particles[0], particles[particles.length-1]))
}


function draw() {
    background(234, 34, 24)

    noFill()
    beginShape()
    particles.forEach(p => {
        p.apply_force(gravity)
        p.update()
        vertex(p.pos.x, p.pos.y)
        // p.show()
    })
    endShape()

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
        tail.pos.set(mouseX, mouseY)
        tail.vel.set(0, 0)
    }
}