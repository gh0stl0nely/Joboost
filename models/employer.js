/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {

  var Employer = sequelize.define("Employer", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },

    company: {
      type: DataTypes.STRING,
      allowNull: false
    },

    logo_path: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });


  // Associating Employer with Post
  // When an Employer is deleted, also delete any associated Posts
  Employer.associate = function(models){
    Employer.hasMany(models.Post,{
      onDelete: "cascade"
    });
  };

  return Employer;
};

// This might belong to the login part of the back-end. Not sure if needed this part. If not, adjust the
// post.js file to NOT INCLUDE this part.
// They currently link together