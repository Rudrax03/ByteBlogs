import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      id: Date.now(),
      title,
      summary,
      content,
      date,
      image,
      category,
    };

    const existing = JSON.parse(localStorage.getItem("blogs") || "[]");
    localStorage.setItem("blogs", JSON.stringify([...existing, newBlog]));
    router.push("/");
  };

  const isFormValid = title && summary && content && date;

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Write a New Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md space-y-5"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter blog title"
              className="w-full bg-white dark:bg-gray-800 dark:text-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-wine"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Summary
            </label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
              placeholder="Short blog summary"
              className="w-full bg-white dark:bg-gray-800 dark:text-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-wine"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Content
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Write your blog content..."
              className="w-full bg-white dark:bg-gray-800 dark:text-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-wine"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full bg-white dark:bg-gray-800 dark:text-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-wine"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-white dark:bg-gray-800 dark:text-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-wine"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 dark:text-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-wine"
            >
              <option value="">Select Category</option>
              <option value="Tech">Tech</option>
              <option value="AI">AI</option>
              <option value="Design">Design</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`bg-wine text-white px-6 py-2 rounded-lg transition duration-300 ${
              isFormValid ? "hover:bg-wine/90" : "opacity-50 cursor-not-allowed"
            }`}
          >
            Submit Blog
          </button>
        </form>
      </main>
    </>
  );
}
