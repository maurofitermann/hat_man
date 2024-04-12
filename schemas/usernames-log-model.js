const { Schema, model, models } = require("mongoose")

const usernamesLogSchema = new Schema({
discordId: {
    type: String,
    required: true
    },
usernames: {
    type: Array,
    required: true
    }
})
const name = "usernames-log"
module.exports = models[name] || model(name, usernamesLogSchema)