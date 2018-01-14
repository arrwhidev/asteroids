export default class Explosion {

    constructor(pos, ParticleType, R, G, B, maxWidth) {
      this.particles = []
      this.isDead = false
      for (let i = 0; i < 36; i++) {
          this.particles.push(
              new ParticleType(pos, i - Math.random(), R, G, B, maxWidth)
          )
          this.particles.push(
              new ParticleType(pos, i, R, G, B, maxWidth)
          )
          this.particles.push(
              new ParticleType(pos, i + Math.random(), R, G, B, maxWidth)
          )
      }
    }

    update(ctx) {
        this.particles.forEach(p => p.update(ctx))
        this.particles = this.particles.filter(p => !p.isDead);

        if (this.particles.length <= 0) {
            this.isDead = true;
        }
    }

    render(ctx) {
        this.particles.forEach(p => p.render(ctx))
    }
}
