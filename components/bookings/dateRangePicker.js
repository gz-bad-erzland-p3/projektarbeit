import React, { useState, useEffect } from "react";
import Datepicker from '@nichtmetall/react-tailwindcss-datepicker'
import { setBookingValue } from "../../pages/bookings/new";
import { toast } from "react-toastify";

export default function DateTimeRangePicker(props) {
    const today = new Date();
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 0.99)

    const initialDate = new Date(today)
    initialDate.setDate(initialDate.getDate() + 1)
    const [value, setValue] = useState({
        startDate: initialDate,
        endDate: initialDate
    });
    const startDate = new Date(value["startDate"])
    const endDate = new Date(value["endDate"])
    setBookingValue(startDate.toLocaleDateString("es-CL"), "Startdatum")
    setBookingValue(endDate.toLocaleDateString("es-CL"), "Enddatum")

    //tomorrow.setDate(tomorrow.getDate() - 0.01)
    today.setHours(0, 0, 0, 0);
    const setIsValid = props.setIsValid;
    setIsValid(true)
    if (startDate < tomorrow || endDate < tomorrow) {
        setIsValid(false)
        toast.error("Der Mietbeginn miss mindestens einen Tag im Vorraus liegen.")
    }

    function handleValueChange(newValue) {
        setValue(newValue);
    }

    return (
        <div>
            <Datepicker value={value} onChange={handleValueChange} primaryColor="green" />
        </div>
    );
}