/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
// A Vector is a quantity which has magnitude & direction, but no position.
class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vec2(this.x, this.y)
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    scale(s) {
        this.x *= s;
        this.y *= s;
    }

    scaleX(s) {
        this.x *= s;
    }

    scaleY(s) {
        this.y *= s;
    }

    getMagnitude() {
        // Get length of vector using pythagoras.
        return Math.sqrt(
            Math.pow(this.x, 2) + Math.pow(this.y, 2)
        );
    }

    getAngleBetweenTwoPoints(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x)
    }

    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    fromAngle(angle, mag) {
        return new Vec2(
            mag * Math.cos(angle),
            mag * Math.sin(angle)
        );
    }

    addScaled(v, s) {
        this.x += Math.round(v.x * s);
        this.y += Math.round(v.y * s);
        return this;
    }

    flipX() {
        this.x = -this.x;
        return this;
    }

    flipY() {
        this.y = -this.y;
        return this;
    }

    rotate(point, radians) {
        const cosR = Math.cos(radians);
        const sinR = Math.sin(radians);
        const rx = ((this.x - point.x) * cosR) - ((this.y - point.y) * sinR) + point.x;
        const ry = ((this.y - point.y) * cosR) + ((this.x - point.x) * sinR) + point.y;
        this.x = rx;
        this.y = ry;
    }
}
/* harmony export (immutable) */ __webpack_exports__["Vec2"] = Vec2;


class MathHelper {
    static isInPolygon(asteroid, point) {
        const nvert = asteroid.vertices.length;
        const vertx = asteroid.vertices.map(v => v.x);
        const verty = asteroid.vertices.map(v => v.y);
        let c = false;
        let i = 0;
        let j = 0;
        const testx = point.x;
        const testy = point.y;

          for (i = 0, j = nvert-1; i < nvert; j = i++) {
            if ( ((verty[i]>testy) != (verty[j]>testy)) &&
             (testx < (vertx[j]-vertx[i]) * (testy-verty[i]) / (verty[j]-verty[i]) + vertx[i]) )
               c = !c;
          }
          return c;
    }

    // Returns random number in range.
    static randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Random float between.
    static betweenFloat(min, max) {
        return (Math.random() * (min - max) + max)
    }

    // Returns random float between -1 and 1.
    static randomMaybeNeg() {
        return (Math.random() - 0.5) * 2;
    }

    // Calculates distance between two vertices.
    static distanceBetween(n, n2) {
        return Math.sqrt(
            Math.pow((n.x - n2.x), 2) +
            Math.pow((n.y - n2.y), 2)
        )
    }

    // Calculates if two points are within a threshold.
    static near(n, n2, threshold) {
        return distanceBetween(n, n2) < threshold;
    }

    // Percent of nearness.
    static getDistancePercent(n, n2, threshold) {
        const d = distanceBetween(n, n2);
        if (d > threshold) {
            return 0;
        } else {
            return 1 - d / threshold;
        }
    }

    static valueInRange(value, min, max) {
        return (value >= min) && (value <= max)
    }

    static rectOverlap(A, B) {
        const xOverlap = valueInRange(A.getTopLeft().x, B.getTopLeft().x, B.getTopLeft().x + B.getWidth()) ||
                         valueInRange(B.getTopLeft().x, A.getTopLeft().x, A.getTopLeft().x + A.getWidth());
        const yOverlap = valueInRange(A.getTopLeft().y, B.getTopLeft().y, B.getTopLeft().y + B.getHeight()) ||
                         valueInRange(B.getTopLeft().y, A.getTopLeft().y, A.getTopLeft().y + A.getHeight());
        return { xOverlap, yOverlap }
    }
}
/* harmony export (immutable) */ __webpack_exports__["MathHelper"] = MathHelper;


/*
// Momentum = mass * velocity
function handleCollision(A, B) {
    const MA = A.getMass() *
}
*/


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const { Vec2 } = __webpack_require__(0)

class GameObject {
    constructor(args) {
        this.w = args.w || 0;
        this.h = args.h || 0;
        this.c = args.c || new Vec2(0, 0);
        this.r = args.r || 0;
        this.vertices = args.vertices || [];
        this.vel = args.vel || new Vec2(0, 0);
        this.acc = args.acc || new Vec2(0, 0);
        this.controllable = args.controllable || false;
        this.boundaryBuffer = args.boundaryBuffer || undefined;
    }

