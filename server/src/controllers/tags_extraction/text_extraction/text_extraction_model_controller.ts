// 1. accepts text, two authorized, three is has implemented the model while at the same time be a post
// extracts during the creations of the post or after the post has been created
/**
 * 
 * 1. the user makes a post with text
 * 2. the post is then displayed
 *    i. social network algorithm:
 *              a. recommend other posts given your current bag of tags
 *              b. it has to resonate with the given user and their interaction with other posts
 *              c. when the user logs > content filter moderation and social network
 *              d. when the user adds a new friend > content filter moderation and social network
 *              e. when the user interacts with posts > content filter moderation and social network
 *                      i. watch the user's interaction with the post
 *                          a. watch time
 *                          b. likes
 *                          c. comments
 *                          d. shares
 *                          e. views
 *                              ii. tags > content filter moderation                       
 * 3. after the post is made we extracts the tags.... > apply content filter moderation
 * 
 * 
 */
import { Request, Response } from "express";
import { spawn } from 'child_process';
export const extractTags = async (req: Request & { body: { text: string } }, res: Response) => {
    const { text } = req.body;
    const python_process = spawn('python3', ['path/to/your/python_script.py', text]);

    // listen for data from the python process
    python_process.stdout.on('data', (data) => {
        console.log(data.toString());
        res.status(200).json({ message: 'Tags extracted successfully', tags: data.toString() });
    });
    
}