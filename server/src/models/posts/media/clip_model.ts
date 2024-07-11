import mongoose from "mongoose";
import { Model, Schema } from "mongoose";


interface Clip {
    file: Schema.Types.ObjectId;
    dateCreated: Date;
    duration: number;
    caption: string ;
}

const clipSchema = new Schema<Clip>({
    file: { type: Schema.Types.ObjectId, required: false},
    dateCreated: { type: Date, required: false, default: Date.now() },
    duration: { type: Number, required: false },
    caption: { type: String, required: false }
});

const ClipModel: Model<Clip> = mongoose.model('Clip', clipSchema);

export default ClipModel;
