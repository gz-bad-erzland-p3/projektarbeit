import { useEffect, useState, useRef } from "react";
import DateTimeRangePicker from "../../components/bookings/dateRangePicker";
import DropDown from "../../components/bookings/dropDown";
import StepsForBooking from "../../components/bookings/steps";
import FormContainer from "../../components/form/formContainer";
import FormSection from "../../components/form/formSection";
import { betriebssysteme, bookingTimes, browser, geraete, kommunikationsapplikationen, paymentMethods, suffix } from "../../components/data/data";
import FormItem from "../../components/form/formItem";
import FormContainerEnd from "../../components/form/formContainerEnd";
import { auth, db } from "../../config/firebase";
import { get, ref, set } from "firebase/database";
import CheckboxGroup from "../../components/bookings/checkboxGroup";
import RadioButtons from "../../components/bookings/radioButtons";
import BookingContainer from "../../components/container/bookingContainer";
import Login from "../../components/login";
import Textarea from "../../components/bookings/textarea";
import { standard } from "../../components/data/data";
import { uuidv4 } from "@firebase/util";
import { faCalendarWeek, faCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import BringYourOwnDevice from "../../components/bookings/byod";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
//import Lottie from 'react-lottie';
import animationData from '../../lotties/check.json';
import { send } from "@emailjs/browser";
import Countdown from "react-countdown";
import { useRouter } from "next/router";
import PriceTable from "../../components/bookings/pricetable";

type Obj = { [key: string]: [key: [key: string] | string] | string }
const booking: Obj = {}
const bookingId = uuidv4()

export const setBookingValue = (value: any, prop: any) => {
    booking[prop] = value
}

export const deleteBookingValue = (prop: any) => {
    if (prop in booking) {
        delete booking[prop]
    }
}

export function convertDateAndTimeToUnix(dateComponents: any, timeComponents: any) {
    const [day, month, year] = dateComponents?.split('-');
    const [hours, minutes] = timeComponents?.split(':');
    const date = new Date(+year, Number(month) - 1, +day, +hours, +minutes);
    const timestamp = date.getTime();
    return timestamp
}

export default function NewBooking() {
    const [allBookings, setAllBookings] = useState(Object);
    const [currentStep, setCurrentStep] = useState(1);
    const [workingPlaceType, setWorkingPlaceType] = useState(0);
    const [byod1, setByod1] = useState(false);
    const [byod2, setByod2] = useState(false);
    const [geraet1, setGeraet1] = useState(null);
    const [geraet2, setGeraet2] = useState(null);
    const [bs1, setBs1] = useState(null);
    const [bs2, setBs2] = useState(null);
    const [payment, setPayment] = useState(null)
    const [dateIsValid, setDateIsValid] = useState(false)
    const [diffrenceInMs, setDiffrenceInMs] = useState(0)

    const router = useRouter();

    const [counter, setCounter] = useState(1200);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    function secondsToHms(d: number) {
        d = Number(d);

        if (d == 0) {
            set(ref(db, 'bookings/' + bookingId), {});
            router.push("/")
            return "Zeit abgelaufen"
        }
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + ":" : "00 : ";
        var sDisplay = s > 0 ? s + "" : "00";
        return hDisplay + mDisplay + sDisplay;
    }

    const uid = auth.currentUser == null ? "" : auth.currentUser.uid;

    setBookingValue(workingPlaceType, "Arbeitsplatztyp")
    setBookingValue(uid, "UserID")
    const user = useAuth();

    const defaultLottieOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    //Frontend Logik
    const showNextButton = () => {
        console.log(booking["Geraet1"])
        if (workingPlaceType == 1 && !byod1) return true;
        else if (workingPlaceType == 2 && !byod1 && !byod2) return true;
        else if (workingPlaceType == 1 && byod1 && geraet1 && bs1) return true
        else if (workingPlaceType == 2 && byod1 && !byod2 && geraet1 && bs1) return true
        else if (workingPlaceType == 2 && !byod1 && byod2 && geraet2 && bs2) return true
        else if (workingPlaceType == 2 && byod1 && geraet1 && bs1 && byod2 && geraet2 && bs2) return true
        else return false;
    }

    const price = () => {
        let price: number = 18;
        if (workingPlaceType == 2) price = price + 18
        if (byod1 == true) price = price + 4.50
        if (byod2 == true) price = price + 4.50
        setBookingValue(price, "Preis")
        return price.toFixed(2);
    }

    //get all bookings
    useEffect(() => {
        get(ref(db, 'bookings/')).then((snapshot) => {
            if (snapshot.exists()) {
                setAllBookings(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    //next/back step
    function handleSetCurrentStep(operator: string) {
        if (operator == "+")
            setCurrentStep(currentStep + 1)
        else {
            if (currentStep > 1) setCurrentStep(currentStep - 1);
        }
    }

    function handleSetWorkingPlaceType(type: number) {
        setWorkingPlaceType(type);
    }

    function handleByodChange() {
        if (booking.Byod1 == "false") {
            deleteBookingValue("Byod1")
            deleteBookingValue("Geraet1")
            deleteBookingValue("Betriebssystem1")
            deleteBookingValue("Browser1")
            deleteBookingValue("Bemerkungen1")
            deleteBookingValue("Kommunikationsapplikationen1")
        }
    }

    function sendBooking() {
        setBookingValue("Zahlung erfolgreich", "Status")
        setCurrentStep(currentStep + 1)
        toast.success("Buchung erfolgreich ausgeführt!")
        set(ref(db, 'bookings/' + bookingId), booking);
        //userdaten auslesen und bestätigungsmail senden
        var templateParams = {
            Startdatum: booking.Startdatum,
            Startzeit: booking.Startzeit,
            Enddatum: booking.Enddatum,
            Endzeit: booking.Endzeit,
            Name: "",
            Vorname: "",
            Email: user.user.email
        };
        get(ref(db, 'users/' + user.user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                templateParams.Name = (snapshot.val().Name);
                templateParams.Vorname = (snapshot.val().Vorname);
                send('service_hs19w57', 'template_xl148t9', templateParams, '5fMJGYQBc902cFst3')
                    .then((result: any) => {
                        console.log(result.text);
                    }, (error: any) => {
                        console.log(error.text);
                    });
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    function validateWorkPlaceType(type: number) {
        const startTimeCurrent = convertDateAndTimeToUnix(booking["Startdatum"], booking["Startzeit"])
        const endTimeCurrent = convertDateAndTimeToUnix(booking["Enddatum"], booking["Endzeit"])
        let numOfWorkingplaces = 0
        for (const key in allBookings) {
            if (allBookings.hasOwnProperty(key)) {
                const startTime = convertDateAndTimeToUnix(allBookings[key]["Startdatum"], allBookings[key]["Startzeit"])
                const endTime = convertDateAndTimeToUnix(allBookings[key]["Enddatum"], allBookings[key]["Endzeit"])
                //Wenn die gespeicherte Buchung bezahlt ist
                if (allBookings[key]["Status"] !== "Zahlung offen") {
                    //Wenn die aktuelle auswahl in der Zeitspanne der bereits gespeicherten Buchung liegt, ...
                    if (startTimeCurrent <= endTime && endTimeCurrent >= startTime) {
                        //Sollen die Arbeitsplätze addiert werden
                        numOfWorkingplaces = numOfWorkingplaces + Number(allBookings[key]["Arbeitsplatztyp"])
                    }
                }
            }
        }
        if (type == 2) {
            //Wenn alle Doppelarbeitsplätze ausgebucht sind, ...
            if ((numOfWorkingplaces >= 7)) {
                //Soll der Button "Doppelarbeitsplatz" disabled werden
                return true
            } else {
                return false
            }
        }
        if (type == 1) {
            //Wenn alle Arbeitsplätze ausgebucht sind, ...
            if (numOfWorkingplaces >= 8) {
                //Sollen beide buttons disabled sein
                return true
            } else {
                return false
            }
        }
    }

    function reservate() {
        //Wenn Byod ausgewählt alle gerätedaten löschen
        if (Boolean(booking.Byod1) == true) {
            deleteBookingValue("Geraet1")
            deleteBookingValue("Betriebssystem1")
            deleteBookingValue("Browser1")
            deleteBookingValue("Bemerkungen1")
            deleteBookingValue("Kommunikationsapplikationen1")
        }
        if (Boolean(booking.Byod2) == true) {
            deleteBookingValue("Geraet2")
            deleteBookingValue("Betriebssystem2")
            deleteBookingValue("Browser2")
            deleteBookingValue("Bemerkungen2")
            deleteBookingValue("Kommunikationsapplikationen2")
        }
        //Wenn Einzelarbeitsplatz ausgewählt alle Daten vom zweiten Arbeistplatz löschen
        if (Number(booking.Arbeitsplatztyp) == 1) {
            deleteBookingValue("Byod2")
            deleteBookingValue("Geraet2")
            deleteBookingValue("Betriebssystem2")
            deleteBookingValue("Browser2")
            deleteBookingValue("Bemerkungen2")
            deleteBookingValue("Kommunikationsapplikationen2")
        }
        setBookingValue("Zahlung offen", "Status")
        setCurrentStep(currentStep + 1)
        set(ref(db, 'bookings/' + bookingId), booking);
    }

    function validateTime() {
        const startTimeCurrent = convertDateAndTimeToUnix(booking["Startdatum"], booking["Startzeit"])
        const endTimeCurrent = convertDateAndTimeToUnix(booking["Enddatum"], booking["Endzeit"])
        if (endTimeCurrent - startTimeCurrent >= 7200000) {
            setCurrentStep(currentStep + 1)
        } else {
            toast.error("Die Mindestmietdauer beträgt 2h");
        }
    }

    return (
        <div>
            <Head>
                <title>Neue Buchung {suffix}</title>
                <meta property="og:title" content="Neue Buchung" key="title" />
            </Head>
            <BookingContainer>
                <div className="flex justify-center mx-auto">
                    <div className="grow max-w-7xl px-4 sm:px-6 ">
                        <div>
                            <div className="text-lg">
                                Verbleibende Zeit für Buchung: <span className="font-bold">{secondsToHms(counter)}</span>
                            </div>
                            <div className="py-4">
                                {
                                    currentStep > 1 && currentStep < 6 ?
                                        <button className="button-secondary mb-4" onClick={() => handleSetCurrentStep("-")} >&larr; Zurück</button> : ""
                                }
                                <StepsForBooking currentId={currentStep} />
                            </div>
                            {
                                currentStep == 1 &&
                                <FormContainer title="Zeitraum wählen">
                                    <FormSection>
                                        <FormItem width="1/2" title="Zeitraum" icon={faCalendarWeek}>
                                            <DateTimeRangePicker setIsValid={setDateIsValid} />
                                        </FormItem>
                                        <FormItem width="1/4" title="Zeit von" icon={faClock}>
                                            <DropDown title="Startzeit" items={bookingTimes} FirebaseKey="Startzeit" />
                                        </FormItem>
                                        <FormItem width="1/4" title="Zeit bis" icon={faClock}>
                                            <DropDown title="Endzeit" items={bookingTimes} FirebaseKey="Endzeit" />
                                        </FormItem>
                                        <FormItem width="1/4">
                                            {dateIsValid && <button className="button-primary w-full mt-8" onClick={() => validateTime()} >Jetzt suchen &rarr;</button>}
                                        </FormItem>
                                    </FormSection>
                                </FormContainer>

                            }
                            {
                                currentStep == 2 &&
                                <FormContainer title="Arbeitsplatztyp wählen">
                                    <FormSection>
                                        <FormItem width="1/2">
                                            <button disabled={validateWorkPlaceType(1)} className={"button-select " + (workingPlaceType == 1 ? "background-green" : "bg-gray-100 hover:bg-gray-200")} onClick={() => handleSetWorkingPlaceType(1)}><Image src="/singleWorkplace.svg" alt="" width={32} height={32} />Einzelarbeitsplatz</button>
                                        </FormItem>
                                        <FormItem width="1/2">
                                            <button disabled={validateWorkPlaceType(2)} className={"button-select " + (workingPlaceType == 2 ? "background-green" : "bg-gray-100 hover:bg-gray-200")} onClick={() => handleSetWorkingPlaceType(2)}><Image src="/doubleWorkplace.svg" alt="" width={32} height={32} />Doppelarbeitsplatz</button>
                                        </FormItem>
                                    </FormSection>
                                    <FormContainerEnd>
                                        {workingPlaceType != 0 ? <button className="button-primary w-full" onClick={() => setCurrentStep(currentStep + 1)} >Weiter &rarr;</button> : ""}
                                    </FormContainerEnd>
                                </FormContainer>
                            }
                            {
                                currentStep == 3 &&
                                <div className="flex">
                                    <div className="flex flex-col w-full">
                                        <div>
                                            <FormContainer title="Arbeitsplätze konfigurieren">
                                                <FormSection title="Arbeitsplatz 1">
                                                    <FormItem>
                                                        <BringYourOwnDevice byod={byod1} setByod={setByod1} FirebaseKey="Byod1" />
                                                    </FormItem>
                                                </FormSection>
                                                <Transition show={byod1 == true} enter="transition-opacity duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                    <div>
                                                        <FormSection>
                                                            <FormItem title="Standardmäßig inbegriffen">
                                                                {standard.map((item, index) => (
                                                                    <div key={index}>
                                                                        {item}
                                                                    </div>
                                                                ))}

                                                            </FormItem>
                                                        </FormSection>
                                                        <FormSection title="Konfiguriere dein Gerät">
                                                            <FormItem title="Gerät wählen">
                                                                <RadioButtons setValue={setGeraet1} items={geraete} FirebaseKey="Geraet1" />
                                                            </FormItem>
                                                        </FormSection><FormSection>
                                                            <FormItem title="Betriebssystem">
                                                                <RadioButtons setValue={setBs1} items={betriebssysteme} FirebaseKey="Betriebssystem1" />
                                                            </FormItem>
                                                        </FormSection><FormSection>
                                                            <FormItem title="Browser" width="1/2">
                                                                <CheckboxGroup items={browser} FirebaseKey="Browser1" />
                                                            </FormItem>
                                                            <FormItem title="Kommunikationsapplikationen" width="1/2">
                                                                <CheckboxGroup items={kommunikationsapplikationen} FirebaseKey="Kommunikationsapplikationen1" />
                                                            </FormItem>
                                                        </FormSection><FormSection>
                                                            <FormItem title="Bemerkungen / Besondere Wünsche" width="full">
                                                                <Textarea FirebaseKey="Bemerkungen1" />
                                                            </FormItem>
                                                        </FormSection>
                                                    </div>
                                                </Transition>
                                            </FormContainer>
                                        </div>
                                        {
                                            workingPlaceType == 2 &&
                                            <div>
                                                <FormContainer>
                                                    <FormSection title="Arbeitsplatz 2">
                                                        <FormItem>
                                                            <BringYourOwnDevice byod={byod2} setByod={setByod2} FirebaseKey="Byod2" />
                                                        </FormItem>
                                                    </FormSection>
                                                    <Transition show={byod2 == true} enter="transition-opacity duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">

                                                        <FormSection>
                                                            <FormItem title="Standardmäßig inbegriffen">
                                                                {standard.map((item, index) => (
                                                                    <div key={index}>
                                                                        {item}
                                                                    </div>
                                                                ))}

                                                            </FormItem>
                                                        </FormSection>
                                                        <FormSection title="Konfiguriere dein Gerät">
                                                            <FormItem title="Gerät wählen">
                                                                <RadioButtons setValue={setGeraet2} items={geraete} FirebaseKey="Geraet2" />
                                                            </FormItem>
                                                        </FormSection><FormSection>
                                                            <FormItem title="Betriebssystem">
                                                                <RadioButtons setValue={setBs2} items={betriebssysteme} FirebaseKey="Betriebssystem2" />
                                                            </FormItem>
                                                        </FormSection><FormSection>
                                                            <FormItem title="Browser" width="1/2">
                                                                <CheckboxGroup items={browser} FirebaseKey="Browser2" />
                                                            </FormItem>
                                                            <FormItem title="Kommunikationsapplikationen" width="1/2">
                                                                <CheckboxGroup items={kommunikationsapplikationen} FirebaseKey="Kommunikationsapplikationen2" />
                                                            </FormItem>
                                                        </FormSection><FormSection>
                                                            <FormItem title="Bemerkungen / Besondere Wünsche" width="full">
                                                                <Textarea FirebaseKey="Bemerkungen2" />
                                                            </FormItem>
                                                        </FormSection>
                                                    </Transition>
                                                </FormContainer>
                                            </div>
                                        }
                                    </div>

                                    <div className="w-3/12 ml-5 mt-5">
                                        <div className="sticky top-5 flex flex-col shadow-md p-5">
                                            <div className="py-2">
                                                <p className="text-lg font-bold">Zusammenfassung</p>
                                            </div>
                                            <hr />
                                            <div className="flex flex-col space-y-2 py-2 text-sm">
                                                <div className="font-bold">{workingPlaceType == 1 ? "Einzelarbeitsplatz" : "Doppelarbeitsplatz"}</div>
                                                <div>Start: {booking.Startdatum} {booking.Startzeit}</div>
                                                <div>Ende: {booking.Enddatum} {booking.Endzeit}</div>
                                                <hr />
                                                <div className="flex items-start space-x-2">1. {byod1 == false ? <div>Eigenes Gerät</div> : <div className="flex flex-col space-y-1">Gerät leihen <div>{geraet1}</div>{bs1}<div></div></div>}</div>
                                                {workingPlaceType == 2 ?
                                                    <div>
                                                        <div className="flex items-start space-x-2">2. {byod2 == false ? <div>Eigenes Gerät</div> : <div className="flex flex-col space-y-1">Gerät leihen <div>{geraet2}</div>{bs2}<div></div></div>}</div>
                                                    </div> : ""
                                                }
                                            </div>
                                            <div className="py-2 mt-4">
                                                <p className="font-medium text-lg py-2">{price()}€/Stunde</p>
                                                <Transition show={showNextButton()} enter="transition-opacity duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                    <button className="button-primary w-full" onClick={() => setCurrentStep(currentStep + 1)} >Weiter zum Login &rarr;</button>
                                                </Transition>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                currentStep == 4 &&
                                <FormContainer title="Anmelden oder Registrieren">
                                    <FormSection>
                                        {uid ? <p>Sie sind erfolgreich angemeldet</p> : <Login site={false} />}
                                    </FormSection>
                                    <FormContainerEnd>
                                        {user.user.email && <button className="button-primary w-full" onClick={() => reservate()} >Für den Zahlungsprozess Reservieren und Bezahlen&rarr;</button>}
                                    </FormContainerEnd>
                                </FormContainer>
                            }
                            {
                                currentStep == 5 &&
                                <FormContainer title="Zahlung">
                                    <FormSection>
                                        <FormItem title="Preisberechnung">
                                            <PriceTable pricePerHour={price()} startDate={booking["Startdatum"]} endDate={booking["Enddatum"]} startTime={booking["Startzeit"]} endTime={booking["Endzeit"]}></PriceTable>
                                        </FormItem>
                                    </FormSection>
                                    <FormSection>
                                        <FormItem title="Zahlungsmittel">
                                            <RadioButtons setValue={setPayment} items={paymentMethods} FirebaseKey="Bezahlmethode" />
                                        </FormItem>
                                    </FormSection>

                                    <FormContainerEnd>
                                        {payment ? <button className="button-primary w-full" onClick={sendBooking}>Jetzt Buchung abschließen &rarr;</button> : ""}
                                    </FormContainerEnd>
                                </FormContainer>
                            }
                            {
                                currentStep == 6 &&
                                <FormContainer title="Zahlung">
                                    <h2 className="text-4xl text-center">Buchung erfolgreich!</h2>
                                </FormContainer>
                            }
                        </div>
                    </div>
                </div>
            </BookingContainer>
        </div>

    )
}