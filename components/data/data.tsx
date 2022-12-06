export const bookingSteps = [
    { id: '1', name: 'Zeitraum', href: '#' },
    { id: '2', name: 'Arbeitsplatztyp', href: '#' },
    { id: '3', name: 'Konfiguration', href: '#' },
    { id: '4', name: 'Übersicht', href: '#' },
    { id: '5', name: 'Ihre Daten', href: '#' },
    { id: '6', name: 'Zahlung', href: '#' },
]

export const geraete = [
  "Laptop",
  "Desktop",
  "Barebone"
]

export const betriebssysteme = [
  "Windows 10",
  "Windows 11",
  "Ubuntu"
]

export const browser = [
  "Chrome",
  "Firefox",
  "Edge"
]

export const bookingTimes = getTimeInSteps(new Date("1970-01-01T08:00:00.00"), new Date("1970-01-01T17:30:00.00"), 15)

function getTimeInSteps(startTime: Date, endTime: Date, steps: number){

    let finalTime = startTime;
    let times:string[] = [];
    let timeDiff: number = (endTime.getHours() - startTime.getHours()) * 60 + (endTime.getMinutes() - startTime.getMinutes());

    for(let i = 0; i < (timeDiff / steps); i++){
      finalTime = new Date(finalTime.getTime() + (steps * 60 * 1000));
      times.push(finalTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }

    return times;
}