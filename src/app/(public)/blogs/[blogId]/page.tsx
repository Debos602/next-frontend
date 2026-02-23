// File: src/app/(public)/blogs/[blogId]/page.tsx
import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";
import { Blog } from "@/types";

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

export const generateStaticParams = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`);
    const { data: blogs } = await res.json();
    return blogs.slice(0, 2).map((blog: Blog) => ({
        blogId: String(blog.id),
    }));
};


export const generateMetadata = async ({ params }: { params: Promise<{ blogId: string; }>; }) => {
    const { blogId } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`);
    const blog: Blog = await res.json();
    return {
        title: blog?.title,
        description: blog?.content
    };
};



export default async function BlogDetailsPage({ params }: PageProps) {
    const { blogId } = await params;

    // Fetch blog from API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`);

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