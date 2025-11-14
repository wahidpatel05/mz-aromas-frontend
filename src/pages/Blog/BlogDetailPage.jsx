import React from "react";
import { useParams, Link } from "react-router-dom";

const BlogDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen py-20 bg-amber-50 flex flex-col items-center text-center">
      <h1 className="text-4xl font-display text-amber-800 mb-4">
        Blog #{id} Coming Soon 🕯️
      </h1>
      <Link
        to="/blog"
        className="text-amber-700 font-semibold underline underline-offset-4 hover:text-amber-800"
      >
        ← Back to Blog
      </Link>
    </div>
  );
};

export default BlogDetailPage;
