const { Vec2, MathHelper } = require('../../math')
const Particle = require('./Particle').default

export default class ExhaustParticle extends Particle {
    constructor(pos, radians) {
        super(
            pos, radians,
            6, 214, 160,
            MathHelper.betweenFloat(-0.2, 0.2),
            false,
            5,
            MathHelper.betweenFloat(0.7, 0.9),
            0.97
        )
    }

    update(ctx) {
        super.update(ctx)
    }

    render(ctx) {
        super.render(ctx)
    }
}
