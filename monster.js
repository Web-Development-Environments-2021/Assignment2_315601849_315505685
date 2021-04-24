const red_img = new Image();
red_img.src = "resources/images/red_monster.png"
const blue_img = new Image();
blue_img.src = "resources/images/blue_monster.png"

class Monster {
    constructor(x, y, life_to_reduce) {
        this.x = x;
        this.y = y;
        this.life_to_reduce = life_to_reduce;
        if (life_to_reduce == 1){
            this.img = blue_img;
        } else{
            this.img = red_img;
        }
    }

    drawMe() {

        let position = new Object();
        position.x = this.x * cell_size * 2;
        position.y = this.y * cell_size * 2;

        context.drawImage(this.img, position.x, position.y, cell_size*2, cell_size*2)
    }
}