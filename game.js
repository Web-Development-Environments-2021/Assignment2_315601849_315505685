let pacman_obj;

function CreateBoardGame(){
    var cnt = board_width*board_hight;
    var food_remain = number_of_balls;
    var pacman_remain = 1;
    board = new Array();
  
    for (var i = 0; i < board_hight; i++) {
      board[i] = new Array();
      for (var j = 0; j < board_width; j++) {
        //Set Obstacles
        if (
          (i == 3 && j == 3) ||
          (i == 3 && j == 4) ||
          (i == 3 && j == 5) ||
          (i == 6 && j == 1) ||
          (i == 6 && j == 2)
        ) {
          board[i][j] = 4;
        } 
  
        else {
          var randomNum = Math.random();
          //Candy
          if (randomNum <= (1.0 * food_remain) / cnt) {
            food_remain--;
            board[i][j] = 1;
          } 
          //Pacman
          else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
            pacman_obj = new Pacman(i,j);
            pacman_remain--;
            board[i][j] = 2;
          } 
          //Empty Cell
          else {
            board[i][j] = 0;
          }
          cnt--;
        }
      }
    }
  
    while (food_remain > 0) {
      var emptyCell = findRandomEmptyCell(board);
      board[emptyCell[0]][emptyCell[1]] = 1;
      food_remain--;
    }
  
    return board;
  }


function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * 9 + 1);
    var j = Math.floor(Math.random() * 9 + 1);
    while (board[i][j] != 0) {
      i = Math.floor(Math.random() * 9 + 1);
      j = Math.floor(Math.random() * 9 + 1);
    }
    return [i, j];
  }
  
  
  function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < board_hight; i++) {
      for (var j = 0; j < board_width; j++) {
        var center = new Object();
        center.x = i * 60 + 30;
        center.y = j * 60 + 30;
  
        // Pacman
        if (board[i][j] == 2) { 
            pacman_obj.drawMe()
        }
        
        //Candy
        else if (board[i][j] == 1) {
          context.beginPath();
          context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
          context.fillStyle = "black"; //color
          context.fill();
        } 
        
        //Wall
        else if (board[i][j] == 4) { 
          context.beginPath();
          context.rect(center.x - 30, center.y - 30, 60, 60);
          context.fillStyle = "grey"; //color
          context.fill();
        }
      }
    }
  }
  
  function GetKeyPressed() {
    if (keysDown[up_key]) {
      return 'UP';
    }
    if (keysDown[down_key]) {
      return 'DOWN';
    }
    if (keysDown[left_key]) {
      return 'LEFT';
    }
    if (keysDown[right_key]) {
      return 'RIGHT';
    }
  }
  
  function UpdatePosition() {
    //clean pacman position
    board[pacman_obj.x][pacman_obj.y] = 0;

    let key = GetKeyPressed();
    if (key == 'UP') {
        if (pacman_obj.y > 0 && board[pacman_obj.x][pacman_obj.y - 1] != 4) {
        pacman_obj.y--;
      }
    }
    if (key == 'DOWN') {
        if (pacman_obj.y < board_hight-1 && board[pacman_obj.x][pacman_obj.y + 1] != 4) {
        pacman_obj.y++;
      }
    }
    if (key == 'LEFT') {
        if (pacman_obj.x > 0 && board[pacman_obj.x -1][pacman_obj.y] != 4) {
        pacman_obj.x--;
      }
    }
    if (key == 'RIGHT') {
        if (pacman_obj.x < board_width-1 && board[pacman_obj.x +1][pacman_obj.y] != 4) {
        pacman_obj.x++;
      }
    }
    if (board[pacman_obj.x][pacman_obj.y] == 1) {
      score++;
    }

    //Place Packman in new position in array
    board[pacman_obj.x][pacman_obj.y] = 2;
  
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (score >= 20 && time_elapsed <= 10) {
      pac_color = "green";
    }
    if (score == 50) {
      window.clearInterval(interval);
      window.alert("Game completed");
    } else {
      Draw();
    }
  }
  



