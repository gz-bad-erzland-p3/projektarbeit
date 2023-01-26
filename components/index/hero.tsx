import Router from "next/router"

export default function HeroSection() {

  const handleClick = () => {
    Router.push("/bookings/new")
  }

  return (
    <div className="isolate z-0">
      <main>
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div>
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-200 hover:ring-gray-600">
                  <span>
                    Die Projektarbeit ist jetzt auf {' '}
                    <a href="https://github.com/Nichtmetall/Project" className="font-semibold text-green-600">
                      <span className="absolute inset-0" aria-hidden="true" />
                      GitHub <span aria-hidden="true">&rarr;</span>
                    </a>
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                  Office-Sharing<br /> Bad Erzland
                </h1>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <button onClick={handleClick} className='ml-2 text-white px-4 py-2 text-base font-medium rounded-none bg-green-600 hover:bg-green-500 transition'>
                    Arbeitsplatz mieten &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
