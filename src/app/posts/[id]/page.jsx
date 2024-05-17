import { getPostsById } from '@/_actions/postActions';
import { format } from 'date-fns';
import Image from 'next/image'
import Link from "next/link";
import DeletePostButton from '@/components/DeletePostButton'; // Import the client component

export default async function Page({params}) {
  const data = await getPostsById(params.id)
  if (!data){
    return (
<div className="flex h-screen">
      <div className="m-auto text-3xl text-red-500 font-bold">Post Not Found</div>
    </div>
    ) 
    
  }
  console.log(data);

   
    return (
      <>

<div className="container mx-auto px-4 py-12 md:px-6 lg:py-16 lg:px-8">
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <div className="order-2 lg:order-1">
      <div className="space-y-4">
        <h1 className="text-3xl text-black font-bold tracking-tight sm:text-4xl md:text-5xl">
          {data.title}
        </h1>
        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
          <span>{data.author}</span>
          <span>•</span>
          <span>{format(new Date(data.createdAt), 'MMMM do, yyyy')}</span>
          <Link href = {`/update/${params.id}`}>
          <button className=" text-gray-950 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-gray-500 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 hover:bg-gray-950 hover:text-white">
            Update Post
          </button>
          </Link>
          {/* <button className=" text-gray-950 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-gray-500 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 hover:bg-gray-950 hover:text-white"
           onClick = {deletePost}
          >
            Delete Post
          </button> */}
          <DeletePostButton postId={params.id} />
        </div>
      </div>
      <div className=" text-xl prose prose-lg mt-8 max-w-none text-black dark:prose-invert dark:text-black">
        <p>
          {data.content}
        </p>
        
      </div>
    </div>
    <div className="order-1 lg:order-2">
      <Image
        src={data.thumbnail || "https://picsum.photos/200"}
        alt="Blog post cover image"
        width="600"
        height="400"
        className="h-full w-full rounded-lg object-cover"
      />
    </div>
  </div>
</div>
        </>
    )
}