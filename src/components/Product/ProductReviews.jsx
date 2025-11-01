// src/components/Product/ProductReviews.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiStar } from "react-icons/fi";
import API from "../../config/api";
import { toast } from "react-toastify";

const ProductReviews = ({ product, onReviewAdded }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.put("/review", {
        rating,
        comment,
        productId: product._id,
      });
      toast.success("Review submitted successfully");
      setShowReviewForm(false);
      setComment("");
      setRating(5);
      if (onReviewAdded) onReviewAdded();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-white rounded-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-display font-bold text-gray-900">
          Customer Reviews
        </h2>
        {isAuthenticated && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="btn-primary"
          >
            {showReviewForm ? "Cancel" : "Write a Review"}
          </button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <form
          onSubmit={handleSubmitReview}
          className="bg-gray-50 rounded-xl p-6 mb-8"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <FiStar
                    size={32}
                    className={
                      star <= rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="input-field"
              placeholder="Share your experience with this product..."
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      {/* Reviews List */}
      {product.reviews && product.reviews.length > 0 ? (
        <div className="space-y-6">
          {product.reviews.map((review) => (
            <div
              key={review._id}
              className="border-b border-gray-200 pb-6 last:border-0"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold text-gray-900">
                    {review.name}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-8">
          No reviews yet. Be the first to review this product!
        </p>
      )}
    </div>
  );
};

export default ProductReviews;
