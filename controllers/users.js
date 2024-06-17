const User = require("../models/user");


module.exports.rendersignupForm =(req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup=async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                // If there is an error during login, pass it to the next middleware
                return next(err);
            }
            req.flash("success", "You are logged in, welcome!");
            return res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


module.exports.renderloginForm=(req, res) => {
    res.render("users/login.ejs");
};

module.exports.login=(req, res) => {
    req.flash("success", "Welcome back to wanderlust!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};


module.exports.logout=(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};