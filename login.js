
$(document).ready(function () {
    $("#logged_in").hide();
  });

function login(){
    let username = $("#login-username").val();
    let password = $("#login-password").val();

    if(!userExist(username)){
        alert("User doesn't exist")
    }
    else if(users[username].password != password){
        alert("User doesn't exist")
    }
    else{
        welcomeUser(username);
        $("#login-form").trigger("reset");
        logged_in_user=username;
        $("#logged_in").show();
        $("#login-form").hide();
    }
    return false;
}

function welcomeUser(username){
    show_only_button("welcome");
    $(".welcome-button").hide();
    $("#welcome-greeting").show();
    $("#welcome-greeting").text("Welcome " + username +"!");
}