import { bookingSteps } from "../data/data";
  
  export default function StepsForBooking(props: any) {

    const current = props.currentId;
    return (
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-4">
          {bookingSteps.map((step) => (
            <li key={step.name} className="md:flex-1">
              {step.id <= current ? (
                <div
                  className="group pl-4 py-2 flex flex-col border-l-4 border-green-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                >
                  <span className="text-xs text-green-600 font-semibold tracking-wide uppercase">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div
                  className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                >
                  <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    )
  }