// create the associations between the User model, Blog model, Comment model
const router = require('../controllers');
const Blog = require('./Blog')
const Comment = require('./Comment')
const User = require('./User')

//comment belongs to user
Comment.belongsTo(User, {
    foreignKey: ""
});

//blog has many commments
Blog.hasMany(Comment, {
    foreignKey:""
});

//blog belongs to user
Blog.belongsTo(User, {
    foreignKey:""
});

module.exports = {User, Blog, Comment }

