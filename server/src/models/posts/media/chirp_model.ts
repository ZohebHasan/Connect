import mongoose from "mongoose";
import { Model, Schema } from "mongoose";


interface Chirp {
    body: string;
    dateCreated: Date;
    // maxLength: number;
}

const chirpSchema = new Schema<Chirp>({
    body: { type: String, required: false, maxlength: 241},
    dateCreated: { type: Date, required: false, default: Date.now() },
    // maxLength: { type: Number, required: false }
});

const ChirpModel: Model<Chirp> = mongoose.model('Chirp', chirpSchema);
export default ChirpModel;