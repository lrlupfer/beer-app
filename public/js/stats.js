$(document).ready(function() {

$("button.btn-stats").on("click", function() {
  $.ajax({
    url: "/api/brews/", // do I need the localhost part?
    type: "GET",
    success: function(data) {
      // console.log(data);

      var userId = $("#brewsContainer").data("uid");
      // console.log(userId);

      $.get("/api/userbrews/" + userId, function(data) {
        // console.log("Brews", data);
        Brews = data;
        if (!Brews || !Brews.length) {
          // console.log("You haven't logged any brews yet!");
        } else {
          console.log("Yes!");
        }
        // console.log(Brews[1].beerType);
      });

      var ctx = $("#myChart");

      var beerType = [0, 0, 0, 0, 0, 0];
      
      for (var i = 0; i < Brews.length; i++) {
        switch (Brews[i].beerType) {
          case "Ale":
            beerType[0]++;
            break;
          case "Lager":
            beerType[1]++;
            break;
          case "Amber":
            beerType[2]++;
            break;
          case "Stout":
            beerType[3]++;
            break;
          case "Porter":
            beerType[4]++;
            break;
          case "Other":
            beerType[5]++;
            break;
        }
      }

      var chartData = {
        labels: ["Ale", "Lager", "Amber", "Stout", "Porter", "Other"],
        datasets: [
          {
            label: "Key",
            data: beerType,
            backgroundColor: [
              "#E6E186",
              "#A9A9A9",
              "#DC143C",
              "#F4A460",
              "#2E8B57",
              "#CDA776"]
          }
        ]
      };
      console.log(Brews);

      console.log(beerType);


      console.log(Brews[1].beerType);

      var options = {
        title: {
          display: true,
          position: "top",
          text: "Brews By Style",
          fontSize: 18,
          fontColor: "#111"
        },
        legend: {
          display: true,
          position: "bottom"
        }
      };

      var chart = new Chart(ctx, {
        type: "doughnut",
        data: chartData,
        options: options
      });

      },
      error: function(chartData) {
        console.log(chartData);
      }
  });

});
});