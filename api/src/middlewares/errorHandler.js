const Errors = require('../models/Errors');

function errorHandler(err, req, res, next) {
    var error = new Errors();

    error.what.error = err.toString();
    error.what.stack = err.stack;

    error.where.origin = req.headers.origin;
    error.where.path = req.path
    error.where.appIdentifier = req.headers['app-identifier']

    error.who.source.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    error.who.source.machine = req.headers['user-agent']

    error.save();

    if (process.env.NODE_ENV == "development") {
        res.status(400).json({
            result: null,
            success: false,
            errors: [
                {
                    code: 9999,
                    message: `Unknown error, show this to an admin: ${error.toJSONFor().code}`,
                    what: {
                        error: error.what.error,
                        stack: error.what.stack
                    },
                    where: {
                        origin: error.where.origin,
                        path: error.where.path,
                        appIdentifier: error.where.appIdentifier
                    },
                    who: {
                        source: {
                            ip: error.who.source.ip,
                            machine: error.who.source.machine,
                        },
                        type: error.who.type
                    }
                },
            ],
        });
    } else {
        res.status(400).json({
            result: null,
            success: false,
            errors: [
                {
                    code: 9999,
                    message: `Unknown error, show this to an admin: ${error.toJSONFor().code}`,
                },
            ],
        });
    }
}

module.exports = errorHandler;