    update(ctx) {
        const { keyboard, ACCELERATION_INC } = window.asteroids

        let tempRotation = 0;
        if (this.controllable) {
            if (keyboard.right) {
              tempRotation = 0.05;
            } else if (keyboard.left) {
              tempRotation = -0.05;
            }

            if (keyboard.forward) {
                this.acc.add(new Vec2(
                    ACCELERATION_INC * Math.cos(this.r + tempRotation),
                    ACCELERATION_INC * Math.sin(this.r + tempRotation)
                ));
            }
        }

        // Apply acceleration to velocity.
        this.vel.add(this.acc);

        // Rotate & update velocity of vertices.
        for (let i = 0; i < this.vertices.length; i++) {
            // When controllable, only rotate the new ammount to prevent infinite rotation.
            const rAmount = (this.controllable) ? tempRotation : this.r;
            this.vertices[i].rotate(this.c, rAmount);
            this.vertices[i].add(this.vel);
        }

        // Update rotation for next time.
        this.r += tempRotation;

        // Add velocity to center.
        this.c.add(this.vel);

        if (this.boundaryBuffer !== undefined) {
            this.keepInBounds(ctx);
        }
    }

    keepInBounds(ctx) {
        const left = 0;
        const right = ctx.canvas.width;
        const top = 0;
        const bottom = ctx.canvas.height;

        let xOffset = 0;
        let yOffset = 0;
        if (this.c.x > right + this.boundaryBuffer) {
            xOffset = -right - (this.boundaryBuffer * 2);
        } else if (this.c.x < left - this.boundaryBuffer) {
            xOffset = right + (this.boundaryBuffer * 2)
        }
        if (this.c.y > bottom + this.boundaryBuffer) {
            yOffset = -bottom - (this.boundaryBuffer * 2);
        } else if (this.c.y < top - this.boundaryBuffer) {
            yOffset = bottom + (this.boundaryBuffer * 2)
        }

        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i].x += xOffset;
            this.vertices[i].y += yOffset;
        }
        this.c.x += xOffset;
        this.c.y += yOffset;
    }

    render(ctx) {
        for (let i = 0; i < this.vertices.length; i++) {
            const v = this.vertices[i]
            const nextV = this.vertices[(i+1) % this.vertices.length]

            // Render edge between vertices.
            ctx.beginPath();
            ctx.moveTo(v.x, v.y);
            ctx.lineTo(nextV.x, nextV.y);
            ctx.stroke();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = GameObject;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const { Vec2 } = __webpack_require__(0)
const GameObject = __webpack_require__(1).default

class Projectile extends GameObject {
  constructor(pos, radians) {
    super({
        r: radians,
        c: new Vec2(pos.x, pos.y)
    })
    this.isOOB = false;
  }

  updateVelocity() {
      this.vel.x = 8 * Math.cos(this.r);
      this.vel.y = 8 * Math.sin(this.r);
  }

  update(ctx) {
      super.update(ctx);
      this.updateVelocity();

        if (this.c.x > ctx.canvas.width ||
            this.c.x < 0 ||
            this.c.y > ctx.canvas.height ||
            this.c.y < 0) {
            this.isOOB = true;
        }
  }

  render(ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.c.x, this.c.y, 2, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Projectile;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const { Vec2, MathHelper } = __webpack_require__(0)

// https://coolors.co/ef476f-ffb23c-06d6a0-118ab2-073b4c

class Particle {
    constructor(pos, radians, R, G, B, variance, useVarianceInPos, maxWidth, shrink, decay, initialVel=2.5) {
        this.pos = new Vec2(pos.x, pos.y);
        this.variance = variance;
        this.useVarianceInPos = useVarianceInPos;
        this.radians = radians + this.variance;
        this.isDead = false;
        this.width = Math.random() * maxWidth;
        this.initialVel = initialVel;
        this.vel = initialVel;
        this.shrink = shrink / 100;
        this.decay = decay;
        this.r = MathHelper.randomBetween(R - 40, R + 40)
        this.g = MathHelper.randomBetween(G - 40, G + 40)
        this.b = MathHelper.randomBetween(B - 40, B + 40)
    }

    update(ctx) {
        this.width -= this.shrink;
        this.vel -= this.shrink;
        this.shrink /= this.decay;

        this.pos.add(new Vec2(
            -(this.vel * (this.useVarianceInPos ? this.variance : 1) * Math.cos(this.radians)),
            this.vel * (this.useVarianceInPos ? this.variance : 1) * Math.sin(this.radians)
        ));

        if (this.vel <= 0 || this.width <= 0) {
            this.isDead = true;
        }
    }

    render(ctx) {
        const alpha = (this.vel + this.variance) / this.initialVel;
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${alpha})`
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.width, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Particle;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class Explosion {

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
/* harmony export (immutable) */ __webpack_exports__["default"] = Explosion;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const { Vec2, MathHelper } = __webpack_require__(0)
const Particle = __webpack_require__(3).default

class ExplosionParticle extends Particle {
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
/* harmony export (immutable) */ __webpack_exports__["default"] = ExplosionParticle;



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const { ctx, canvas, togglePause } = initCanvas(tick);
ctx.font = "30px Roboto"
ctx.lineWidth = 1
ctx.strokeStyle = "white"

const { Vec2, MathHelper } = __webpack_require__(0)
const Keyboard = __webpack_require__(7).default
const Projectile = __webpack_require__(2).default
const Player = __webpack_require__(8).default
const Asteroid = __webpack_require__(10).default
const Score = __webpack_require__(11).default
const PlayerDiedExplosion = __webpack_require__(12).default
const DestroyAsteroidExplosion = __webpack_require__(13).default

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


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const Projectile = __webpack_require__(2).default

const RIGHT = 39
const LEFT = 37
const SPACE = 32
const W = 87

class Keyboard {
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
/* harmony export (immutable) */ __webpack_exports__["default"] = Keyboard;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const { Vec2, MathHelper } = __webpack_require__(0)
const GameObject = __webpack_require__(1).default
const ExhaustParticle = __webpack_require__(9).default

class Player extends GameObject {
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
  }

  render(ctx) {
    super.render(ctx);
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
        window.asteroids.exhausts.push(
            new ExhaustParticle(this.vertices[2], -this.r)
        );
    }

    // Main update of acceleration, velocity & rotation.
    super.update(ctx);
    this.applyDrag();
  }

  applyDrag() {
      this.acc.scale(0.8);
      this.vel.scale(0.99);
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Player;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const { Vec2, MathHelper } = __webpack_require__(0)
const Particle = __webpack_require__(3).default

class ExhaustParticle extends Particle {
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
/* harmony export (immutable) */ __webpack_exports__["default"] = ExhaustParticle;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const { Vec2, MathHelper } = __webpack_require__(0)
const GameObject = __webpack_require__(1).default

const LARGE = 1
const MEDIUM = 0.5
const SMALL = 0.3
const VSMALL = 0.2

class Asteroid extends GameObject {
    constructor(pos, size) {
        let degrees = 0;
        const vertices = [];
        for (let i = 0; i < 12; i++) {
            degrees += (360 / 12);
            const radians = degrees * (Math.PI / 180);

            vertices.push(
                new Vec2(pos.x + MathHelper.randomBetween(30 * size, 70 * size), pos.y)
            );
            vertices[i].rotate(pos, radians)
        }

        super({
            vertices,
            vel: new Vec2(MathHelper.betweenFloat(-1, 1), MathHelper.betweenFloat(-1, 1)),
            c: pos,
            r: MathHelper.betweenFloat(-0.01, 0.01),
            boundaryBuffer: size * 70
        });
        this.canBreak = (size > SMALL) ? true : false;
        this.size = size;
    }

    update(ctx) {
        super.update(ctx);
    }

    render(ctx) {
        super.render(ctx);
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Asteroid;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class Score {
    constructor() {
        this.score = 0
        this.lives = 5
    }

    shotAsteroid({ size }) {
        if (size === 1) this.score += 20
        else if (size === 0.5) this.score += 50
        else if (size === 0.3) this.score += 100
        else if (size === 0.2) this.score += 150
    }

    crashedIntoAsteroid() {
        this.lives--
    }

    render(ctx) {
        ctx.fillStyle = "white"
        ctx.fillText(`Lives: ${this.lives}    Score: ${this.score}`, 20, 40);
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Score;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const Explosion = __webpack_require__(4).default
const ExplosionParticle = __webpack_require__(5).default

const R = 210
const G = 71
const B = 130
const MAX_WIDTH = 7

class PlayerDiedExplosion extends Explosion {
    constructor(pos) {
        super(pos, ExplosionParticle, R, G, B, MAX_WIDTH)
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = PlayerDiedExplosion;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const Explosion = __webpack_require__(4).default
const ExplosionParticle = __webpack_require__(5).default

const R = 200
const G = 255
const B = 255
const MAX_WIDTH = 3

class DestroyAsteroidExplosion extends Explosion {
    constructor(pos) {
        super(pos, ExplosionParticle, R, G, B, MAX_WIDTH)
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = DestroyAsteroidExplosion;



/***/ })
/******/ ]);