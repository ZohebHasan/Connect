import mongoose from "mongoose";
import PostModel from "../../models/posts/post_model";

export const getRecommendations = async (userId: string) => {
   try{
        const targetDocument = await PostModel.find({ownedBy: userId});
        if(!targetDocument){
            // return a status code of 404
            return {status: 404, message: 'No recommendations found'};
        }
        const searchText = '${targetDocument.content.media.body}';
   }
   catch(error){
         console.error('Error getting recommendations: ', error);
         return {status: 500, message: 'Error getting recommendations'};
   }
}