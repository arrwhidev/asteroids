const { Vec2, MathHelper } = require('../math')
const Particle = require('./Particle').default

export default class ExplosionParticle extends Particle {
    constructor(pos, radians) {
        super(
            pos, radians,
            210, 71, 130,
            Math.random(),
            true,
            7,
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
