import DateTimeRangePicker from "../../components/bookings/dateRangePicker";
import SelectButtons from "../../components/bookings/selectButtons";
import StepsForBooking from "../../components/bookings/steps";
import TimePicker from "../../components/bookings/timePicker";
import MainContainer from "../../components/container/container";

export default function NewBooking() {
    return (
        <MainContainer>
            <div className="flex justify-center mx-auto">
                <div className="grow max-w-7xl px-4 sm:px-6 ">
                    <div>
                        <StepsForBooking />
                        <div className="flex py-5">
                            <div className="flex-auto w-96">
                                <DateTimeRangePicker />
                            </div>
                            <div className="flex-auto">
                                <TimePicker />
                            </div>
                            <div className="flex-auto">
                                <TimePicker />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1">
                                <SelectButtons title="Test" />
                            </div>
                            <div className="flex-1">
                                <SelectButtons title="Test2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    )
}