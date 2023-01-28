/* This example requires Tailwind CSS v2.0+ */
const people = [
    { name: 'Arbeitsplatz', title: 'Front-end Developer' },
    { name: 'Zahlungsmethode', title: 'Front-end Developer' },
    { name: 'Lindsay Walton', title: 'Front-end DeveloperDeveloperDeveloperD' },
    // More people...
  ]
  
  export default function PriceTable(props:any) {
    const hours = props.diffrenceInMs / (1000 * 60 * 60)
    const fullHours = Math.trunc(hours)
    const minutes = String(hours).indexOf(".") !== -1 ? Number(String(hours).substring((hours.toString().indexOf("."))+1))/100*60 : 0
    const sum = props.pricePerHour * hours
    const sumWithoutTax = sum - (sum * 0.19)
console.log(getBusinessDatesCount(props.startDate, props.endDate))

    function convertStringToDate(stringDate: String){
      const [day, month, year] = stringDate?.split('-');
      const date = new Date(+year, Number(month) - 1, +day);
      return date
    }

    function getBusinessDatesCount(startDate: any, endDate: any) {
      let count = 0;
      const curDate = convertStringToDate(startDate);
      const expandDate = convertStringToDate(endDate);
      curDate.setDate(curDate.getDate() + 1);
      expandDate.setDate(expandDate.getDate() -1);

      if(curDate >= expandDate){
        while (curDate <= expandDate){
            const dayOfWeek = curDate.getDay();
            if(dayOfWeek !== 0 && dayOfWeek !== 6) count++;
            curDate.setDate(curDate.getDate() + 1);
        }
        console.log(count);
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
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{props.pricePerHour}€</td>
                      </tr>
                      <tr key="l1" className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">Buchungszeit</td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{fullHours} Stunden {minutes != 0 ? minutes+" Minuten":""}</td>
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