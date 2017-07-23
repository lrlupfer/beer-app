$(document).ready(function() {
  /* global moment */

  // brewContainer holds all of our Brews
  var brewContainer = $("#brewsDisplay");
  var brewCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleBrewDelete);
  $(document).on("click", "button.edit", handleBrewEdit);
  // Variable to hold our Brews
  var brews;

  // The code below handles the case where we want to get brew Brews for a specific user
  var userId = $("#brewsContainer").data("uid"); 
  getBrews(userId);


  // This function grabs Brews from the database and updates the view
  function getBrews(userid) {

    $.get("/api/userbrews/" + userId, function(data) {
      console.log("Brews", data);
      Brews = data;
      if (!Brews || !Brews.length) {
        displayEmpty(userid);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete Brews
  function deleteBrew(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/Brews/" + id
    })
    .done(function() {
      getBrews(brewCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed brew HTML inside brewContainer
  function initializeRows() {
    brewContainer.empty();
    var BrewsToAdd = [];
    for (var i = 0; i < Brews.length; i++) {
      BrewsToAdd.push(createNewRow(Brews[i]));
    }
    brewContainer.append(BrewsToAdd);
  }

  // This function constructs a brew's HTML
  function createNewRow(brew) {
   // var formattedDate = new Date(brew.createdAt);
   // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newBrewPanel = $("<div>");
    newBrewPanel.addClass("panel panel-default");
    var newBrewPanelHeading = $("<div>");
    newBrewPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("Delete");
    deleteBtn.addClass("delete btn btn-danger btn-sm");
    var editBtn = $("<button>");
    editBtn.text("Edit");
    editBtn.addClass("edit btn btn-warning btn-sm");
    var newBrewTitle = $("<h2>");
    var newBrewPanelBody = $("<div>");
    newBrewPanelBody.addClass("panel-body");
    var newBrewBody = $("<div>");
    newBrewTitle.text(brew.beerName + " | " + brew.beerType + " | " + brew.rating + "/10");
    newBrewBody.html("Batch size: " + brew.batchSize + " gallons" + "<br>" + "Boil time: " + brew.boilTime + " minutes"
      + "<br>" + "Ingredients: " + brew.ingredients + "<br>" + "Recipe: " + brew.recipe + "<br>Notes: " + brew.notes);
    newBrewPanelHeading.append(newBrewTitle);
    newBrewPanelBody.append(newBrewBody);
    newBrewPanelBody.append(editBtn);
    newBrewPanelBody.append(deleteBtn);
    newBrewPanel.append(newBrewPanelHeading);
    newBrewPanel.append(newBrewPanelBody);
    return newBrewPanel;
  }

  // This function figures out which brew we want to delete and then calls deletebrew
  function handleBrewDelete() {
    var currentBrew = $(this)
      .parent()
      .parent()
      .data("brew");
    deleteBrew(currentBrew.id);
  }

  // This function figures out which brew we want to edit and takes it to the appropriate url
  function handleBrewEdit() {
    var currentBrew = $(this)
      .parent()
      .parent()
      .data("brew");
    window.location.href = "/addBrewski?brew_id=" + currentBrew.id;
  }

  // This function displays a messgae when there are no Brews
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for user #" + id;
    }
    brewContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No Brews yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    brewContainer.append(messageh2);
  }

  var brewsDisplay = $("#addBrew");

  function handleFormSubmit(event) { 
    event.preventDefault();

    // Getting jQuery references to the brew data, form, and user select
    var brewData = {
          beerName: $("#beerName").val().trim(),
          beerType: $("#beerType").val().trim(),
          batchSize: $("#batchSize").val().trim(),
          boilTime: $("#boilTime").val().trim(),
          ingredients: $("#ingredients").val().trim(),
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
    newBrew.UserId = $("#brewsContainer").data("uid"); 

    // If we're updating a brew run updateBrew to update a brew
    // Otherwise run submitBrew to create a whole new brew
    submitBrew(newBrew);
  }

  // Adding an event listener for when the form is submitted
  brewsDisplay.on("click", handleFormSubmit);

  // Submits a new brew and brings user to brews page upon completion
  function submitBrew(brew) {
    $.post("/api/brews", brew, function() {
      window.location.href = "/brews";
    });
  }

});