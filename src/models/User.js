const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
