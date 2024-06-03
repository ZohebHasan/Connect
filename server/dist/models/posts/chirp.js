"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chirpSchema = new mongoose_1.Schema({
    body: { type: String, required: true, maxlength: 241 },
    hasTags: { type: String, required: true }
});
const Chirp = (0, mongoose_1.model)("Chirp", chirpSchema);
exports.default = Chirp;
