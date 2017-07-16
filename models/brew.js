module.exports = function(sequelize, DataTypes) {
  
  var Brew = sequelize.define("Brew", {
      beerName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      beerType: {
          type: DataTypes.STRING
      },
      batchSize: {
          type: DataTypes.INTEGER
      },
      boilTime: {
          type: DataTypes.INTEGER
      },
      ingredients: {
          type: DataTypes.STRING
      },
      recipe: {
          type: DataTypes.STRING
      },
      rating: {
          type: DataTypes.INTEGER
      },
      notes: {
          type: DataTypes.STRING
      }, 
      UserId: {
          type:DataTypes.INTEGER
      }
  },
  {
      // User Brews
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