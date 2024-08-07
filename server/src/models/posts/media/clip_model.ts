import mongoose from "mongoose";
import { Model, Schema } from "mongoose";


interface Clip {
    file: Schema.Types.ObjectId;
    caption: string ;
}

const clipSchema = new Schema<Clip>({
    file: { type: Schema.Types.ObjectId, required: false},
    caption: { type: String, required: false }
});

const ClipModel: Model<Clip> = mongoose.model('Clip', clipSchema);

export default ClipModel;
