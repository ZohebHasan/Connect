import { Schema, model} from 'mongoose';

interface Tags {
    tag: string
}

const tagSchema = new Schema<Tags>({
    tag: {type: String, required: true}
})

const Tags = model<Tags>("Tag", tagSchema);

export default Tags;