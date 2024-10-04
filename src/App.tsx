import { useEffect } from "react";
// import GlobalStyle from "./global-style";
import Router from "./router";
import { AuthProvider } from "./core/auth";
import { LocationProvider } from "./core/location-provider";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { CartProvider } from "./core/cart";
import AmplitudeContextProvider from "./core/amplitude";
import { PackProvider } from "./Routes/admin/context/pack";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { v4 as uuidv4 } from "uuid";
// import { createUploadLink } from "apollo-upload-client";
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

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_API_URL,
});

const authLink = setContext((_, { headers }) => {
  // 유저 토큰
  const userToken = localStorage.getItem("jwt");

  // 셀러 토큰
  const sellerToken = localStorage.getItem("sellerToken");

  // 헤더에 유저 및 셀러 토큰을 추가
  return {
    headers: {
      ...headers,
      authorization: userToken ? `Bearer ${userToken}` : "",
      "seller-authorization": sellerToken ? `Bearer ${sellerToken}` : "", // 셀러용 헤더
      "Apollo-Require-Preflight": "true",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});
// export const client = new ApolloClient({
//   // uri: "http://localhost:4000",
//   // uri: "http://172.25.81.144:4000",
//   uri: "http://192.168.200.181:4000",
//   cache: new InMemoryCache(),
// });

function App() {
  const initUuid = () => {
    if (!localStorage.getItem("mahi_uuid")) {
      localStorage.setItem("mahi_uuid", uuidv4());
    }
  };
  useEffect(() => {
    initUuid();
  });
  return (
    <>
      {/* <ToastContainer closeButton={false} /> */}
      <ApolloProvider client={client}>
        <AmplitudeContextProvider>
          <AuthProvider>
            <LocationProvider>
              <CartProvider>
                <PackProvider>
                  {/* <GlobalStyle /> */}
                  <Router />
                </PackProvider>
              </CartProvider>
            </LocationProvider>
          </AuthProvider>
        </AmplitudeContextProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
