
export default class Score {
    constructor() {
        this.score = 0
        this.lives = 5
    }

    shotAsteroid({ size }) {
        if (size === 1) this.score += 20
        if (size === 0.5) this.score += 50
        if (size === 0.3) this.score += 100
        if (size === 0.2) this.score += 150
    }

    crashedIntoAsteroid() {
        this.lives--
    }

    render(ctx) {
        ctx.fillStyle = "white"
        ctx.fillText(`Lives: ${this.lives}    Score: ${this.score}`, 20, 40);
    }
}
