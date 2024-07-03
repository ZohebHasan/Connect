"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendations = void 0;
const post_model_1 = __importDefault(require("../../models/posts/post_model"));
const getRecommendations = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetDocument = yield post_model_1.default.find({ ownedBy: userId });
        if (!targetDocument) {
            return { status: 404, message: 'No recommendations found' };
        }
        const searchText = '${targetDocument.content.media.body}';
    }
    catch (error) {
        console.error('Error getting recommendations: ', error);
        return { status: 500, message: 'Error getting recommendations' };
    }
});
exports.getRecommendations = getRecommendations;
