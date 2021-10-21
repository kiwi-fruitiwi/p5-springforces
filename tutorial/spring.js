class Spring {
    constructor(k, restLength, a, b) {
        // k is the spring constant
        // a and b are the particles connected by this spring
        // restLength is the equilibrium point

        this.k = k
        this.restLength = restLength
        this.a = a
        this.b = b
    }

    // the spring exerts opposite forces on both particles
    update() {
        /* grab a vector from particle b to particle a */
        let position = p5.Vector.sub(this.b.pos, this.a.pos)

        // this is the displacement past the rest length
        let x = position.mag() - this.restLength

        let force = position.setMag(1)

        // F=-kx, Hooke's Law
        force.mult(this.k * x)

        // the two connected particles exert equal but opposite forces upon
        // each other
        this.a.apply_force(force)
        force.mult(-1)
        this.b.apply_force(force)
    }

    daniel_update() {
        let force = p5.Vector.sub(this.b.pos, this.a.pos);
        let x = force.mag() - this.restLength;
        force.normalize();
        force.mult(this.k * x);
        this.a.apply_force(force);
        force.mult(-1);
        this.b.apply_force(force);
    }

    show() {
        strokeWeight(2)
        stroke(0, 0, 100, 70)
        line(this.a.pos.x, this.a.pos.y,
            this.b.pos.x, this.b.pos.y)
    }
}