let left_key;
let right_key;
let up_key;
let down_key;
let number_of_balls;
let percentage_5_balls;
let color_5_balls;
let percentage_15_balls;
let color_15_balls;
let percentage_25_balls;
let color_25_balls;
let game_time;
let num_of_monsters;
let last_pressed;

function set_default_properties() {
  left_key = 37;
  right_key = 39;
  up_key = 38;
  down_key = 40;
  number_of_balls = 50;
  percentage_5_balls = 0.6;
  color_5_balls = "#5F0F40";
  percentage_15_balls = 0.3;
  color_15_balls = "#9A031E";
  percentage_25_balls = 0.1;
  color_25_balls = "#0F4C5C";
  game_time = 60;
  num_of_monsters = 4;
}

async function show_rec_dialog(key) {
  $(".modal").show();
  last_pressed = key;
  await waitingKeypress(key);
}

$(document).ready(function () {
  $(".modal").hide();
});

function waitingKeypress(key) {
  return new Promise((resolve) => {
    document.addEventListener("keydown", onKeyHandler);
    function onKeyHandler(e) {
      document.removeEventListener("keydown", onKeyHandler);
      resolve();
      if (last_pressed == "L") {
        left_key = e.which;
      } else if (last_pressed == "U") {
        up_key = e.which;
      } else if (last_pressed == "D") {
        down_key = e.which;
      } else if (last_pressed == "R") {
        right_key = e.which;
      }
      $(".modal").hide();
    }
  });
}

function rand_details() {
  $("#prop-num-balls").val(Math.floor(Math.random() * (90 - 50 + 1) + 50));
  $("#prop-num-monsters").val(Math.floor(Math.random() * (4 - 1 + 1) + 1));
  $("#prop-time").val(Math.floor(Math.random() * (120 - 60 + 1) + 60));
  $("#color_ball_5").val(getRandomColor);
  $("#color_ball_15").val(getRandomColor);
  $("#color_ball_25").val(getRandomColor);
  return false;
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function save_details() {
  let valid = true;
  let error = "";

  let num_balls = $("#prop-num-balls").val();
  if (num_balls < 50 || num_balls > 90) {
    setError("#prop-num-balls");
    error += "Number of balls must be between 50-90\n";
    valid = false;
  } else {
    cleanError("#prop-num-balls");
  }
  let num_monsters = $("#prop-num-monsters").val();
  if (num_monsters < 1 || num_monsters > 4) {
    setError("#prop-num-monsters");
    error += "Number of monsters must be between 1-4\n";
    valid = false;
  } else {
    cleanError("#prop-num-monsters");
  }
  let time_amount = $("#prop-time").val();
  if (time_amount < 60) {
    setError("#prop-time");
    error += "Amount of time must be atleast 60\n";
    valid = false;
  } else {
    cleanError("#prop-time");
  }
  if (valid) {
    number_of_balls = num_balls;
    num_of_monsters = num_monsters;
    game_time = time_amount;
    color_5_balls = document.getElementById("color_ball_5").value;
    color_15_balls = document.getElementById("color_ball_15").value;
    color_25_balls = document.getElementById("color_ball_25").value;
    $("#ball-det").html("Number of Balls: ".bold() + number_of_balls);
    $("#mons-det").html("Number of Monsters: ".bold() + num_of_monsters);
    $("#time-det").html("Game Time: ".bold() + game_time);
    alert("Saved Properties");
  } else {
    alert(error);
  }
  return false;
}
