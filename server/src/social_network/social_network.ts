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

import PostModel from "../models/posts/post_model";

// write documentation for this function
export const findSimilarPosts = async (postId: string) => {
    try{
        const post = await findPost(postId);
        if(post){
            const tags = post.tags;
            const similarPosts = await PostModel.find({ tags: { $in: tags } });
            return similarPosts;
        }
    }catch(err){
        console.log(err);
    }
}
// const findPost = async (postId: string) => {
//     try{
//         const post = await PostModel.findById(postId);
//         if(post){
//             return post;
//         }
//     }catch(err){
//         console.log(err);
//     }
// }


// find post who have the given user id
// find posts who have the given user id
export const findPostsByUserId = async (userId: string) => {
    try{
        const posts = await PostModel.find({ ownedBy: userId });
        return posts;
    }catch(err){
        console.log(err);
    }
}

// get post metadata takes in a Post object and returns the metadata of the post

// export const getPostMetaData = (PostModel: any) => {
//     const { likes, views, comments, shared, tags, dateCreated } = PostModel;
//     return { likes, views, comments, shared, tags, dateCreated };
// }

// create function to find similar post with similar number of likes, views, comments, shares and tags

// Function to find similar posts based on metadata
export const findSimilarPostsByMetadata = async (postId: string) => {
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
export const getPostMetaData = (post: any) => {
    const { likes, views, comments, shared, tags, dateCreated } = post;
    return { likes, views, comments, shared, tags, dateCreated };
}

// Example usage
findSimilarPostsByMetadata('your_post_id').then(similarPosts => {
    console.log('Similar Posts:', similarPosts);
}).catch(console.error);