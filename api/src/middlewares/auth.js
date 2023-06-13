function required(req, res, next) {
    if (!req.session.loggedin) return res.status(401).json({ success: false, result: null, errors: ['You need an account'] })

    next()
}

module.exports = { required }