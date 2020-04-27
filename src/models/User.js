const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) { //recebe a conexao com a base de dados
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    }, {
        sequelize //conexao com o bd
      })
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
    this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
  }
}

module.exports = User;