"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mediaSchema = new mongoose_1.Schema({
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    url: { type: String, default: '' },
});
const commonInfoSchema = new mongoose_1.Schema({
    title: { type: String, default: '' },
    timeType: { type: String, default: '' },
    location: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
    media: { type: [mediaSchema], default: [] },
    department: { type: String, default: '' },
});
const orgWithInfoSchema = new mongoose_1.Schema({
    organization: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Organization', required: true },
    infoList: { type: [commonInfoSchema], default: [] },
});
const recommendationInfoSchema = new mongoose_1.Schema({
    recommender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, default: '' },
    media: { type: [mediaSchema], default: [] },
    recTime: { type: String, required: true, default: '' },
    recType: { type: String, enum: ['strongly', 'formally'], default: 'formally' },
    description: { type: String, required: true, default: '' },
    relation: { type: String, required: true, default: '' },
    relationStatus: { type: String, enum: ['current', 'former'], required: true, default: 'current' },
});
const projectsInfoSchema = new mongoose_1.Schema({
    title: { type: String, default: '' },
    timeType: { type: String, default: '' },
    location: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
    media: { type: [mediaSchema], default: [] },
    department: { type: String, default: '' },
    role: { type: String, default: '' },
    association: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Organization' },
    projectLink: { type: String, default: '' },
    collaborators: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    skills: { type: [String], default: [] },
});
const researchAndPubInfoSchema = new mongoose_1.Schema({
    title: { type: String, default: '' },
    timeType: { type: String, default: '' },
    location: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
    media: { type: [mediaSchema], default: [] },
    department: { type: String, default: '' },
    role: { type: String, default: '' },
    association: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Organization' },
    researchLink: { type: String, default: '' },
    collaborators: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    skills: { type: [String], default: [] },
});
const skillInfoSchema = new mongoose_1.Schema({
    title: { type: String, default: '' },
    timeType: { type: String, default: '' },
    location: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
    media: { type: [mediaSchema], default: [] },
    department: { type: String, default: '' },
    proficiency: { type: String, default: '' },
    endorsedBy: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
});
const professionalSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    profilePhoto: { type: String, default: '' },
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Professional', default: [] }],
    following: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Professional', default: [] }],
    company: {
        company: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Organization', default: null },
        name: { type: String, default: '' }
    },
    school: {
        company: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Organization', default: null },
        name: { type: String, default: '' }
    },
    currentStatus: {
        role: { type: String, default: '' },
        orgName: { type: String, default: '' },
    },
    location: { type: String, default: '' },
    bio: { type: String, default: '' },
    experiences: { type: [orgWithInfoSchema], default: [] },
    educations: { type: [orgWithInfoSchema], default: [] },
    projects: { type: [projectsInfoSchema], default: [] },
    research: { type: [researchAndPubInfoSchema], default: [] },
    leadership: { type: [orgWithInfoSchema], default: [] },
    skills: { type: [skillInfoSchema], default: [] },
    certifications: { type: [orgWithInfoSchema], default: [] },
    awards: { type: [orgWithInfoSchema], default: [] },
    recommendations: { type: [recommendationInfoSchema], default: [] },
});
exports.default = (0, mongoose_1.model)('Professional', professionalSchema);
