import Post from '@/models/Post'
import connectDB from '@/utils/connectDb'

export async function getPosts(page, limit,search = '', sortOrder = 'desc', sortBy = 'createdAt') {
    try {
        await connectDB();

        // Construct the search query
        const searchQuery = search
            ? {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { content: { $regex: search, $options: 'i' } },
                    { author: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        const posts = await Post.find(searchQuery)
            .sort({ [sortBy]: sortOrder })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        const count = await Post.countDocuments(searchQuery);

        return {
            success: true,
            data: posts,
            total: count,
            pages: Math.ceil(count / limit),
        };
    } catch (error) {
        console.error(error);
        return { msg: "Error while fetching posts", errMsg: error.message };
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


    // const blogPosts = [
    //     {
    //       title: "Introduction to Quantum Computing",
    //       content: "Quantum computing is poised to revolutionize the tech industry by leveraging quantum mechanics to process information more efficiently than classical computers. This article explores the basics of quantum computing, its potential applications, and the current state of research and development in the field.",
    //       thumbnail: "quantum_computing.jpg",
    //       profileImage: "author_qc.jpg",
    //       published: true
    //     },
    //     {
    //       title: "Building RESTful APIs with Node.js and Express",
    //       content: "RESTful APIs are a cornerstone of modern web development. This guide provides a step-by-step tutorial on building a RESTful API using Node.js and Express. It covers setting up the environment, creating routes, handling requests and responses, and best practices for API development.",
    //       thumbnail: "node_express_api.jpg",
    //       profileImage: "author_node.jpg",
    //       published: true
    //     },
    //     {
    //       title: "Understanding the MERN Stack: A Full-Stack Development Overview",
    //       content: "The MERN stack, consisting of MongoDB, Express, React, and Node.js, is a popular choice for full-stack development. This article offers a comprehensive overview of the MERN stack, its components, and how they work together to create powerful web applications.",
    //       thumbnail: "mern_stack.jpg",
    //       profileImage: "author_mern.jpg",
    //       published: true
    //     },
    //     {
    //       title: "Getting Started with Docker for Developers",
    //       content: "Docker has become an essential tool for developers looking to streamline their development workflow and ensure consistent environments across different stages of development. This article introduces Docker, its core concepts, and provides a hands-on guide to getting started with Docker for development.",
    //       thumbnail: "docker_intro.jpg",
    //       profileImage: "author_docker.jpg",
    //       published: true
    //     },
    //     {
    //       title: "The Rise of Artificial Intelligence in Software Development",
    //       content: "Artificial Intelligence (AI) is transforming how software is developed and utilized. This article explores the impact of AI on software development, including tools that use AI to write code, optimize performance, and enhance security.",
    //       thumbnail: "ai_software_dev.jpg",
    //       profileImage: "author_ai.jpg",
    //       published: true
    //     },
    //     {
    //       title: "Mastering CSS Grid Layout",
    //       content: "CSS Grid Layout is a powerful layout system available in CSS. This article provides an in-depth guide to mastering CSS Grid, including practical examples and tips for creating responsive and flexible web designs.",
    //       thumbnail: "css_grid.jpg",
    //       profileImage: "author_css.jpg",
    //       published: true
    //     },
    //     {
    //       title: "Introduction to Serverless Architecture",
    //       content: "Serverless architecture allows developers to build and run applications without managing server infrastructure. This article explains the basics of serverless computing, its benefits, and how to get started with popular serverless platforms like AWS Lambda and Azure Functions.",
    //       thumbnail: "serverless_architecture.jpg",
    //       profileImage: "author_serverless.jpg",
    //       published: true
    //     },
    //     {
    //       title: "Effective Git Workflow for Teams",
    //       content: "Git is a vital tool for version control in software development. This article outlines effective Git workflows for teams, including branching strategies, pull requests, code reviews, and continuous integration practices.",
    //       thumbnail: "git_workflow.jpg",
    //       profileImage: "author_git.jpg",
    //       published: true
    //     },
    //     {
    //       title: "Exploring Progressive Web Apps (PWAs)",
    //       content: "Progressive Web Apps (PWAs) combine the best of web and mobile applications. This article discusses the benefits of PWAs, key technologies involved, and how to build and deploy a PWA.",
    //       thumbnail: "pwa_exploration.jpg",
    //       profileImage: "author_pwa.jpg",
    //       published: true
    //     },
    //     {
    //       title: "Advancements in Machine Learning: Trends and Future Directions",
    //       content: "Machine Learning (ML) is evolving rapidly, with new techniques and applications emerging regularly. This article highlights the latest trends in ML, significant advancements, and the future directions this field is likely to take.",
    //       thumbnail: "ml_advancements.jpg",
    //       profileImage: "author_ml.jpg"
    //     }
    // ];
      
    // Post.insertMany(blogPosts)
    //     .then((createdPosts) => {
    //         console.log("Posts created:", createdPosts);
    //     })
    //     .catch((error) => {
    //         console.error("Error creating posts:", error);
    //     });
