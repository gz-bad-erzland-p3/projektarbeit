export default function CallToAction() {
    return (
      <div>
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="block">Bereit einzutauchen??</span>
            <span className="block">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-white text-base font-medium rounded-md bg-green-600 hover:bg-green-500 transition"
              >
                Jetzt registrieren
              </a>
            </div>
            <div className="ml-3 inline-flex">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md hover:text-white text-green-600 bg-green-50 hover:bg-green-500 transition"
              >
                Anmelden
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }