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
    res.locals.flash = _.clone(req.session.flash);
    res.view();
    // req.session.flash = {};
  },
  'create': function (req, res, next) {
       User.create( req.allParams(), function (err, user) {
        if (err) {
            req.session.flash = {
            err: err
          }
          return res.redirect('/user/new')
        }
        return res.redirect('/user/' + user.id);
       }, { fetch: true })

      
  }

};

