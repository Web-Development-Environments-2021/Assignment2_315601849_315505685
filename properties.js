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
  color_5_balls = "red";
  percentage_15_balls = 0.3;
  color_15_balls = "blue";
  percentage_25_balls = 0.1;
  color_25_balls = "white";
  game_time = 60;
  num_of_monsters = 4;
}

async function show_rec_dialog(key) {
  $(".modal").show();
  last_pressed = key;
  await waitingKeypress(key);
}

function hide_rec_dialog() {
  $(".modal").hide();
  return false;
}

$(document).ready(function () {
  hide_rec_dialog();
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
