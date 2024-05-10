const Extinguisher = require('../models/extinguisher');
const User = require('../models/user');
exports.registerExtinguisher = async (req,res)=>{
    let extinguisher = req.body;
    extinguisher=extinguisher.map((el)=>{
            el.UserId=req.user.id;
            //TODO::humidity & temp & press 단위 조정
            return el;
    });
    console.log(extinguisher);
    try{
        await Extinguisher.bulkCreate(extinguisher)
        res.status(200).send("등록완료");
    }catch(error){
        console.error(error);
        next(error);
    }
}