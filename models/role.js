const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: { type: String, require: true },
});

module.exports = mongoose.model('role', RoleSchema, 'roles')
