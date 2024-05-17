import Link from "next/link";

export default function Topbar() {
    return (
        <header className="flex h-16 items-center justify-between px-4 md:px-6 dark:bg-gray-950 z-[5000] fixed w-full">
          <Link className="flex items-center gap-2" href="/">
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
              className="h-6 w-6"
            >
              <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
            </svg>
            <span className="text-lg font-semibold">Achraf Blog</span>
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-4">
            <Link href="/" className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
              Blog
            </Link>
            <Link href="/write" className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
              Create Blog
            </Link>
          </div>
          <div>
            <a
             href="https://github.com/achraf-rd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.17c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.084-.73.084-.73 1.204.085 1.837 1.234 1.837 1.234 1.07 1.835 2.809 1.305 3.494.997.107-.774.418-1.305.762-1.605-2.665-.306-5.466-1.333-5.466-5.933 0-1.312.468-2.383 1.235-3.222-.123-.303-.535-1.526.117-3.176 0 0 1.007-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.044.137 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.65.241 2.873.118 3.176.77.84 1.233 1.91 1.233 3.222 0 4.61-2.803 5.623-5.475 5.922.43.37.823 1.102.823 2.22v3.293c0 .32.216.694.824.576C20.565 21.797 24 17.303 24 12 24 5.37 18.63 0 12 0z"></path>
              </svg>
            </a>
          </div>
        </header>
    );
}
