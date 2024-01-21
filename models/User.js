// Import ORM package and use that for database connection.
// Import bcrypt for password encryption
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Method for user class to check on the password
class User extends Model { 
     checkPassword(loginPw) {
          return bcrypt.compareSync(loginPw, this.password);
     }
}

// We will need first_name and last_name if we must display their name after login. If not we can remove that.
User.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement:true,
          },
          first_name: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          last_name: {
               type: DataTypes.STRING,
               allowNull:false,
          },
          username: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
               validate: {
                    isEmail:true,
               },
          },
          password: {
               type: DataTypes.STRING,
               allowNull: false,
               validate: {
                    len: [8],
                    isAlphanumeric:true,
               },
          },
     },
     {
          hooks: {
               beforeCreate: async (newUserData) => {
               newUserData.password = await bcrypt.hash(newUserData.password, 10);
               return newUserData;
               },
          },
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName:'user',
     }
);

module.exports = User;
