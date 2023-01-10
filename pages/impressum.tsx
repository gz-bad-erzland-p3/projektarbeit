import Head from "next/head";
import React from "react";
import { suffix } from "../components/data/data";
import Login from "../components/login"

const LoginPage = () => {

  return (
    <div>
      <Head>
        <title>Impressum {suffix}</title>
        <meta property="og:title" content="Login" key="title" />
      </Head>
      <Login />
    </div>
  );
};

export default LoginPage;