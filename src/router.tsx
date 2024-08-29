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
import CheckoutPage from "./Routes/checkout";
import Login from "./Routes/login";
import KakaoRedirectHandler from "./Routes/login/auth";
import SignUp from "./Routes/login/sign-up";
import Policy from "./Routes/my/policy";
import SignOut from "./Routes/my/sign-out";
import Order from "./Routes/order";
import Welcome from "./Routes/onboarding/welcome";
import Hey from "./Routes/hey";
import PasswordResetPage from "./Routes/hey/password-reset";
import Contact from "./Routes/my/contact";
import ChangePassword from "./Routes/my/change-password";

const Router = () => {
  const { isFirst, isLoggedIn } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isFirst ? <Navigate to="/onboarding1" /> : <Home />}
        />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/like" element={<Like />} />
        <Route path="/order" element={<Order />} />
        <Route path="/location" element={<Location />} />
        <Route path="/store/:id" element={<Store />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/onboarding1" element={<Onboarding1 />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/hey" element={<Hey />} />
        {/* <Route path="/onboarding2" element={<Onboarding2 />} />  */}
        <Route path="my" element={<My />} />
        <Route path="/purchase-history" element={<PurchaseHistory />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/sign-out" element={<SignOut />} />

        {/* <Route path="/notice" element={<Notice />} /> */}
        {/* <Route path="/profile-edit" element={<ProfileEdit />} /> */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/fail" element={<FailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route
          path="/change-password"
          element={!isLoggedIn ? <Navigate to="/login" /> : <ChangePassword />}
        />
        <Route path="/auth" element={<KakaoRedirectHandler />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
