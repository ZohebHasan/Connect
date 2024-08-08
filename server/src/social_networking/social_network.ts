/**
 * 1. if encryyoted profile run a recommendation algorithm based off of document similarity via mongoDB
 * 2. if not encrypted:
 *      a. run the googole vision api to extract labels(tags) from the image
 *      b. run a recommendation algorithm based off labels extracted from the image
 * 3. send the repsonse back to the client as a list of post objects
 *
 * 
 */

/**
 * search how to find similar documents in mongoDB
 * 1. obtain meta data from the user's profile
 *    a. obtain the amount of likes, views , comments, shares and the date of the post
 *     
 * 
 * 
 */

// the post model
import { Request, Response } from "express";
import PostModel from "../models/posts/post_model";

// write documentation for this function
export const findSimilarPosts = async (postId: string, userId: string) => {
    try{
        const post = await findPost(postId);
        if(post){
            const tags = post.tags;
            const similarPosts = await PostModel.find({ 
                tags: { $in: tags },
                ownedBy: { $ne: userId }
            });
            return similarPosts;
        }
    }catch(err){
        console.log(err);
    }
}


// Function to find similar posts based on metadata
const findSimilarPostsByMetadata = async (postId: string) => {
    try {
        const post = await findPost(postId);
        if (post) {
            const { likes, views, comments, shared, tags } = getPostMetaData(post);

            const similarPosts = await PostModel.aggregate([
                {
                    $match: {
                        _id: { $ne: post._id }, // Exclude the current post
                        tags: { $in: tags } // Match at least one tag
                    }
                },
                {
                    $addFields: {
                        similarityScore: {
                            $add: [
                                { $abs: { $subtract: ['$likes', likes] } },
                                { $abs: { $subtract: ['$views', views] } },
                                { $abs: { $subtract: ['$comments', comments] } },
                                { $abs: { $subtract: ['$shared', shared] } }
                            ]
                        }
                    }
                },
                {
                    $sort: { similarityScore: 1 } // Sort by similarity score (lower is more similar)
                },
                {
                    $limit: 10 // Limit the number of similar posts returned
                }
            ]);

            return similarPosts;
        }
    } catch (err) {
        console.log(err);
    }
}

// Function to find a post by ID
const findPost = async (postId: string) => {
    try {
        const post = await PostModel.findById(postId);
        if (post) {
            return post;
        }
    } catch (err) {
        console.log(err);
    }
}

// Function to get post metadata
const getPostMetaData = (post: any) => {
    const { likes, views, comments, shared, tags, dateCreated } = post;
    return { likes, views, comments, shared, tags, dateCreated };
}

export const recommendationAlgo = async (req: Request, res: Response) => {
    const { postID, userID, encrypted } = req.body;

    const post = await findPost(postID);

    if(!post) {
        res.status(400).json("No post detected");
    }
    let recommendedPost;
    switch (encrypted) {
        case true:
            // Handle the case when encrypted is true
            recommendedPost = await findSimilarPostsByMetadata(postID);
            res.status(200).json( recommendedPost );
            break;
        case false:
            // Handle the case when encrypted is false
            recommendedPost = await findSimilarPosts(postID, userID);
            res.status(200).json( recommendedPost );
            break;
        default:
            // Handle unexpected cases where encrypted might not be a boolean
            res.status(400).json("Invalid value for 'encrypted'");
            break;
    }
}

