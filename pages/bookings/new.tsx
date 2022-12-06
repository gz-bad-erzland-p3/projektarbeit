import { useState } from "react";
import DateTimeRangePicker from "../../components/bookings/dateRangePicker";
import DropDown from "../../components/bookings/dropDown";
import StepsForBooking from "../../components/bookings/steps";
import TextInput from "../../components/bookings/textInput";
import MainContainer from "../../components/container/container";
import FormContainer from "../../components/container/formContainer";
import FormSection from "../../components/container/formSection";
import {bookingTimes} from "../../components/data/data";

export default function NewBooking() {

    const [currentStep, setCurrentStep] = useState(1);
    const [workingPlaceType, setWorkingPlaceType] = useState(0);

    function handleSetCurrentStep(operator: string) {
        if (operator == "+")
            setCurrentStep(currentStep + 1)
        else {
            if (currentStep > 1) setCurrentStep(currentStep - 1);
        }
    }

    function handleSetWorkingPlaceType(type: number) {
        if (workingPlaceType == type) {
            setWorkingPlaceType(0)
        }
        else {
            setWorkingPlaceType(type);
        }
    }

    return (
        <MainContainer>
            <div className="flex justify-center mx-auto">
                <div className="grow max-w-7xl px-4 sm:px-6 ">
                    <div>
                        <div className="py-4 ">
                            <button className="button-secondary" onClick={() => handleSetCurrentStep("-")} >&larr; Zurück</button>
                        </div>
                        <StepsForBooking currentId={currentStep} />
                        {
                            currentStep == 1 &&
                            <FormContainer title="Zeitraum wählen">
                                <FormSection>
                                    <div className="flex-1">
                                        <p className="text-base font-bold">Zeitraum</p>
                                    </div>
                                    <div className="flex-1 flex space-x-4">
                                        <div className="flex-1">
                                            <p className="text-base font-bold">Zeit von</p>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-base font-bold">Zeit bis</p>
                                        </div>
                                    </div>
                                </FormSection>
                                <FormSection>
                                    <div className="flex-1">
                                        <DateTimeRangePicker />
                                    </div>
                                    <div className="flex-1 flex space-x-4">
                                        <div className="flex-1">
                                            <DropDown title="Startzeit" items={bookingTimes} />
                                        </div>
                                        <div className="flex-1">
                                            <DropDown title="Endzeit" items={bookingTimes} />
                                        </div>
                                    </div>
                                </FormSection>
                                <FormSection title="Arbeitsplatztyp auswählen">
                                    <div className="flex-1">
                                        <button className={"button-select " + (workingPlaceType == 1 ? "background-green" : "bg-gray-100 hover:bg-gray-200")} onClick={() => handleSetWorkingPlaceType(1)}>Einzelarbeitsplatz</button>
                                    </div>
                                    <div className="flex-1">
                                        <button className={"button-select " + (workingPlaceType == 2 ? "background-green" : "bg-gray-100 hover:bg-gray-200")} onClick={() => handleSetWorkingPlaceType(2)}>Doppelarbeitsplatz</button>
                                    </div>
                                </FormSection>
                                <div className="flex justify-end">
                                    <div>
                                        { workingPlaceType > 0 ? <button className="button-primary" onClick={() => setCurrentStep(currentStep + 1)} >Weiter &rarr;</button> : ""}
                                    </div>
                                </div>
                            </FormContainer>

                        }
                        {
                            currentStep == 2 &&
                            <div>
                                <div className="flex">
                                    <div className="flex-1">
                                        <TextInput title="Name" />
                                    </div>
                                    <div className="flex-1">
                                        <DropDown title="Betriebssystem" items={["Windows 10", "Windows 11"]} />
                                    </div>
                                </div>
                            </div>

                            //3 Checkboxen für Browser
                            // 3 Checkboxen für Kommunikationsapplikationen
                        }
                    </div>
                </div>
            </div>

        </MainContainer>
    )
}