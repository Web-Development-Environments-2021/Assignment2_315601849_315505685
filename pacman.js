class Pacman{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    drawMe(){
        let center = new Object();
        center.x = this.x * 60 + 30;
        center.y = this.y * 60 + 30;
        //Draw body
        context.beginPath();
        context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        //Draw eye
        context.beginPath();
        context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
    }
}