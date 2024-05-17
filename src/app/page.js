import Link from "next/link";
import { format } from 'date-fns';
import Image from 'next/image';
import Pagination from "@/components/Pagination";
import { getPosts } from '@/_actions/postActions';

export const revalidate = 0;
export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }) { 
  const { currentPage = 1, limit = 6, search = '' } = searchParams;
  const res = await getPosts(currentPage, limit, search);
    console.log(res)
    const { data: posts, pages: totalPages } = res
  return (
    <section className="container mx-auto py-12 md:py-16 lg:py-24">
      <div className="flex justify-between items-center mb-7">
        <Link href='/write'>
          <button className="text-black inline-flex items-center justify-center whitespace-nowrap text-3xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="130"
              height="130"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-5 w-5"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            Create a new blog
          </button>
        </Link>
        <form className="relative" action="/" method="get">
          <input
            className=" text-black flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pl-10 pr-4"
            placeholder="Search articles..."
            type="search"
            name="search"
            defaultValue={search}
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
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
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>
        </form>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {
          posts?.map((post) => (
            <article className="group rounded-lg bg-gray-900 shadow-sm transition-all hover:shadow-md dark:bg-gray-900" key={post._id}>
              <Link className="block overflow-hidden rounded-t-lg" href={`/posts/${post._id}`}>
                <Image
                  src={post.thumbnail || "https://picsum.photos/200"}
                  width="600"
                  height="400"
                  alt="Blog post cover"
                  className="h-48 w-full object-cover transition-all group-hover:scale-105"
                  style={{ aspectRatio: "600 / 400" }}
                />
              </Link>
              <div className="p-6">
                <Link className="block" href={`/posts/${post._id}`}>
                  <h2 className="text-xl font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-primary-500 dark:text-gray-50">
                    {post.title}
                  </h2>
                </Link>
                <div className="mt-2 flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <span>{post.author}</span>
                  </div>
                  <span>•</span>
                  <time dateTime={post.createdAt}>{format(new Date(post.createdAt), 'MMMM do, yyyy')}</time>
                </div>
                <p className="mt-4 line-clamp-3 text-gray-700 dark:text-gray-400">
                  {post.content}
                </p>
              </div>
            </article>
          ))
        }
      </div>
      <Pagination totalPages={totalPages} />
    </section>
  );
}
