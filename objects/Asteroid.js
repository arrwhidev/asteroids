const { Vec2, MathHelper } = require('../math')
const GameObject = require('./GameObject').default

const LARGE = 1
const MEDIUM = 0.5
const SMALL = 0.3
const VSMALL = 0.2

export default class Asteroid extends GameObject {
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
