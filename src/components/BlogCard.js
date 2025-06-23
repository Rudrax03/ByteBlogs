import Link from "next/link";

export default function BlogCard({ blog }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between h-full dark:bg-gray-900 dark:border-gray-700">
      {/* Blog Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      {/* Blog Title, Date & Summary */}
      <div>
        <h2 className="text-2xl font-bold text-black dark:text-white mb-1">
          {blog.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {blog.date}
        </p>

        {/* Category */}
        {blog.category && (
          <span className="inline-block text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-3 py-1 rounded-full mb-3">
            #{blog.category}
          </span>
        )}

        {/* Summary */}
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          {blog.summary}
        </p>
      </div>

      {/* Read More */}
      <div className="mt-4">
        <Link
          href={`/blog/${blog.id}`}
          className="inline-block text-wine hover:text-wineLight dark:hover:text-wineLight font-semibold transition-colors duration-300"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
