import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Signup from "./pages/Signup";
import SkillDetails from "./pages/SkillDetails";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/skill-details/:id" element={<SkillDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
