import { useState, useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { getDatabase, ref, get, onValue } from "firebase/database";
import DashboardContainer from "../components/container/dashboardContainer";

const DashboardPage = () => {
    const dbRef = ref(getDatabase());
    const [geb, setGeb] = useState(""); //example how to get a value once from firebase
    const [status, setStatus] = useState(""); //example how to get a value "live" from firebase

    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            setGeb(snapshot.val().test);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    useEffect(() => {
        return onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                setStatus(snapshot.val().test);
            }
        })
    })
    /*
        onValue(dbRef, (snapshot) => {
            setStatus(snapshot.val().test);
        })
    */
    return (
        <ProtectedRoute>
            <DashboardContainer current={0}>
            </DashboardContainer>
        </ProtectedRoute>
    );
};

export default DashboardPage;