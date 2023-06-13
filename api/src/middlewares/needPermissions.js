const Users = require('../models/Users')
const Roles = require('../models/Roles')

const needPermissions = (perms) => {
    return async function (req, res, next) {
        if (!req.session.loggedin) return res.status(401).json({ success: false, result: null, errors: ['You need an account'] })

        var [user_permissions, user_roles] = await Users.findOne({ _id: req.session.user.id }).then(user => {
            return [user.permissions, user.roles]
        }).catch(next)

        var role_permissions = await Roles.find({ role: user_roles }).then(roles => {
            return [].concat.apply([], roles.map(role => role.permissions))
        }).catch(next)


        var permissions = [...user_permissions, ...role_permissions]

        var hasPerms = permissions.filter(_perm => {
            return perms.includes(_perm)
        }).length > 0

        if (!hasPerms) return res.status(401).json({ success: false, result: null, errors: ['Insuficient privileges'] })

        next()
    }
}

module.exports = needPermissions