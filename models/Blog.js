// this model needs title, contents

// blog has an id
//title contents

const { Model, DataTypes, STRING, INTEGER } = require('sequelize');

const sequelize = require('../config/connection.js');

class Blog extends Model { }

Blog.init(
    {
        // define columns
        id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: STRING,
            allowNull: false,
        },
        contents: {
            type: STRING,
            allowNull: false,
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    }
);

module.exports = Blog;