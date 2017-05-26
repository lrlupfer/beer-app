// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view.html"));
  });


  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/brews.html"));
  });

};
