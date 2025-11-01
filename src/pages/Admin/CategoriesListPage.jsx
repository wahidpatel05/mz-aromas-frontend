// src/pages/Admin/CategoriesListPage.jsx
import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import API from "../../config/api";
import { toast } from "react-toastify";

const CategoriesListPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit'
  const [currentCategory, setCurrentCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subcategories: [],
    order: 0,
    isActive: true,
  });

  const [newSubcategory, setNewSubcategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await API.get("/admin/categories");
      setCategories(data.categories);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch categories");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalMode === "create") {
        await API.post("/admin/category/new", formData);
        toast.success("Category created successfully");
      } else {
        await API.put(`/admin/category/${currentCategory._id}`, formData);
        toast.success("Category updated successfully");
      }

      fetchCategories();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await API.delete(`/admin/category/${id}`);
        toast.success("Category deleted successfully");
        fetchCategories();
      } catch (error) {
        toast.error("Failed to delete category");
      }
    }
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      subcategories: category.subcategories || [],
      order: category.order || 0,
      isActive: category.isActive,
    });
    setModalMode("edit");
    setShowModal(true);
  };

  const handleCreate = () => {
    setCurrentCategory(null);
    setFormData({
      name: "",
      description: "",
      subcategories: [],
      order: 0,
      isActive: true,
    });
    setModalMode("create");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCategory(null);
    setNewSubcategory("");
  };

  const addSubcategory = () => {
    if (newSubcategory.trim()) {
      setFormData({
        ...formData,
        subcategories: [...formData.subcategories, newSubcategory.trim()],
      });
      setNewSubcategory("");
    }
  };

  const removeSubcategory = (index) => {
    setFormData({
      ...formData,
      subcategories: formData.subcategories.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Categories Management
          </h1>
          <p className="text-gray-600">{categories.length} categories</p>
        </div>
        <button
          onClick={handleCreate}
          className="btn-primary flex items-center space-x-2"
        >
          <FiPlus />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category._id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {category.description}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(category)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Order:</span>
                <span className="font-semibold text-gray-900">
                  {category.order}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    category.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {category.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  Subcategories ({category.subcategories?.length || 0})
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.subcategories?.slice(0, 3).map((sub, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded"
                    >
                      {sub}
                    </span>
                  ))}
                  {category.subcategories?.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{category.subcategories.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalMode === "create" ? "Create Category" : "Edit Category"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategories
                </label>
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={newSubcategory}
                    onChange={(e) => setNewSubcategory(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addSubcategory())
                    }
                    className="input-field flex-1"
                    placeholder="Add subcategory"
                  />
                  <button
                    type="button"
                    onClick={addSubcategory}
                    className="btn-primary px-4"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.subcategories.map((sub, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full flex items-center space-x-2"
                    >
                      <span>{sub}</span>
                      <button
                        type="button"
                        onClick={() => removeSubcategory(index)}
                        className="hover:text-red-600"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value),
                    })
                  }
                  className="input-field"
                />
              </div>

              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="w-5 h-5 text-primary-600 rounded"
                  />
                  <span className="text-gray-700">Active Status</span>
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button type="submit" className="flex-1 btn-primary py-3">
                  {modalMode === "create"
                    ? "Create Category"
                    : "Update Category"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 btn-secondary py-3"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesListPage;
