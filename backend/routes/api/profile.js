const Users = require('../../models/Users/users');
const Fields = require('./../../models/Users/fields');
const router = require('express').Router();
const formidable = require('formidable');
const fs = require('fs');

router.route('/').post(async(req, res) => {
  const { token } = req.body;
  const user = await Users.findById(token);
  if(user){
    return res.json({
      stat: true,
      user: user
    });
  }else{
    return res.json({
      stat: false
    });
  }
});

router.route('/init').post(async(req, res) => {
  const { token } = req.body;
  const user = await Users.findById(token);
  const fields = await Fields.find().sort({ count: 'DESC' });
  const processed = await Promise.all(fields.map(i => i.name));
  if(user){
    return res.json({
      stat: true,
      user: user,
      fields: processed
    });
  }else{
    return res.json({
      stat: false
    });
  }
})

router.route('/edit').post(async(req, res) => {
  const formData = new formidable.IncomingForm();
  formData.parse(req, async (error, fields, files) => {
    const { token, name, job, location, bio } = fields;
    const field = JSON.parse(fields.field);
    const ofield = JSON.parse(fields.ofield);
    const user = await Users.findById(token);
    let pic = user.pic;
    if(files.pic){
      const time = Date.now();
      var newPath = "profiles/" + String(token) + "_pic" + time + ".jpeg";
      fs.rename(files.pic.filepath, newPath, (err) => {
        return;
      });
      pic = "profiles/"+ String(token) + "_pic" + time + ".jpeg";
    }

    await Promise.all(field.map(async i => {
      if(!ofield.includes(i)){
        await Fields.findOneAndUpdate({ name: i }, { $inc: { count: 1 }}, { new: true });
      }
    }));

    await Promise.all(ofield.map(async i => {
      if(!field.includes(i)){
        await Fields.findOneAndUpdate({ name: i }, { $inc: { count: -1 }}, { new: true });
      }
    }));

    const updater = await Users.findByIdAndUpdate(token, { $set: { name: name, job: job, location: location, bio: bio, fields: field, pic: pic } });
    if(updater){
      return res.json({
        stat: true
      });
    }
  });
});


module.exports = router;