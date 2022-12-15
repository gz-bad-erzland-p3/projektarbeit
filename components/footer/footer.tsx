/* This example requires Tailwind CSS v2.0+ */
const navigation = {
    main: [
      { name: 'Impressum', href: '#' },
      { name: 'AGB', href: '#' },
      { name: 'Datenschutz', href: '#' },
      { name: 'Hilfe', href: '#' },
    ]
}
  
  export default function Footer() {
    return (
      <footer>
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            {navigation.main.map((item) => (
              <div key={item.name} className="px-5 py-2">
                <a href={item.href} className="text-base link-primary hover:text-gray-700 dark:hover:text-gray-200">
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">&copy; 2022 Gemeindezentrum Bad Erzland</p>
        </div>
      </footer>
    )
  }