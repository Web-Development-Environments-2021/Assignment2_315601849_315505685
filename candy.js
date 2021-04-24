class Candy{
    constructor(x,y,points){
        this.x = x;
        this.y = y;
        this.points = points
        if (points == 5){
            this.radius = 10;
        } else if (points == 25){
            this.radius = 20;
        } else{
            this.radius = 15;
        }
    }

    drawMe(){
        let center = new Object();
        center.x = this.x * cell_size * 2 + cell_size;
        center.y = this.y * cell_size * 2 + cell_size;

        context.beginPath();
        context.arc(center.x, center.y, this.radius/30 * cell_size, 0, 2 * Math.PI); // circle - radius equal to points
        if(this.points == 5){
            context.fillStyle = color_5_balls;
        }
        else if(this.points == 15){
            context.fillStyle = color_15_balls;
        }
        else if(this.points == 25){
            context.fillStyle = color_25_balls;
        }
        context.fill();
    }
}