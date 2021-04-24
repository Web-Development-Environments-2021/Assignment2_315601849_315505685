class Pacman{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.angle = 0;
    }


    drawMe(){
        let center = new Object();
        center.x = this.x * cell_size * 2 + cell_size;
        center.y = this.y * cell_size * 2 + cell_size;
        //Draw body
        context.beginPath();
        context.arc(center.x, center.y, cell_size, (this.angle + 0.15) * Math.PI, (this.angle +1.85) * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();

        //Draw eye
        let x = center.x + cell_size/6;
        let y = center.y - cell_size/2;
        if (this.angle == 1){
            x = center.x - cell_size/6;
        } else if(this.angle == 0.5){
            x = center.x - cell_size/2;
            y = center.y - cell_size/6;
        } else if(this.angle == 1.5){
            x = center.x - cell_size/2;
            y = center.y + cell_size/6;
        }

        context.beginPath();
        context.arc(x, y, cell_size/6, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
    }
}