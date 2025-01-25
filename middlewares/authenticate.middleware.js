exports.isAuthenticated = (redirectUrl ="home") => (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        if (redirectUrl === "/") {
            res.render("home");
        } else if (redirectUrl === "home") {
            res.redirect("/");
        } else {
            res.render(redirectUrl);
        }
    }
}

exports.isSuperAdmin = (req, res, next) => {
    if (true) {
        next();
    } else {
        err = new Error("Not a super admin");
        res.status = 403;
        next(err)
    }
}

exports.isUser = (req, res, next) => {};