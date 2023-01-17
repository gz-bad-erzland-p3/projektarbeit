import { get, ref } from "firebase/database";
import Head from "next/head";
import React, { useState } from "react";
import Container from "../components/container/container";
import { suffix } from "../components/data/data";
import Login from "../components/login"
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [userdata, setUserdata] = useState(Object);

    const auth = useAuth()
        get(ref(db, 'users/' + auth.user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                setUserdata(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    return (
        <div>
            <Head>
                <title>Login {suffix}</title>
                <meta property="og:title" content="Login" key="title" />
            </Head>

            <Container>
                <div className="flex justify-center w-screen">
                    <div className="flex flex-col px-6 max-w-7xl w-screen">
                        <h1 className="text-xl mb-10">{userdata.Email}</h1>
                        {
                            
                        }
                        <p className="text-md">{userdata.Name}</p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;