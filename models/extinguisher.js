const Sequelize = require('sequelize');

class Extinguisher extends Sequelize.Model {
  static initiate(sequelize) {
    Extinguisher.init({
        humidity:{
            type:Sequelize.FLOAT(10),
            allowNull:true,
        },
        temp:{
            type:Sequelize.FLOAT(10),
            allowNull:true,
        },
        press:{
            type:Sequelize.FLOAT(10),
            allowNull:true,
        },
        state:{
            type:Sequelize.STRING(10),
            allowNull:false,
        },
        Latitude:{
            type:Sequelize.FLOAT(20),
            allowNull:false,
        },
        longitude:{
            type:Sequelize.FLOAT(20),
            allowNull:false,
        }    
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Extinguisher',
      tableName: 'extinguishers',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
   db.Extinguisher.belongsTo(db.User);
  }
};

module.exports = Extinguisher;
