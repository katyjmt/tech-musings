const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Blog Post Title
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Blog Post Content
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Each blog post is attached to one user
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'posts',
  },
);

module.exports = Post;
