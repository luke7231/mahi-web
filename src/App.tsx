import React from "react";
// import GlobalStyle from "./global-style";
import Router from "./router";
import { AuthProvider } from "./core/auth";
import { LocationProvider } from "./core/location-provider";
// import { getResponsiveMaxWidth } from "./utils/layout-util";
// import { AuthProvider } from "./contexts/auth-provider";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";

window.addEventListener("message", (event) => {
  if (
    typeof event.data === "string" &&
    event.data.startsWith("ExponentPushToken")
  ) {
    localStorage.setItem("expo_push_token", event.data);
  }
});

function App() {
  return (
    <>
      {/* <ToastContainer closeButton={false} /> */}
      <AuthProvider>
        <LocationProvider>
          {/* <GlobalStyle /> */}
          <Router />
        </LocationProvider>
      </AuthProvider>
    </>
  );
}

export default App;
