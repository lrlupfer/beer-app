<<<<<<< HEAD
$(document).ready(function() { 
  // Getting references to our form and input
  var signUpForm = $("form.signUp");
  var emailInput = $("input#signUpEmail");
  var passwordInput = $("input#signUpPassword");
  // When the signup button is clicked, we validate the email and password are not blank
  $(".btn-create").on("click", function(event) { 
=======
$(document).ready(function() {
  // Getting references to the name inout and brew container, as well as the table body
  var nameInput = $("#brewName");
  var brewList = $("tbody");
  var brewContainer = $(".brew-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an brew
  $(document).on("submit", "#brew-form", handlebrewFormSubmit);
  $(document).on("click", ".delete-brew", handleDeleteButtonPress);
  // Getting the intiial list of brews
  getUsers();
  // A function to handle what happens when the form is submitted to create a new brew
  function handleUserFormSubmit(event) {
>>>>>>> 6900a26b84305ed0714ccbf97f075cfb71ef975e
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      console.log("error");
      return;
    }
<<<<<<< HEAD
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
    });
  }
});
=======
    // Calling the upsertbrew function and passing in the value of the name input
    upsertUser({
      name: nameInput
        .val()
        .trim()
    });
  }
  // A function for creating an brew. Calls getbrews upon completion
  function upsertUser(brewData) {
    $.post("/api/brews", brewData)
      .then(getUsers);
  }
  // Function for creating a new list row for brews
  function createUserRow(brewData) {
    var newTr = $("<tr>");
    newTr.data("brew", brewData);
    newTr.append("<td>" + brewData.name + "</td>");
    newTr.append("<td> " + brewData.brews.length + "</td>");
    newTr.append("<td><a href='/blog?brew_id=" + brewData.id + "'>Go to brews</a></td>");
    newTr.append("<td><a href='/cms?brew_id=" + brewData.id + "'>Create a Brew</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-brew'>Delete brew</a></td>");
    return newTr;
  }
  // Function for retrieving brews and getting them ready to be rendered to the page
  function getUsers() {
    $.get("/api/brews", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createbrewRow(data[i]));
      }
      renderUserList(rowsToAdd);
      nameInput.val("");
    });
  }
  // A function for rendering the list of brews to the page
  function renderUserList(rows) {
    brewList.children().not(":last").remove();
    brewContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      brewList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }
  // Function for handling what to render when there are no brews
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.html("You must create an User before you can create a Post.");
    brewContainer.append(alertDiv);
  }
  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("brew");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/brews/" + id
    })
    .done(getbrews);
  }
});
>>>>>>> 6900a26b84305ed0714ccbf97f075cfb71ef975e
