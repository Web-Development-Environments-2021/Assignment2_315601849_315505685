async function show_about() {
  $("#about").show();
  window.onload = function(){
    var divToHide = document.getElementById('about');
    document.onclick = function(e){
      if(e.target.id !== 'about'){
        close_about()
      }
    };
  };
  await waitingEscapeKeypress();
}
function close_about() {
  $("#about").hide();
}

function waitingEscapeKeypress() {
  return new Promise((resolve) => {
    document.addEventListener("keydown", onKeyHandler);
    function onKeyHandler(e) {
      document.removeEventListener("keydown", onKeyHandler);
      resolve();
      if(e.which==27){
        close_about()
      }
    }
  });
}