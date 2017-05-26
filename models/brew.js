module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
        body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  },
    {
      // We're saying that we want our User to have Posts
      classMethods: {
        associate: function(models) {
          // An User (foreignKey) is required or a Post can't be made
          Post.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Post;
};
