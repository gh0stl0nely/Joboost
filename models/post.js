module.exports = function(sequelize, DataTypes) {

    // Table for when an employer creates a new job posting
    var Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
          },

          contactEmail: {
            type: DataTypes.STRING,
            allowNull: false,
          },

          contactNumber: {
            type: DataTypes.STRING,
            allowNull: false,
          },

          city: {
            type: DataTypes.STRING,
          },

          province: {
            type: DataTypes.STRING,
          },

          industry: {
            type: DataTypes.STRING,
          },
          resumes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
          },
          employerID: {
            type: DataTypes.INTEGER,
            allowNull: false
          }

    })
    
    return Post;
};
