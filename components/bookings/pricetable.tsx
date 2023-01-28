import { useState, useEffect } from "react"
import { setBookingValue } from "../../pages/bookings/new";

export default function PriceTable(props: any) {
  const [finalminutes, setFinalMinutes] = useState(0)
  const [fullHours, setFullHours] = useState(0)
  const [sum, setSum] = useState(0)
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });

  let hours = 0
  const businessDays = getBusinessDatesCount(props.startDate, props.endDate)
  if (businessDays == 1) {
    hours = convertTimeToDecimal(props.endTime) - convertTimeToDecimal(props.startTime)
  } else {
    const hoursStartDay = 20 - convertTimeToDecimal(props.startTime)
    const hoursEndDay = convertTimeToDecimal(props.endTime) - 7
    hours = hoursStartDay + hoursEndDay + ((businessDays - 2) * 13)
  }

  useEffect(()=>{
    setSum(props.pricePerHour * hours)
    setBookingValue(props.pricePerHour * hours, "Summe")
    setBookingValue(hours, "StundenDezimal")

    setFullHours(Math.trunc(hours))
    const hoursString = String(hours.toFixed(2))
    setFinalMinutes(hoursString.indexOf(".") !== -1 ? Number(hoursString.substring((hoursString.indexOf("."))+1))/100*60 : 0)
    console.log("Hours: ", fullHours, "Minutes: ", finalminutes)
  },[])
  

  function convertTimeToDecimal(t: String) {
    const time = t.split(':');
    return parseInt(time[0], 10) * 1 + parseInt(time[1], 10) / 60;
  }

  function convertStringToDate(stringDate: String) {
    const [day, month, year] = stringDate?.split('-');
    const date = new Date(+year, Number(month) - 1, +day);
    return date
  }

  function formatDate(dateString: string){
    const date = convertStringToDate(dateString);
    return date.getDate() + "." +  (date.getMonth() + 1) + "." + date.getFullYear()
  }

  function getBusinessDatesCount(startDate: String, endDate: String) {
    let count = 0;
    const curDate = convertStringToDate(startDate);
    const expandDate = convertStringToDate(endDate);

    curDate.setDate(curDate.getDate());
    expandDate.setDate(expandDate.getDate());
    console.log(curDate, expandDate)
    while (curDate <= expandDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }

  return (

    <div className="flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-none">
            <table className="min-w-full divide-y divide-gray-300">

              <tbody className="divide-y divide-gray-200 bg-white">
                <tr key="l1" className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">Preis pro Stunde</td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">{formatter.format(props.pricePerHour)}</td>
                </tr>
                <tr key="l1" className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">Startdatum</td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">{formatDate(props.startDate)} um {props.startTime} Uhr</td>
                </tr>
                <tr key="l1" className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">Enddatum</td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">{formatDate(props.endDate)} um {props.endTime} Uhr</td>
                </tr>
                <tr key="l1" className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">Buchungszeit</td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">{fullHours} Stunden {finalminutes != 0 ? finalminutes + " Minuten" : ""}</td>
                </tr>
                <tr key="l1" className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">Gesamtpreis ohne Steuer (19%)</td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">{formatter.format(sum - (sum * 0.19))}</td>
                </tr>
                <tr key="l1" className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">Gesamtpreis mit Steuer</td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">{formatter.format(sum)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}