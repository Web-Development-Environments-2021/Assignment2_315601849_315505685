var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var users = { k: { password: "k" } };
var logged_in_user = null;

board_hight = 15;
board_width = 12;

function show_only_button(button_text) {
  $(".div-content").hide();
  $("#" + button_text).show();
}

$(document).ready(function () {
  context = canvas.getContext("2d");
  $("#welcome").show();
  $("#welcome-greeting").hide();
  setMaxDate();
  StartGame();
});

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
        //Packman
        else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
          shape.i = i;
          shape.j = j;
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


function StartGame() {
  
  score = 0;
  pac_color = "yellow";
  start_time = new Date();

  board = CreateBoardGame();

  //Set handlers for keys
  keysDown = {};
  addEventListener(
    "keydown",
    function (e) {
      keysDown[e.keyCode] = true;
    },
    false
  );
  addEventListener(
    "keyup",
    function (e) {
      keysDown[e.keyCode] = false;
    },
    false
  );

  //Start game
  interval = setInterval(UpdatePosition, 250);
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

      // Packman
      if (board[i][j] == 2) { 
        context.beginPath();
        context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
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
  board[shape.i][shape.j] = 0;
  var key = GetKeyPressed();
  if (key == 'UP') {
    if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
      shape.j--;
    }
  }
  if (key == 'DOWN') {
    if (shape.j < board_hight-1 && board[shape.i][shape.j + 1] != 4) {
      shape.j++;
    }
  }
  if (key == 'LEFT') {
    if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
      shape.i--;
    }
  }
  if (key == 'RIGHT') {
    if (shape.i < board_width-1 && board[shape.i + 1][shape.j] != 4) {
      shape.i++;
    }
  }
  if (board[shape.i][shape.j] == 1) {
    score++;
  }
  board[shape.i][shape.j] = 2;
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
