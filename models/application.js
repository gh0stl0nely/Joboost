module.exports = function (sequelize, DataTypes) {

    var Application = sequelize.define("Application", {
        userName: {
            type: DataTypes.STRING
        },
        resumePath: {
            type: DataTypes.STRING
        },
        // postID: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },

    })

    Application.associate = function (models) {
        Application.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Application
}