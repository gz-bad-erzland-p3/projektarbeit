import Head from "next/head";
import React from "react";
import Container from "../components/container/container";
import { suffix } from "../components/data/data";
import Login from "../components/login"
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {

    const auth = useAuth()

    console.log(auth.user)
    return (
        <div>
            <Head>
                <title>Login {suffix}</title>
                <meta property="og:title" content="Login" key="title" />
            </Head>

            <Container>
                <div className="flex justify-center w-screen">
                    <div className="flex flex-col px-6 max-w-7xl w-screen">
                        <h1 className="text-xl mb-10">{auth.user.email}</h1>
                        <p className="text-md">{auth.user.email}</p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;