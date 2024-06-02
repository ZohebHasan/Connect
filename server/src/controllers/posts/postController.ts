import {Request, Response} from 'express';

import User from '../../models/userModel';

import PostModel from '../../models/posts/post_model';

import ClipModel from '../../models/posts/media/clip_model';
import SnipModel from '../../models/posts/media/snip_model';
import PixelsModel from '../../models/posts/media/pixel_model';
import ChirpModel from '../../models/posts/media/chirp_model';

export const Post = async (req: Request, res: Response) => {

    const { ownedBy, location, media_body } = req.body;
    const { media_type } = req.params

    const user = await User.findById(ownedBy);

    let media;
    let content_type;
    if(!user){
        res.status(404).json("User does not exist")
    }

    switch(media_type){
        case "pixel":
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
                content_type = 1;
                await media.save();
            } catch(err){
                res.status(400).json(err)
            }
            break;
        case "chirp":
            try{
                const body = media_body.body;
                if(!body){
                    res.status(400).json("Text is required");
                }
                media = new ChirpModel({
                    body,
                    dateEdit: null
                });
                content_type = 2;
                await media.save();
            } catch(err){
                res.status(400).json(err)
            }
            break;
        case "snip":
            try{
                const file = media_body.file;
                const caption = media_body.caption;
                if(!file){
                    res.status(400).json("Media file is required");
                }
                media = new SnipModel({
                    file,
                    caption,
                    dateEdit: null
                });
                content_type = 3;
                await media.save();
            } catch(err){
                res.status(400).json(err)
            }
            break;
        case "clip":
            try{
                const file = media_body.file;
                const caption = media_body.caption;
                if(!file){
                    res.status(400).json("Media file is required");
                }
                media = new ClipModel({
                    file,
                    caption,
                    dateEdit: null
                });
                content_type = 4;
                await media.save();
            } catch(err){
                res.status(400).json(err)
            }
            break;
        default:
            res.send(400).json("Media file is not valid");
            break;
    }

    try{
        const post = new PostModel({
            ownedBy: user?._id,
            location,
            content_type,
            content: media?._id,
        })
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json(err);
    }
}