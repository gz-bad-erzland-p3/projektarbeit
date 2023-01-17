import React, { useState, useEffect } from "react";
import Datepicker from '@nichtmetall/react-tailwindcss-datepicker'
import { setBookingValue } from "../../pages/bookings/new";
import { toast } from "react-toastify";

export default function DateTimeRangePicker(props) {
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date()
    });
    const startDate = new Date(value["startDate"])
    const endDate = new Date(value["endDate"])
    setBookingValue(startDate.toLocaleDateString("es-CL"), "Startdatum")
    setBookingValue(endDate.toLocaleDateString("es-CL"), "Enddatum")

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const setIsValid = props.setIsValid;
    setIsValid(true)
    if (startDate < today || endDate < today) {
        setIsValid(false)
        toast.error("Mietzeitraum darf nicht in der Vergangenheit liegen")
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