import { getPosts } from '@/_actions/postActions';
import Link from "next/link";
export default async function Home() {
  const data =  await getPosts()
    console.log(data);
    return (
        <div>
            {
                data.map((post) => (
                    <div key={post._id}>
                        <h1>
                          <Link href = {`/posts/${post._id}`}>
                         {post.title}
                         </Link>
                         </h1>
                        <p>{post.content}</p>
                    </div>
                ))
            }
        </div>
    )
}
