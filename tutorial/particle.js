class Particle {
    constructor(x, y, r) {
        this.pos = new p5.Vector(x, y)
        this.vel = new p5.Vector(0, 0)
        this.acc = new p5.Vector(0, 0)

        this.r = r
        this.mass = 1
        this.locked = false
    }

    show() {
        fill(0, 0, 80)
        strokeWeight(1)
        stroke(0, 0, 100)
        circle(this.pos.x, this.pos.y, this.r*2)
    }

    /* add a small amount of friction */
    update() {
        this.vel.mult(0.98)

        // don't update our physics if we are locked
        if (!this.locked) {
            this.vel.add(this.acc)
            this.pos.add(this.vel)
            this.acc.mult(0)
        }
    }

    apply_force(force) { /* force is a p5.Vector*/
        // F=ma, so a=F/m. we're cheekily ignoring the mass by assuming it's 1
        let applied_force = p5.Vector.div(force, this.mass)
        this.acc.add(applied_force)
    }
}