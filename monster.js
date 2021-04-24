class Monster {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    drawMe() {

        let center = new Object();
        center.x = this.x * cell_size * 2 + cell_size;
        center.y = this.y * cell_size * 2 + cell_size;

        context.beginPath();
        context.rect(center.x - 1.1*cell_size, center.y - 1.1*cell_size, cell_size * 1.8, cell_size * 1.8);
        context.fillStyle = this.color;
        context.fill();

    }
}