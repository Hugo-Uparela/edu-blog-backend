const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Vote', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isIn: [[-1, 1]] }
    },
  });
};