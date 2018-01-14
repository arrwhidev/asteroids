const Explosion = require('./Explosion').default
const ExplosionParticle = require('../particle/ExplosionParticle').default

const R = 200
const G = 255
const B = 255
const MAX_WIDTH = 3

export default class DestroyAsteroidExplosion extends Explosion {
    constructor(pos) {
        super(pos, ExplosionParticle, R, G, B, MAX_WIDTH)
    }
}
