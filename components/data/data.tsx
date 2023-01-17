import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal, faUbuntu, faWindows } from "@fortawesome/free-brands-svg-icons";
import { faBuildingColumns, faCreditCard, faDesktop, faLaptop, faMoneyBill, faServer } from "@fortawesome/free-solid-svg-icons"

export const suffix = "| Bad Erzland GZ"

export const bookingSteps = [
  { id: '1', name: 'Zeitraum', href: '#' },
  { id: '2', name: 'Arbeitsplatztyp', href: '#' },
  { id: '3', name: 'Konfiguration', href: '#' },
  { id: '4', name: 'Anmelden oder Registrieren', href: '#' },
  { id: '5', name: 'Ihre Daten', href: '#' },
  { id: '6', name: 'Zahlung', href: '#' },
]

export const geraete = [
  { id: '1', title: "Laptop", specifications: ["1920 x 1080 Pixel Display", "8GB DDR4 SODIMM", "256GB SSD", "VGA, HDMI, DP, USB 3.0 (3x)", "Audio In / Out", "HD Webcam"], description: " ", price: "4.50", icon: faLaptop },
  { id: '2', title: "Desktop PC", specifications: ["Intel Pentium Gold G5400", "Intel UHD 610", "16GB DDR4", "256GB SSD", "VGA, HDMI, DP, USB 3.0 (6x) usb 2.0 (4X)", "Audio In / Out"], price: "4,50", icon: faDesktop },
  { id: '3', title: "Barebone", specifications: ["Intel® Pentium G4400T", "Intel UHD 610", "8GB DDR4", "256GB SSD", "VGA, HDMI, DP, USB 3.0 (3x) usb 2.0 (3X)", "Audio In / Out",], price: "4,50", icon: faServer }
]

export const standard = ["1 Gig LAN oder WLAN", "Fujitsu Bildschirm", "Fujitsu Maus", "Fujitsu Tastatur"]

export const betriebssysteme = [
  { id: '1', title: "Windows 11", description: "Version 22H2", icon: faWindows },
  { id: '2', title: "Windows 10", description: "Version 22H2", icon: faWindows },
  { id: '3', title: "Ubuntu", description: "Version 22.10 (Kinetic Kudu)", icon: faUbuntu }
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
  { id: '1', title: "PayPal", description: "Online-Bezahldienst", icon: faPaypal },
  { id: '2', title: "Barzahlung", description: "Barzahlung vor Ort", icon: faMoneyBill },
  { id: '3', title: "Überweisung", description: "Vorkasse per Überweisung", }
]

export const bookingTimes = getTimeInSteps(new Date("1970-01-01T08:00:00.00"), new Date("1970-01-01T20:00:00.00"), 15)

function getTimeInSteps(startTime: Date, endTime: Date, steps: number) {

  let finalTime = startTime;
  let times: string[] = [];
  let timeDiff: number = (endTime.getHours() - startTime.getHours()) * 60 + (endTime.getMinutes() - startTime.getMinutes());

  for (let i = 0; i < (timeDiff / steps); i++) {
    finalTime = new Date(finalTime.getTime() + (steps * 60 * 1000));
    times.push(finalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }

  return times;
}