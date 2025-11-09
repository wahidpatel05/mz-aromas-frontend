import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import ProductCard from "../../components/Product/ProductCard";
import { fetchProducts } from "../../store/slices/productSlice";
import { fetchCategories } from "../../store/slices/categorySlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    ratings: searchParams.get("ratings") || "",
    fragrance: searchParams.get("fragrance") || "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const {
    products,
    loading,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const fragranceTypes = [
    "Floral",
    "Woody",
    "Fresh",
    "Oriental",
    "Citrus",
    "Spicy",
    "Herbal",
    "Sweet",
    "Musky",
  ];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const params = { page: currentPage, ...filters };
    Object.keys(params).forEach((key) => {
      if (!params[key]) delete params[key];
    });
    dispatch(fetchProducts(params));
  }, [dispatch, currentPage, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      keyword: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      ratings: "",
      fragrance: "",
    });
    setCurrentPage(1);
    setSearchParams({});
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");
  const totalPages = Math.ceil(filteredProductsCount / resultPerPage);

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100 min-h-screen">
      {/* Header */}
      <div className="bg-white/90 border-b border-amber-100 shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-amber-900 mb-1">
              {filters.category
                ? categories.find((c) => c.slug === filters.category)?.name
                : "All Products"}
            </h1>
            <p className="text-gray-700 text-sm">
              {filteredProductsCount} products found
            </p>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center shadow-md"
          >
            <FiFilter className="mr-2" /> Filters
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-72 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white/90 border border-amber-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-amber-900">
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((c) => (
                      <label
                        key={c._id}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === c.slug}
                          onChange={() =>
                            handleFilterChange("category", c.slug)
                          }
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span className="ml-2 text-gray-700">{c.name}</span>
                      </label>
                    ))}
                    {filters.category && (
                      <button
                        onClick={() => handleFilterChange("category", "")}
                        className="text-sm text-amber-600 hover:text-amber-700"
                      >
                        View All
                      </button>
                    )}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Price Range
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) =>
                        handleFilterChange("minPrice", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        handleFilterChange("maxPrice", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                {/* Fragrance */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Fragrance Type
                  </h3>
                  <div className="space-y-2">
                    {fragranceTypes.map((f) => (
                      <label
                        key={f}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="fragrance"
                          checked={filters.fragrance === f}
                          onChange={() => handleFilterChange("fragrance", f)}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span className="ml-2 text-gray-700">{f}</span>
                      </label>
                    ))}
                    {filters.fragrance && (
                      <button
                        onClick={() => handleFilterChange("fragrance", "")}
                        className="text-sm text-amber-600 hover:text-amber-700"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Ratings */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Minimum Rating
                  </h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="ratings"
                          checked={filters.ratings === rating.toString()}
                          onChange={() =>
                            handleFilterChange("ratings", rating.toString())
                          }
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span className="ml-2 text-gray-700 flex items-center">
                          {rating}
                          <span className="text-yellow-500 ml-1">★</span>
                          <span className="text-gray-500 ml-1">& above</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-600"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-amber-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-amber-50 disabled:opacity-50"
                      >
                        Previous
                      </button>

                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-4 py-2 rounded-lg font-medium ${
                                currentPage === page
                                  ? "bg-gradient-to-r from-amber-400 to-yellow-600 text-white"
                                  : "border border-gray-300 hover:bg-amber-50"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return <span key={page}>...</span>;
                        }
                        return null;
                      })}

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-amber-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
