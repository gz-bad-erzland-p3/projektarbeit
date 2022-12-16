import React, { useState } from "react";
import Datepicker from '@nichtmetall/react-tailwindcss-datepicker'
import { setBookingValue } from "../../pages/bookings/new";

export default function DateTimeRangePicker() {
    const [value, setValue] = useState({
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });
    setBookingValue(value, "Datumsauswahl")

    const handleValueChange = (newValue: React.SetStateAction<{ startDate: string; endDate: string; }>) => {
        setValue(newValue);
    }

    return (
        <div>
            <Datepicker value={value} onChange={(e) => handleValueChange} primaryColor="green" />
        </div>
    );
}