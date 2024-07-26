import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Routes/home";
import Like from "./Routes/like";
import Onboarding1 from "./Routes/onboarding/onboarding1";
import Onboarding2 from "./Routes/onboarding/onboarding2";
import { useAuth } from "./core/auth";

const Router = () => {
  const { isLoggedIn } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/onboarding1" />}
        />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/like" element={<Like />} />
        <Route path="/onboarding1" element={<Onboarding1 />} />
        <Route path="/onboarding2" element={<Onboarding2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
