// src/pages/Admin/ProductsListPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import API from "../../config/api";
import { toast } from "react-toastify";

const ProductsListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/admin/products");
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/admin/product/${id}`);
        toast.success("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-display font-bold text-amber-900 mb-2">
              Product Management
            </h1>
            <p className="text-gray-600">
              {products.length} total products in the store
            </p>
          </div>
          <Link
            to="/admin/products/new"
            className="mt-4 md:mt-0 bg-gradient-to-r from-amber-400 to-yellow-600 text-white font-semibold px-5 py-3 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition"
          >
            <FiPlus size={18} />
            <span>Add New Product</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition p-5 mb-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 text-gray-800 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-amber-400 outline-none transition"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-amber-50 border-b border-amber-100">
                <tr>
                  {[
                    "Product",
                    "Category",
                    "Price",
                    "Stock",
                    "Status",
                    "Actions",
                  ].map((heading, idx) => (
                    <th
                      key={idx}
                      className="text-left py-4 px-6 text-sm font-semibold text-amber-900 uppercase tracking-wide"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-10 text-gray-500 text-base"
                    >
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, index) => (
                    <tr
                      key={product._id}
                      className={`border-b border-gray-100 transition ${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-amber-50/40 hover:bg-amber-100/40"
                      } hover:shadow-sm`}
                    >
                      {/* Product Name + Image */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-14 h-14 rounded-xl overflow-hidden border border-amber-100 shadow-sm">
                            <img
                              src={
                                product.images[0]?.url ||
                                "https://via.placeholder.com/60"
                              }
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {product.variants?.length || 0} variants
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 text-gray-700 text-sm">
                        {product.category?.name || "N/A"}
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6">
                        <p className="font-semibold text-gray-900 text-sm">
                          ₹{product.discountPrice || product.price}
                        </p>
                        {product.discountPrice && (
                          <p className="text-xs text-gray-500 line-through">
                            ₹{product.price}
                          </p>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            product.stock > 10
                              ? "bg-green-100 text-green-800"
                              : product.stock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock} units
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            product.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-full transition"
                            title="Edit Product"
                          >
                            <FiEdit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition"
                            title="Delete Product"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListPage;
