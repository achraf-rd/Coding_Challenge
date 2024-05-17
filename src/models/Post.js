// models/Post.js
import {Schema,model,models} from "mongoose"

const postSchema = new Schema(
  {
    title: {
      type : String,
      required : true, 
    },
    content: {
      type: String,
      required: true,
    },
    author : {
      type : String,
      required : false
    },
    thumbnail: String,
    profileImage: String,
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Post = models.Post || model('Post', postSchema);
export default Post;

// //
// const posts = [
//     {
//         title: "Post 1",
//         content: "This is the content of post 1",
//         thumbnail: "thumbnail1.jpg",
//         profileImage: "profile1.jpg",
//         published: true,
//     },
//     {
//         title: "Post 2",
//         content: "This is the content of post 2",
//         thumbnail: "thumbnail2.jpg",
//         profileImage: "profile2.jpg",
//         published: true,
//     },
//     {
//         title: "Post 3",
//         content: "This is the content of post 3",
//         thumbnail: "thumbnail3.jpg",
//         profileImage: "profile3.jpg",
//         published: true,
//     },
//     {
//         title: "Post 4",
//         content: "This is the content of post 4",
//         thumbnail: "thumbnail4.jpg",
//         profileImage: "profile4.jpg",
//         published: true,
//     },
//     {
//         title: "Post 5",
//         content: "This is the content of post 5",
//         thumbnail: "thumbnail5.jpg",
//         profileImage: "profile5.jpg",
//         published: true,
//     },
// ];

// Post.create(posts)
//     .then((createdPosts) => {
//         console.log("Posts created:", createdPosts);
//     })
//     .catch((error) => {
//         console.error("Error creating posts:", error);
//     });
