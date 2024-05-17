import Link from "next/link";
import { format } from 'date-fns';
import Image from 'next/image'
import Pagination from "@/components/Pagination";
import {getPosts} from '@/_actions/postActions'
export default async function Home({ searchParams}) { 
  const {currentPage = 1, limit = 5} = searchParams
  
    const { data: posts, pages: totalPages } = await getPosts(currentPage,limit);
    // const [posts, setPosts] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    // const limit = 6; // Number of posts per page

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await fetch(`http://localhost:3000/api/posts?page=${currentPage}&limit=${limit}`);
    //         const { data, pages } = await res.json();
    //         setPosts(data);
    //         setTotalPages(pages);
    //     }
    //     fetchData();
    // }, [currentPage]);

    // const handlePageChange = (page) => {
    //     setCurrentPage(page);
    // };
    //i decided to transfer it to server component
    return (
        <section className="container mx-auto py-12 md:py-16 lg:py-24">
        <Link className="mb-5" href='/write'>
          <button class="text-black inline-flex items-center justify-center whitespace-nowrap text-3xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                class="mr-2 h-5 w-5"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Create a new blog
          </button>
          </Link>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {
                    posts.map((post) => (
                        <article className="group rounded-lg bg-white shadow-sm transition-all hover:shadow-md dark:bg-gray-950" key={post._id}>
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
                                    <time dateTime="2023-05-16">{format(new Date(post.createdAt), 'MMMM do, yyyy')}</time>
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
