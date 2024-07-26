import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Routes/home";
import Like from "./Routes/like";
// import { useAuth } from "./contexts/auth-provider";

const Router = () => {
  //   const { isLoggedIn } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/onboarding" />}
        /> */}
        <Route path="/" element={<Home />} />
        <Route path="/like" element={<Like />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
