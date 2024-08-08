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
exports.handleProfileSelections = void 0;
const userModel_1 = __importDefault(require("../../../models/userModel"));
const personal_1 = __importDefault(require("../../../models/profiles/personal"));
const professional_1 = __importDefault(require("../../../models/profiles/professional/professional"));
const school_1 = __importDefault(require("../../../models/profiles/school"));
const handleProfileSelections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { personal, professional, school } = req.body;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    try {
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (personal) {
            const newPersonalProfile = new personal_1.default({
                user: user._id
            });
            yield newPersonalProfile.save();
        }
        if (professional) {
            const newProfessionalProfile = new professional_1.default({
                user: user._id
            });
            yield newProfessionalProfile.save();
        }
        if (school) {
            const newEducationalProfile = new school_1.default({
                user: user._id
            });
            yield newEducationalProfile.save();
        }
        res.status(200).json({ message: 'Profiles created successfully' });
    }
    catch (error) {
        console.error('Error creating profiles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.handleProfileSelections = handleProfileSelections;
