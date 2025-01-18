import { signinBodyValidator, signupBodyValidator, updateBodyValidator } from '../config/validation.js';
import { User } from '../models/user.model.js'
import { Account } from '../models/account.model.js'


const signup = async (req, res) => {
    try {

        const { success } = signupBodyValidator.safeParse(req.body)

        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body || Incorrect inputs"
            })
        }

        const { username, firstName, lastName, password } = req.body;

        /*
          --- check for existed user
          --- 
        */

        const existedUser = await User.findOne({
            $or: [{ username }, { firstName }, { lastName }]
        })

        if (existedUser) {
            return res.status(400).json({
                success: false,
                message: "User already existed"
            })
        }

        const user = await User.create({
            username,
            firstName,
            lastName,
            password
        })

        const createdUser = await User.findById(user._id).select(
            "-password"
        )

        if (!createdUser) {
            return res.status(500).json({ success: false, message: "Something went wrong while registering user" })
        }

        /// ----- Create new account ------

        await Account.create({
            user: createdUser._id,
            balance: 1 + Math.random() * 10000
        })

        return res.status(201).json({
            success: true,
            user: createdUser,
            message: "User registered successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


const signin = async (req, res) => {
    try {

        const { success } = signinBodyValidator.safeParse(req.body)

        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body || Incorrect inputs"
            })
        }

        const { username, password } = req.body;

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }



        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }

        const accessToken = user.generateAccessToken();

        let loggedInUser = await User.findById(user._id).select("-password");

        if (!loggedInUser) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong while logging in"
            })

        }

    

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json({
                success: true,
                user: { loggedInUser, accessToken },
                message: "User logged in successfully"
            })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const logout = async (req, res) => {
   
    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json({
            success: true,
            message: "User logged out successfully"
        });
}


const updateUser = async (req, res) => {
    try {
        const { success } = updateBodyValidator.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body || Incorrect inputs"
            })
        }



        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }


        const updatedUser = await User.updateOne({ _id: req.user._id }, req.body);

        if (!updatedUser) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong while updating user"
            })
        }

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "User updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


const searchUser = async (req, res) => {
    try {

        const filter = req.query.filter?.trim() || "";

        const users = await User.find({
            $or: [
                { firstName: { $regex: `${filter}`} },
                { lastName: { $regex: `${filter}` } },
                { username: { $regex: `${filter}` } }
            ]
        }).select("-password")

    
        return res.status(200).json({
            success: true,
            users,
            message: users.length > 0 ? "Users found successfully" : "No users found"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getCurrentUser = async (req, res) => {
    return res
    .status(200)
    .json({
        success: true,
        data: req.user,
        message: "user fetched successfully"
    })
}

export {
    signup,
    signin,
    updateUser,
    searchUser,
    logout,
    getCurrentUser
}