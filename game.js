let pacman_obj;
let monsters_array = new Array();
let candies_count = 0;
//let monsters_colors = ["#F71735", "#011627", "#ABC8C0", "#337357"]
let monsters_life = [2,1,1,1]

$(document).ready(function () {
    $(".hidden_hearts").hide();
  });

function StartNewGame() {
    if (interval != null) {
        window.clearInterval(interval);
    }
    keysDown = {};
    candies_count = 0;
    $(".hearts").show();
    life = 5;
    score = 0;
    pac_color = "yellow";
    start_time = new Date();
    board = CreateBoardGame();
    //Start game
    interval = setInterval(UpdatePosition, 250);

}


function StartGame() {
    pac_color = "yellow";
    setMonstersLocation();
    setPakmanLocation();
}

function setMonstersLocation(){
    let emptyCell;
    let monster;
    for(let i = 0; i < monsters_array.length; i++){
        monster = monsters_array[i];
        if(monster.x != null && monster.y != null){
            board[monster.x][monster.y] = null;
        }

        emptyCell = findRandomEmptyCell(board);
        let x = emptyCell[0];
        let y = emptyCell[1];
        
        monster.x = x;
        monster.y = y;
        board[x][y] = monster;
    }
}

function setPakmanLocation(){
    let cur_x = pacman_obj.x;
    let cur_y = pacman_obj.y;
    //clean pacman position
    board[cur_x][cur_y] = null;

    let emptyCell = findRandomEmptyCell(board);
    let i = emptyCell[0];
    let j = emptyCell[1];
    pacman_obj.x = i;
    pacman_obj.y = j;
    board[i][j] = pacman_obj;
}


function CreateBoardGame() {
    var cnt = board_width * board_hight;
    let wall_remain = 20;
    let remain_pills = 2;

    //calculate number of balls
    let food_5_remain = Math.floor(number_of_balls * percentage_5_balls);
    let food_15_remain = Math.floor(number_of_balls * percentage_15_balls);
    let food_25_remain = Math.floor(number_of_balls * percentage_25_balls);
    let leftovers = number_of_balls - (food_5_remain + food_15_remain + food_25_remain);
    food_5_remain += leftovers;

    var pacman_remain = 1;
    board = new Array();

    for (var i = 0; i < board_width; i++) {
        board[i] = new Array();
        for (var j = 0; j < board_hight; j++) {
            var randomNum = Math.random();
            //Candy
            if (randomNum <= (1.0 * food_5_remain) / cnt) {
                //let points = 5;
                food_5_remain--;
                board[i][j] = new Candy(i, j, 5);
                candies_count++;
            }
            //Pacman
            else if (randomNum < (1.0 * (pacman_remain + food_5_remain)) / cnt) {
                pacman_obj = new Pacman(i, j);
                pacman_remain--;
                board[i][j] = pacman_obj;
            }
            //Set Obstacles
            else if (randomNum <= (1.0 * (wall_remain + pacman_remain + food_5_remain)) / cnt) {
                wall_remain--;
                board[i][j] = new Wall(i, j);
            }
            //Empty Cell
            else {
                board[i][j] = null;
            }

            cnt--;

        }
    }

    let emptyCell;

    for(let i = 0; i < num_of_monsters; i++){
        let life_to_reduce = monsters_life[i];
        monsters_array[i] = new Monster(null, null, life_to_reduce);
    }
    setMonstersLocation();

    while (food_5_remain > 0) {
        emptyCell = findRandomEmptyCell(board);
        let i = emptyCell[0];
        let j = emptyCell[1];
        //let points = 5;
        board[i][j] = new Candy(i, j, 5);
        food_5_remain--;
        candies_count++;
    }

    while (food_15_remain > 0) {
        emptyCell = findRandomEmptyCell(board);
        let i = emptyCell[0];
        let j = emptyCell[1];
        //let points = 15;
        board[i][j] = new Candy(i, j, 15);
        food_15_remain--;
        candies_count++;
    }

    while (food_25_remain > 0) {
        emptyCell = findRandomEmptyCell(board);
        let i = emptyCell[0];
        let j = emptyCell[1];
        //let points = 25;
        board[i][j] = new Candy(i, j, 25);
        food_25_remain--;
        candies_count++;
    }

    while (remain_pills > 0) {
        emptyCell = findRandomEmptyCell(board);
        let i = emptyCell[0];
        let j = emptyCell[1];
        
        board[i][j] = new Pill(i, j);
        remain_pills--;
    }

    return board;
}


function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * 9 + 1);
    var j = Math.floor(Math.random() * 9 + 1);
    while (board[i][j] != null) {
        i = Math.floor(Math.random() * 9 + 1);
        j = Math.floor(Math.random() * 9 + 1);
    }
    return [i, j];
}

function getPoints() {
    let points = Math.floor(Math.random() * 3) * 10 + 5;
    return points;
}


function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;

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
    let cur_x = pacman_obj.x;
    let cur_y = pacman_obj.y;
    //clean pacman position
    board[cur_x][cur_y] = null;

    let key = GetKeyPressed();
    if (key == 'UP') {
        pacman_obj.angle = 1.5;
        if (cur_y > 0) {
            let next_obj = board[cur_x][cur_y - 1];
            if (next_obj == null || next_obj.constructor.name != "Wall") {
                pacman_obj.y--;
            }
        }
    }

    if (key == 'DOWN') {
        pacman_obj.angle = 0.5;
        if (cur_y < board_hight - 1) {
            let next_obj = board[cur_x][cur_y + 1];
            if (next_obj == null || next_obj.constructor.name != "Wall") {
                pacman_obj.y++;
            }
        }
    }

    if (key == 'LEFT') {
        pacman_obj.angle = 1;
        if (cur_x > 0) {
            let next_obj = board[cur_x - 1][cur_y];
            if (next_obj == null || next_obj.constructor.name != "Wall") {
                pacman_obj.x--;
            }
        }
    }

    if (key == 'RIGHT') {
        pacman_obj.angle = 0;
        if (cur_x < board_width - 1) {
            let next_obj = board[cur_x + 1][cur_y];
            if (next_obj == null || next_obj.constructor.name != "Wall") {
                pacman_obj.x++;
            }
        }

    }

    let cur_obj = board[pacman_obj.x][pacman_obj.y];
    if (cur_obj != null && cur_obj.constructor.name == "Monster"){
        score -= cur_obj.life_to_reduce*10;
        for (var i=0; i < cur_obj.life_to_reduce; i++){
            reduceLife();
        }
        if (life > 0){
            StartGame();
        }
    }
    else{
        if (cur_obj != null && cur_obj.constructor.name == "Candy") {
            score += cur_obj.points;
            candies_count--;
        }
        if (cur_obj != null && cur_obj.constructor.name == "Pill") {
            life ++;
            $("#heart_"+life).show();
        }

        //Place Packman in new position in array
        board[pacman_obj.x][pacman_obj.y] = pacman_obj;
    }

    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (time_elapsed >= game_time) {
        stopGame("Game Over");
    }
    if (score >= 100 && time_elapsed <= 10) {
        pac_color = "#D17A22";
    }
    if (candies_count == 0) {
        stopGame("Game completed");
    }
    Draw();
}

function reduceLife(){
    $("#heart_"+life).hide();
    life--;
    if (life == 0){
        stopGame("Game Over");
    }
}


function stopGame(message){
    window.clearInterval(interval);
    window.alert(message);
}