import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

const LOGIN = gql`
  query Login($code: String!, $client_id: String!, $redirect_url: String!) {
    login(code: $code, client_id: $client_id, redirect_url: $redirect_url) {
      id
      name
      email
      password
      phone
      dateOfBirth
      gender
      address
      createdAt
      updatedAt
      push_token
    }
  }
`;

const KakaoRedirectHandler = () => {
  //   const [res, setRes] = useState("nothing");
  const [login] = useLazyQuery(LOGIN);
  const [params, setParams] = useState("");
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    setParams(params.toString());
    const code = params.get("code");
    const client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const redirect_url = `${process.env.REACT_APP_URL}/auth`;
    login({
      variables: { code, client_id, redirect_url },
    });
  }, []);

  return (
    <div>
      {/* <div>{res}</div> */}
      kakao login
      <div>{params}</div>
    </div>
  );
};

export default KakaoRedirectHandler;
