class Wall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    drawMe() {
        let center = new Object();
        center.x = this.x * 60 + 30;
        center.y = this.y * 60 + 30;

        context.beginPath();
        context.rect(center.x - 30, center.y - 30, 60, 60);
        context.fillStyle = "grey"; //color
        context.fill();
    }
}