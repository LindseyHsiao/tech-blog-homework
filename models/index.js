// import models 
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//create associations include foreign key and what happens to data on delete 

//post belongs to user
Post.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
})

//comments belong to user 
Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
})

//post has many comments
Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: 'CASCADE'
})

module.exports = { User, Post, Comment };
