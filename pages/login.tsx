import Head from "next/head";
import React from "react";
import { suffix } from "../components/data/data";
import Login from "../components/login"

const LoginPage = () => {

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <Head>
        <title>Login {suffix}</title>
        <meta property="og:title" content="Login" key="title" />
      </Head>
      <div className="flex flex-col text-center">
        <h1 className="text-3xl mb-10">Login & Registrieren</h1>
        <Login site={true} />
      </div>
    </div>
  );
};

export default LoginPage;