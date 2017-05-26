module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    name: DataTypes.STRING
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // User's Brews
      classMethods: {
        associate: function(models) {
          // Associating User with Brews
          // When an User is deleted, also delete any associated Brews
          User.hasMany(models.Brew, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return User;
};
