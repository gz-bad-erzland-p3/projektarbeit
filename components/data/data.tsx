export const bookingSteps = [
    { id: '1', name: 'Zeitraum', href: '#' },
    { id: '2', name: 'Konfiguration', href: '#' },
    { id: '3', name: 'Übersicht', href: '#' },
    { id: '4', name: 'Ihre Daten', href: '#' },
    { id: '5', name: 'Zahlung', href: '#' },
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