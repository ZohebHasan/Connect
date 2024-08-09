import { Request, Response } from 'express';
import zlib from 'zlib';
import { GridFSBucket } from 'mongodb';
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';
import User from '../../models/userModel';
import PostModel from '../../models/posts/post_model';
import ClipModel from '../../models/posts/media/clip_model';
import SnipModel from '../../models/posts/media/snip_model';
import PixelsModel from '../../models/posts/media/pixel_model';
import ChirpModel from '../../models/posts/media/chirp_model';

// Assuming you have a primary connection already set up
const conn = mongoose.createConnection('mongodb+srv://kamrulhassan:fNXADjxipNKubPlP@connect.kacb3bl.mongodb.net/?retryWrites=true&w=majority&appName=Connect');

let gfs: any;

conn.once('open', () => {
  // Initialize stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});


export const Post = async (req: Request, res: Response) => {
    const { ownedBy, location, media_body, tags } = req.body;
    const { media_type } = req.params;
    const file: any = req.file;

    const content_type = media_type;

    // Find user by their UserID
    const user = await User.findById(ownedBy);
    if (!user) {
        return res.status(404).json("User does not exist");
    }
    console.log("User: ", user)
    // Compress and upload the file
    try {
        let media;
        const body = media_body.body;
        switch (media_type) {
            case "pixel":
                if (!file) {
                    return res.status(400).json("Media file is required");
                }
                console.log("File: ", file)
                media = new PixelsModel({ 
                    file: file.id,
                    body 
                });
                // content_type = 1;
                await media.save();
                break;
            case "snip":
                if (!file) {
                    return res.status(400).json("Media file is required");
                }
                console.log("File: ", file)
                media = new SnipModel({ 
                    file: file.id, 
                    body 
                });
                // content_type = 2;
                await media.save();
                break;
            case "clip":
                if (!file) {
                    return res.status(400).json("Media file is required");
                }
                console.log("File: ", file)
                media = new ClipModel({ 
                    file: file.id, 
                    body 
                });
                // content_type = 3;
                await media.save();
                break;
            case "chirp":
                if (!body) {
                    return res.status(400).json("Text is required");
                }
                media = new ChirpModel({ 
                    body 
                });
                await media.save();
                break;
            default:
                return res.status(400).json("Invalid media type");
        }

        await media.save();

        const post = new PostModel({
            ownedBy: user._id,
            location,
            content_type,// Assuming you have mapped media types to numbers
            content: media._id,
            tags
        });

        await post.save();
        res.status(201).json(post);

    } catch (error) {
        console.error("Failed to process file or create post:", error);
        res.status(500).json({ message: "Error processing file or creating post", error });
    }
};
export const updatePost = async (req: Request, res: Response) => {
    const { post_id, likes, dislikes, views, shared } = req.body;
    console.log("Post ID: ", post_id)
    console.log("Likes: ", likes)
    console.log("Dislikes: ", dislikes)
    console.log("Views: ", views)
    console.log("Shared: ", shared)

    if (!post_id) {
        return res.status(400).json({ message: "Post ID is required." });
    }
    try {
        const post = await PostModel.findById(post_id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Update fields if they are provided in the request
        if (likes != null) post.likes = (post.likes || 0) + 1;
        if (dislikes != null) post.likes = (post.likes || 0) - 1;
        if (views != null) post.views = (post.views || 0) + 1;
        if (shared != null) post.shared = (post.shared || 0) + 1;

        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json("Error updating post");
    }
};
