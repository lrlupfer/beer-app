$(document).ready(function() {

	$("#addBrew").on("click", function(event) {
		event.preventDefault();

		var brewData = {
      		beerName: $("#beerName").val().trim(),
      		beerType: $("#beerType").val().trim(),
      		recipe: $("#beerRecipe").val().trim(),
      		rating: $("#beerRating").val().trim(),
      		notes: $("#beerNotes").val().trim()
    	};

    	// console.log(brewData);
		addBrew(brewData.beerName, brewData.beerType, brewData.recipe, brewData.rating, brewData.notes);
	});

	function addBrew(beerName, beerType, recipe, rating, notes) {
    $.post("/api/brews", {
      beerName: beerName,
      beerType: beerType,
      recipe: recipe,
      rating: rating,
      notes: notes
    }).then(function(data) {
      window.location.href = "/brews";
    });
	}

});