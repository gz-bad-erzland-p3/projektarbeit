import { ChangeEvent, useState } from "react";
import { setBookingValue } from "../../pages/bookings/new";
type Obj = { [key: string]: { [key: string]: boolean } }
let valueObj: Obj = {};

export default function Checkbox(props: any) {
    const [value, setValue] = useState(false)

    valueObj[props.FirebaseKey] = { ...valueObj[props.FirebaseKey], [props.title]: value };
    setBookingValue(valueObj[props.FirebaseKey], props.FirebaseKey)

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.checked)
    }

    function handleClick() {
        if (value) { setValue(false) }
        else { setValue(true) }
    }

    return (
        <div className={classNames(value ? "ring-2 ring-green-500" : "border-gray-900", 'relative bg-white border shadow-sm p-4 flex focus:outline-none radio-button')} onClick={handleClick}>
            <div className="flex items-center h-5">
                <input
                    id={props.id.toString()}
                    aria-describedby="comments-description"
                    type="checkbox"
                    onChange={e => handleChange(e)}
                    checked={value}
                    disabled={true}
                    className="border-gray-200 h-5 w-5 text-green-600 rounded-none checkmark"
                />
            </div>
            <div className="ml-3 text-sm">
                <span id="comments-description" className="text-gray-900">
                    <span>{props.title}</span>
                </span>
            </div>
        </div>
    )

}