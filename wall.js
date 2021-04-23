class Wall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    drawMe() {
        let center = new Object();
        center.x = this.x * cell_size * 2 + cell_size;
        center.y = this.y * cell_size * 2 + cell_size;

        context.beginPath();
        context.rect(center.x - cell_size, center.y - cell_size, cell_size * 2, cell_size * 2);
        context.fillStyle = "grey"; //color
        context.fill();
    }
}