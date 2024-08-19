import React from "react";
// import GlobalStyle from "./global-style";
import Router from "./router";
import { AuthProvider } from "./core/auth";
import { LocationProvider } from "./core/location-provider";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { CartProvider } from "./core/cart";
// import { getResponsiveMaxWidth } from "./utils/layout-util";
// import { AuthProvider } from "./contexts/auth-provider";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";

// app일 경우 푸시토큰을 웹 저장소에 저장.
window.addEventListener("message", (event) => {
  if (
    typeof event.data === "string" &&
    event.data.startsWith("ExponentPushToken")
  ) {
    localStorage.setItem("expo_push_token", event.data);
  }
});

export const client = new ApolloClient({
  // uri: "http://localhost:4000",
  // uri: "http://172.25.81.144:4000",
  uri: "http://192.168.200.181:4000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      {/* <ToastContainer closeButton={false} /> */}
      <ApolloProvider client={client}>
        <AuthProvider>
          <LocationProvider>
            <CartProvider>
              {/* <GlobalStyle /> */}
              <Router />
            </CartProvider>
          </LocationProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
