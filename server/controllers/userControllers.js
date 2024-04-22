const User = require("../models/userModel")
const HttpError = require("../models/errorModel");
const bcrypt = require("bcrypt")
const fs = require('fs')
const { v4: uuid } = require('uuid')
const path = require('path')
const jwt = require("jsonwebtoken")

// Creating jsonwebtoken method
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}




// ================= Register a New User
// POST : api/users/registerz
// UnProtected : 
const registerUser = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body

    try {
        const user = await User.signup(name, email, password, confirmPassword)

        const token = createToken(user._id)

        if(user) {
            res.status(201).json({user, token})
        }
    }catch (error) {
        res.status(500).json({ message: error.message })
        // return next(new HttpError("User Registration failed", 422))
    }
}







// ================== Login a Register User 
// POST : api/users/:id
// Protected : 
const loginUser = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)

        if(user) {
            res.status(201).json({user, token})
        }
    }catch (error) {
        res.status(500).json({ message: error.message })
    }
}










// =================== User-Profile 
// POST : api/users/:id
// Protected : 
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password")
        if (!user) {
            return next(new HttpError("User not found", 422))
        }
        res.status(201).json(user)
    }
    catch (err) {
        return next(new HttpError(err))
    }
}









// =============== Change User Avatar (Profile-Picture) 
// POST : api/users/change-avatar
// Protected : 
const changeAvatar = async (req, res, next) => {
    try {
        // Find user from database:
        const user = await User.findById(req.user.id)

        if (!user) {
            return next(new HttpError("User not found", 404));
        }

        if (!req.files || !req.files.avatar) {
            return next(new HttpError("Please upload an image", 422))
        }

        const avatar = req.files.avatar;

        // check file size:
        if (avatar.size > 1500000) {
            return next(new HttpError("Image size is too large.Should be less than 1500kb", 422))
        }

        let filename = avatar.name;
        let splittedFilename = filename.split(".");
        let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1];

        avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err))
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: newFilename }, { new: true })
            if (!updatedAvatar) {
                return next(new HttpError("Avatar couldn't be changed", 422))
            }
            res.status(201).json(updatedAvatar)
        })
    } catch (err) {
        return next(new HttpError(err))
    }
}









// =============== Edit User Details (from profile) 
// POST : api/users/edit-user
// Protected : 
const editUser = async (req, res, next) => {
    try {
        const { name, email, currentPassword, newPassword, confirmNewPassword } = req.body;
        if (!name || !email || !currentPassword || !newPassword) {
            return next(new HttpError("Please fill all the fields", 422))
        }

        // Get user from database:
        const user = await User.findById(req.user.id)
        if (!user) {
            return next(new HttpError("User not found", 422))
        }

        // Make sure new email doesn't already exist:
        const emailExists = await User.findOne({ email })
        // We want to update other details without changing email (which is a unique id because
        // we use to login it.)
        if (emailExists && (emailExists._id !== req.user.id)) {
            return next(new HttpError("Email already exists", 422))
        }

        // Compare current password with database password:
        const validateUserPassword = await bcrypt.compare(currentPassword, user.password)
        if (!validateUserPassword) {
            return next(new HttpError("Invalid Current Password", 422))
        }

        // Compare New Passwords:
        if (newPassword !== confirmNewPassword) {
            return next(new HttpError("New Passwords do not match", 422))
        }

        // Hash new Password:
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        // Update user info in Database:
        const newInfo = await User.findByIdAndUpdate(req.user.id, { name, email, password: hash },
            { new: true })
        res.status(200).json(newInfo)

    }
    catch(err) {
        return next(new HttpError(err))
    }
}







// ================= Get Authors:
// POST : api/users/edit-user
// UnProtected : 
const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select("-password")
        res.status(201).json(authors)
    }
    catch (err) {
        return next(new HttpError(err))
    }
}



module.exports = { registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors }



















// ================= Register a New User
// POST : api/users/register
// UnProtected : 
// const registerUser = async (req, res, next) => {
//     try {
//         const { name, email, password, password2 } = req.body;

//         if (!name || !email || !password) {
//             return next(new HttpError("Please fill all the fields", 422))
//         }

//         const newEmail = email.toLowerCase();

//         const emailExists = await User.findOne({ email: newEmail })
//         if (emailExists) {
//             return next(new HttpError("Email Already Exists", 422))
//         }

//         if ((password.trim()).length < 6) {
//             return next(new HttpError("Password must be atleast 6 characters", 422))
//         }

//         if (password !== password2) {
//             return next(new HttpError("Passwords do not match", 422))
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);


//         const newUser = new User({
//             name,
//             email: newEmail,
//             password: hashedPassword
//         })
//         res.status(201).json(`New User ${newUser.email} registered.`)

//     }
//     catch (err) {
//         return next(new HttpError("User Registration failed", 422))
//     }
// }

















// ================== Login a Register User 
// POST : api/users/:id
// Protected : 
// const loginUser = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return next(new HttpError("Please fill all the fields", 422))
//         }

//         const newEmail = email.toLowerCase();

//         const user = await User.findOne({ email: newEmail })

//         if (!user) {
//             return next(new HttpError("User not found", 422))
//         }

//         const comparePass = await bcrypt.compare(password, user.password)
//         if (!comparePass) {
//             return next(new HttpError("Invalid Credentials", 422))
//         }

//         const { _id: id, name } = user;
//         const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "1d" })
//         res.status(201).json({ token, id, name })

//     }
//     catch (err) {
//         return next(new HttpError("Login failed.Please check your credentials", 422))
//     }
// }