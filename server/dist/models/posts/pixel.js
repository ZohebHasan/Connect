"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pixelSchema = new mongoose_1.Schema({
    title: { type: String, required: true, maxlength: 100 },
    image: {
        data: Buffer,
        contentType: String,
        required: true
    }
});
const Pixel = (0, mongoose_1.model)("Pixel", pixelSchema);
exports.default = Pixel;
