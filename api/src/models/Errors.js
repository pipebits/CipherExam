const mongoose = require('mongoose');

const generateID = require('../utils/generateID')

const ErrorSchema = new mongoose.Schema(
    {
        when: {
            logDate: { type: Date, default: Date.now }
        },
        where: {
            appIdentifier: { type: String },
            origin: { type: String },
            path: { type: String },
            location: { type: String },
        },
        who: {
            type: { type: String, default: 'human' },
            source: {
                ip: { type: String },
                machine: { type: String },
            },
            // identity: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' } To do when the user model is created
        },
        what: {
            code: { type: String },
            error: { type: String, required: true },
            stack: { type: String }
        },
    },
    { collection: 'Errors' }
);


ErrorSchema.pre('validate', function (next) {
    this.what.code = generateID();

    next();
});

ErrorSchema.methods.toJSONFor = function () {
    return {
        message: this.what.error,
        code: this.what.code,
        date: this.when.logDate
    };
};

ErrorSchema.methods.toJSONAdmin = function () {
    return {
        when: this.when,
        where: this.where,
        who: this.who,
        what: this.what,
        id: this._id
    }
}


module.exports = mongoose.model('Errors', ErrorSchema);