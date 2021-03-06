const { Vec2, MathHelper } = require('../../math')

// https://coolors.co/ef476f-ffb23c-06d6a0-118ab2-073b4c

export default class Particle {
    constructor(pos, radians, R, G, B, variance, useVarianceInPos, maxWidth, shrink, decay, initialVel=2.5) {
        this.pos = new Vec2(pos.x, pos.y);
        this.variance = variance;
        this.useVarianceInPos = useVarianceInPos;
        this.radians = radians + this.variance;
        this.isDead = false;
        this.width = Math.random() * maxWidth;
        this.initialVel = initialVel;
        this.vel = initialVel;
        this.shrink = shrink / 100;
        this.decay = decay;
        this.r = MathHelper.randomBetween(R - 40, R + 40)
        this.g = MathHelper.randomBetween(G - 40, G + 40)
        this.b = MathHelper.randomBetween(B - 40, B + 40)
    }

    update(ctx) {
        this.width -= this.shrink;
        this.vel -= this.shrink;
        this.shrink /= this.decay;

        this.pos.add(new Vec2(
            -(this.vel * (this.useVarianceInPos ? this.variance : 1) * Math.cos(this.radians)),
            this.vel * (this.useVarianceInPos ? this.variance : 1) * Math.sin(this.radians)
        ));

        if (this.vel <= 0 || this.width <= 0) {
            this.isDead = true;
        }
    }

    render(ctx) {
        const alpha = (this.vel + this.variance) / this.initialVel;
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${alpha})`
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.width, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}
