import Post from '@/models/Post'
import connectDB from '@/utils/connectDb'
export async function getPosts() {
    try {
        await connectDB();
        const posts = JSON.parse(JSON.stringify(await Post.find())) ;

        return posts;
    } catch (error) {
     console.error(error);
     return  {msg : "Error while fetching posts" , errMsg : error.message} 
    }
 
}
export async function getPostsById(id) {
    try {
        await connectDB();
        const post = JSON.parse(JSON.stringify(await Post.findById(id))) ;

        return post;
    } catch (error) {
     console.error(error.message);
     return  {msg : "Error while fetching posts" , errMsg : error.message} 
    }
 
}


