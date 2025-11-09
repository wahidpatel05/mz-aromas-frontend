// src/pages/Admin/CreateProductPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiX, FiPlus } from "react-icons/fi";
import API from "../../config/api";
import { toast } from "react-toastify";

const inputStyle =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all outline-none placeholder:text-gray-400 text-gray-800 shadow-sm hover:border-amber-300 bg-white";

const textareaStyle =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all outline-none placeholder:text-gray-400 text-gray-800 shadow-sm hover:border-amber-300 bg-white resize-none";

const selectStyle =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all outline-none text-gray-800 shadow-sm hover:border-amber-300 bg-white";

const CreateProductPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortDescription: "",
    price: "",
    discountPrice: "",
    category: "",
    subcategory: "",
    fragrance: "Other",
    intensity: "Medium",
    stock: "",
    featured: false,
    isActive: true,
  });

  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await API.get("/categories");
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prev) => [...prev, reader.result]);
          setImagePreviews((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { size: "", price: "", discountPrice: "", stock: "" },
    ]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      setLoading(false);
      return;
    }

    try {
      const productData = {
        ...formData,
        images,
        variants: variants.length > 0 ? variants : undefined,
      };

      await API.post("/admin/product/new", productData);
      toast.success("Product created successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product");
      setLoading(false);
    }
  };

  const selectedCategory = categories.find(
    (cat) => cat._id === formData.category
  );

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-display font-bold text-amber-900 mb-2">
            Create New Product
          </h1>
          <p className="text-gray-600">Add a new product to your store</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Information */}
              <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-lg transition-all p-8">
                <h2 className="text-2xl font-semibold text-amber-900 mb-6">
                  Basic Information
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description
                    </label>
                    <input
                      type="text"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleChange}
                      className={inputStyle}
                      maxLength="200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="6"
                      className={textareaStyle}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-lg transition-all p-8">
                <h2 className="text-2xl font-semibold text-amber-900 mb-6">
                  Pricing & Stock
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Regular Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Price
                    </label>
                    <input
                      type="number"
                      name="discountPrice"
                      value={formData.discountPrice}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className={inputStyle}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Variants */}
              <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-lg transition-all p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900">
                    Product Variants (Optional)
                  </h2>
                  <button
                    type="button"
                    onClick={addVariant}
                    className="bg-gradient-to-r from-amber-400 to-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:shadow-md transition"
                  >
                    <FiPlus /> Add Variant
                  </button>
                </div>

                <div className="space-y-4">
                  {variants.map((variant, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-5 relative bg-amber-50/30"
                    >
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                      >
                        <FiX />
                      </button>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Size
                          </label>
                          <input
                            type="text"
                            value={variant.size}
                            onChange={(e) =>
                              handleVariantChange(index, "size", e.target.value)
                            }
                            className={inputStyle}
                            placeholder="e.g. 10ml"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price
                          </label>
                          <input
                            type="number"
                            value={variant.price}
                            onChange={(e) =>
                              handleVariantChange(index, "price", e.target.value)
                            }
                            className={inputStyle}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Discount Price
                          </label>
                          <input
                            type="number"
                            value={variant.discountPrice}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "discountPrice",
                                e.target.value
                              )
                            }
                            className={inputStyle}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Stock
                          </label>
                          <input
                            type="number"
                            value={variant.stock}
                            onChange={(e) =>
                              handleVariantChange(index, "stock", e.target.value)
                            }
                            className={inputStyle}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-lg transition-all p-8">
                <h2 className="text-2xl font-semibold text-amber-900 mb-6">
                  Product Images *
                </h2>

                <label className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-amber-200 rounded-xl cursor-pointer hover:bg-amber-50 transition-all">
                  <div className="flex flex-col items-center justify-center">
                    <FiUpload className="text-amber-500 mb-3" size={40} />
                    <p className="text-gray-700 font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG (MAX. 800x800px)
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl border border-amber-100"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Category */}
              <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-lg transition-all p-8">
                <h2 className="text-2xl font-semibold text-amber-900 mb-6">
                  Category
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={selectStyle}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedCategory &&
                    selectedCategory.subcategories.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subcategory
                        </label>
                        <select
                          name="subcategory"
                          value={formData.subcategory}
                          onChange={handleChange}
                          className={selectStyle}
                        >
                          <option value="">Select Subcategory</option>
                          {selectedCategory.subcategories.map((sub, index) => (
                            <option key={index} value={sub}>
                              {sub}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fragrance Type
                    </label>
                    <select
                      name="fragrance"
                      value={formData.fragrance}
                      onChange={handleChange}
                      className={selectStyle}
                    >
                      {[
                        "Floral",
                        "Woody",
                        "Fresh",
                        "Oriental",
                        "Citrus",
                        "Spicy",
                        "Herbal",
                        "Sweet",
                        "Musky",
                        "Other",
                      ].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Intensity
                    </label>
                    <select
                      name="intensity"
                      value={formData.intensity}
                      onChange={handleChange}
                      className={selectStyle}
                    >
                      <option value="Light">Light</option>
                      <option value="Medium">Medium</option>
                      <option value="Strong">Strong</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-lg transition-all p-8">
                <h2 className="text-2xl font-semibold text-amber-900 mb-6">
                  Settings
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                    />
                    <span className="text-gray-800 font-medium">
                      Featured Product
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                    />
                    <span className="text-gray-800 font-medium">
                      Active Status
                    </span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-lg transition-all p-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  {loading ? "Creating..." : "Create Product"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/products")}
                  className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
