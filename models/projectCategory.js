const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ProjectCategory extends Model {}

ProjectCategory.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'projectCategory',
  tableName: 'project_categories',
});

module.exports = ProjectCategory;
