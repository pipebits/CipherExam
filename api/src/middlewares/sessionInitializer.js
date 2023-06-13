function sessionInitializer(req, res, next) {
    if (!req.session.initialized) {
        req.session.loggedin = false
        req.session.verified = false
        req.session.initialized = true
    }

    if (!req.payload) req.payload = {}

    next()
}

module.exports = sessionInitializer