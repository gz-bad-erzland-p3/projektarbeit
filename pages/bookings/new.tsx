import { useState } from "react";
import DateTimeRangePicker from "../../components/bookings/dateRangePicker";
import DropDown from "../../components/bookings/dropDown";
import StepsForBooking from "../../components/bookings/steps";
import MainContainer from "../../components/container/container";
import FormContainer from "../../components/form/formContainer";
import FormSection from "../../components/form/formSection";
import { betriebssysteme, bookingTimes, browser, geraete } from "../../components/data/data";
import { ClockIcon, CalendarIcon } from "@heroicons/react/24/outline";
import FormItem from "../../components/form/formItem";
import FormContainerEnd from "../../components/form/formContainerEnd";
import CheckBoxes from "../../components/bookings/checkboxes";

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
                                        <button className="button-primary" onClick={() => setCurrentStep(currentStep + 1)} >Jetzt suchen &rarr;</button>
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
                                    {workingPlaceType > 0 ? <button className="button-primary" onClick={() => setCurrentStep(currentStep + 1)} >Weiter &rarr;</button> : ""}
                                </FormContainerEnd>
                            </FormContainer>

                            //3 Checkboxen für Browser
                            // 3 Checkboxen für Kommunikationsapplikationen
                        }

{
                            currentStep == 3 &&
                            <FormContainer title="Arbeitsplatztyp wählen">
                                <FormSection>
                                    <FormItem width="1/2">
                                        <DropDown items={geraete}/>
                                    </FormItem>
                                    <FormItem width="1/2">
                                        <DropDown items={betriebssysteme}/>
                                    </FormItem>
                                </FormSection>
                                <FormSection>
                                    <FormItem width="1/2">
                                        <CheckBoxes title="Browser" items={browser}/>
                                    </FormItem>
                                    <FormItem width="1/2">
                                        <CheckBoxes items={betriebssysteme}/>
                                    </FormItem>
                                </FormSection>
                                <FormContainerEnd>
                                    {workingPlaceType > 0 ? <button className="button-primary" onClick={() => setCurrentStep(currentStep + 1)} >Weiter &rarr;</button> : ""}
                                </FormContainerEnd>
                            </FormContainer>

                            //3 Checkboxen für Browser
                            // 3 Checkboxen für Kommunikationsapplikationen
                        }
                    </div>
                </div>
            </div>

        </MainContainer>
    )
}