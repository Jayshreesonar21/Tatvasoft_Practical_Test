const BLOG = require('../models/blog')
const USER = require('../models/user')

exports.isExist = async(req, res, next) => {
    try {
        const _id = req.params.id;
        const user = req.user;

        const record = await BLOG.findOne({ _id, isDeleted: false });
        if(!record) return res.status(404).json({ status: false, message: 'No record found for given id' });
        
        const userRole = await USER.findOne({ _id: user._id, isDeleted: false })
        .populate({ path: 'role', select: 'name'})

        if(userRole.role.name === 'user' && JSON.stringify(record.user) !== JSON.stringify(user._id)) {
            return res.status(403).json({ status: false, message: 'You do not have sufficient access permission' });
        }
        next();
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: 'Something wents wrong !!',
        })        
    }
}
