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
    console.log("Text: ", text)
    const pathToScript = "/Users/yodahemesay/Connect/client/src/models/tag_extraction/text_extraction/text_extraction_model.py" // You are going to have to write the absolute path for the python file, I looked it up online and this was the only solution that was available
    const pathToPython = "/Users/yodahemesay/Connect/.venv/bin/python3" //Since we are using venv, you are going to put in the absolute path for the python3 in venv.
    const python_process = spawn(pathToPython, [pathToScript, text]);

    // Send text data to Python script
    python_process.stdin.write(JSON.stringify(text));
    python_process.stdin.end();
    // listen for data from the python process
    let dataString = '';

    python_process.stdout.on('data', (data) => {
        dataString += data.toString();
        console.log("Data: ", data)
        console.log("DataString: ", dataString)
    });

    python_process.stderr.on('data', (data) => {
        console.error('Error from Python script:', data.toString());
    });

    python_process.on('close', (code) => {
        if (code !== 0) {
            console.log("Code: ", code)
            return res.status(500).json({ message: 'Failed to extract tags' });
        }
        try {
            const tags = dataString;
            console.log("Tags: ", tags)
            res.status(200).json({ message: 'Tags extracted successfully', tags });
        } catch (error) {
            res.status(500).json({ message: 'Failed to parse tags' });
        }
    });
    
}