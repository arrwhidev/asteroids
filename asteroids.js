const FONT = "bolder 24px Montserrat";

function initCanvas(cb, fullScreen = false) {
    // Grab canvas & 2d context.
    const canvas = document.getElementById('asteroids-canvas');
    const ctx = canvas.getContext("2d");

    // Variables required for a smooth throttled loop.
    let lastTime = 0;
    let fpsLimit = 100;
    let delta = 0;
    let paused = false;

    const updateCanvasSize = () => {
        if (fullScreen) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.font = FONT
            ctx.lineWidth = 1
            ctx.strokeStyle = "white"
        }
    }

    // Ensure that the canvas dimensions are updated when window is resized.
    window.addEventListener('resize', updateCanvasSize, false);

    // Set initial dimensions.
    updateCanvasSize();

    // Time based tick function.
    const tick = timestamp => {
        if (timestamp < lastTime + (1000 / fpsLimit)) {
            // skip
        } else {
            delta = timestamp - lastTime;
            lastTime = timestamp;

            if (!paused) cb(ctx, delta, canvas.width, canvas.height);
        }

        window.requestAnimationFrame(tick);
    }

    // Start loop.
    window.requestAnimationFrame(tick);

    function togglePause() {
        paused = !paused;
    }

    return {
        canvas, ctx, togglePause
    };
}


const { ctx, canvas, togglePause } = initCanvas(tick, false);
ctx.font = FONT
ctx.lineWidth = 1
ctx.strokeStyle = "white"

const { Vec2, MathHelper } = require('./math')
const Keyboard = require('./Keyboard').default
const Projectile = require('./objects/Projectile').default
const Player = require('./objects/Player').default
const Asteroid = require('./objects/Asteroid').default
const Score = require('./objects/Score').default
const PlayerDiedExplosion = require('./objects/explosion/PlayerDiedExplosion').default
const DestroyAsteroidExplosion = require('./objects/explosion/DestroyAsteroidExplosion').default

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
    explosions: [],
    exhausts: [],
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
    const { player, asteroids, projectiles, exhausts, explosionParticles, score, explosions } = window.asteroids;

    asteroids.forEach(a => a.render(ctx))
    exhausts.forEach(e => e.render(ctx));
    explosions.forEach(e => e.render(ctx))
    projectiles.forEach(p => p.render(ctx));

    if (window.asteroids.pauseFor === 0) {
        player.render(ctx)
    }
    score.render(ctx);
}

function update(ctx, delta) {
    const { player, asteroids, projectiles, exhausts, explosionParticles, explosions } = window.asteroids;

    if (window.asteroids.pauseFor > 0) {
        window.asteroids.pauseFor--
    } else {
        player.update(ctx, delta)
    }

    asteroids.forEach(a => a.update(ctx, delta))
    projectiles.forEach(p => p.update(ctx))
    exhausts.forEach(e => e.update(ctx))
    explosions.forEach(e => e.update(ctx))

    // Clean stuff up.
    window.asteroids.exhausts = exhausts.filter(e => !e.isDead);
    window.asteroids.explosions = explosions.filter(e => !e.isDead);
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

                // Asteroid explosion.
                window.asteroids.explosions.push(
                  new DestroyAsteroidExplosion(
                    asteroids[j].c.clone()
                  )
                )

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

        // Player explosion.
        window.asteroids.explosions.push(new PlayerDiedExplosion(
          window.asteroids.player.c.clone()
        ))

        // TODO: Player may spawn on an asteroid, spawn elsewhere.
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
