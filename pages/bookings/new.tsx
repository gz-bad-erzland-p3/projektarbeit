import { useState } from "react";
import DateTimeRangePicker from "../../components/bookings/dateRangePicker";
import DropDown from "../../components/bookings/dropDown";
import StepsForBooking from "../../components/bookings/steps";
import MainContainer from "../../components/container/container";
import FormContainer from "../../components/form/formContainer";
import FormSection from "../../components/form/formSection";
import { betriebssysteme, bookingTimes, browser, geraete, kommunikationsapplikationen, paymentMethods } from "../../components/data/data";
import { ClockIcon, CalendarIcon } from "@heroicons/react/24/outline";
import FormItem from "../../components/form/formItem";
import FormContainerEnd from "../../components/form/formContainerEnd";
import { auth, db } from "../../config/firebase";
import { get, ref, set } from "firebase/database";
import CheckboxGroup from "../../components/bookings/checkboxGroup";
import RadioButtons from "../../components/bookings/radioButtons";
import { uuidv4 } from "@firebase/util";

type Obj = { [key: string]: [key: [key: string]|string]|string }
const booking: Obj = {}
export const setBookingValue = (value: any, prop: any) => {
    booking[prop] = value
    console.log(booking)
}

export default function NewBooking() {
    const [allBookings, setAllBookings] = useState(Object);
    const [currentStep, setCurrentStep] = useState(1);
    const [workingPlaceType, setWorkingPlaceType] = useState(0);
    const uid = auth.currentUser == null ? "" : auth.currentUser.uid;

    setBookingValue(workingPlaceType, "Arbeitsplatztyp")
    setBookingValue(uid, "UserID")

    //get all bookings
    const dbRef = ref(db, 'bookings/');
    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            setAllBookings(snapshot.val().test);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

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
        set(ref(db, 'bookings/' + bookingId ), booking);
    }

    function validateWorkPlaceType() {
        //console.log(booking["Applikationen"]["Chrome"])
        for (const key in allBookings) {
            if (allBookings.hasOwnProperty(key)) {
                const booking = allBookings[key]
            }
        }
    }

    return (
        <MainContainer>
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
                                    <FormItem width="1/2" title="Zeitraum" icon={CalendarIcon}>
                                        <DateTimeRangePicker />
                                    </FormItem>
                                    <FormItem width="1/4" title="Zeit von" icon={ClockIcon}>
                                        <DropDown title="Startzeit" items={bookingTimes} />
                                    </FormItem>
                                    <FormItem width="1/4" title="Zeit bis" icon={ClockIcon}>
                                        <DropDown title="Endzeit" items={bookingTimes} />
                                    </FormItem>
                                    <FormItem width="1/4">
                                        <button className="button-primary next-button mt-8" onClick={() => setCurrentStep(currentStep + 1)} >Jetzt suchen &rarr;</button>
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
                                        <button disabled={true} className={"button-select " + (workingPlaceType == 2 ? "background-green" : "bg-gray-100 hover:bg-gray-200")} onClick={() => handleSetWorkingPlaceType(2)}>Doppelarbeitsplatz</button>
                                    </FormItem>
                                </FormSection>
                                <FormContainerEnd>
                                    {workingPlaceType !== undefined ? <button className="button-primary next-button" onClick={() => setCurrentStep(currentStep + 1)} >Weiter &rarr;</button> : ""}
                                </FormContainerEnd>
                            </FormContainer>
                        }
                        {
                            currentStep == 3 &&
                            <div className="flex">
                                <div className="w-9/12">
                                    <FormContainer title="Arbeitsplätze konfigurieren">
                                        <FormSection title="Arbeitsplatz 1">
                                            <FormItem title="Gerät wählen">
                                                <RadioButtons items={geraete} FirebaseKey="Gerät"/>
                                            </FormItem>
                                        </FormSection>
                                        <FormSection>
                                            <FormItem title="Betriebssystem">
                                                <RadioButtons items={betriebssysteme} FirebaseKey="Betriebssystem"/>
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
                                    </FormContainer>
                                </div>
                                <div className="w-3/12 ml-5">
                                    <div className="shadow-md p-5" onClick={validateWorkPlaceType}>
                                        <p className="text-lg">Zusammenfassung</p>
                                        <button className="button-primary w-full" onClick={() => setCurrentStep(currentStep + 1)} >Weiter &rarr;</button>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            workingPlaceType == 2 && currentStep == 3 &&
                            <FormContainer>
                                <FormSection title="Arbeitsplatz 2">
                                    <FormItem width="1/2">
                                        <RadioButtons items={geraete} />
                                    </FormItem>
                                    <FormItem width="1/2">
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
                            </FormContainer>
                        }
                        {currentStep == 3 &&
                            <div className="py-3 flex justify-end">
                            </div>
                        }
                        {
                            currentStep == 4 &&
                            <FormContainer title="Übersicht">
                                <FormSection>
                                    <FormItem width="1/2">
                                        <p className=""></p>
                                        <p className="font-base">Zeitraum</p>
                                        <p className="font-base">Von</p>
                                        <p className="font-base">Bis</p>
                                    </FormItem>
                                    <FormItem width="1/2">
                                        <p className="font-base">Zeitraum</p>
                                        <p className="font-base">Von</p>
                                        <p className="font-base">Bis</p>
                                    </FormItem>
                                </FormSection>
                                <FormContainerEnd>
                                    <button className="button-primary next-button" onClick={() => setCurrentStep(currentStep + 1)} >Weiter &rarr;</button>
                                </FormContainerEnd>
                            </FormContainer>
                        }
                        {
                            currentStep == 5 &&
                            <FormContainer title="Login">

                                <FormContainerEnd>
                                    <button className="button-primary next-button" onClick={() => setCurrentStep(currentStep + 1)} >Weiter &rarr;</button>
                                </FormContainerEnd>
                            </FormContainer>
                        }
                        {
                            currentStep == 6 &&
                            <FormContainer title="Zahlung">
                                
                                <FormContainerEnd>
                                    <button className="button-primary next-button" onClick={send}>Senden &rarr;</button>
                                </FormContainerEnd>
                            </FormContainer>
                        }
                    </div>
                </div>
            </div>
        </MainContainer>
    )
}