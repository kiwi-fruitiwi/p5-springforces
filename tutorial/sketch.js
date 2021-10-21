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
	multiple spring and particle arrays
	locked boolean for head to fix its position
	gravity
	use curvedVertex, noFill
	mouse sets position of tail

🐞 new objects need to be initialized in setup

 */
let font

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

let anchor, ball, spring
let gravity

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    anchor = new Particle(400, 200)
    ball = new Particle(200, 200)
    spring = new Spring(0.005, 100, anchor, ball)

    gravity = new p5.Vector(0, 0.098)
}

function draw() {
    background(234, 34, 24)
    //
    // ball.apply_force(gravity)

    spring.show()
    spring.daniel_update()
    ball.show()
    ball.update()
    anchor.show()
    anchor.update()

    if (mouseIsPressed) {
        ball.pos.set(mouseX, mouseY)
        ball.vel.set(0, 0)
    }
}