import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, deleteUser, getAuth, EmailAuthProvider, reauthenticateWithPopup, reauthenticateWithCredential, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { send } from "@emailjs/browser";

interface UserType {
  email: string | null;
  uid: string | null;
}

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, prename: string, birthday: string, address_formatted: string, place_id: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
    const uid = auth.currentUser == null ? "" : auth.currentUser.uid;
    await set(ref(db, 'users/' + uid), {
      Name: name,
      Email: email,
      Vorname: prename,
      Geburtsdatum: birthday,
      Adresse_Formatiert: address_formatted,
      Adresse_GooglePlaceId: place_id
    });
    //bestätigungsmail senden
    var templateParams = {
      Name: name,
      Vorname: prename,
      Email: email
    };
    send('gmail', 'signup_confirmation', templateParams, '_ylT6KpgGA4Yo8iq5')
      .then((result: any) => {
        console.log(result.text);
      }, (error: any) => {
        console.log(error.text);
      });
    return;
  };

  const deleteAccount = async (userr: any) => {
    await deleteUser(userr).then(() => {
      set(ref(db, 'users/' + userr.uid), {});
      toast.success("Ihr Benutzer wurde erfolgreich gelöscht")
    }).catch((error) => {
      toast.error("Ihr Benutzer konnte nicht gelöscht werden. Bitte melden Sie sich neu an und versuchen es erneut.")
    });

    //TODO: delete all bookings from this user
  }

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
    toast.success("Erfolgreich ausgeloggt");
  };

  const forgotPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }

  const changeUserAddress = async (address_formatted: string, place_id: string) => {
    set(ref(db, 'users/' + user.uid + '/Adresse_Formatiert/'), address_formatted);
    set(ref(db, 'users/' + user.uid + '/Adresse_GooglePlaceId/'), place_id);
  }

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut, forgotPassword, changeUserAddress, deleteAccount }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};