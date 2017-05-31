$(document).ready(function() {
  /* global moment */

  // blogContainer holds all of our Brews
  var blogContainer = $(".blog-container");
  var brewCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleBrewDelete);
  $(document).on("click", "button.edit", handleBrewEdit);
  // Variable to hold our Brews
  var brews;

  // The code below handles the case where we want to get blog Brews for a specific user
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
    $.get("/api/Brews" + userId, function(data) {
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

  // InitializeRows handles appending all of our constructed brew HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var BrewsToAdd = [];
    for (var i = 0; i < Brews.length; i++) {
      BrewsToAdd.push(createNewRow(Brews[i]));
    }
    blogContainer.append(BrewsToAdd);
  }

  // This function constructs a brew's HTML
  function createNewRow(brew) {
    var formattedDate = new Date(brew.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newBrewPanel = $("<div>");
    newBrewPanel.addClass("panel panel-default");
    var newBrewPanelHeading = $("<div>");
    newBrewPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newBrewTitle = $("<h2>");
    var newBrewDate = $("<small>");
    var newBrewuser = $("<h5>");
    newBrewuser.text("Written by: " + brew.user.name);
    newBrewuser.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newBrewPanelBody = $("<div>");
    newBrewPanelBody.addClass("panel-body");
    var newBrewBody = $("<p>");
    newBrewTitle.text(brew.title + " ");
    newBrewBody.text(brew.body);
    newBrewDate.text(formattedDate);
    newBrewTitle.append(newBrewDate);
    newBrewPanelHeading.append(deleteBtn);
    newBrewPanelHeading.append(editBtn);
    newBrewPanelHeading.append(newBrewTitle);
    newBrewPanelHeading.append(newBrewuser);
    newBrewPanelBody.append(newBrewBody);
    newBrewPanel.append(newBrewPanelHeading);
    newBrewPanel.append(newBrewPanelBody);
    newBrewPanel.data("brew", brew);
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
    window.location.href = "/cms?brew_id=" + currentBrew.id;
  }

  // This function displays a messgae when there are no Brews
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for user #" + id;
    }
    blogContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No Brews yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    blogContainer.append(messageh2);
  }

});
