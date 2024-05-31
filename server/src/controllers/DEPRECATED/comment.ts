// // creating the comment mongoose schema
// import mongoose from 'mongoose';
// import { Schema } from 'mongoose';

// interface Comment {
//     user: { type: Schema.Types.ObjectId, ref: 'User' },
//     body: string;
//     date: Date;
// }

// const commentSchema = new Schema<Comment>({
//     user: { type: Schema.Types.ObjectId, ref: 'User' },
//     body: { type: String, required: true },
//     date: { type: Date, default: Date.now },
// });

// export default mongoose.model('Comment', commentSchema);
