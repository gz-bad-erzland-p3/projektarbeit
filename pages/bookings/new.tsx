import { useState } from "react";
import DateTimeRangePicker from "../../components/bookings/dateRangePicker";
import DropDown from "../../components/bookings/dropDown";
import StepsForBooking from "../../components/bookings/steps";
import MainContainer from "../../components/container/container";
import FormContainer from "../../components/form/formContainer";
import FormSection from "../../components/form/formSection";
import { betriebssysteme, bookingTimes, browser, geraete, kommunikationsapplikationen, paymentMethods, suffix } from "../../components/data/data";
import { ClockIcon, CalendarIcon, CheckIcon } from "@heroicons/react/24/outline";
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
import { faCalendarWeek, faClock } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";



type Obj = { [key: string]: [key: [key: string] | string] | string }
const booking: Obj = {}
export const setBookingValue = (value: any, prop: any) => {
    booking[prop] = value
}

export default function NewBooking() {
    const [allBookings, setAllBookings] = useState(Object);
    const [currentStep, setCurrentStep] = useState(1);
    const [workingPlaceType, setWorkingPlaceType] = useState(0);
    const uid = auth.currentUser == null ? "" : auth.currentUser.uid;

    setBookingValue(workingPlaceType, "Arbeitsplatztyp")
    setBookingValue(uid, "UserID")

    //get all bookings
    function getAllBookings() {
        get(ref(db, 'bookings/')).then((snapshot) => {
            if (snapshot.exists()) {
                setAllBookings(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }


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

    function send() {
        console.log(booking)
        const bookingId = uuidv4()
        set(ref(db, 'bookings/' + bookingId), booking);
    }

    function convertDateAndTimeToUnix(dateComponents: string, timeComponents: string) {
        const datee = new Date(dateComponents)
        const [hours, minutes] = timeComponents.split(':');
        const date = new Date(+datee.getFullYear, Number(datee.getMonth) - 1, +datee.getDate, +hours, +minutes);
        const timestamp = date.getTime();
        return timestamp
    }

    /*function validateWorkPlaceType(type: number) {
        //console.log(booking["Applikationen"]["Chrome"])
        const startTimeCurrent = convertDateAndTimeToUnix(booking["Datumsauswahl"]["startDate"], booking["Startzeit"])
        const endTimeCurrent = convertDateAndTimeToUnix(booking["Datumsauswahl"]["endDate"], booking["Endzeit"])
        let numOfWorkingplaces = 0

        getAllBookings()
        console.log("allBookings")
        for (const key in allBookings) {
            if (allBookings.hasOwnProperty(key)) {
                const startTime = convertDateAndTimeToUnix(allBookings[key]["Datumsauswahl"]["startDate"], allBookings[key]["Startzeit"])
                const endTime = convertDateAndTimeToUnix(allBookings[key]["Datumsauswahl"]["endDate"], allBookings[key]["Endzeit"])
                //Wenn die aktuelle auswahl in der Zeitspanne einer bereits gespeicherten Buchung liegt, ...
                if (startTimeCurrent <= endTime && endTimeCurrent <= startTime) {
                    //Sollen die Arbeitsplätze addiert werden
                    numOfWorkingplaces = numOfWorkingplaces + Number(allBookings[key]["Arbeitsplatztyp"])
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
            if (numOfWorkingplaces == 8) {
                //Sollen beide buttons disabled sein
                return true
            } else {
                return false
            }
        }
    } */

    //<small>Von {booking.Datumsauswahl.startDate)} {booking.Startzeit}</small>
    //<small>Bis {booking.Datumsauswahl.endDate} {booking.Endzeit}</small>

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
                            <div className="py-4">
                                {
                                    currentStep > 1 ?
                                        <button className="button-secondary mb-4" onClick={() => handleSetCurrentStep("-")} >&larr; Zurück</button> : ""
                                }
                                <StepsForBooking currentId={currentStep} />
                            </div>
                            {
                                currentStep == 1 &&
                                <FormContainer title="Zeitraum wählen">
                                    <FormSection>
                                        <FormItem width="1/2" title="Zeitraum" icon={faCalendarWeek}>
                                            <DateTimeRangePicker />
                                        </FormItem>
                                        <FormItem width="1/4" title="Zeit von" icon={faClock}>
                                            <DropDown title="Startzeit" items={bookingTimes} />
                                        </FormItem>
                                        <FormItem width="1/4" title="Zeit bis" icon={faClock}>
                                            <DropDown title="Endzeit" items={bookingTimes} />
                                        </FormItem>
                                        <FormItem width="1/4">
                                            <button className="button-primary w-full mt-8" onClick={() => setCurrentStep(currentStep + 1)} >Jetzt suchen &rarr;</button>
                                        </FormItem>
                                    </FormSection>
                                </FormContainer>

                            }
                            {
                                currentStep == 2 &&
                                <FormContainer title="Arbeitsplatztyp wählen">
                                    <FormSection>
                                        <FormItem width="1/2">
                                            <button className={"button-select " + (workingPlaceType == 1 ? "background-green" : "bg-gray-100 hover:bg-gray-200")} onClick={() => handleSetWorkingPlaceType(1)}>Einzelarbeitsplatz</button>
                                        </FormItem>
                                        <FormItem width="1/2">
                                            <button className={"button-select " + (workingPlaceType == 2 ? "background-green" : "bg-gray-100 hover:bg-gray-200")} onClick={() => handleSetWorkingPlaceType(2)}>Doppelarbeitsplatz</button>
                                        </FormItem>
                                    </FormSection>
                                    <FormContainerEnd>
                                        {workingPlaceType != null ? <button className="button-primary w-full" onClick={() => setCurrentStep(currentStep + 1)} >Weiter &rarr;</button> : ""}
                                    </FormContainerEnd>
                                </FormContainer>
                            }
                            {
                                currentStep == 3 &&
                                <div className="flex">
                                    <div className="flex flex-col w-full">
                                        <div>
                                            <FormContainer title="Arbeitsplätze konfigurieren">
                                                <FormSection>

                                                    <FormItem title="Standardmäßig inbegriffen">
                                                        {standard.map((item, index) => (
                                                            <div key={index}>
                                                                {item}
                                                            </div>
                                                        ))}

                                                    </FormItem>
                                                </FormSection>
                                                <FormSection title="Arbeitsplatz 1">
                                                    <FormItem title="Gerät wählen">
                                                        <RadioButtons items={geraete} />
                                                    </FormItem>
                                                </FormSection>
                                                <FormSection>
                                                    <FormItem title="Betriebssystem">
                                                        <RadioButtons items={betriebssysteme} />
                                                    </FormItem>
                                                </FormSection>
                                                <FormSection>
                                                    <FormItem title="Browser" width="1/2">
                                                        <CheckboxGroup items={browser} />
                                                    </FormItem>
                                                    <FormItem title="Kommunikationsapplikationen" width="1/2">
                                                        <CheckboxGroup items={kommunikationsapplikationen} />
                                                    </FormItem>
                                                </FormSection>
                                                <FormSection>
                                                    <FormItem title="Bemerkungen / Besondere Wünsche" width="full">
                                                        <Textarea />
                                                    </FormItem>
                                                </FormSection>
                                            </FormContainer>
                                        </div>
                                        {
                                            workingPlaceType == 2 &&
                                            <div>
                                                <FormContainer title="Arbeitsplätze konfigurieren">
                                                    <FormSection title="Arbeitsplatz 1">
                                                        <FormItem title="Gerät wählen">
                                                            <RadioButtons items={geraete} />
                                                        </FormItem>
                                                    </FormSection>
                                                    <FormSection>
                                                        <FormItem title="Betriebssystem">
                                                            <RadioButtons items={betriebssysteme} />
                                                        </FormItem>
                                                    </FormSection>
                                                    <FormSection>
                                                        <FormItem title="Browser" width="1/2">
                                                            <CheckboxGroup items={browser} />
                                                        </FormItem>
                                                        <FormItem title="Kommunikationsapplikationen" width="1/2">
                                                            <CheckboxGroup items={kommunikationsapplikationen} />
                                                        </FormItem>
                                                    </FormSection>
                                                    <FormSection>
                                                        <FormItem title="Bemerkungen / Besondere Wünsche" width="full">
                                                            <Textarea />
                                                        </FormItem>
                                                    </FormSection>
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
                                            <div className="flex flex-col py-2">
                                            </div>
                                            <hr />
                                            <div className="flex flex-col space-y-2 text-sm py-2">
                                                <p>{workingPlaceType == 1 ? "Einzelarbeitsplatz" : "Doppelarbeitsplatz"}</p>
                                                <div className="flex items-center"><CheckIcon className="h-5 w-5 mr-3 text-green-600" /> Discord</div>
                                                <div className="flex items-center"><CheckIcon className="h-5 w-5 mr-3 text-green-600" /> Teams</div>
                                            </div>
                                            <div className="py-2 mt-4">
                                                <button className="button-primary w-full" onClick={() => setCurrentStep(currentStep + 1)} >Weiter &rarr;</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                currentStep == 4 &&
                                <FormContainer title="Übersicht">
                                    <FormSection>
                                        <Login />
                                    </FormSection>
                                    <FormContainerEnd>
                                        <button className="button-primary w-full" onClick={() => setCurrentStep(currentStep + 1)} >Weiter &rarr;</button>
                                    </FormContainerEnd>
                                </FormContainer>
                            }
                            {
                                currentStep == 5 &&
                                <FormContainer title="Login">

                                    <FormContainerEnd>
                                        <button className="button-primary w-full" onClick={() => setCurrentStep(currentStep + 1)} >Weiter &rarr;</button>
                                    </FormContainerEnd>
                                </FormContainer>
                            }
                            {
                                currentStep == 6 &&
                                <FormContainer title="Zahlung">
                                    <FormSection>
                                        <FormItem title="Zahlungsmittel">
                                            <RadioButtons items={paymentMethods} />
                                        </FormItem>
                                    </FormSection>

                                    <FormContainerEnd>
                                        <button className="button-primary w-full" onClick={send}>Jetzt bezahlen &rarr;</button>
                                    </FormContainerEnd>
                                </FormContainer>
                            }
                        </div>
                    </div>
                </div>
            </BookingContainer>
        </div>

    )
}