import React, { useState, useEffect } from "react";
import Datepicker from 'react-tailwindcss-datepicker'
import { setBookingValue } from "../../pages/bookings/new";
import { toast } from "react-toastify";

export default function DateTimeRangePicker(props) {
    const today = new Date();
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 0.99)

    const initialDate = new Date(today)
    initialDate.setDate(initialDate.getDate() + 1)
    const [value, setValue] = useState({
        startDate: null,
        endDate:  null
    });

    function handleValueChange(newValue) {
        setValue(newValue);
        const startDate = new Date(newValue["startDate"])
        const endDate = new Date(newValue["endDate"])
        setBookingValue(startDate.toLocaleDateString("de-DE"), "Startdatum")
        setBookingValue(endDate.toLocaleDateString("de-DE"), "Enddatum")

        today.setHours(0, 0, 0, 0);
        const setIsValid = props.setIsValid;
        setIsValid(true)
        if (startDate < tomorrow || endDate < tomorrow) {
            setIsValid(false)
            toast.error("Der Mietbeginn muss mindestens einen Tag im Vorraus liegen.")
        }if(endDate.getDay() == 6 || endDate.getDay() == 0){
            setIsValid(false)
            toast.error("Das Mietende darf nicht an einem Wochenende liegen.")
        }if(startDate.getDay() == 6 || startDate.getDay() == 0){
            setIsValid(false)
            toast.error("Der Mietbeginn darf nicht an einem Wochenende liegen.")
        }
    }

    return (
        <div>
            <Datepicker inputClassName={"relative w-full cursor-default rounded-none border border-gray-300 bg-white text-left outline-none form-dropdown form-input"} separator={"bis zum"}  i18n="de" value={value} onChange={handleValueChange} primaryColor="green" displayFormat={"DD.MM.YYYY"} />
        </div>
    );
}