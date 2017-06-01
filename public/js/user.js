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
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
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
