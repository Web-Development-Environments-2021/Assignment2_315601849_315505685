function create_board(){
    let my_board = new Array();
    for (var i = 0; i < board_width; i++) {
        my_board[i] = new Array();
        for (var j = 0; j < board_hight; j++) {
            if (j==2 && i>=4 && i<=11){
                my_board[i][j] = new Wall(i, j);
            }else if(j==9 && i>=5 && i<=10){
                my_board[i][j] = new Wall(i, j);
            }else if(i==3 && j>=5 && j<=7){
                my_board[i][j] = new Wall(i, j);
            }else if(i==13 && j>=5 && j<=7){
                my_board[i][j] = new Wall(i, j);
            }else if(i==1 && ((j>=1 && j<=3) || (j>=9 && j<=10))){
                my_board[i][j] = new Wall(i, j);
            }else if(i==15 && ((j>=1 && j<=2) || (j>=8 && j<=10))){
                my_board[i][j] = new Wall(i, j);
            }else if(j==4 && ((i>=6 && i<=7) || (i>=9 && i<=10))){
                my_board[i][j] = new Wall(i, j);
            }else if(j==7 && ((i>=6 && i<=7) || (i>=9 && i<=10))){
                my_board[i][j] = new Wall(i, j);
            }else{
                my_board[i][j] = null;
            }
        }
    }
    my_board[2][1] = new Wall(2,1);
    my_board[2][10] = new Wall(2,10);
    my_board[3][10] = new Wall(3,10);
    my_board[6][5] = new Wall(6,5);
    my_board[10][6] = new Wall(10,6);
    my_board[13][1] = new Wall(13,1);
    my_board[14][1] = new Wall(14,1);
    my_board[14][10] = new Wall(14,10);
    return my_board
}