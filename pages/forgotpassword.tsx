import Head from "next/head";
import React from "react";
import Container from "../components/container/container";
import { suffix } from "../components/data/data";
import ForgotPassword from "../components/forgotpassword";

const ForgotPasswordPage = () => {
  return (
    <div>
      <Head>
        <title>Login {suffix}</title>
        <meta property="og:title" content="Login" key="title" />
      </Head>

      <Container>
        <div className="flex flex-col text-center">
          <h1 className="text-3xl mb-10">Passwort zurücksetzen</h1>
          <ForgotPassword site={true} />
        </div>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;