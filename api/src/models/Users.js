const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        hash: { type: String },
        salt: { type: String },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        state: { type: Number, default: 1 },
        invalidLoginAttemps: { type: Number },
        roles: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Roles' }
        ],
        permissions: [
            { type: String, required: true }
        ],
        lastLogin: { type: Date },
        lockedUntil: { type: Date },
        passwordChangedAt: { type: Date }
    },
    { collection: 'Users', timestamps: true }
);

UserSchema.pre('save', function (next) {
    if (this.isNew) this.roles.push("Teacher")

    next()
})

UserSchema.methods.giveRole = function (role) {
    if (!this.roles.includes(role)) this.roles.push(role)

    return this.save()
}

UserSchema.methods.removeRole = function (role) {
    if (this.roles.includes(role)) this.roles.filter(_role => _role !== role)

    return this.save()
}

UserSchema.methods.givePermission = function (permission) {
    if (!this.permissions.includes(permission)) this.rpermissionsoles.push(permission)

    return this.save()
}

UserSchema.methods.removePermission = function (permission) {
    if (this.permissions.includes(permission)) this.permissions.filter(_permission => _permission !== permission)

    return this.save()
}

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
};

UserSchema.methods.verifyPassword = function (password) {
    return (crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex') == this.hash)
}

UserSchema.toJSONFor = function () {
    return {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
    }
}

UserSchema.toAdminJSONFor = function () {
    return {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        state: this.state,
        invalidLoginAttemps: this.invalidLoginAttemps,
        roles: this.roles,
        permissions: this.permissions,
        lastLogin: this.lastLogin,
        lockedUntil: this.lockedUntil,
        passwordChangedAt: this.passwordChangedAt,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    }
}

module.exports = mongoose.model('Users', UserSchema);