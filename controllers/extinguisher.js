const Extinguisher = require('../models/extinguisher');

exports.registerExtinguisher = async (req,res)=>{
  try{
    let extinguisher = req.body;
    /**소수점 자릿수 제한 */
    console.log(parseFloat(extinguisher.latitude).toFixed(9))
    extinguisher.latitude = parseFloat(extinguisher.latitude).toFixed(9);
    extinguisher.longitude = parseFloat(extinguisher.longitude).toFixed(9);
    /**제어문자 제거 */
    extinguisher.desc.replace(/[\x00-\x1F\x7F]/g, "");
    extinguisher.name.replace(/[\x00-\x1F\x7F]/g, "");
    extinguisher.manufacturer.replace(/[\x00-\x1F\x7F]/g, "");
    /**소화기의 관리인 */
    extinguisher.UserId=req.user.id;
    /**storage에 저장된 img경로 */
    extinguisher.img=req.file.path;
    // extinguisher=extinguisher.map((el)=>{
    //         el.UserId=req.user.id;
    //         el.img=req.file.path;
    //         return el;
    // });
    // await Extinguisher.bulkCreate(extinguisher)
    const result = await Extinguisher.create(extinguisher);
    console.log(result.dataValues.id);
    res.status(200).redirect(`/extinguisher/register?id=${result.dataValues.id}`);
    }catch(error){
        console.error(error);
        return res.redirect(`/?error=${error}`);
    }
}

exports.management = async (req,res)=>{
    try{
      let extinguishers = await Extinguisher.findAll(
        {where:{UserId:req.user.id}}
      );
      extinguishers = extinguishers.map((el)=>{
          return el.dataValues;
      });
      extinguishers=JSON.stringify(extinguishers);
      console.log(extinguishers);
      res.render('extinguishers/management',{extinguishers});
    }catch(err){
      console.error(err);
      return res.redirect(`/?error=${error}`);
    }
  };