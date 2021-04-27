function register() {
  let valid = true;
  let error = "";

  let username = $("#username-reg").val();
  if (userExist(username) || username.length == 0) {
    setError("#username-reg");
    if (userExist(username)){
      error += "Please choose a different username, this one is taken :)\n";
    } else {
      error += "Please insert a valid username\n";
    }
    valid = false;
  } else {
    cleanError("#username-reg");
  }

  let password = $("#pass-reg").val();
  if (!validPass(password)) {
    setError("#pass-reg");
    error += "Please choose a valid password - numbers and letters, at least 6 characters\n";
    valid = false;
  } else {
    cleanError("#pass-reg");
  }

  let name = $("#name-reg").val();
  if (!name.match(/^([\w]{1,})+\s+([\w\s]{1,})+$/i)) {
    setError("#name-reg");
    error += "Please insert your full name\n";
    valid = false;
  } else {
    cleanError("#name-reg");
  }

  let email = $("#email-reg").val();
  if (!isEmail(email)) {
    setError("#email-reg");
    error += "Please insert a valid email address\n";
    valid = false;
  } else {
    cleanError("#email-reg");
  }

  let birthday = $("#datefield").val();
  if (birthday == "") {
    setError("#datefield");
    error += "Please insert a valid birthdate\n";
    valid = false;
  } else {
    cleanError("#datefield");
  }

  //finish validating
  if (valid) {
    users[username] = {
      password: password,
      full_name: name,
      email: email,
      birth_date: birthday,
    };
    alert("You have registered successfully.");
    $("#reg-form").trigger("reset");
    show_only_button("login");
    return false;
  } else {
    alert(error);
    return false;
  }
}

function validPass(pass) {
  if (pass.length < 6) {
    return false;
  }
  let regex_pass = /^(?=.*\d)(?=.*[a-z|A-Z])/;
  if (pass.match(regex_pass)) {
    return true;
  } else {
    return false;
  }
}
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function userExist(username) {
  return username in users;
}

function cleanError(field) {
  $(field).css("box-shadow", "1px 1px 4px rgba(0, 0, 0, 0.3)");
}

function setError(field) {
  $(field).css("box-shadow", "1px 1px 4px rgba(179, 16, 16, 1)");
}

function setMaxDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  document.getElementById("datefield").setAttribute("max", today);
}
