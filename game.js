let pacman_obj;
let monsters_array = new Array();
let candies_count = 0;
//let monsters_colors = ["#F71735", "#011627", "#ABC8C0", "#337357"]
const monsters_life = [2, 1, 1, 1];
let move_monsters = 0;
const monsters_position = [
  [0, 0],
  [0, board_hight - 1],
  [board_width - 1, 0],
  [board_width - 1, board_hight - 1],
];
let start_interval;
let empty_cells;
const audio = new Audio("resources/music/background.mp3");

$(document).ready(function () {
  $(".hidden_hearts").hide();
});

function StartNewGame() {
  if (interval != null) {
    window.clearInterval(interval);
  }
  monsters_array = new Array();
  keysDown = {};
  candies_count = 0;
  $(".hearts").show();
  $(".hidden_hearts").hide();
  life = 5;
  score = 0;
  interval_score = 0;
  pac_color = "yellow";
  start_time = new Date();
  start_interval = new Date();
  board = CreateBoardGame();
  audio.play();
  //Start game
  interval = setInterval(UpdatePosition, 200);
}

function StartGame() {
  pac_color = "yellow";
  setMonstersLocation();
  setPakmanLocation();
  start_interval = new Date();
  interval_score = 0;
}

function setMonstersLocation() {
  for (let i = 0; i < monsters_array.length; i++) {
    monster = monsters_array[i];
    if (monster.x != null && monster.y != null) {
      board[monster.x][monster.y] = null;
    }

    let x = monsters_position[i][0];
    let y = monsters_position[i][1];

    monster.x = x;
    monster.y = y;
  }
}

function setPakmanLocation() {
  let emptyCell = findRandomEmptyCell(board);
  pacman_obj.x = emptyCell[0];
  pacman_obj.y = emptyCell[1];
}

function placePill() {
  let emptyCell = findRandomEmptyCell(board);
  let i = emptyCell[0];
  let j = emptyCell[1];
  board[i][j] = new Pill(i, j);
}

function CreateBoardGame() {
  var cnt = board_width * board_hight;
  let number_of_pills = 2;

  //calculate number of balls
  let food_5_remain = Math.floor(number_of_balls * percentage_5_balls);
  let food_15_remain = Math.floor(number_of_balls * percentage_15_balls);
  let food_25_remain = Math.floor(number_of_balls * percentage_25_balls);
  let leftovers =
    number_of_balls - (food_5_remain + food_15_remain + food_25_remain);
  food_5_remain += leftovers;

  board = create_board();
  empty_cells = new Array();

  //monsters
  for (let i = 0; i < num_of_monsters; i++) {
    let life_to_reduce = monsters_life[i];
    monsters_array[i] = new Monster(null, null, life_to_reduce);
  }
  setMonstersLocation();

  //place candies
  for (var i = 0; i < board_width; i++) {
    for (var j = 0; j < board_hight; j++) {
      if (board[i][j] == null){
        var randomNum = Math.random();
        if (randomNum <= (1.0 * food_5_remain) / cnt) {
          food_5_remain--;
          board[i][j] = new Candy(i, j, 5);
          candies_count++;
        } else if (! (i in [0, board_width-1] && j in [0, board_hight-1])){
            empty_cells.push([i, j]);
        }
        cnt--;
      }
    }
  }

  //pills
  for (let i = 0; i < number_of_pills; i++) {
    placePill();
  }

  //remaining candies
  while (food_5_remain > 0) {
    placeCandies(5);
    food_5_remain--;
    candies_count++;
  }

  while (food_15_remain > 0) {
    placeCandies(15);
    food_15_remain--;
    candies_count++;
  }

  while (food_25_remain > 0) {
    placeCandies(25);
    food_25_remain--;
    candies_count++;
  }

  //pacman
  pacman_obj = new Pacman(null, null);
  setPakmanLocation();

  return board;
}

function placeCandies(points) {
  let emptyCell = findRandomEmptyCell(board);
  let i = emptyCell[0];
  let j = emptyCell[1];
  board[i][j] = new Candy(i, j, points);
}

function findRandomEmptyCell(board) {
  let indx = Math.floor(Math.random() * empty_cells.length);
  let position = empty_cells[indx];
  empty_cells.splice(indx, 1);
  return position;
}

function getPoints() {
  let points = Math.floor(Math.random() * 3) * 10 + 5;
  return points;
}

function Draw() {
  canvas.width = canvas.width; //clean board
  lblScore.value = score;
  lblTime.value = total_time_elapsed;

  //draw border
  context.beginPath();
  context.rect(0, 0, cell_size * board_width * 2, cell_size * board_hight * 2);
  context.strokeStyle = "black";
  context.stroke();

  //draw game elements
  for (var i = 0; i < board_width; i++) {
    for (var j = 0; j < board_hight; j++) {
      let obj = board[i][j];
      if (obj != null) {
        obj.drawMe();
      }
    }
  }

  //draw pacman
  pacman_obj.drawMe();

  //draw monsters
  let monster;
  for (let mons_idx = 0; mons_idx < monsters_array.length; mons_idx++) {
    monster = monsters_array[mons_idx];
    monster.drawMe();
  }

}

