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
    // res.locals.flash = _.clone(req.session.flash);
    res.view();
    // req.session.flash = {};
  },
  create: function (req, res, next) {
       User.create( req.allParams(), function (err, user) {
        if (err) {
            req.session.flash = {
            err: err
          }
          return res.redirect('/user/new')
        }
        return res.redirect('/user/show/' + user.id);
       }, { fetch: true })

      
  },

  // render the profile view
  show: function (req, res, next) {
    User.findOne(req.params, function foundUser(err, user) {
      if (err) { 
          return;
      }
      if (!user) return;
      res.view({
          user: user
      });
    }, { fetch: true });
  },

  index: function (req, res, next) {
    // Get an array of all users in the User collection (e.g table)
    User.find(function foundUsers (err, users) {
      if (err) return next(err);
      res.view({
          users: users
      });
    }); 
  },

  edit: function (req, res, next) {

    // Find the user from the id passed in via params
    User.findOne(req.params, function foundUser (err, user) {
        if (err) return next(err);
        if (!user) return next('User doesnt exist.');

        res.view({
            user: user
        });
    }, { fetch: true });
  },
  // Process the info from edit view
  update: function (req, res, next) {
      User.update(req.params, req.allParams(), function userUpdated (err) {
          if (err) {
              return res.redirect('/user/edit/' + req.params['id']);
          }
          
          res.redirect('/user/show/' + req.params['id']);
      }, { fetch: true });
  },

  destroy: function (req, res, next) {
    User.findOne(req.params, function foundUser (err, user) {
      if (err) return next(err);

      if (!user) return next('User doesnt exist.');

      User.destroy(req.params, function userDestroyed(err) {
          if (err) return next(err);
      });

      res.redirect('/user/index');
    });
  }

};

