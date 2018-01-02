const { Vec2 } = require('../math')
const GameObject = require('./GameObject').default

export default class Projectile extends GameObject {
  constructor(pos, radians) {
    super({
        r: radians,
        c: new Vec2(pos.x, pos.y)
    })
    this.isOOB = false;
  }

  updateVelocity() {
      this.vel.x = 8 * Math.cos(this.r);
      this.vel.y = 8 * Math.sin(this.r);
  }

  update(ctx) {
      super.update(ctx);
      this.updateVelocity();

        if (this.c.x > ctx.canvas.width ||
            this.c.x < 0 ||
            this.c.y > ctx.canvas.height ||
            this.c.y < 0) {
            this.isOOB = true;
        }
  }

  render(ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.c.x, this.c.y, 2, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}
