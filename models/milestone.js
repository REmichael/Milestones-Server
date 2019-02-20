module.exports = function(sequelize, DataTypes) {
    return sequelize.define('milestones', {
        childName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        milestone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    });
};