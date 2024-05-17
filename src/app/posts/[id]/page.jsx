import { getPostsById } from '@/_actions/postActions';

export default async function Page({params}) {
    const res =  await fetch(`http://localhost:3000/api/posts/${params.id}`)
    const {data} = await res.json();
    console.log(data);
    return (
        <div>
          <h1> 
            {data?.title} 
            </h1>
           <p>{data?.content}</p>
        </div>
    )
}