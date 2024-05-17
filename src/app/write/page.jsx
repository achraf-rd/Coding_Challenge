"use client"
import { useEffect, useState,useMemo } from "react";
import { toast } from 'react-toastify';

//--------firebase import----------------------------
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "@/utils/firebase";
//------------------------------------------------------

export default function PostCreat() {
const [postData,setPostData] = useState({ title: '', author: '', content: '' })
  

  //error message handling-------------------------------------
  

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [progressBarRender,setProgressBarRender] = useState(false);
  console.log("file : ",file);

  //-----------------------------------------------------------------
const creatPost = async (Data) =>{
    const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Data),
      });
      console.log(res);
      if(!res.ok){
        toast.error("Failed to create post.");
        setProgressBarRender(false);
        return;
      }
      const data = await res.json();
      toast.success("Post created successfully!");
      setProgressBarRender(false);
      return data;
}
const handleCreat = async (e) => {
    e.preventDefault();
//form submition handling------------------------------------------------------------------
    //handle the case if file not attached
    if(!file){
      const createdP =  await creatPost(postData)
      console.log(createdP);  
              return;//dont continu the file upload in this case
            }

    //add the time to the filen name to make it unique
    const fileName = new Date().getTime() + file?.name;
    
    //uploading image to firebase
          
          const storage = getStorage(app);
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          
          // Register three observers:
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              setProgressBarRender(true);
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              setUploadProgress(progress); // Update upload progress
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                  case "running":
                    console.log("Upload is running");
                    break;
                    default:
                  }
                },
                (error) => {
                          console.log("error uploading : ",error)   ;
                              },
                () => {
                  
                  getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    
                    const postWithImg = { ...postData, thumbnail: downloadURL};
                    const createdP =  await creatPost(postWithImg)
                    console.log(createdP); 
                   
                  });
                }
              );
//   //form submittion handling------------------------------------------------------------------------
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
 onSubmit={(e)=>handleCreat(e)}
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

    />
  </div>
  <div className="flex flex-col gap-4">
    {/* <div className="flex items-center gap-4">
      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
          <path d="M6 12h12"></path>
          <path d="M6 20V4"></path>
          <path d="M18 20V4"></path>
        </svg>
        Heading
      </button>
      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
          <path d="M6 12h12"></path>
          <path d="M6 20V4"></path>
          <path d="M18 20V4"></path>
        </svg>
        Paragraph
      </button>
      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
          <line x1="8" x2="21" y1="6" y2="6"></line>
          <line x1="8" x2="21" y1="12" y2="12"></line>
          <line x1="8" x2="21" y1="18" y2="18"></line>
          <line x1="3" x2="3.01" y1="6" y2="6"></line>
          <line x1="3" x2="3.01" y1="12" y2="12"></line>
          <line x1="3" x2="3.01" y1="18" y2="18"></line>
        </svg>
        List
      </button>
    </div> */}
    <textarea
      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-[250px] resize-none"
      placeholder="Start writing your blog post..."
      onChange={(e)=>setPostData({...postData,  content :e.target.value })}
      required
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
      {/* <img
      src="/placeholder.svg"
      width="200"
      height="150"
      alt="Featured Image"
      className="rounded-md object-cover"
      style={{ aspectRatio: "200 / 150", objectFit: "cover" }}
      /> */}
    </div>
  </div>
  <div className="flex justify-end">
    <button className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-500 h-10 px-4 py-2"
    type = 'submite'
    >
      Publish
    </button>
  </div>
  {progressBar}
  {/* error message display */}
  {/* <div className="text-3xl text-red-500 w-full flex justify-center items-center font-bold ">{errorMessage}</div> */}
</form>
  );
}