"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const snipSchema = new mongoose_1.Schema({
    video: {
        data: Buffer,
        contentType: String,
        required: true
    },
    commentable: { type: Boolean, required: true, default: false },
    lifeSpan: { type: Date, required: true, default: 24 }
});
const Snip = (0, mongoose_1.model)("Snip", snipSchema);
exports.default = Snip;
