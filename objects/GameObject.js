const { Vec2 } = require('../math')

export default class GameObject {
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
