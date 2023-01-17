import React, { useState } from "react";
import Datepicker from '@nichtmetall/react-tailwindcss-datepicker'
import { setBookingValue } from "../../pages/bookings/new";
import { toast } from "react-toastify";

export default function DateTimeRangePicker() {
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date()
    });
    const startDate = new Date(value["startDate"])
    const endDate = new Date(value["endDate"])
    setBookingValue(startDate.toLocaleDateString("es-CL"), "Startdatum")
    setBookingValue(endDate.toLocaleDateString("es-CL"), "Enddatum")

    

    function handleValueChange (newValue) {
        setValue(newValue);
        console.log(newValue)
        if(startDate < Date() || endDate < Date.now()) {
            toast.error("Datum darf nicht in der Vergangenheit liegen")
        }
    }

    return (
        <div>
            <Datepicker value={value} onChange={handleValueChange} primaryColor="green" />
        </div>
    );
}