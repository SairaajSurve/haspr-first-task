const { Schema, Document, model } = require('mongoose')

const UserSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    email: { type: String, required: true },
    admin: { type: Boolean, required: true },
    data: {},
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt
        }
    },
    timestamps: true
})

module.exports.User = model('user', UserSchema)