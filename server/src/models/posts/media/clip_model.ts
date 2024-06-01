import mongoose from "mongoose";
import { Model, Schema } from "mongoose";


interface Clip {
    file: string;
    dateCreated: Date;
    duration: number;
    caption: string ;
}

const clipSchema = new Schema<Clip>({
    file: { type: String, required: false},
    dateCreated: { type: Date, required: false },
    duration: { type: Number, required: false },
    caption: { type: String, required: false }
});

const ClipModel: Model<Clip> = mongoose.model('Clip', clipSchema);
export default ClipModel;