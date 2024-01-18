const { Schema, model, models } = require("mongoose")

const messageCountSchema = new Schema({
discordId: {
    // Discord user ID
    type: String,
    required: true
    },
messageCount: {
    type: Number,
    required: true
    }
})

const name = "message-counts"
module.exports = models[name] || model(name, messageCountSchema)