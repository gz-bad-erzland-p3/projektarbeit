export const bookingSteps = [
    { id: 'Step 1', name: 'Job details', href: '#', status: 'complete' },
    { id: 'Step 2', name: 'Application form', href: '#', status: 'current' },
    { id: 'Step 3', name: 'Preview', href: '#', status: 'upcoming' },
]

export const bookingTimes = getTimeInSteps(new Date("1970-01-01T08:00:00.00"), new Date("1970-01-01T17:30:00.00"), 15)

function getTimeInSteps(startTime: Date, endTime: Date, steps: number){

    let finalTime = startTime;
    let times:string[] = [];
    let timeDiff: number = (endTime.getHours() - startTime.getHours()) * 60 + (endTime.getMinutes() - startTime.getMinutes());

    for(let i = 0; i < (timeDiff / steps); i++){
      finalTime = new Date(finalTime.getTime() + (steps * 60 * 1000));
      //times.push((finalTime.getHours() < 10 ? '0' : '') + finalTime.getHours() + ":" + (finalTime.getMinutes() < 10 ? '0' : '') + finalTime.getMinutes());
      times.push(finalTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }

    console.log(times)

    return times;
}