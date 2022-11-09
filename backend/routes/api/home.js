const Users = require('../../models/Users/users');
const Fields = require('./../../models/Users/fields');
const router = require('express').Router();

router.route('/').post(async(req, res) => {
  const { token } = req.body;
  const user = await Users.findById(token);
  if(user){
    let ids = [token], labels = [];
    const cats = await Fields.find().sort({ count: 'DESC' }).limit(2);
    const top = await Promise.all(cats.map(async i => {
      labels.push(i.name);
      const acc = await Users.aggregate([
        {
          $match: {
            _id: { $nin: ids }, doctor: true, fields: i.name
          }
        }, {
          $sample: { size: 3 }
        }, {
          $project: {
            name: 1,
            pic: 1,
            job: 1,
          }
        }
      ]);
      return acc;
    }));
    return res.json({
      stat: true,
      labels: labels,
      docs: top
    });
  }else{
    return res.json({
      stat: false
    });
  }
});

router.route('/find').post(async(req, res) => {
  const { token, keyword } = req.body;
  const user = await Users.findById(token);
  if(user){
    const regx = new RegExp(`${keyword.toLowerCase()}`, 'gim');
    const docs = await Users.aggregate([
      {
        $match: {
          name: { $regex: regx }, doctor: true, _id: { $ne: token }
        }
      }, {
        $sample: { size: 5 }
      }, {
        $project: {
          name: 1,
          pic: 1,
        }
      }
    ]);
    return res.json({
      stat: true,
      docs: docs
    });
  }else{
    return res.json({
      stat: false
    });
  }
});

router.route('/search').post(async(req, res) => {
  const { token, keyword } = req.body;
  const user = await Users.findById(token);
  if(user){
    const regx = new RegExp(`${keyword.toLowerCase()}`, 'gim');
    const docs = await Users.aggregate([
      {
        $match: {
          name: { $regex: regx }, doctor: true, _id: { $ne: token }
        }
      }, {
        $sample: { size: 15 }
      }, {
        $project: {
          name: 1,
          pic: 1,
          job: 1,
          fields: 1
        }
      }
    ]);
    return res.json({
      stat: true,
      docs: docs
    });
  }else{
    return res.json({
      stat: false
    });
  }
});

router.route('/account').post(async(req, res) => {
  const { token, accid } = req.body;
  const user = await Users.findById(token);
  if(user){
    const acc = await Users.findById(accid);
    if(acc){
      const account = {
        name: acc.name, 
        pic: acc.pic,
        job: acc.job,
        loaction: acc.location,
        fields: acc.fields,
        timestamp: acc.createdAt
      }
      return res.json({
        stat: true,
        found: true,
        user: account
      })
    }else{
      return res.json({
        stat: true,
        found: false
      });
    }
  }else{
    return res.json({
      stat: false
    });
  }
})

module.exports = router;