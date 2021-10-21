class Particle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = new p5.Vector(0, 0)
        this.acc = new p5.Vector(0, 0)

        this.r = 10
        this.mass = 1
    }

    show() {
        fill(0, 0, 100, 40)
        strokeWeight(1)
        stroke(0, 0, 100)
        circle(this.pos.x, this.pos.y, 30)
    }

    /* add a small amount of friction */
    update() {
        // this.vel.mult(0.995)
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)
    }

    apply_force(force) { /* force is a p5.Vector*/
        // F=ma, so a=F/m. we're cheekily ignoring the mass by assuming it's 1
        let applied_force = p5.Vector.div(force, this.mass)
        this.acc.add(applied_force)
    }
}