import { get, ref } from "firebase/database";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Container from "../components/container/container";
import { suffix } from "../components/data/data";
import Login from "../components/login"
import UserDescription from "../components/user/userDescription";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {


    return (
        <div>
            <Head>
                <title>Login {suffix}</title>
                <meta property="og:title" content="Login" key="title" />
            </Head>
            <Container>
                <div className="flex justify-center w-screen">
                    <div className="flex flex-col px-6 max-w-4xl w-screen">
                        <UserDescription></UserDescription>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;