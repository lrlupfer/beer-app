// Dependencies
// =============================================================
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", function(req, res) {
    res.render("index", { title: 'ZenBrew | Organize your homebrew recipes'});
  });


  app.get("/brews", isAuthenticated, function(req, res){
    res.render("brews", { user: req.user });
  })

  // app.get("/login", function(req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/users");
  //   }
  //   res.sendFile(path.join(__dirname + "/../public/login.html"));
  // });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname + "/../public/members.html"));
  // });
  
};
