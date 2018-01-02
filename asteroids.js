const { ctx, canvas, togglePause } = initCanvas(tick);
ctx.font = "30px Roboto"
ctx.lineWidth = 1
ctx.strokeStyle = "white"

const { Vec2, MathHelper } = require('./math')
const Keyboard = require('./Keyboard').default
const Projectile = require('./objects/Projectile').default
const Player = require('./objects/Player').default
const Asteroid = require('./objects/Asteroid').default
const Score = require('./objects/Score').default
const ExplosionParticle = require('./objects/ExplosionParticle').default

/**/

window.asteroids = {
    MAX_ROTATION: 6.28319,
    MAX_ACCELERATION: 1,
    ACCELERATION_INC: 0.05,
    DARK_BG: '#212121',
    COLLIDE_BG: '#b26057',
    bg: '#212121',
    keyboard: new Keyboard(),
    projectiles: [],
    exhausts: [],
    explosionParticles: [],
    asteroids: [
        new Asteroid(new Vec2(300, 300), 1),
        new Asteroid(new Vec2(450, 800), 1),
        new Asteroid(new Vec2(700, 200), 1),
        new Asteroid(new Vec2(900, 900), 1),
        new Asteroid(new Vec2(1000, 400), 1)
    ],
    player: new Player(
        ctx.canvas.width / 2,
        ctx.canvas.height / 2,
        20,
        20
    ),
    score: new Score(),
    pauseFor: 0
}

/**/

function render(ctx) {
    const { player, asteroids, projectiles, exhausts, explosionParticles, score } = window.asteroids;

    asteroids.forEach(a => a.render(ctx))
    exhausts.forEach(e => e.render(ctx));
    explosionParticles.forEach(p => p.render(ctx))
    projectiles.forEach(p => p.render(ctx));

    if (window.asteroids.pauseFor === 0) {
        player.render(ctx)
    }
    score.render(ctx);
}

function update(ctx, delta) {
    const { player, asteroids, projectiles, exhausts, explosionParticles } = window.asteroids;

    if (window.asteroids.pauseFor > 0) {
        window.asteroids.pauseFor--
    } else {
        player.update(ctx, delta)
    }

    asteroids.forEach(a => a.update(ctx, delta))
    projectiles.forEach(p => p.update(ctx))
    exhausts.forEach(e => e.update(ctx))
    explosionParticles.forEach(p => p.update(ctx))

    // Clean stuff up.
    window.asteroids.exhausts = exhausts.filter(e => !e.isDead);
    window.asteroids.explosionParticles = explosionParticles.filter(e => !e.isDead);
    window.asteroids.projectiles = projectiles.filter(p => !p.isOOB)

    // Projectile / asteroid collisions.
    for(let i = 0; i < projectiles.length; i++) {
        for(let j = 0; j < asteroids.length; j++) {
            const didCollide = MathHelper.isInPolygon(asteroids[j], projectiles[i].c);
            if (didCollide) {
                if (asteroids[j].canBreak) {
                    if (asteroids[j].size === 1) {
                        asteroids.push(new Asteroid(projectiles[i].c.clone(), 0.5))
                        asteroids.push(new Asteroid(projectiles[i].c.clone(), 0.5))
                        asteroids.push(new Asteroid(projectiles[i].c.clone(), 0.3))
                    } else {
                        asteroids.push(new Asteroid(projectiles[i].c.clone(), 0.3))
                        asteroids.push(new Asteroid(projectiles[i].c.clone(), 0.2))
                        asteroids.push(new Asteroid(projectiles[i].c.clone(), 0.2))
                    }
                }

                // Update score.
                window.asteroids.score.shotAsteroid(asteroids[j]);

                // Delete old asteroid and projectile.
                window.asteroids.asteroids.splice(j, 1);
                window.asteroids.projectiles.splice(i, 1);

                // Done
                break;
            }
        }
    }

    // Player collisions.
    if (player.isCollidingWithAsteroid()) {
        window.asteroids.pauseFor = 20
        window.asteroids.score.crashedIntoAsteroid()

        for (let i = 0; i < 36; i++) {
            window.asteroids.explosionParticles.push(
                new ExplosionParticle(window.asteroids.player.c.clone(), i - Math.random())
            )
            window.asteroids.explosionParticles.push(
                new ExplosionParticle(window.asteroids.player.c.clone(), i)
            )
            window.asteroids.explosionParticles.push(
                new ExplosionParticle(window.asteroids.player.c.clone(), i + Math.random())
            )
        }

        // TODO: Player may be on an asteroid, spawn elsewhere.
        window.asteroids.player = new Player(
            ctx.canvas.width / 2,
            ctx.canvas.height / 2,
            20,
            20
        )
    }
}

function tick(ctx, delta) {
    ctx.fillStyle = window.asteroids.bg;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    update(ctx, delta);
    render(ctx)
}
