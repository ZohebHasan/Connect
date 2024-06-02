"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const chirpSchema = new mongoose_2.Schema({
    body: { type: String, required: false, maxlength: 241 },
    dateCreated: { type: Date, required: false, default: Date.now() },
});
const ChirpModel = mongoose_1.default.model('Chirp', chirpSchema);
exports.default = ChirpModel;
