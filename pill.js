const pill_img = new Image();
pill_img.src = "resources/images/pill.png"

class Pill {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    drawMe() {
        let position = new Object();
        position.x = this.x * cell_size * 2 + cell_size*0.25;
        position.y = this.y * cell_size * 2 + cell_size*0.25;

        context.drawImage(pill_img, position.x, position.y, 1.5*cell_size, 1.5*cell_size)
    }
}