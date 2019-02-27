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
            type: DataTypes.DATE,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        image: {
            type: DataTypes.STRING,
        },
    });
};