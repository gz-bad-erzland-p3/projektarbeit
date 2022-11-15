import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { getDatabase, ref, get } from "firebase/database";

const DashboardPage = () => {
    const dbRef = ref(getDatabase());
    const [geb, setGeb] = useState("");

    get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
        setGeb(snapshot.val().test);
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });

    return (
        <ProtectedRoute>
            <div>
                <h2>Perfekt, deine e-mail ist:{geb}</h2>
            </div>
        </ProtectedRoute>
    );
  };
  
  export default DashboardPage;