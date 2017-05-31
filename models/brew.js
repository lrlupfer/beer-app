module.exports = function(sequelize, DataTypes) {
  var Brew = sequelize.define("Brew", {
        body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    
  },
      {
      // We're saying that we want our User to have Brews
      classMethods: {
        associate: function(models) {
          // An User (foreignKey) is required or a Brew can't be made
          Brew.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Brew;
};
