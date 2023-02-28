import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal, faUbuntu, faWindows } from "@fortawesome/free-brands-svg-icons";
import { faBuildingColumns, faCreditCard, faDesktop, faLaptop, faMoneyBill, faServer } from "@fortawesome/free-solid-svg-icons"

export const suffix = "| Bad Erzland GZ"

export const bookingSteps = [
  { id: '1', name: 'Zeitraum wählen', href: '#' },
  { id: '2', name: 'Arbeitsplatztyp wählen', href: '#' },
  { id: '3', name: 'Konfiguration wählen', href: '#' },
  { id: '4', name: 'Benutzerdaten angeben', href: '#' },
  { id: '5', name: 'Zahlung tätigen', href: '#' },
  { id: '6', name: 'Bestätigung Ihrer Buchung', href: '#' },
]

export const geraete = [
  { id: '1', title: "Laptop", href: "https://www.bechtle.com/shop/medias/5c8a73bd9ce96993476dbcb8.pdf?context=bWFzdGVyfHJvb3R8MTc5MDMzfGFwcGxpY2F0aW9uL3BkZnxoYTgvaDgyLzExMzQyMDc5ODE5ODA2LnBkZnwxOTE0MzdkMTQ4ZTExZjRkNmU4YzMxZjE4ODJkMzFkOTU4NWJlNGJkZDY3ZTk5OWZjZThmZjU5ODEwZDU1Nzkx", specifications: ["1920 x 1080 Pixel Display", "8GB DDR4 SODIMM", "256GB SSD", "VGA, HDMI, DP, USB 3.0 (3x)", "Audio In / Out", "HD Webcam"], description: " ", price: "4.50", icon: faLaptop },
  { id: '2', title: "Desktop PC", href: 'https://www.compuram.de/system/007886/fujitsu-siemens_esprimo_p758-d3601.pdf', specifications: ["Intel Pentium Gold G5400", "Intel UHD 610", "16GB DDR4", "256GB SSD", "VGA, HDMI, DP, USB 3.0 (6x) usb 2.0 (4X)", "Audio In / Out"], price: "4,50", icon: faDesktop },
  { id: '3', title: "Barebone", href: 'https://sp.ts.fujitsu.com/dmsp/Publications/public/ds-ESPRIMO-Q5562-de.pdf', specifications: ["Intel® Pentium G4400T", "Intel UHD 610", "8GB DDR4", "256GB SSD", "VGA, HDMI, DP, USB 3.0 (3x) usb 2.0 (3X)", "Audio In / Out",], price: "4,50", icon: faServer }
]
export const standard = [
  { id: '1', name: '1 GB LAN oder WLAN 6.0 kompatibel', href: 'https://www.dslweb.de/wifi-6.php' },
  { id: '2', name: 'Fujitsu Bildschirm', href: 'https://sp.ts.fujitsu.com/dmsp/Publications/public/ds-display-b24-8-ts-pro-de.pdf' },
  { id: '3', name: 'Fujitsu Maus', href: 'https://www.fujitsu.com/de/products/computing/peripheral/accessories/input-devices/mice/mouse-m520-black.html' },
  { id: '4', name: 'Fujitsu Tastatur', href: 'https://www.fujitsu.com/de/products/computing/peripheral/accessories/input-devices/keyboards/keyboard-kb521.html' },
]

export const betriebssysteme = [
  { id: '1', title: "Windows 11", description: "Version 22H2", icon: faWindows },
  { id: '2', title: "Windows 10", description: "Version 22H2", icon: faWindows },
  { id: '3', title: "Ubuntu", description: "Version 22.10 (Kinetic Kudu)", icon: faUbuntu }
]

export const browser = [
  "Google Chrome (Version 110.0.5481.181)",
  "Mozilla Firefox (Version 110.0)",
  "Microsoft Edge (Version 110.0.1587.50)"
]

export const kommunikationsapplikationen = [
  "Microsoft Teams (Version 1.6.00.1159)",
  "Discord Messenger (Version 1.0.9011)",
  "Slack Messenger (Version 4.29.149)"
]

export const paymentMethods = [
  { id: '1', title: "PayPal", description: "Online-Bezahldienst", icon: faPaypal },
  { id: '2', title: "Barzahlung", description: "Barzahlung vor Ort", icon: faMoneyBill },
  { id: '3', title: "Überweisung", description: "Vorkasse per Überweisung", }
]

export const bookingTimes = getTimeInSteps(new Date("1970-01-01T06:45:00.00"), new Date("1970-01-01T20:00:00.00"), 15)

function getTimeInSteps(startTime: Date, endTime: Date, steps: number) {

  let finalTime = startTime;
  let times: string[] = [];
  let timeDiff: number = (endTime.getHours() - startTime.getHours()) * 60 + (endTime.getMinutes() - startTime.getMinutes());

  for (let i = 0; i < (timeDiff / steps); i++) {
    finalTime = new Date(finalTime.getTime() + (steps * 60 * 1000));
    times.push(finalTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false }) + " Uhr");
  }

  return times;
}