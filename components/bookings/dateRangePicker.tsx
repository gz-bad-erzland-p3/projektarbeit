import React, { useState } from "react";
import Datepicker from '@nichtmetall/react-tailwindcss-datepicker'

export default function DateTimeRangePicker() {
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
    });

    const handleValueChange = (newValue: React.SetStateAction<{ startDate: Date; endDate: number; }>) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    return (
        <div>
            <Datepicker value={value} onChange={handleValueChange} primaryColor="green" language="de" />
        </div>
    );
}