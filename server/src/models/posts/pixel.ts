import { Schema, model} from 'mongoose';

interface Pixel {
    title: string;
    image?:File
}

const pixelSchema = new Schema<Pixel>({
    title: {type: String, required: true, maxlength: 100},
    image:
    {
        data: Buffer,
        contentType: String,
        required: true
    }
})

const Pixel = model<Pixel>("Pixel", pixelSchema);

export default Pixel;