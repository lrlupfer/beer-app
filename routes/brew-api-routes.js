
// Requiring our models
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/brews", isAuthenticated, function(req, res){
    res.render("brews", {user: req.user})
  });

  // GET route for getting all of the brews
  app.get("/api/brews", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // set the value to an array of the models to include in a left outer join
    // db.User
    db.Brew.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbBrew) {
      res.json(dbBrew);
    });
  });

  // Get rotue for retrieving a single brew
  app.get("/api/brews/:id", function(req, res) {
    //add an "include" property in our findOne query
    //set the value to an array of the models to include in a left outer join
    // db.User
    db.Brew.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbBrew) {
      res.json(dbBrew);
    });
  });

  // POST route for saving a new brew
  app.post("/api/brews", function(req, res) {
    var newBrew = req.body;
    newBrew.UserId = req.user.id;

    console.log(newBrew);
    
    db.Brew.create(newBrew).then(function(dbBrew) {
      res.json(dbBrew);
    });
  });

  // DELETE route for deleting brews
  app.delete("/api/brews/:id", function(req, res) {
    db.Brew.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBrew) {
      res.json(dbBrew);
    });
  });

  // PUT route for updating brews
  app.put("/api/brews", function(req, res) {
    db.Brew.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbBrew) {
        res.json(dbBrew);
      });
  });
};
