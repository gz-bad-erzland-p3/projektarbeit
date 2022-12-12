import { ChangeEvent, useState } from "react";
import { setBookingValue } from "../../pages/bookings/new";
type Obj = {[key: string] : boolean}
let valueObj:Obj = {};

export default function Checkbox(props: any) {
    const [value, setValue] = useState(false)

    valueObj[props.title] = value
    setBookingValue(valueObj, "Applikationen")

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }
    
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const checkedName = e.target.checked;
        setValue(checkedName)
    }

    function handleClick(){
        if(value){setValue(false)}
        else { setValue(true) }
    }

    return (
        <div className={classNames(value ? 'ring-2 ring-green-600' : 'border-gray-200', 'text-gray-900 relative flex items-start p-4 primary-checkbox')} onClick={handleClick}>
            <div className="flex items-center h-5">
                <input
                    id={props.id.toString()}
                    aria-describedby="comments-description"
                    type="checkbox"
                    onChange={e => handleChange(e)}
                    checked={value}
                    className="outline-none focus:ring-0 focus:ring-white h-5 w-5 text-green-600 border-gray-300 rounded-full"
                />
            </div>
            <div className="ml-3 text-sm">
                <span id="comments-description" className="text-gray-500">
                    <span>{props.title}</span>
                </span>
            </div>
        </div>
    )

}