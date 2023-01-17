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

        const today = new Date();
        today.setHours(0,0,0,0);
        
        console.log(startDate)
        console.log(today)
        if(startDate <= today || endDate <= today) {
            toast.error("Mietzeitraum darf nicht in der Vergangenheit liegen")
        }
    }

    return (
        <div>
            <Datepicker value={value} onChange={handleValueChange} primaryColor="green" />
        </div>
    );
}