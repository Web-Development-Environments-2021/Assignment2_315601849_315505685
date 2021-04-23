let pacman_obj;
let candies_array = new Array();
let candies_count = 0;

function CreateBoardGame() {
    var cnt = board_width * board_hight;
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
                board[i][j] = new Wall(i, j);
            }

            else {
                var randomNum = Math.random();
                //Candy
                if (randomNum <= (1.0 * food_remain) / cnt) {
                    let points = 15;
                    food_remain--;
                    board[i][j] = new Candy(i, j, points);
                    candies_count++;
                }
                //Pacman
                else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
                    pacman_obj = new Pacman(i, j);
                    pacman_remain--;
                    board[i][j] = pacman_obj;
                }
                //Empty Cell
                else {
                    board[i][j] = null;
                }
                cnt--;
            }
        }
    }

    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        let i = emptyCell[0];
        let j = emptyCell[1];
        let points = 15;
        board[i][j] = new Candy(i, j, points);
        food_remain--;
        //candies_array[candies_count] = new Candy(emptyCell[0],emptyCell[1], points);
        candies_count++;
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


function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < board_hight; i++) {
        for (var j = 0; j < board_width; j++) {
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
        if (cur_y > 0) {
            let next_obj = board[cur_x][cur_y - 1];
            if (next_obj == null || next_obj.constructor.name != "Wall") {
                pacman_obj.y--;
            }
        }
    }

    if (key == 'DOWN') {
        if (cur_y < board_hight - 1) {
            let next_obj = board[cur_x][cur_y + 1];
            if (next_obj == null || next_obj.constructor.name != "Wall") {
                pacman_obj.y++;
            }
        }
    }

    if (key == 'LEFT') {
        if (cur_x > 0) {
            let next_obj = board[cur_x -1][cur_y];
            if (next_obj == null || next_obj.constructor.name != "Wall") {
                pacman_obj.x--;
            }
        }
    }

    if (key == 'RIGHT') {
        if (cur_x < board_width - 1) {
            let next_obj = board[cur_x -1][cur_y];
            if (next_obj == null || next_obj.constructor.name != "Wall") {
                pacman_obj.x++;
            }
        }

    }

    let cur_obj = board[pacman_obj.x][pacman_obj.y];
    if (cur_obj != null && cur_obj.constructor.name == "Candy") {
        score++;

    }

    //Place Packman in new position in array
    board[pacman_obj.x][pacman_obj.y] = pacman_obj;

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




