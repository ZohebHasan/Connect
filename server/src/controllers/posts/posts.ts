import { Request, Response } from "express";
import Posts from "../../models/posts/posts";

import educational_profile from "../../models/profiles/educational_profile";
import professional_profile from "../../models/profiles/professional_profile";
import personal_profile from "../../models/profiles/personal_profile";

import Tags from "../../models/posts/tags";

export const createPost = async (req: Request, res: Response) => {
    const { tags, postDetail, location, censorable, isEighteenPlus } = req.body;
    console.log(location)
    if (!location) {
        return res.status(400).json({ message: 'Profile location is required' });
    }

    // if (!media) {
    //     return res.status(400).json({ message: 'Media is required' });
    // }

    try {
        const education = await educational_profile.findById(location);
        // const professional = await professional_profile.findOne(location);
        // const personal = await personal_profile.findOne(location);
        if (!education) {
            return res.status(404).json({ message: 'Profile does not exist' });
        }

        const inputTags = tags.trim().split(/\s+/).map((tag:string) => tag.toLowerCase());
        const uniqueTags = [...new Set(inputTags)];

        const tagLists = await Promise.all(uniqueTags.map(async tag => {
            let tagList = await Tags.findOne({ name: tag });
            if (!tagList) {
                tagList = new Tags({ name: tag });
                await tagList.save();
            }
            return tagList._id;
        }));

        const newPost = new Posts({
            postDetail,
            location,
            censorable,
            isEighteenPlus,
            tags: tagLists.map(tag => tag._id),
        });

        await newPost.save();
        (await newPost.populate('comments')).populate('tags');

        res.status(201).json({ post: newPost });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred'});
    }
};
