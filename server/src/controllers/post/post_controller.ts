// This is the post controller accepts a request to insert post type into the database.
import { Request, Response } from "express";

import PostModel from "../../models/posts/post_model";
import CommentModel from "../../models/posts/comment_model";
import ChirpModel from "../../models/posts/media/chirp_model";
import SnipModel from "../../models/posts/media/snip_model";
import ClipModel from "../../models/posts/media/clip_model";
import PixelsModel from "../../models/posts/media/pixels_model";

// this is the post controller  
export const PostController = async (req: Request, res: Response) => {
 // first query the URL as media ty http://localhost:8000/post/{media_type  = chirp, snip, clip, pixels}


}