// A Vector is a quantity which has magnitude & direction, but no position.
export class Vec2 {
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

export class MathHelper {
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

/*
// Momentum = mass * velocity
function handleCollision(A, B) {
    const MA = A.getMass() *
}
*/
