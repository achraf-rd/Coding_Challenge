"use client"
import { useEffect,useState,useMemo } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
//--------firebase import----------------------------
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "@/utils/firebase";
import  Image  from 'next/image';
//------------------------------------------------------

export default function PostUpdate({params}) {
  //error message handling-------------------------------------
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [progressBarRender,setProgressBarRender] = useState(false);
  console.log("file : ",file);
  const router = useRouter();

  const [postData,setPostData] = useState({ title: '', author: '', content: '' });
  const fetchPostById = async (id) => {
                  try {
                      const res = await fetch(`http://localhost:3000/api/posts/${id}`);
                      if (!res.ok) {
                        throw new Error('Failed to get the post');
                      }
                      const {data} = await res.json();
                      setPostData(data);
                      

                  } catch (error) {
                    toast.error("Failed get post");
                  }
              };
    useEffect(()=>{   
        const postId = params.id
        if (postId) {
            fetchPostById(postId);
        }
        },[])
console.log("posts : ",postData)
  //-----------------------------------------------------------------
  const updatePost = async (id, Data) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Data),
    });

    if (!res.ok) {
      toast.error('Failed to update post.');
      setProgressBarRender(false);
      return;
    }

    const data = await res.json();
    toast.success('Post updated successfully!');
    setProgressBarRender(false);
    return data;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const postId = params.id;

    if (!file) {
      const updatedPost = await updatePost(postId, postData);
      if (updatedPost.success) {
        router.push(`/posts/${updatedPost.data._id}`);
      }
      return;
    }

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setProgressBarRender(true);
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error uploading:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const postWithImg = { ...postData, thumbnail: downloadURL };
          const updatedPost = await updatePost(postId, postWithImg);
          if (updatedPost) {
            router.push(`/posts/${updatedPost._id}`);
          }
        });
      }
    );
  };


      //progressbar saved in use memo to rerender it just in changes in uploadProgress & progressBarRender----------------------------
        const progressBar = useMemo(() => (
          progressBarRender && (
            <progress className="w-full" value={uploadProgress} max="100"  />
          )
        ), [uploadProgress, progressBarRender]);

        console.log(postData);
  return (

<form className="flex flex-col gap-6 p-6 md:p-10 text-cyan-700"    
 onSubmit={(e)=>handleUpdate(e)}
 >
  <div className="flex flex-col gap-2">
    <label
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      htmlFor="title"
    >
      Title
    </label>
    <input
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      id="title"
      placeholder="Enter blog post title"
      onChange={(e)=>setPostData({...postData,  title:e.target.value })}
      required
      value={postData.title}
    />
  </div>
  <div className="flex flex-col gap-2">
    <label
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      htmlFor="author"
    >
      Author
    </label>
    <input
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      id="author"
      placeholder="Enter author name"
      onChange={(e)=>setPostData({...postData,  author:e.target.value })}
      required
      value={postData.author}

    />
  </div>
  <div className="flex flex-col gap-4">
   
    <textarea
      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-[250px] resize-none"
      placeholder="Start writing your blog post..."
      onChange={(e)=>setPostData({...postData,  content :e.target.value })}
      required
      value={postData.content}
    ></textarea>
  </div>
  <div className="flex flex-col gap-2">
    <label
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      htmlFor="image"
    >
      Featured Image
    </label>
    <div className="flex items-center gap-4">
      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
      type = 'button'
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" x2="12" y1="3" y2="15"></line>
        </svg>
        <input
          className="flex h-10 rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
          id="image"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
                
        />
      </button>
      <Image
        src={postData.thumbnail || "https://picsum.photos/200"}
        width="200"
        height="150"
        alt="Featured Image"
        className="rounded-md object-cover"
      />
    </div>
  </div>
  <div className="flex justify-end">
    <button className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-500 h-10 px-4 py-2"
    type = 'submite'
    >
      Update
    </button>
  </div>
  {progressBar}
  {/* error message display */}
  {/* <div className="text-3xl text-red-500 w-full flex justify-center items-center font-bold ">{errorMessage}</div> */}
</form>
  );
} 