import { Schema, model, Types, Document } from 'mongoose';
import User from '../../userModel';
import Organization from '../../organization';

// Interface Definitions
interface Media {
    type: 'image' | 'video';
    url: string;
}

interface CommonInfo {
    title: string;
    timeType?: string;
    location?: string;
    duration: string;
    description: string;
    media?: Media[];
    department?: string;
}

interface ProjectInfo extends CommonInfo {
    role?: string;
    association?: Types.ObjectId;
    projectLink?: string;
    collaborators?: Types.ObjectId[];
    skills?: string[];
}

interface ResearchAndPubInfo extends CommonInfo {
    role?: string;
    association?: Types.ObjectId;
    researchLink?: string;
    collaborators?: Types.ObjectId[];
    skills?: string[];
}

interface SkillInfo extends CommonInfo {
    proficiency?: string;
    endorsedBy?: Types.ObjectId[];
}

interface Org {
    company?: Types.ObjectId;
    name?: string;
}

interface OrgWithInfo {
    organization: Types.ObjectId; // Reference to Organization schema
    infoList: CommonInfo[];
}

interface RecommendationInfo {
    recommender: Types.ObjectId;
    text?: string;
    media?: Media[];
    recTime: string;
    recType?: 'strongly' | 'formally';
    description: string;
    relation: string;
    relationStatus: 'current' | 'former';
}

// Professional Interface
interface Professional extends Document {
    user: Types.ObjectId; // Use Types.ObjectId for referencing User
    profilePhoto: string;
    followers: Types.ObjectId[]; // Use Types.ObjectId for referencing Professional profiles
    following: Types.ObjectId[]; // Use Types.ObjectId for referencing Professional profiles
    company: Org;
    school: Org;
    currentStatus: {
        role: string;
        orgName?: string;
    };
    location: string;
    bio: string;
    experiences: OrgWithInfo[];
    educations: OrgWithInfo[];
    projects: ProjectInfo[];
    research: ResearchAndPubInfo[];
    leadership: OrgWithInfo[];
    skills: SkillInfo[];
    certifications: OrgWithInfo[];
    awards: OrgWithInfo[];
    recommendations: RecommendationInfo[];
}

// Mongoose Schema Definitions
const mediaSchema = new Schema<Media>({
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    url: { type: String, default: '' },
});

const commonInfoSchema = new Schema<CommonInfo>({
    title: { type: String, default: '' },
    timeType: { type: String, default: '' },
    location: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
    media: { type: [mediaSchema], default: [] },
    department: { type: String, default: '' },
});

const orgWithInfoSchema = new Schema<OrgWithInfo>({
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    infoList: { type: [commonInfoSchema], default: [] },
});

const recommendationInfoSchema = new Schema<RecommendationInfo>({
    recommender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, default: '' },
    media: { type: [mediaSchema], default: [] },
    recTime: { type: String, required: true, default: '' },
    recType: { type: String, enum: ['strongly', 'formally'], default: 'formally' },
    description: { type: String, required: true, default: '' },
    relation: { type: String, required: true, default: '' },
    relationStatus: { type: String, enum: ['current', 'former'], required: true, default: 'current' },
});

const projectsInfoSchema = new Schema<ProjectInfo>({
    title: { type: String, default: '' },
    timeType: { type: String, default: '' },
    location: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
    media: { type: [mediaSchema], default: [] },
    department: { type: String, default: '' },
    role: { type: String, default: '' },
    association: { type: Schema.Types.ObjectId, ref: 'Organization' },
    projectLink: { type: String, default: '' },
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    skills: { type: [String], default: [] },
});

const researchAndPubInfoSchema = new Schema<ResearchAndPubInfo>({
    title: { type: String, default: '' },
    timeType: { type: String, default: '' },
    location: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
    media: { type: [mediaSchema], default: [] },
    department: { type: String, default: '' },
    role: { type: String, default: '' },
    association: { type: Schema.Types.ObjectId, ref: 'Organization' },
    researchLink: { type: String, default: '' },
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    skills: { type: [String], default: [] },
});

const skillInfoSchema = new Schema<SkillInfo>({
    title: { type: String, default: '' },
    timeType: { type: String, default: '' },
    location: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
    media: { type: [mediaSchema], default: [] },
    department: { type: String, default: '' },
    proficiency: { type: String, default: '' },
    endorsedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const professionalSchema = new Schema<Professional>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    profilePhoto: { type: String, default: '' },
    followers: [{ type: Schema.Types.ObjectId, ref: 'Professional', default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: 'Professional', default: [] }],
    company: {
        company: { type: Schema.Types.ObjectId, ref: 'Organization', default: null },
        name: { type: String, default: '' }
    },
    school: {
        company: { type: Schema.Types.ObjectId, ref: 'Organization', default: null },
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

// export the professional profile model
export default model<Professional>('Professional', professionalSchema);
