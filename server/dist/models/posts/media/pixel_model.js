"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const pixelsSchema = new mongoose_2.Schema({
    file: { type: [String], required: false },
    dateEdit: { type: Date, required: false },
    caption: { type: String, required: false }
});
const PixelsModel = mongoose_1.default.model('Pixels', pixelsSchema);
exports.default = PixelsModel;
