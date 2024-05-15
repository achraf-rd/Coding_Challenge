import { getPostsById } from '@/_actions/postActions';

export default async function Page({params}) {
    const data =  await getPostsById(params.id)
    console.log(data);
    return (
        <div>
           {data.title} 
           <p>{data.content}</p>
        </div>
    )
}