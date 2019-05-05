/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
//   attributes: {
//     name: {
//       type: 'string',
//       required: true
//     },
//     title: {
//       type: 'string'
//     },
//     email: {
//       type: 'string',
//       email: true,
//       required: true,
//       unique: true
//     },
//     encryptedPassword: {
//       type: 'string'
//     },
//   },
  'new': function(req, res) {
    res.view();
  },
  create: function (req, res, next) {
      User.create( req.body, function userCreated (err, user) {
          if (err) return next(err);
          
          res.json(user);
      });
  }


};

