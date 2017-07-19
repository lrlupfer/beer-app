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
  // Looks for a query param in the url for user_id
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getBrews(userId);
  }
  // If there's no userId we just get all Brews as usual
  else {
    getBrews();
  }


  // This function grabs Brews from the database and updates the view
  function getBrews(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/brews" + userId, function(data) {
      console.log("Brews", data);
      Brews = data;
      if (!Brews || !Brews.length) {
        displayEmpty(user);
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

});
