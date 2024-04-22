const { Schema, model } = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    posts: {
        type: Number,
        default: 0,
    }
})



//creating a static signup method for the user
userSchema.statics.signup = async function (name, email, password, confirmPassword) {

    if (!name || !email || !password || !confirmPassword) {
        throw Error('All fields must be filled')
    }

    const validEmail = validator.isEmail(email)
    if (!validEmail) {
        throw Error('Email is not valid')
    }

    // const strongPassword = validator.isStrongPassword(password)
    // if (!strongPassword) {
    //     throw Error('Password is not strong enough')
    // }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already in use')
    }

    if (password !== confirmPassword) {
        throw Error('Passwords do not match')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)


    const user = await this.create({ name, email, password: hash })
    return user
}



//creating a static login method for the user
userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Email not found in our records!')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}





module.exports = model('User', userSchema)
