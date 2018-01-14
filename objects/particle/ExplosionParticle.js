const { Vec2, MathHelper } = require('../../math')
const Particle = require('./Particle').default

export default class ExplosionParticle extends Particle {
    constructor(pos, radians, R, G, B, maxWidth) {
        super(
            pos, radians,
            R, G, B,
            Math.random(),
            true,
            maxWidth,
            Math.random(),
            0.88,
            6
        )
    }

    update(ctx) {
        super.update(ctx)
    }

    render(ctx) {
        super.render(ctx)
    }
}
