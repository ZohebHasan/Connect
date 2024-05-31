import { Schema, model} from 'mongoose';

interface Chirp {
    body: string;
    // attachment: typeof Media;
    hasTags : string;
}

const chirpSchema = new Schema<Chirp>({
    body: {type: String, required: true, maxlength: 241},
    // attachment: {type: Schema.Types.ObjectId, required: true, ref: "Media"},
    hasTags: {type: String, required: true}
})

const Chirp = model<Chirp>("Chirp", chirpSchema);

export default Chirp;