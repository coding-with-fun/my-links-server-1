const { check, validationResult } = require("express-validator");

const checks = {
    // For Sign In and Sign Up
    checkName: check("name")
        .not()
        .trim()
        .isEmpty()
        .withMessage("Name is required."),
    checkUserName: check("username")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Username must be at least 5 characters long."),
    checkEmail: check("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email."),
    checkPassword: check("password")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long."),
    checkConfirmPassword: check("confirmPassword")
        .trim()
        .isLength({ min: 5 })
        .withMessage(
            "Confirmation password must be at least 5 characters long."
        )
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords does not match.");
            }
            return true;
        }),
};

const signUpCheckReq = () => [
    checks.checkName,
    checks.checkUserName,
    checks.checkEmail,
    checks.checkPassword,
    checks.checkConfirmPassword,
];

const signInCheckReq = () => [checks.checkEmail, checks.checkPassword];

const returnErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg,
        });
    }
    next();
};

module.exports = {
    validateSignUp: [signUpCheckReq(), returnErrors],
    validateSignIn: [signInCheckReq(), returnErrors],
};
