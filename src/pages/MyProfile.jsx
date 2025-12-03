import { Check, Edit2, Mail, User, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../providers/AuthProvider";

const MyProfile = () => {
  const { user: currentUser, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || "",
    photoURL: currentUser?.photoURL || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile(formData.name, formData.photoURL);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.displayName || "",
      photoURL: currentUser?.photoURL || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-32"></div>

          <div className="relative px-8 pb-8">
            <div className="flex justify-center -mt-16 mb-4">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            {!isEditing ? (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {currentUser?.displayName || "User"}
                </h2>
                <div className="flex items-center justify-center space-x-2 text-gray-600 mb-6">
                  <Mail className="w-5 h-5" />
                  <span>{currentUser?.email}</span>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  <Edit2 className="w-5 h-5" />
                  <span>Update Profile</span>
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                  Update Profile
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo URL
                    </label>
                    <input
                      type="url"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter photo URL"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-400"
                    >
                      <Check className="w-5 h-5" />
                      <span>{loading ? "Updating..." : "Save Changes"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 inline-flex items-center justify-center space-x-2 bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                    >
                      <X className="w-5 h-5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4">
                Account Information
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium">Member Since:</span>
                  <span>
                    {currentUser?.metadata?.creationTime
                      ? new Date(
                          currentUser.metadata.creationTime
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Last Sign In:</span>
                  <span>
                    {currentUser?.metadata?.lastSignInTime
                      ? new Date(
                          currentUser.metadata.lastSignInTime
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
