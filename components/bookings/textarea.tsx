import { setBookingValue } from "../../pages/bookings/new";

export default function Textarea(props: any) {
    const handleChange = (event: any) => {
        setBookingValue(event.target.value, props.FirebaseKey)
    };

    return (
        <div>
            <textarea rows={4} name="comment" id="comment" className="form-input block w-full sm:text-sm border-gray-300" defaultValue={''} onChange={handleChange} />
        </div>
    )
}
