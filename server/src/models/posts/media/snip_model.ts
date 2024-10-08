import mongoose from "mongoose";
import { Model, Schema } from "mongoose";

interface Snip{
    file: Schema.Types.ObjectId;
    dateEdit: Date;
    duration: number;
    caption: string;
    delete: boolean;
}

const snipSchema = new Schema<Snip>({
    file: { type: Schema.Types.ObjectId, required: false},
    dateEdit: { type: Date, required: false },
    duration: { type: Number, required: false },
    caption: { type: String, required: false },
    delete: { type: Boolean, required: false }
});

const SnipModel: Model<Snip> = mongoose.model('Snip', snipSchema);
export default SnipModel;