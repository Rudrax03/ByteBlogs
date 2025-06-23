import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import blogsData from "../../data/blogs.json";

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (!id) return;
    const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    const allBlogs = [...blogsData, ...storedBlogs];
    const found = allBlogs.find((b) => b.id.toString() === id);
    setBlog(found);
  }, [id]);

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-10 text-center text-gray-500 dark:text-gray-400">
          Loading blog...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-wine dark:text-wine mb-2">
          {blog.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>{blog.date}</span>
          {blog.category && (
            <span className="bg-wine/10 text-wine px-2 py-1 rounded text-xs font-medium">
              #{blog.category}
            </span>
          )}
        </div>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="rounded-lg mb-6 w-full max-h-[400px] object-cover"
          />
        )}
        <article className="prose prose-lg dark:prose-invert text-gray-700 dark:text-gray-300 max-w-none mb-8">
          {blog.content}
        </article>
        <button
          onClick={() => router.back()}
          className="text-wine hover:underline text-sm"
        >
          ← Back to Home
        </button>
      </main>
    </>
  );
}
