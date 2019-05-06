module.exports = function (req, res, ok) {
    // User is allowed, proceed to controller
    if (req.session.User && req.session.admin) {
        return ok();
    }
    else {
        var requireAdminError = [{name: 'requireAdminError', message: 'You must be an admin'}];
        req.session.flash = {
          err: requireAdminError
        }
        res.redirect('/session/new');
        return;
    }
};
