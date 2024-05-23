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
    await Extinguisher.create(extinguisher).then((el)=>{
      console.log(el.dataValues.id);
      res.redirect(`/extinguishers?id=${el.dataValues.id}`);
    });
    }catch(error){
        console.error(error);
        return res.redirect(`/extinguishers?error=${error}`);
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
      res.render('extinguishers/management',{extinguishers});
    }catch(err){
      console.error(err);
      return res.redirect(`/extinguishers/?error=${error}`);
    }
};

exports.patchExtinguisher = async (req,res)=>{
  try{
    let extinguisher = req.body;
    console.log(extinguisher)
    // /**소수점 자릿수 제한 */
    //console.log(parseFloat(extinguisher.latitude).toFixed(9))
    extinguisher.latitude = parseFloat(extinguisher.latitude).toFixed(9);
    extinguisher.longitude = parseFloat(extinguisher.longitude).toFixed(9);
    // /**제어문자 제거 */
    extinguisher.desc.replace(/[\x00-\x1F\x7F]/g, "");
    extinguisher.name.replace(/[\x00-\x1F\x7F]/g, "");
    extinguisher.manufacturer.replace(/[\x00-\x1F\x7F]/g, "");
    // /**소화기의 관리인 */
    extinguisher.UserId=req.user.id;
    
    // const el = await Extinguisher.findOne({where:extinguisher['extinguisher-id'][0]});
    // console.log(el);
    const result = await Extinguisher.update(extinguisher,
      {where:{id:extinguisher['extinguisher-id']}}).then(()=>{
        return res.json({url:'/extinguishers?res=1'});
      })
    }catch(error){
        console.error(error);
        return res.redirect(`/registration?error=${error}`);
    }
}

exports.deleteExtinguisher = async (req,res)=>{
  try{
    const id = req.body.id.match(/\d+/)[0]; // #소화기"숫자"에서 숫자만 추출
    await Extinguisher.destroy({where:{id:id}}).then(()=>{
      return res.json({url:'/extinguishers?res=1'});
    })
  }catch(error){
    console.error(error);
    return res.redirect(`/registration?error=${error}`);
  }
}

