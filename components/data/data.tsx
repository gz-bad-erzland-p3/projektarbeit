export const bookingSteps = [
    { id: '1', name: 'Zeitraum', href: '#' },
    { id: '2', name: 'Arbeitsplatztyp', href: '#' },
    { id: '3', name: 'Konfiguration', href: '#' },
    { id: '4', name: 'Login', href: '#' },
    { id: '5', name: 'Ihre Daten', href: '#' },
    { id: '6', name: 'Zahlung', href: '#' },
]

export const geraete = [
  {id: '1', title: "Laptop", description: "Test",price: "1"},
  {id: '2', title: "Desktop PC", description: "Test",price: "1"},
  {id: '3', title: "Barebone", description: "Test", price: "1"}
]

export const betriebssysteme = [
  {id: '1', title: "Windows 11", description: "Windows 11"},
  {id: '2', title: "Windows 10", description: "Windows 10"},
  {id: '3', title: "Ubuntu", description: "Ubuntu"}
]

export const browser = [
  "Chrome",
  "Firefox",
  "Edge"
]

export const kommunikationsapplikationen = [
  "Teams",
  "Discord",
  "Slack"
]

export const paymentMethods = [
  {id: '1', title: "Test", description: "Test"},
  {id: '2', title: "Test", description: "Test"},
  {id: '3', title: "Test", description: "Test"}
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