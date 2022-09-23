const bcryptJs = require('bcryptjs');

const ROLE = require('../models/role');
const USER = require('../models/user');

const { generateJwt } = require('../utils/helper');

exports.register = async(req, res, next) => {
    try {
        const payload = req.body;
        const role = await ROLE.findOne({ name: new RegExp('user','i') }, '_id');

        if (!role) return res.status(404).json({ status: false, message: 'It seems that the system role are not generated yet..' });

        payload.role = role._id;
        let user = await USER.create(payload);

        // Create JWT Token
        const body = { _id: user._id, firstName: user.firstName, email: user.email };
        const token = generateJwt({ user: body });
        user = JSON.parse(JSON.stringify(user));
        user.token = 'Bearer '+token;
        
        return res.status(200).json({
            status: true,
            message: 'Registration done successfully',
            data: user
        })
    } catch(error) {
        return res.status(500).json({
            status: false,
            message: 'Something wents wrong !!',
        })
    }
}

exports.login = async(req, res, next) => {
    try {
        const payload = req.body;

        // Check Email-id exist or not
        let user = await USER.findOne({ email: payload.email, isDeleted: false });
        if (!user) return res.status(422).json({ status: false, message: 'Email-id does not exist' });

        // Check payload password and databse password are same or not
        const isMatch = await bcryptJs.compare(payload.password, user.password);
        if (!isMatch) return res.status(422).json({ status: false, message: 'Invalid email or password !!' });

        // Create JWT Token
        const body = { _id: user._id, firstName: user.firstName, email: user.email };
        const token = generateJwt({ user: body });
        user = JSON.parse(JSON.stringify(user));
        user.token = 'Bearer '+token;

        return res.status(200).json({
            status: true,
            message: 'Login done successfully',
            data: user
        })       

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: 'Something wents wrong !!',
        })
    }
}