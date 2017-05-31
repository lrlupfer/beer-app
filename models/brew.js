module.exports = function(sequelize, DataTypes) {
  
  var Brew = sequelize.define("Brew", {
        beerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     beerType: {
      type: DataTypes.STRING,
      validate: {
        ^(Ale|Lager|Amber|Stout|Porter|Other)$
      }
  },  
  recipe: {
      type: DataTypes.STRING,
  },
    rating: {
      type: DataTypes.STRING,
  },
    notes: {
      type: DataTypes.STRING,
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