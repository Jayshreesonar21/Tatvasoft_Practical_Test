const mongoose = require('mongoose');
const bcryptJs = require('bcryptjs');

const { bcryptSalt } = require('../config')

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    dob: { type: Date, require: true },
    role: { type: ObjectId, ref: "role", require: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true
});

/**
 * Encrypt password
 */
UserSchema.pre(/^save$/,async function(next){
    const hash = await bcryptJs.hash(this.password, parseInt(bcryptSalt));
    this.password = hash;
    next();
})

/**
 * Check email is unique or not
 */
UserSchema.pre(/^save$/,async function(next){
    // const user = await mongoose.model('user').findOne({ email: this.email });
    // if (user) throw new Error("::::::: Hello ::::::::")

    next();
})

module.exports = mongoose.model('user', UserSchema, 'users')