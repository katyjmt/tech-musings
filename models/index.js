const User = require('./Users');
const Post = require('./Posts');
const Comment = require('./Comments');

Post.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  as: 'post',
  foreignKey: 'post_id',
});

User.hasMany(Post, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };
