const { Vec2, MathHelper } = require('../math')
const GameObject = require('./GameObject').default
const ExhaustItem = require('./ExhaustItem').default

export default class Player extends GameObject {
  constructor(x, y, width, height) {
    // Build triangle vertices based on width & height.
    // Width & height are opposites because player starts facing the right >
    const v1 = new Vec2(x + height / 2, y);
    const v2 = new Vec2(x - height / 2, y + width / 2);
    const v3 = new Vec2((x + 4) - height / 2, y);
    const v4 = new Vec2(x - height / 2, y - width / 2);
    const vertices = [v1, v2, v3, v4];

    super({
        vertices,
        w: width,
        h: height,
        c: new Vec2(x, y),
        controllable: true,
        boundaryBuffer: height / 2
    });

    this.exhausts = [];
    this.ep = 0;
  }

  render(ctx) {
    super.render(ctx);
    this.exhausts.forEach(e => e.render(ctx));
  }

  isCollidingWithAsteroid() {
      let hasCollision = false;
      for (let i = 0; i < this.vertices.length; i++) {
          const intersects = window.asteroids.asteroids.some(a => MathHelper.isInPolygon(a, this.vertices[i]));
          if (intersects) {
              hasCollision = true;
              break;
          }
      }
      return hasCollision;
  }

  update(ctx) {
    if (window.asteroids.keyboard.forward) {
        this.exhausts.push(
            new ExhaustItem(this.vertices[2], -this.r)
        );
    }

    // Main update of acceleration, velocity & rotation.
    super.update(ctx);
    this.applyDrag();

    // Update exhaust particles
    this.exhausts.forEach(e => e.update(ctx))
    this.exhausts = this.exhausts.filter(e => !e.isDead);

    // Collision stuff
    window.asteroids.bg = this.isCollidingWithAsteroid() ? window.asteroids.COLLIDE_BG : window.asteroids.DARK_BG
  }

  applyDrag() {
      this.acc.scale(0.8);
      this.vel.scale(0.99);
  }
}
