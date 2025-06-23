import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import BlogCard from "../components/BlogCard";
import blogsData from "../data/blogs.json";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    const combinedBlogs = [...blogsData, ...savedBlogs];
    setBlogs(combinedBlogs);
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = filter ? blog.category === filter : true;
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Head>
        <title>ByteBlogs</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header & Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Latest Blogs
          </h1>

          <Link
            href="/add-blog"
            className="bg-wine hover:bg-wine/90 text-white px-5 py-2 rounded-lg shadow transition duration-300"
          >
            + Add Blog
          </Link>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-1/4 bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-wine"
          >
            <option value="">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="AI">AI</option>
            <option value="Design">Design</option>
          </select>

          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-wine"
          />
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No matching blogs found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
