const Sequelize = require('sequelize');

class Extinguisher extends Sequelize.Model {
  static initiate(sequelize) {
    Extinguisher.init({
        humidity:{ //0~100%
            type:Sequelize.FLOAT(10),
            allowNull:true,
        },
        temp:{ //-30~70celsius
            type:Sequelize.FLOAT(10),
            allowNull:true,
        },
        press:{ //0~20kg/cm^3
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
        /**
         * TODO::
         *  Latitude소문자로 변경
         *  제품명
            제품회사
            정상압력범위
            소화기 상태(안전,점검필요)로 변경
            img
            description
         *  */    
        
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
