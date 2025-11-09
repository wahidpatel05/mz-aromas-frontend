// src/pages/Admin/UsersListPage.jsx
import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import API from "../../config/api";
import { toast } from "react-toastify";

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch users");
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId, role) => {
    try {
      await API.put(`/admin/user/${userId}`, {
        role,
        name: editingUser.name,
        email: editingUser.email,
      });
      toast.success("User role updated successfully");
      fetchUsers();
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await API.delete(`/admin/user/${userId}`);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="mb-10">
          <h1 className="text-4xl font-display font-bold text-amber-900 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">{users.length} total users</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition p-5 mb-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 text-gray-800 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-amber-400 outline-none transition"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-amber-50 border-b border-amber-100">
                <tr>
                  {["User", "Email", "Role", "Joined", "Actions"].map(
                    (heading, idx) => (
                      <th
                        key={idx}
                        className="text-left py-4 px-6 text-sm font-semibold text-amber-900 uppercase tracking-wide"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-500 text-base"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className={`border-b border-gray-100 transition ${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-amber-50/40 hover:bg-amber-100/40"
                      } hover:shadow-sm`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.avatar?.url || "/images/default-avatar.png"}
                            alt={user.name}
                            className="w-10 h-10 rounded-full border border-amber-100"
                          />
                          <span className="font-semibold text-gray-900">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">{user.email}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => {
                              setEditingUser(user);
                              setShowModal(true);
                            }}
                            className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-full transition"
                            title="Edit Role"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition"
                            title="Delete User"
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

        {/* Edit Modal */}
        {showModal && editingUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-amber-100 rounded-2xl p-8 max-w-md w-full shadow-xl hover:shadow-2xl transition">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">
                Edit User Role
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editingUser.name}
                    disabled
                    className="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editingUser.email}
                    disabled
                    className="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                    className="w-full border border-amber-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-amber-300 outline-none transition"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() =>
                    handleUpdateRole(editingUser._id, editingUser.role)
                  }
                  className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
                >
                  Update Role
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersListPage;
