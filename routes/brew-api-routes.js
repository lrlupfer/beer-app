
// Requiring our models
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the brews
  app.get("/api/brews", function(req, res) {
    var query = {};
    if (req.query.UserId) {
      query.UserId = req.query.UserId;
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
    db.Brew.findAll({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbBrew) {
      res.json(dbBrew);
    });
  });

   // Get rotue for retrieving a single user's brews
  app.get("/api/userbrews/:id", function(req, res) {
    db.Brew.findAll({
      where: {
        UserId: req.params.id
      },
      include: [db.User]
    }).then(function(dbBrew) {
      res.json(dbBrew);
    });
  });

  // POST route for saving a new brew
  app.post("/api/brews", function(req, res) {
    
    console.log(req.body);

    db.Brew.create(req.body).then(function(dbBrew) {
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