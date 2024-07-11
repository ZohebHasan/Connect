import mongoose from "mongoose";
import { Model, Schema } from "mongoose";

interface Pixels {
    file: Schema.Types.ObjectId [];
    dateEdit: Date;
    caption: string;
}

const pixelsSchema = new Schema<Pixels>({
    file: [{ type: Schema.Types.ObjectId, required: false}],
    dateEdit: { type: Date, required: false },
    caption: { type: String, required: false }
});

const PixelsModel: Model<Pixels> = mongoose.model('Pixels', pixelsSchema);
export default PixelsModel;