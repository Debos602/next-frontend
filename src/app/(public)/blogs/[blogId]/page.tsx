// File: src/app/(public)/blogs/[blogId]/page.tsx
import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";

interface Blog {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    [key: string]: any; // extra fields
}

interface PageProps {
    params: { blogId: string; };
}

// Optional: Loading Component
export const loading = () => {
    return <div className="text-center py-10">Loading blog...</div>;
};

// Optional: Error Component
export const error = ({ error, reset }: { error: Error; reset: () => void; }) => {
    return (
        <div className="text-center py-10 text-red-500">
            <p>Something went wrong: {error.message}</p>
            <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Retry
            </button>
        </div>
    );
};

export default async function BlogDetailsPage({ params }: PageProps) {
    const { blogId } = await params;

    // Fetch blog from API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`, {
        cache: "no-store", // always fetch fresh
    });

    if (res.status === 404) {
        return <div className="text-center py-10">Blog not found 😢</div>;
    }

    if (!res.ok) {
        throw new Error("Failed to fetch blog");
    }

    const blog: Blog = await res.json();

    return (
        <div className="py-30 px-4 max-w-7xl mx-auto">
            <BlogDetailsCard blog={blog} />
        </div>
    );
}