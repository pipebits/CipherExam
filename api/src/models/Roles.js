const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema(
    {
        role: { type: String, required: true },
        permissions: [
            { type: String, required: true },
        ]
    },
    { collection: 'Roles' }
);

RoleSchema.methods.toJSONFor = function () {
    return {
        role: this.role,
        permissions: this.permissions,
        id: this._id
    };
};

module.exports = mongoose.model('Roles', RoleSchema);