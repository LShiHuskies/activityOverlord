/**
 * SessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    'new': function(req, res) {
    //   var oldDateObj = new Date();
    //   var newDateObj = new Date(oldDateObj.getTime() * 60000);
    //   req.session.cookie.expires = newDateObj;
    //   req.session.authenticated = true;
    //   console.log(req.session);
      res.view('session/new');
    },
    create: function(req, res, next) {
      if (!req.param('email') || !req.param('password')) {
        var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'You must enter both a username and password.'}];
        req.session.flash = {
            err: usernamePasswordRequiredError
        }
        res.redirect('/session/new');
        return;
      }

      User.findOne(req.param('email')).exec(function(err, user) {
          if (err) return next(err);

          if (!user) {
            var noAccountError = [{name: 'noAccount', message: 'The email address ' + req.param('email') + ' not found.'}]
            req.session.flash = {
                err: noAccountError
            };
            res.redirect('/session/new');
            return;
          }

          require('bcrypt').compare(req.param('password'), user.encryptedPassword, function(err, valid) {
            if (err) return next(err);
  
            if (!valid) {
              var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Invalid username nad password combination.'}];
              req.session.flash = {
                  err: usernamePasswordMismatchError
              }
              res.redirect('/session/new');
              return;
            }

            // Log user in
            req.session.authenticated = true;
            req.session.User = user;

            if (req.session.User.admin) {
             res.redirect('/user/index');
             return;
            }

            // Redirect to their profile page
            res.redirect('/user/show/' + user.id);
        });
      });

    },

    destroy: function(req, res, next) {
      req.session.destroy();

      res.redirect('/session/new');
    }
  

};

