const BLOG = require('../models/blog');
const USER = require('../models/user');

exports.create = async(req, res, next) => {
    try {
        const payload = req.body;
        payload.user = req.user._id;
        
        const blog = await BLOG.create(payload);

        return res.status(200).json({
            status: true,
            message: 'Blog created successfully',
            data: blog
        }) 
    } catch(error) {
        return res.status(500).json({
            status: false,
            message: 'Something wents wrong !!',
        })
    }
}

exports.blogs = async(req, res, next) => {
    try {
        const { skip = 0, limit = 10, search = "" } = req.query;
        const _condition = { isDeleted: false };

        // If logged user is admin then list all blocks, otherwise only that users blogs
        const userRole = await USER.findOne({ _id: req.user._id, isDeleted: false })
        .populate({ path: 'role', select: 'name'});

        if (userRole.role.name === 'user') {
            _condition.user = req.user._id;
        }

        // Filter on author, category
        if (search.trim().length > 0) {
            const regex = new RegExp(search, "i");
            _condition.$or = [{
                author: regex,
            },{
                category: regex
            }]; 
        }


        // Get all blogs
        const allBlogs = await BLOG.find(_condition, '-createdAt -updatedAt', { skip: Number(skip), limit: Number(limit) })
        .populate({ path: 'user', select: 'firstName lastName email'})

        return res.status(200).json({
            status: true,
            message: 'All Blogs fetched successfully',
            data: allBlogs
        }) 
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: 'Something wents wrong !!',
        })
    }
}

exports.update = async(req, res, next) => {
    try {
        const _id = req.params.id;
        const payload = req.body;
        const _query = { _id, isDeleted: false };

        const blog = await BLOG.findOneAndUpdate(_query, { $set: payload }, { new: true });
        return res.status(200).json({
            status: true,
            message: 'Blog updated successfully',
            data: blog
        })
    } catch(error) {
        return res.status(500).json({
            status: false,
            message: 'Something wents wrong !!',
        })
    }
}

exports.delete = async(req, res, next) => {
    try {
        const _id = req.params.id;
        const _query = { _id, isDeleted: false };
        const _delete = { $set: { isDeleted: true }};

        await BLOG.findOneAndUpdate(_query, _delete);
        return res.status(200).json({
            status: true,
            message: 'Blog deleted successfully',
        })        
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: 'Something wents wrong !!',
        })
    }
}