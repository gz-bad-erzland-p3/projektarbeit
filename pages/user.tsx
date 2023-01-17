import { get, ref } from "firebase/database";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Container from "../components/container/container";
import { suffix } from "../components/data/data";
import Login from "../components/login"
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [userdata, setUserdata] = useState(Object);
    const [userBookings, setUserBookings] = useState(Object);
    
    //TODO: changeUserData(...) siehe AuthContext

    //get userdata and bookings
    const auth = useAuth()
    useEffect(() => {
        get(ref(db, 'users/' + auth.user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                //get userdata
                setUserdata(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });    
        get(ref(db, 'bookings/')).then((snapshot) => {
            if (snapshot.exists()) {
                //get all bookings
                const bookings = snapshot.val()
                const selected = []
                for (const key in bookings) {
                    if (bookings.hasOwnProperty(key)) {
                        if(bookings[key]["UserID"] === auth.user.uid){
                            selected.push(bookings[key])
                        }
                    }
                }
                setUserBookings(selected)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [auth])

   
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
                        <p className="text-md">{userdata.Name}</p>
                        <p className="text-md">{userBookings[0] != undefined ? userBookings[0].Startdatum : ""}</p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;