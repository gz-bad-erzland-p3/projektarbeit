/* This example requires Tailwind CSS v2.0+ */

import { CalendarDaysIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import BookingModal from "./bookingmodal";

export default function UserDescription(props: any) {
    const [userdata, setUserdata] = useState(Object);
    const [userBookings, setUserBookings] = useState(Object);
    const [open1, setOpen1] = useState(false);

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
                        if (bookings[key]["UserID"] == auth.user.uid) {
                            bookings[key]["BookingId"] = key
                            selected.push(bookings[key])
                        }
                    }
                }
                setUserBookings(selected)
                console.log(selected)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [auth])

    return (
        <>
            <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Ihre Benutzerdaten</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Hier kannst du deine Benutzer- und Buchungsdaten sehen und dein Passwort ändern</p>
            </div>
            <div className="mt-5 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Vorname</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{userdata.Vorname}</span>
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Nachname</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{userdata.Name}</span>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">E-Mail</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{userdata.Email}</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Ändern
                                </button>
                            </span>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Geburtsdatum</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{userdata.Geburtsdatum}</span>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Ihre Adresse</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{userdata.Adresse_Formatiert}</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Ändern
                                </button>
                            </span>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Buchungen</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                {Array.isArray(userBookings) 
                                    ? userBookings.map((item: any) =>
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div className="w-0 flex-1 flex items-center">
                                            <CalendarDaysIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span className="ml-2 flex-1 w-0 truncate">Buchung vom {item.Startdatum} um {item.Startzeit} bis zum {item.Enddatum} um {item.Endzeit}</span>
                                        </div>
                                        <div className="ml-4 flex-shrink-0 flex space-x-4">
                                            <button
                                                type="button"
                                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Anzeigen
                                            </button>
                                            <span className="text-gray-300" aria-hidden="true">
                                                |
                                            </span>
                                            <button
                                                type="button"
                                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={() => setOpen1(true)}
                                            >
                                                Stornieren
                                            </button>
                                            <BookingModal open={open1} setOpen={setOpen1} booking={item}/>
                                        </div>
                                    </li>)
                                    : <p>Keine Buchungen</p>
                                }
                            </ul>
                            <button
                                type="button"
                                className="mt-10 bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Dein Konto löschen
                            </button>
                        </dd>
                    </div>
                </dl>
            </div>
        </>
    )
}