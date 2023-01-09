import React, { useState } from "react";
import Datepicker from '@nichtmetall/react-tailwindcss-datepicker'
import { setBookingValue } from "../../pages/bookings/new";

export default function DateTimeRangePicker() {
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date()
    });
    setBookingValue(value, "Datumsauswahl")

    function handleValueChange (newValue) {
        setValue(newValue);
    }

    return (
        <div>
            <Datepicker value={value} onChange={handleValueChange} primaryColor="green" />
        </div>
    );
}