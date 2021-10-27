const logger = require("../../utils/logger");

/**
 * Sign In route
 * @type    POST
 * @route   /api/auth/signin
 * @access  Public
 */
const UserSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        logger.info(email, password);

        return res.status(200).json({
            message: "User signed in successfully.",
            data: {
                email,
                password,
            },
        });
    } catch (error) {
        logger.error(error.message);

        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};

module.exports = UserSignIn;
