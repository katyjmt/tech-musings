const User = require('./Users');
const Post = require('./Posts');
const Comment = require('./Comments');

Post.hasOne(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL', // CHECK THIS WHEN YOU COME BACK TO IT
})