const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BlogSchema = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    publisedDate: { type: Date, require: true },
    modifyDate: { type: Date, require: true },
    status: { type: String, enum: ['Publish', 'Unpublish'], require: true },
    category: { type: String, require: true },
    author: { type: String, require: true },
    user: { type: ObjectId, ref: "user", require: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true
})

module.exports = mongoose.model('blog', BlogSchema, 'blogs')