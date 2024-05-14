const Sequelize = require('sequelize');

class Extinguisher extends Sequelize.Model {
  static initiate(sequelize) {
    Extinguisher.init({
        humidity:{ //0~100%
            type:Sequelize.FLOAT(5),
            allowNull:true,
        },
        temp:{ //-30~70celsius
            type:Sequelize.FLOAT(5),
            allowNull:true,
        },
        press:{ //0~20kg/cm^3
            type:Sequelize.FLOAT(5),
            allowNull:true,
        },
        state:{
            type:Sequelize.ENUM('안전','점검필요'),
            allowNull:false,
        },
        latitude:{
            type:Sequelize.DOUBLE(20,10), //총 20자리수, 소수점이하10자리까지
            allowNull:false,
        },
        longitude:{
            type:Sequelize.DOUBLE(20,10), 
            allowNull:false,
        },
        manufacturer:{
            type:Sequelize.STRING(20),
            allowNull:true
        },
        date:{ //제조일
            type:Sequelize.DATE(),
            allowNull:true,
        },
        name:{
            type:Sequelize.STRING(20),
            allowNull:true,
        },
        img:{
            type:Sequelize.STRING(200),
            allowNull:(true),
        },
        desc:{
            type:Sequelize.STRING(200),
            allowNull:(true),
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
