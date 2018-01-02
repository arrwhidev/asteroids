const { Vec2, MathHelper } = require('../math')

export default class ExhaustItem {
    constructor(pos, radians) {
        this.pos = new Vec2(pos.x, pos.y);
        this.variance = MathHelper.betweenFloat(-0.2, 0.2);
        this.radians = radians + this.variance;
        this.isDead = false;
        this.width = Math.random() * 5;
        this.initialVel = 2.5;
        this.vel = this.initialVel;
        this.shrink = MathHelper.betweenFloat(0.7, 0.9) / 100;
    }

    update(ctx) {
        this.width -= this.shrink;
        this.vel -= this.shrink;
        this.pos.add(new Vec2(
            -(this.vel * Math.cos(this.radians)),
            this.vel * Math.sin(this.radians)
        ));

        if (this.vel <= 0 || this.width <= 0) {
            this.isDead = true;
        }
    }

    render(ctx) {
        const alpha = (this.vel + this.variance) / this.initialVel;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.width, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.fillStyle = 'white';
    }
}
