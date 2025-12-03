import AOS from "aos";
import "aos/dist/aos.css";
import {
  Award,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import skillsData from "../data/skills.json";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const topRatedSkills = skillsData.filter((skill) => skill.rating >= 4.7);

  const slides = [
    {
      image:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "Learn New Skills",
      subtitle: "Connect with local experts and grow together",
      cta: "Get Started",
      link: "#get-started",
    },
    {
      image:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "Share Your Expertise",
      subtitle: "Teach what you love and earn while doing it",
      cta: "Become a Provider",
      link: "#provider",
    },
    {
      image:
        "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "Join Our Community",
      subtitle: "Thousands of skills waiting to be exchanged",
      cta: "Explore Skills",
      link: "#explore",
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Slider */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/70 to-pink-900/80 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                  <a
                    href={slide.link}
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition inline-block shadow-lg"
                  >
                    {slide.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm text-white p-3 rounded-full hover:from-gray-700/80 hover:to-gray-800/80 transition z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm text-white p-3 rounded-full hover:from-gray-700/80 hover:to-gray-800/80 transition z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 w-8"
                  : "bg-gray-400/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Popular Skills Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          data-aos="fade-up"
        >
          Popular Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((skill, index) => (
            <div
              key={skill.skillId}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-gray-700"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={skill.image}
                alt={skill.skillName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {skill.skillName}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {skill.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-white">
                      {skill.rating}
                    </span>
                  </div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
                    ${skill.price}
                  </span>
                </div>
                <Link
                  to={`/skill-details/${skill.skillId}`}
                  className="block w-full text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-16 border-y border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            data-aos="fade-up"
          >
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                1. Browse Skills
              </h3>
              <p className="text-gray-400">
                Explore our wide range of skills offered by local experts in
                your area.
              </p>
            </div>

            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                2. Book a Session
              </h3>
              <p className="text-gray-400">
                Select a skill that interests you and book a convenient time
                slot.
              </p>
            </div>

            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="bg-gradient-to-br from-pink-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/50">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                3. Learn & Grow
              </h3>
              <p className="text-gray-400">
                Attend your session, learn new skills, and become part of our
                community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Providers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          data-aos="fade-up"
        >
          Top Rated Providers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRatedSkills.map((skill, index) => (
            <div
              key={skill.skillId}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-gray-700"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {skill.providerName.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {skill.providerName}
              </h3>
              <p className="text-gray-400 text-sm mb-3">{skill.skillName}</p>
              <div className="flex items-center justify-center space-x-1 mb-3">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold text-white">{skill.rating}</span>
              </div>
              <span
                className="inline-block px-4 py-1 
             bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 
             text-white font-medium rounded-full text-sm 
             shadow-md border border-white/11"
              >
                {skill.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose SkillSwap Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-16 border-y border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            data-aos="fade-up"
          >
            Why Choose SkillSwap?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center" data-aos="fade-up">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                500+
              </div>
              <p className="text-gray-400 text-lg">Active Members</p>
            </div>

            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                150+
              </div>
              <p className="text-gray-400 text-lg">Skills Available</p>
            </div>

            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400 mb-2">
                95%
              </div>
              <p className="text-gray-400 text-lg">Satisfaction Rate</p>
            </div>

            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                24/7
              </div>
              <p className="text-gray-400 text-lg">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-aos="fade-up"
          >
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8" data-aos="fade-up" data-aos-delay="100">
            Join thousands of learners and providers in our growing community
          </p>
          <a
            href="#signup"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition inline-block shadow-2xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
