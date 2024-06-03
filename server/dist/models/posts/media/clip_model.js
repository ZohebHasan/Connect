"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const clipSchema = new mongoose_2.Schema({
    file: { type: String, required: false },
    dateCreated: { type: Date, required: false },
    duration: { type: Number, required: false },
    caption: { type: String, required: false }
});
const ClipModel = mongoose_1.default.model('Clip', clipSchema);
exports.default = ClipModel;
