import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Routes/home";
import Like from "./Routes/like";
import Onboarding1 from "./Routes/onboarding/onboarding1";
import Onboarding2 from "./Routes/onboarding/onboarding2";
import { useAuth } from "./core/auth";
import Location from "./Routes/location";
import My from "./Routes/my";
import PurchaseHistory from "./Routes/my/purchase-history";
import CustomerService from "./Routes/my/customer-service";
import Notice from "./Routes/my/notice";
import ProfileEdit from "./Routes/my/profile-edit";
import Payment from "./Routes/payment";
import { SuccessPage } from "./Routes/payment/success";
import { FailPage } from "./Routes/payment/fail";
import Store from "./Routes/store";
import Product from "./Routes/product";

const Router = () => {
  const { isFirst } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isFirst ? <Navigate to="/onboarding1" /> : <Home />}
        />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/like" element={<Like />} />
        <Route path="/location" element={<Location />} />
        <Route path="/store/:id" element={<Store />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/onboarding1" element={<Onboarding1 />} />
        <Route path="/onboarding2" element={<Onboarding2 />} />
        <Route path="my" element={<My />} />
        <Route path="/purchase-history" element={<PurchaseHistory />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/fail" element={<FailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
