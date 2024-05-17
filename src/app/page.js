'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from 'date-fns';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6; // Number of posts per page

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/api/posts?page=${currentPage}&limit=${limit}`);
            const { data, pages } = await res.json();
            setPosts(data);
            setTotalPages(pages);
        }
        fetchData();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section className="container mx-auto py-12 md:py-16 lg:py-24">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {
                    posts.map((post) => (
                        <article className="group rounded-lg bg-white shadow-sm transition-all hover:shadow-md dark:bg-gray-950" key={post._id}>
                            <Link className="block overflow-hidden rounded-t-lg" href={`/posts/${post._id}`}>
                                <img
                                    src={post.thumbnail || "https://picsum.photos/200"}
                                    width="600"
                                    height="400"
                                    alt="Blog post cover"
                                    className="h-48 w-full object-cover transition-all group-hover:scale-105"
                                    style={{ aspectRatio: "600 / 400", objectFit: "cover" }}
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

            <div className="mt-12 flex justify-center">
                <nav aria-label="pagination" className="mx-auto flex w-full justify-center text-black" role="navigation">
                    <ul className="flex flex-row items-center gap-1">
                        <li className="">
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5"
                                aria-label="Go to previous page"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
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
                                    <path d="m15 18-6-6 6-6"></path>
                                </svg>
                                <span>Previous</span>
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, i) => (
                            <li key={i} className="">
                                <button
                                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10 ${currentPage === i + 1 ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className="">
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5"
                                aria-label="Go to next page"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <span>Next</span>
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
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}
