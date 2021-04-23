var context;
var shape = new Object();
var board;
var score;
var pac_color = "yellow";
var start_time;
var time_elapsed;
var interval;
var users = { k: { password: "k" } };
var logged_in_user = null;

board_hight = 12;
board_width = 17;
cell_size = 20;

function show_only_button(button_text) {
  $(".div-content").hide();
  $("#" + button_text).show();
}

$(document).ready(function () {
  context = canvas.getContext("2d");
  $("#welcome").show();
  $("#welcome-greeting").hide();
  setMaxDate();
  set_default_properties();
  StartGame();
});

function initiateGame(){
  setBallsLocation();
  setMonstersLocation();
  setPakmanLocation()
  drawBoard();
}


function StartGame() {
  life = 5;
  
  score = 0;
 // pac_color = "yellow";
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

