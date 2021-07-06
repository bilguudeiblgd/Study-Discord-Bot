const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    username: { type: String, require: true },
    serverID: { type: String, require: true },
    studytotal: { type: Number, default: 0 },
    studyweekly: { type: Number, default: 0 },
    studystarted: { type: Boolean, default: false },
    studystart: { type: Date, default: new Date() },
    studyend: { type: Date, default: new Date() },

})

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;