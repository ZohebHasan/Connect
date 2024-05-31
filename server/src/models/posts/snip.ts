import { Schema, model} from 'mongoose';

interface Snip {
    video?:File
    commentable: boolean;
    lifeSpan: Date;

}

const snipSchema = new Schema<Snip>({
    video:
    {
        data: Buffer,
        contentType: String,
        required: true
    },
    commentable: {type: Boolean, required: true, default: false},
    lifeSpan: {type: Date, required: true, default: 24}
})

const Snip = model<Snip>("Snip", snipSchema);

export default Snip;