function GetKeyPressed() {
  if (keysDown[up_key]) {
    return "UP";
  }
  if (keysDown[down_key]) {
    return "DOWN";
  }
  if (keysDown[left_key]) {
    return "LEFT";
  }
  if (keysDown[right_key]) {
    return "RIGHT";
  }
}

function updateMonsterPosition() {
  let monster;
  let possible_movement;

  for (let mons_idx = 0; mons_idx < monsters_array.length; mons_idx++) {
    monster = monsters_array[mons_idx];
    possible_movement = [
      [monster.x, monster.y],
      [monster.x + 1, monster.y],
      [monster.x, monster.y + 1],
      [monster.x - 1, monster.y],
      [monster.x, monster.y - 1],
    ];
    let move;
    let closest = 1000;
    for (let mov_idx = 0; mov_idx < possible_movement.length; mov_idx++) {
      let curr_move = possible_movement[mov_idx];
      if (
        curr_move[0] < 0 ||
        curr_move[1] < 0 ||
        curr_move[0] > 16 ||
        curr_move[1] > 11
      ) {
        //out of the board
        continue;
      }
      if (!(board[curr_move[0]][curr_move[1]] instanceof Wall)) {
        if (
          Math.sqrt(
            Math.pow(curr_move[0] - pacman_obj.x, 2) +
              Math.pow(curr_move[1] - pacman_obj.y, 2)
          ) < closest
        ) {
          move = curr_move;
          closest = Math.sqrt(
            Math.pow(curr_move[0] - pacman_obj.x, 2) +
              Math.pow(curr_move[1] - pacman_obj.y, 2)
          );
        }
      }
    }
    monster.x = move[0];
    monster.y = move[1];
  }
}

function UpdatePosition() {

  //Move monsters
  if (move_monsters == 0) {
    updateMonsterPosition();
    move_monsters++;
  } else {
    if (move_monsters == 3) {
      move_monsters = 0;
    } else {
      move_monsters++;
    }
  }

  //Move Pacman
  let cur_x = pacman_obj.x;
  let cur_y = pacman_obj.y;
  let key = GetKeyPressed();

  if (key == "UP") {
    pacman_obj.angle = 1.5;
    if (cur_y > 0) {
      let next_obj = board[cur_x][cur_y - 1];
      if (next_obj == null || next_obj.constructor.name != "Wall") {
        pacman_obj.y--;
      }
    }
  }

  if (key == "DOWN") {
    pacman_obj.angle = 0.5;
    if (cur_y < board_hight - 1) {
      let next_obj = board[cur_x][cur_y + 1];
      if (next_obj == null || next_obj.constructor.name != "Wall") {
        pacman_obj.y++;
      }
    }
  }

  if (key == "LEFT") {
    pacman_obj.angle = 1;
    if (cur_x > 0) {
      let next_obj = board[cur_x - 1][cur_y];
      if (next_obj == null || next_obj.constructor.name != "Wall") {
        pacman_obj.x--;
      }
    }
  }

  if (key == "RIGHT") {
    pacman_obj.angle = 0;
    if (cur_x < board_width - 1) {
      let next_obj = board[cur_x + 1][cur_y];
      if (next_obj == null || next_obj.constructor.name != "Wall") {
        pacman_obj.x++;
      }
    }
  }

  //Check monsters collision
  let met_monster = false;
  for (let mons_idx = 0; mons_idx < monsters_array.length; mons_idx++) {
    let curr_mons = monsters_array[mons_idx];
    if (curr_mons.x == pacman_obj.x && curr_mons.y == pacman_obj.y) {
      met_monster = true;
      score -= curr_mons.life_to_reduce * 10;
      for (var i = 0; i < curr_mons.life_to_reduce; i++) {
        reduceLife();
      }
      if (life > 0) {
        StartGame();
      }
      break;
    }
  }

  //check collisions 
  if (!met_monster){
    let cur_obj = board[pacman_obj.x][pacman_obj.y];
    if (cur_obj != null){
      if (cur_obj.constructor.name == "Candy") {
        score += cur_obj.points;
        interval_score += cur_obj.points;
        candies_count--;
      }
      if (cur_obj.constructor.name == "Pill") {
        life++;
        $("#heart_" + life).show();
      }
      //clean pacman position
      board[pacman_obj.x][pacman_obj.y] = null;
    }
  }

  //Set game properties
  var currentTime = new Date();
  total_time_elapsed = (currentTime - start_time) / 1000;
  time_elapsed = (currentTime - start_interval) / 1000;
  if (total_time_elapsed >= game_time) {
    stopGame("Game Over");
  }
  if (interval_score >= 100 && time_elapsed <= 10) {
    pac_color = "#D17A22";
  }
  if (candies_count == 0) {
    stopGame("Game completed");
  }
  
  Draw();
}

function reduceLife() {
  $("#heart_" + life).hide();
  life--;
  if (life == 0) {
    stopGame("Game Over");
  }
}

function stopGame(message) {
  window.clearInterval(interval);
  audio.pause();
  audio.currentTime = 0;
  window.alert(message);
}
