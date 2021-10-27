const jwt = require("jsonwebtoken");

const User = require("../../models/User");
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

        let existingUser = await User.findOne({
            email,
        });

        if (!existingUser || !existingUser.authenticate(password)) {
            return res.status(200).json({
                success: false,
                message: "User not found. Please check credentials.",
            });
        }

        existingUser = existingUser.toJSON();
        delete existingUser.salt;
        delete existingUser.encryptedPassword;

        const token = jwt.sign(
            {
                _id: existingUser._id,
            },
            process.env.SECRET
        );

        return res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token,
                user: existingUser,
            },
        });
    } catch (error) {
        logger.error(error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

module.exports = UserSignIn;
