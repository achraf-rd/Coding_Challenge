'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function Pagination({ totalPages }) {
    const query = useSearchParams()

    return (
        <div className="mt-12 flex justify-center">
            <nav aria-label="pagination" className="mx-auto flex w-full justify-center text-black" role="navigation">
                <ul className="flex flex-row items-center gap-1">
                    {
                        Number(query.get('currentPage')) > 1 &&
                    <li className="">
                        <Link
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5"
                            aria-label="Go to previous page"
                            href={{
                                query: { currentPage: Number(query.get('currentPage') ?? "1") - 1 }
                            }}
                            scroll={false}
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
                        </Link>
                    </li>
                    }
                    {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className="">
                            <Link
                                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10 ${(query.get('currentPage') ?? "1") == i + 1 ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}
                                // onClick={() => handlePageChange(i + 1)}
                                href={{
                                    query: {
                                        currentPage: i+1
                                    }
                                }}
                                scroll={false}
                            >
                                {i + 1}
                            </Link>
                        </li>
                    ))}
                     {
                        Number(query.get('currentPage')) < totalPages &&
                    <li className="">
                        <Link
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5"
                            aria-label="Go to next page"
                            // onClick={() => handlePageChange(currentPage + 1)}
                            href={{
                                query: { currentPage: Number(query.get('currentPage') ?? "1") + 1 }
                            }}
                        disabled={Number(query.get('currentPage')) === totalPages}
                        scroll={false}
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
                        </Link>
                    </li>
                    }
                </ul>
            </nav>
        </div>
    )
}
