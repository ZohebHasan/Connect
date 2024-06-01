import {Request, Response} from 'express';

import User from '../../../models/userModel';

import PostModel from '../../../models/posts/post_model';

import ClipModel from '../../../models/posts/media/clip_model';
import SnipModel from '../../../models/posts/media/snip_model';
import PixelsModel from '../../../models/posts/media/pixel_model';
import ChirpModel from '../../../models/posts/media/chirp_model';

export const media = async (req: Request, res: Response) => {
    
}