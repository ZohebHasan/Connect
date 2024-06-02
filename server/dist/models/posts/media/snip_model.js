"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const snipSchema = new mongoose_2.Schema({
    file: { type: String, required: false },
    dateEdit: { type: Date, required: false },
    duration: { type: Number, required: false },
    caption: { type: String, required: false },
    delete: { type: Boolean, required: false }
});
const SnipModel = mongoose_1.default.model('Snip', snipSchema);
exports.default = SnipModel;
