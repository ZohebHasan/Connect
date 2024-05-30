"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tagSchema = new mongoose_1.Schema({
    tag: { type: String, required: true }
});
const Tags = (0, mongoose_1.model)("Tag", tagSchema);
exports.default = Tags;
