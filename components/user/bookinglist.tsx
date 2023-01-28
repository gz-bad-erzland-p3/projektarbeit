import { formatter } from "../bookings/pricetable";

export default function BookingList(props: any) {
  const booking: Object[] = []
  Object.keys(props.booking).forEach(key => {
    let name = key
    let value = props.booking[key]
    let isNeeded = true

    switch (String(key)) {
      case "Byod1":
        name = "Eigenes Gerät am Arbeitsplatz 1"
        break;
      case "Byod2":
        name = "Eigenes Gerät am Arbeitsplatz 2"
        break;
      case "Kommunikationsapplikationen1":
        name = "Zusätzliche Applikationen am Arbeitsplatz 1";
        break;
      case "Kommunikationsapplikationen2":
        name = "Zusätzliche Applikationen am Arbeitsplatz 2";
        break;
      case "Browser1":
        name = "Browseranwendungen am Arbeitsplatz 1";
        break;
      case "Browser2":
        name = "Browseranwendungen am Arbeitsplatz 2";
        break;
      case "Bemerkungen1":
        name = "Ihre Bemerkungen zum Arbeitsplatz 1";
        break;
      case "Bemerkungen2":
        name = "Ihre Bemerkungen zum Arbeitsplatz 2";
        break;
      case "Betriebssystem1":
        name = "Betriebssystem am Arbeitsplatz 1";
        break;
      case "Betriebssystem2":
        name = "Betriebssystem am Arbeitsplatz 2";
        break;
      case "Geraet1":
        name = "Gerät am Arbeitsplatz 1";
        break;
      case "Geraet2":
        name = "Gerät am Arbeitsplatz 2";
        break;
      case "Preis":
        name = "Preis pro Stunde";
        value = formatter.format(value)
        break;
      case "BookingId":
        name = "Buchungs-ID";
        break;
      case "Summe":
        name = "Gesamtpreis";
        value = formatter.format(value)
        break;
      case "Startdatum":
      case "Enddatum":
      case "Startzeit":
      case "Endzeit":
      case "UserID":
      case "StundenDezimal":
        isNeeded = false
        break;
      default:
        break;
    }

    if (props.booking[key] instanceof Object) {
      let valueString = ""
      for (const key2 in props.booking[key]) {
        if (Object.prototype.hasOwnProperty.call(props.booking[key], key2)) {
          const value = props.booking[key][key2];
          if (value) {
            valueString = valueString + key2 + ", "
          }
        }
      }
      value = valueString.replace(/,\s*$/, "");
    }

    switch (props.booking[key]) {
      case true:
        value = "Ja"
        break;
      case false:
        value = "Nein"
        break;
      case 1:
        value = "Einzelarbeitsplatz"
        break;
      case 2:
        value = "Doppelarbeitsplatz"
        break;
      default:
        break;
    }//TODO mehr in switch case + switch case für werte

    if (isNeeded) {
      const item = { name: name, value: value }
      booking.push(item)
    }
  });

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr className="divide-x divide-gray-200">
                  <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Eigenschaft
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Ihre Konfiguration
                  </th>

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {booking.map((item: any) => (
                  <tr key={item.name} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}