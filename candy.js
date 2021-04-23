class Candy{
    constructor(x,y,points){
        this.x = x;
        this.y = y;
        this.points = points
        this.eaten = false;
    }

    drawMe(){
        if (!this.eaten){
            let center = new Object();
            center.x = this.x * 60 + 30;
            center.y = this.y * 60 + 30;
    
            context.beginPath();
            context.arc(center.x, center.y, this.points, 0, 2 * Math.PI); // circle - radius equal to points
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
}