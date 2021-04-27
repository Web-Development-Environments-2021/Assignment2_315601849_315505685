const bonus_img = new Image();
bonus_img.src = "resources/images/star.png";

class Bonus {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction_x = x;
    this.direction_y = y;
  }

  drawMe() {
    let position = new Object();
    position.x = this.x * cell_size * 2;
    position.y = this.y * cell_size * 2;

    context.drawImage(
      bonus_img,
      position.x,
      position.y,
      2 * cell_size,
      2 * cell_size
    );
  }
}
