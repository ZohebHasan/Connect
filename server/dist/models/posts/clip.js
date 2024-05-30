"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clipSchema = new mongoose_1.Schema({
    title: { type: String, required: true, maxlength: 100 },
    video: {
        data: Buffer,
        contentType: String,
        required: true
    }
});
const Clip = (0, mongoose_1.model)("Clip", clipSchema);
exports.default = Clip;
