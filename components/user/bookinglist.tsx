/* This example requires Tailwind CSS v2.0+ */
const people = [
    { name: 'Arbeitsplatz', title: 'Front-end Developer' },
    { name: 'Zahlungsmethode', title: 'Front-end Developer' },
    { name: 'Lindsay Walton', title: 'Front-end DeveloperDeveloperDeveloperD' },
    // More people...
  ]
  
  export default function BookingList(props:any) {
    const booking: Object[] = []
    Object.keys(props.booking).forEach(key => {
        const item = {name: key, value: props.booking[key]}
        booking.push(item)
      });

console.log(booking)
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
                    {booking.map((item:any) => (
                      <tr key={item.name} className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{String(item.value)}</td>
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