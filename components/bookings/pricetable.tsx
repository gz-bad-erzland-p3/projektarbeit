import { useState, useEffect } from "react"
import { setBookingValue } from "../../pages/bookings/new";

export const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

export default function PriceTable(props: any) {
  const fullHours = Math.trunc(props.hours)
  const sum = props.pricePerHour * props.hours
  setBookingValue(props.pricePerHour * props.hours, "Summe")
  const hoursString = String(props.hours.toFixed(2))
  const minutes = hoursString.indexOf(".") !== -1 ? Number(hoursString.substring((hoursString.indexOf("."))+1))/100*60 : 0  

  return (

    <div className="flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-none">
            <table className="min-w-full divide-y divide-gray-300 table-auto">

              <tbody className="divide-y divide-gray-200 bg-white">
                <tr key="l1" className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap pl-4 text-sm font-medium text-gray-900 ">Preis pro Stunde</td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">{formatter.format(props.pricePerHour)}</td>
                </tr>
                <tr key="l1" className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap pl-4 text-sm font-medium text-gray-900 ">Beginn der Miete</td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">{props.startDate} um {props.startTime} Uhr</td>
                </tr>
                <tr key="l1" className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap pl-4 text-sm font-medium text-gray-900 ">Ende der Miete</td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">{props.endDate} um {props.endTime} Uhr</td>
                </tr>
                <tr key="l1" className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap pl-4 text-sm font-medium text-gray-900 ">Buchungszeit insgesamt</td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">{fullHours} Stunden {minutes != 0 ? minutes + " Minuten" : ""}</td>
                </tr>
                <tr key="l1" className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap pl-4 text-sm font-medium text-gray-900 ">Gesamtpreis mit Steuer (19%)</td>
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