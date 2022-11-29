import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { ref, get } from "firebase/database";
import DashboardContainer from "../components/container/dashboardContainer";
import { db } from "../config/firebase";

const DashboardPage = () => {
    const dbRef = ref(db);
    const [geb, setGeb] = useState(""); //example how to get a value once from firebase

/*Todos rpe: 
    -Anmeldung/Registrierung: Cookie setzen und bei login/signup page auf dashboard weiterleiten wenn cookie verfügbar
    Registrierung: für jeden user beim registrieren ein objekt erstellen und eigenschaften, die bei der registrierung angegeben werden unter diesem objekt speichern (struktur: user/dhu4hz378z3gzu2/name...)
    Formular senden: alle Auswahlen per jquery (oder wie das in react geht) auslesen und im benutzerobjekt speichern
    Validierung: Auswahlmöglichkeiten im Formular, basierend auf den daten aus der firebase einschränken
    Buchung: objekt mit grundeigenschaften der arbeitsplätze anlegen (uuid, spezifikationen, verfügbare hardware etc.)

Todos aho:
    Buchung: logische einteilung überlegen (in welcher reihenfolge, seitenuntergliederung etc sollen die eigenschaften für den arbeitsplatz auswählbar sein) und Formular bauen (Bei auswahlfeldern etc. am besten ein zwei demo-auwahlmöglichkeiten reinmachen)
    Profil: kleine profil-page anlegen, mit     Bereich "persönliche daten": eigenschaften (name usw.) werden in eingabefelder vorbefüllt + speichern button         Bereich "Passwort ändern": eingabe altes pw + doppelte eingabe vom neuem + button speichern 
    Meine Buchungen: seite anlegen, in bereiche unterteilen (z.b. ) und jeweils eine Tabelle/Liste in den bereich rein (wo dann die jeweiligen buchungen aufgelistet werden)
    Meine Buchungen: Modal, was aufploppt wenn man in der Liste eine Buchung auswählt (darin können dann sachen stehen wie zusätzliche eigenschaften der buchung, storniern-button usw.)
    
*/

    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            setGeb(snapshot.val().test);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

/*
    useEffect(()=>{
        return onValue(dbRef, (snapshot) => {
            if(snapshot.exists()){
                setStatus(snapshot.val().test);
            }
        })
    })
*/
    return (
        <ProtectedRoute>
            <DashboardContainer current={0}>
                {geb}
            </DashboardContainer>
        </ProtectedRoute>
    );
  };
  
  export default DashboardPage;