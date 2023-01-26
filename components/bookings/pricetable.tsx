/* This example requires Tailwind CSS v2.0+ */
const people = [
    { name: 'Arbeitsplatz', title: 'Front-end Developer' },
    { name: 'Zahlungsmethode', title: 'Front-end Developer' },
    { name: 'Lindsay Walton', title: 'Front-end DeveloperDeveloperDeveloperD' },
    // More people...
  ]
  
  export default function PriceTable(props:any) {
    const hours = Math.round((props.diffrenceInMs/3600009)* 100) / 100
    const sum = props.pricePerHour * hours
const sumWithoutTax = sum - (sum * 0.19)
    return (
      
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
               
                  <tbody className="divide-y divide-gray-200 bg-white">
                      <tr key="l1" className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">Preis pro Stunde</td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{props.pricePerHour}€</td>
                      </tr>
                      <tr key="l1" className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">Anzahl an Stunden</td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{hours}</td>
                      </tr>
                      <tr key="l1" className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">Gesamtpreis ohne Steuer (19%)</td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{sumWithoutTax.toFixed(2)}€</td>
                      </tr>
                      <tr key="l1" className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">Gesamtpreis mit Steuer</td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{sum.toFixed(2)}€</td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    )
  }