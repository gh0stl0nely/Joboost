module.exports = function(sequelize, DataTypes) {

    var Application = sequelize.define("Application", {
        userName:{
            type: DataTypes.STRING
        },
        resumePath: {
            type: DataTypes.STRING
        },
        postID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    })
 return Application
}