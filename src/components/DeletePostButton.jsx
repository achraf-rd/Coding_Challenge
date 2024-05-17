'use client'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeletePostButton({ postId }) {
    const router = useRouter();

    const deletePost = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Failed to delete the post');
            }
            toast.success('Post deleted successfully');
            router.push('/');
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <button
            onClick={() => deletePost(postId)}
           className=" text-gray-950 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-red-500 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 hover:bg-gray-950 hover:text-white">
            Delete Post
        </button>
    );
}
