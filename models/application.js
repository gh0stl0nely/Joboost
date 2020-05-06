module.exports = function(sequelize, DataTypes) {

    var Application = sequelize.define("Application", {
        userName:{
            type: DataTypes.STRING
        },

    })


    // Application has to belong to a post
        Application.associate = function(models) {
            Application.belongsTo(models.Post, {
                foreignKey: {
                    allowNull: false
                  }
            })
        }


 

// ******************************************************************************
// Not entierly sure how the resume part will work in terms of the db
// I put some temp code to connect the it however
// ******************************************************************************

    // Application has to belong to a resume
        // Application.associate = function(models){
        //     Application.belongsTo(models.Resume,{
        //         foreignKey: {
        //             allowNull: false
        //           }
        //     })
        // }

 return Application
}