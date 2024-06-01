import {Request, Response} from 'express';

import User from '../../models/userModel';

import PostModel from '../../models/posts/post_model';

import ClipModel from '../../models/posts/media/clip_model';
import SnipModel from '../../models/posts/media/snip_model';
import PixelsModel from '../../models/posts/media/pixel_model';
import ChirpModel from '../../models/posts/media/chirp_model';

export const Post = async (req: Request, res: Response) => {

    const { ownedBy, media_body } = req.body;
    const { media_type } = req.params

    const user = await User.findById(ownedBy);

    let media;
    if(!user){
        res.status(404).json("User does not exist")
    }

    if(media_type === "pixel"){
        try{
            const file = media_body.file;
            const caption = media_body.caption;
            if(!file){
                res.status(400).json("Media file is required");
            }
            media = new PixelsModel({
                file,
                caption,
                dateEdit: null
            });
            await media.save();
        } catch(err){
            res.status(400).json(err)
        }
    }
    else{
        return res.status(400).json("Invalid media type");
    }

    try{
        console.log(media)
        const post = new PostModel({
            ownedBy: user,
            content: media,
        })
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json(err);
    }

}