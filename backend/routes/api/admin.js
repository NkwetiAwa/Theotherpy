const Users = require('../../models/Users/users');
const Fields = require('./../../models/Users/fields');
const router = require('express').Router();

router.route('/').post(async(req, res) => {});

router.route('/fields').post(async(req, res) => {
  const { names } = req.body;
  await Promise.all(names.map(async i => {
    const newField = new Fields();
    newField.name = i;
    await newField.save();
  }));
  return res.send({
    stat: true
  });
});

module.exports = router;