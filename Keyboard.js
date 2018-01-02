const Projectile = require('./objects/Projectile').default

const RIGHT = 39
const LEFT = 37
const SPACE = 32
const W = 87

export default class Keyboard {
    constructor() {
        window.addEventListener("keydown", event => {
            if (event.keyCode === RIGHT) this.right = true
            if (event.keyCode === LEFT) this.left = true
            if (event.keyCode === W) this.forward = true
        });

        window.addEventListener("keyup", event => {
            if (event.keyCode === RIGHT) this.right = false
            if (event.keyCode === LEFT) this.left = false
            if (event.keyCode === W) this.forward = false
            if (event.keyCode === SPACE) window.asteroids.projectiles.push(
                new Projectile(window.asteroids.player.vertices[0].clone(), window.asteroids.player.r)
            );
        });
    }
}
