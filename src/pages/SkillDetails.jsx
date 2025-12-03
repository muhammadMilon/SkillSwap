import AOS from "aos";
import { Clock, DollarSign, Star, User } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import skillsData from "../data/skills.json";
import { useAuth } from "../providers/AuthProvider";

const SkillDetails = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [skill, setSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const foundSkill = skillsData.find((s) => s.skillId === parseInt(id));
    setSkill(foundSkill);
  }, [id]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.displayName || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      "Session booked successfully! The provider will contact you soon."
    );
    setFormData({ name: "", email: "" });
  };

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Skill not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="bg-white rounded-lg shadow-xl overflow-hidden"
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={skill.image}
                alt={skill.skillName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm mb-4">
                  {skill.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {skill.skillName}
                </h1>
                <p className="text-gray-600 mb-6">{skill.description}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">
                    <span className="font-semibold">Provider:</span>{" "}
                    {skill.providerName}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-gray-700">
                    <span className="font-semibold">Rating:</span>{" "}
                    {skill.rating} / 5.0
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">
                    <span className="font-semibold">Price:</span> ${skill.price}{" "}
                    per session
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">
                    <span className="font-semibold">Slots Available:</span>{" "}
                    {skill.slotsAvailable}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Book a Session</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
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
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                  >
                    Book Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 bg-white rounded-lg shadow-md p-8"
          data-aos="fade-up"
        >
          <h2 className="text-2xl font-bold mb-6">About the Provider</h2>
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
              {skill.providerName.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {skill.providerName}
              </h3>
              <p className="text-gray-600 mb-2">{skill.providerEmail}</p>
              <p className="text-gray-700">
                Experienced instructor specializing in{" "}
                {skill.category.toLowerCase()} education. Passionate about
                sharing knowledge and helping students achieve their goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;
