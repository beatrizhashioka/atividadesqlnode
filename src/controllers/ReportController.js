const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
  async show(req, res) {
    // Encontrar todos usuários que tem email que termina com @rocketseat.com.br
    // Desses usuários eu quero buscar todos que moram na rua "Rua Gue"
    // Desses usuários eu quero buscar as tecnologias que começam com React

    const users = await User.findAll({ //busca por todos os usuários 
      attributes: ['name', 'email'], //o que será retornado
      where: {
        email: {
          [Op.iLike]: '%@rocketseat.com.br' //ilike é um operador case insensitive
        }
      },
      include: [
        {
          association: 'addresses',
          where: {
            street: 'Rua Guilherme Gembala'
          }
        },
        {
          association: 'techs',
          required: false,
          where: {
            name: {
              [Op.iLike]: 'React%'
            }
          }
        },
      ]
    })

    return res.json(users);
  }
};