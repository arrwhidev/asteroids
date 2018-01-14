const Explosion = require('./Explosion').default
const ExplosionParticle = require('../particle/ExplosionParticle').default

const R = 210
const G = 71
const B = 130
const MAX_WIDTH = 7

export default class PlayerDiedExplosion extends Explosion {
    constructor(pos) {
        super(pos, ExplosionParticle, R, G, B, MAX_WIDTH)
    }
}
