$(document).ready(function() {
  
  var brewsDisplay = $("#addBrew");
  var userSelect = $("#user");
  
  // Gets the part of the url that comes after the "?" (which we have if we're updating a brew)
  var url = window.location.search;
  var brewId;
  var userId;
  // Sets a flag for whether or not we're updating a brew to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the brew id from the url
  // In '?brew_id=1', brewId is 1
  if (url.indexOf("?brews_id=") !== -1) {
    brewId = url.split("=")[1];
    getBrewData(brewId, "brew");
  }
  // Otherwise if we have an user_id in our url, preset the user select box to be our user
  else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
  }

  // Getting the users, and their brews
  getUsers();
  // A function for handling what happens when the form to create a new brew is submitted
  function handleFormSubmit(event) { 
    event.preventDefault();

    // Getting jQuery references to the brew data, form, and user select
    var brewData = {
          beerName: $("#beerName").val().trim(),
          beerType: $("#beerType").val().trim(),
          recipe: $("#beerRecipe").val().trim(),
          rating: $("#beerRating").val().trim(),
          notes: $("#beerNotes").val().trim()
    };

    //get the brew
    // Wont submit the brew if we are missing a beer name or user
    if (!brewData.beerName) {
      alert("Need a beer name"); //FIXME, put error message on page.
      return;
    } 
    console.log("got it: ");
    console.log(brewData);
    // Constructing a newBrew object to hand to the database
    var newBrew = brewData;
    newBrew.UserId = userSelect.data("uid");

    // If we're updating a brew run updateBrew to update a brew
    // Otherwise run submitBrew to create a whole new brew
    if (updating) {
      newBrew.id = brewId;
      updateBrew(newBrew);
    }
    else {
      submitBrew(newBrew);
    }
  }

  // Adding an event listener for when the form is submitted
  brewsDisplay.on("click", handleFormSubmit);

  // Submits a new brew and brings user to brews page upon completion
  function submitBrew(brew) {
    $.post("/api/brews", brew, function() {
      window.location.href = "/brews";
    });
  }

  // Gets brew data for the current brew if we're editing, 
  // or if we're adding to an user's existing brews
  function getBrewData(id, type) {
    var queryUrl;
    switch (type) {
      case "brew":
        queryUrl = "/api/brews/" + id;
        break;
      case "user":
        queryUrl = "/api/users/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.userId || data.id);
        // If this brew exists, prefill our cms forms with its data
        beerName.val(data.beerName);
        beerType.val(data.beerType);
        beerRecipe.val(data.recipe);
        beerRating.val(data.rating);
        beerNotes.val(data.notes);
        userId = data.userId || data.id;
        // If we have a brew with this id, set a flag for us to know to update the brew
        // when we hit submit
        updating = true;
      }
    });
  }
  // A function to get users and then render our list of users
  function getUsers() {
    $.get("/api/users", renderUserList);
  }
  // Function to either render a list of users, 
   // or if there are none, direct the user to the page
  // to create an user first
  function renderUserList(data) {
    if (!data.length) {
      window.location.href = "/";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createUserRow(data[i]));
    }
    console.log(rowsToAdd);
    console.log(userSelect);
    // FIXME - not sure if this is needed? 
    //userSelect.empty();
    //userSelect.append(rowsToAdd);
    //userSelect.val(userId);
  }

  // Creates the user options in the dropdown
  function createUserRow(user) {
    var listOption = $("<option>");
    listOption.attr("value", user.id);
    listOption.text(user.name);
    return listOption;
  }

  // Update a given brew, bring user to the brews page when done
  function updateBrew(brew) {
    $.ajax({
      method: "PUT",
      url: "/api/brews",
      data: brew
    })
    .done(function() {
      window.location.href = "/brews";
    });
  }
});