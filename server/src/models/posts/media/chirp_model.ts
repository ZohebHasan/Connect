import mongoose from "mongoose";
import { Model, Schema } from "mongoose";


interface Chirp {
    body: string;
}

const chirpSchema = new Schema<Chirp>({
    body: { type: String, required: false, maxlength: 241},
});

const ChirpModel: Model<Chirp> = mongoose.model('Chirp', chirpSchema);
export default ChirpModel;