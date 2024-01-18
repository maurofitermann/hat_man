const { Schema, model, models } = require("mongoose")

const mongoTestSchema = new Schema({
_id: {
    // Discord user ID
    type: String,
    required: true
    },
autorazo: {
    type: String,
    required: true
    }
})

const name = "mongo-tests"
module.exports - models[name] || model(name, mongoTestSchema)